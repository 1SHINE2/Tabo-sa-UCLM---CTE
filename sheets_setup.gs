/**
 * Tabo sa UCLM — Google Apps Script Backend
 * ─────────────────────────────────────────────────────────────────────────────
 * INSTRUCTIONS:
 * 1. Open your Google Sheet
 * 2. Click Extensions > Apps Script
 * 3. Delete any code there, paste this entire file, and click Save 💾
 * 4. Run the "setupSheets" function once to build your 3 tabs.
 * 5. Click Deploy > New deployment
 * 6. Select "Web app", Execute as: "Me", Who has access: "Anyone"
 * 7. Click Deploy, authorize permissions, and copy the Web App URL.
 * 8. Paste that URL into your `checkout.js` and `cashier.js` code!
 * ─────────────────────────────────────────────────────────────────────────────
 */

function setupSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. All_Transactions Tab
  let txSheet = ss.getSheetByName("All_Transactions");
  if (!txSheet) {
    txSheet = ss.insertSheet("All_Transactions");
  }
  const headers = [
    "Timestamp", "Order ID", "Order Type", "Fulfillment Type", "Payment Method",
    "Customer Name", "Contact Info / Location", "Items Purchased", "Subtotal Amount",
    "Voucher Applied", "Discount Amount", "Final Total Amount", "Amount Tendered",
    "Change Given", "GCash Reference Number", "Order Status"
  ];
  if (txSheet.getLastRow() === 0) {
    txSheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
    txSheet.setFrozenRows(1);
  }

  // 2. Delivery_Queue Tab
  let dqSheet = ss.getSheetByName("Delivery_Queue");
  if (!dqSheet) {
    dqSheet = ss.insertSheet("Delivery_Queue");
  }
  if (dqSheet.getLastRow() === 0) {
    dqSheet.getRange("A1").setFormula(`=QUERY(All_Transactions!A:P, "SELECT A, B, F, G, H, L, P WHERE D = 'Campus Delivery' AND LOWER(P) = 'pending'", 1)`);
  }

  // 3. Financial_Summary Tab
  let fsSheet = ss.getSheetByName("Financial_Summary");
  if (!fsSheet) {
    fsSheet = ss.insertSheet("Financial_Summary");
  }
  
  if (fsSheet.getLastRow() === 0) {
    fsSheet.getRange("A1:B1").setValues([["TABO SA UCLM", "REVENUE TRACKER"]]).setFontWeight("bold").setBackground("#d9ead3");
    
    // Formulas
    fsSheet.getRange("A2:B2").setValues([["Live / Walk-in Cash Sales", '=SUMIF(All_Transactions!C:C, "Walk-in", All_Transactions!L:L)']]);
    fsSheet.getRange("A3:B3").setValues([["Online GCash Sales", '=SUMIFS(All_Transactions!L:L, All_Transactions!C:C, "Online", All_Transactions!E:E, "GCash")']]);
    fsSheet.getRange("A4:B4").setValues([["Total Online Cash Sales", '=SUMIFS(All_Transactions!L:L, All_Transactions!C:C, "Online", All_Transactions!E:E, "Cash")']]);
    fsSheet.getRange("A5:B5").setValues([["TOTAL EARNINGS OVERALL", '=SUM(B2:B4)']]).setFontWeight("bold").setBackground("#fff2cc");
    
    fsSheet.setColumnWidth(1, 250);
  }
  
  SpreadsheetApp.getUi().alert("Setup complete! Your 3 tabs are ready. (Make sure to deploy as a New Web App deployment)");
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("All_Transactions");
    const data = JSON.parse(e.postData.contents);
    
    // Default to CREATE_TRANSACTION if no action is explicitly specified
    const action = data.action || "CREATE_TRANSACTION";

    if (action === "CREATE_TRANSACTION") {
      
      // Explicit 16-Column Array Mapping with strict position anchors & fallbacks
      const row = [
        data.timestamp ? new Date(data.timestamp) : new Date(), // Col A: Timestamp
        data.transactionId || "N/A",                           // Col B: Order ID
        data.orderType || "Online",                            // Col C: Order Type
        data.fulfillment || "Over the counter",               // Col D: Fulfillment Type
        data.paymentMethod || data.payment || "Cash",          // Col E: Payment Method
        data.customerName || "Walk-in Customer",              // Col F: Customer Name
        data.contactInfo || data.destination || "N/A",        // Col G: Contact / Location
        data.itemsSummary || "N/A",                            // Col H: Items Purchased
        Number(data.subtotal) || Number(data.total) || 0,     // Col I: Subtotal
        data.voucherApplied || "NONE",                        // Col J: Voucher Applied
        Number(data.discountAmount) || 0,                     // Col K: Discount Amount
        Number(data.grandTotal) || Number(data.total) || 0,   // Col L: Final Total Amount
        data.amountTendered !== undefined ? data.amountTendered : "N/A", // Col M: Amount Tendered
        Number(data.changeGiven) || 0,                         // Col N: Change Given
        data.gcashRef || "N/A",                                // Col O: GCash Ref
        data.status || "Pending"                               // Col P: Status
      ];

      sheet.appendRow(row);

      return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Row appended cleanly" }))
        .setMimeType(ContentService.MimeType.JSON);
        
    } else if (action === "UPDATE_TRANSACTION") {
      const dataRange = sheet.getDataRange();
      const values = dataRange.getValues();
      const txnIdToFind = data.transactionId;
      
      let rowIndex = -1;
      for (let i = 1; i < values.length; i++) {
        if (values[i][1] === txnIdToFind) { // Column B is Order ID (index 1)
          rowIndex = i + 1; 
          break;
        }
      }
      
      if (rowIndex > -1) {
        if (data.status) sheet.getRange(rowIndex, 16).setValue(data.status); // Col P
        if (data.amountTendered !== undefined) sheet.getRange(rowIndex, 13).setValue(data.amountTendered); // Col M
        if (data.changeGiven !== undefined) sheet.getRange(rowIndex, 14).setValue(data.changeGiven); // Col N
        if (data.gcashRef !== undefined) sheet.getRange(rowIndex, 15).setValue(data.gcashRef); // Col O
        
        return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Transaction updated" }))
          .setMimeType(ContentService.MimeType.JSON);
      } else {
        return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Transaction ID not found" }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Invalid action" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
