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
  txSheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
  txSheet.setFrozenRows(1);

  // 2. Delivery_Queue Tab
  let dqSheet = ss.getSheetByName("Delivery_Queue");
  if (!dqSheet) {
    dqSheet = ss.insertSheet("Delivery_Queue");
  }
  // Order Status is column P (16th column), Fulfillment is D
  dqSheet.getRange("A1").setFormula(`=QUERY(All_Transactions!A:P, "SELECT A, B, F, G, H, L, P WHERE D = 'Campus Delivery' AND P = 'Pending'", 1)`);

  // 3. Financial_Summary Tab
  let fsSheet = ss.getSheetByName("Financial_Summary");
  if (!fsSheet) {
    fsSheet = ss.insertSheet("Financial_Summary");
  }
  
  fsSheet.getRange("A1:B1").setValues([["TABO SA UCLM", "REVENUE TRACKER"]]).setFontWeight("bold").setBackground("#d9ead3");
  // Final Total is column L, Order Type is column C
  fsSheet.getRange("A2:B2").setValues([["Live / Walk-in Cash Sales", '=SUMIF(All_Transactions!C:C, "Walk-in", All_Transactions!L:L)']]);
  fsSheet.getRange("A3:B3").setValues([["Online GCash Sales", '=SUMIF(All_Transactions!C:C, "Online", All_Transactions!L:L)']]);
  // Note: Delivery fees are no longer tracked as a separate column in the 16-field schema.
  // Assuming delivery fee is baked into Final Total, we can remove or change it.
  fsSheet.getRange("A4:B4").setValues([["Total Online Cash Sales", '=SUMIFS(All_Transactions!L:L, All_Transactions!C:C, "Online", All_Transactions!E:E, "Cash")']]);
  fsSheet.getRange("A5:B5").setValues([["TOTAL EARNINGS OVERALL", '=SUM(B2:B4)']]).setFontWeight("bold").setBackground("#fff2cc");
  
  fsSheet.setColumnWidth(1, 250);
  
  SpreadsheetApp.getUi().alert("Setup complete! Your 3 tabs are ready. (Make sure to deploy as a New Web App)");
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("All_Transactions");
    const data = JSON.parse(e.postData.contents);
    
    const action = data.action;

    if (action === "CREATE_TRANSACTION") {
      sheet.appendRow([
        data.timestamp,
        data.transactionId,
        data.orderType,
        data.fulfillment,
        data.paymentMethod,
        data.customerName,
        data.contactInfo,
        data.itemsSummary,
        data.subtotal,
        data.voucherApplied,
        data.discountAmount,
        data.grandTotal,
        data.amountTendered,
        data.changeGiven,
        data.gcashRef,
        data.status
      ]);
      return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Row appended" }))
        .setMimeType(ContentService.MimeType.JSON);
        
    } else if (action === "UPDATE_TRANSACTION") {
      // Enhanced to update Status, Tendered, and Change
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
        // Status is Column P (16), Tendered is M (13), Change is N (14), GCash Ref is O (15)
        if (data.status) sheet.getRange(rowIndex, 16).setValue(data.status);
        if (data.amountTendered !== undefined) sheet.getRange(rowIndex, 13).setValue(data.amountTendered);
        if (data.changeGiven !== undefined) sheet.getRange(rowIndex, 14).setValue(data.changeGiven);
        if (data.gcashRef !== undefined) sheet.getRange(rowIndex, 15).setValue(data.gcashRef);
        
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
