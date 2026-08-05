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
    "Transaction ID", "Timestamp", "Order Type", "Fulfillment", 
    "Customer Name / Room", "Items Summary", "Subtotal", 
    "Delivery Fee", "Grand Total", "Payment Method", "Status"
  ];
  txSheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
  txSheet.setFrozenRows(1);

  // 2. Delivery_Queue Tab
  let dqSheet = ss.getSheetByName("Delivery_Queue");
  if (!dqSheet) {
    dqSheet = ss.insertSheet("Delivery_Queue");
  }
  dqSheet.getRange("A1").setFormula(`=QUERY(All_Transactions!A:K, "SELECT A, E, F, I, J, K WHERE D = 'Campus Delivery' AND K = 'Pending'", 1)`);
  // Add headers for clarity if query doesn't pull them perfectly, but QUERY with ', 1' takes the header row.

  // 3. Financial_Summary Tab
  let fsSheet = ss.getSheetByName("Financial_Summary");
  if (!fsSheet) {
    fsSheet = ss.insertSheet("Financial_Summary");
  }
  
  fsSheet.getRange("A1:B1").setValues([["TABO SA UCLM", "REVENUE TRACKER"]]).setFontWeight("bold").setBackground("#d9ead3");
  fsSheet.getRange("A2:B2").setValues([["Live / Walk-in Cash Sales", '=SUMIF(All_Transactions!C:C, "Walk-in", All_Transactions!I:I)']]);
  fsSheet.getRange("A3:B3").setValues([["Online GCash Sales", '=SUMIF(All_Transactions!C:C, "Online", All_Transactions!I:I)']]);
  fsSheet.getRange("A4:B4").setValues([["Total Delivery Fees Collected", '=SUM(All_Transactions!H:H)']]);
  fsSheet.getRange("A5:B5").setValues([["TOTAL EARNINGS OVERALL", '=SUM(B2:B4)']]).setFontWeight("bold").setBackground("#fff2cc");
  
  fsSheet.setColumnWidth(1, 250);
  
  SpreadsheetApp.getUi().alert("Setup complete! Your 3 tabs are ready.");
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("All_Transactions");
    const data = JSON.parse(e.postData.contents);
    
    const action = data.action;

    if (action === "CREATE_TRANSACTION") {
      sheet.appendRow([
        data.transactionId,
        data.timestamp,
        data.orderType,
        data.fulfillment,
        data.customerName,
        data.itemsSummary,
        data.subtotal,
        data.deliveryFee,
        data.grandTotal,
        data.paymentMethod,
        data.status
      ]);
      return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Row appended" }))
        .setMimeType(ContentService.MimeType.JSON);
        
    } else if (action === "UPDATE_STATUS") {
      // Find row by Transaction ID
      const dataRange = sheet.getDataRange();
      const values = dataRange.getValues();
      const txnIdToFind = data.transactionId;
      const newStatus = data.status;
      
      let rowIndex = -1;
      // loop skipping header
      for (let i = 1; i < values.length; i++) {
        if (values[i][0] === txnIdToFind) { // Column A is index 0
          rowIndex = i + 1; // +1 because array is 0-indexed but sheet is 1-indexed
          break;
        }
      }
      
      if (rowIndex > -1) {
        // Status is Column K (11th column)
        sheet.getRange(rowIndex, 11).setValue(newStatus);
        return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Status updated" }))
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
