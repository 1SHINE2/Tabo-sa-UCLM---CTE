/**
 * Tabo sa UCLM - Google Sheets POS & E-Commerce Webhook
 * Handles: CREATE_TRANSACTION, UPDATE_TRANSACTION, CHECK_STATUS
 */

function doPost(e) {
  // CORS Headers are automatically handled by Web Apps if returning ContentService
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action || "CREATE_TRANSACTION";

    // 1. Spreadsheet Target
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName("Orders");
    if (!sheet) {
      // Fallback to first sheet if "Orders" doesn't exist
      sheet = ss.getSheets()[0];
    }

    // 2. Auto-Header Creation
    const headers = [
      "Order ID", "Timestamp", "Order Type", "Fulfillment", 
      "Payment Method", "GCash Ref", "Items", "Total Amount", 
      "Status", "Delivery Location"
    ];
    
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    let response = { status: "success" };

    if (action === "CREATE_TRANSACTION") {
      // Extract data safely
      const orderId = data.transactionId || data.orderId || "N/A";
      const timestamp = data.timestamp || new Date().toISOString();
      const orderType = data.orderType || "Online";
      const fulfillment = data.fulfillment || "Pickup";
      const paymentMethod = data.paymentMethod || data.payment || "Cash";
      const gcashRef = data.gcashRef || "N/A";
      
      // Handle items (array or string)
      let itemsStr = data.itemsSummary || "";
      if (!itemsStr && data.items && Array.isArray(data.items)) {
        itemsStr = data.items.map(i => `${i.name} x${i.qty}`).join(", ");
      }

      const total = data.grandTotal || data.total || 0;
      const status = data.status || "Pending";
      const location = data.destination || data.deliveryLocation || data.contactInfo || "N/A";

      const rowData = [
        orderId,
        timestamp,
        orderType,
        fulfillment,
        paymentMethod,
        gcashRef,
        itemsStr,
        total,
        status,
        location
      ];

      sheet.appendRow(rowData);
      response.message = "Transaction created successfully.";
      response.orderId = orderId;

    } else if (action === "UPDATE_TRANSACTION") {
      const orderIdToFind = String(data.transactionId || data.orderId);
      
      // Efficient Sheet Lookup (load all at once)
      const dataRange = sheet.getDataRange();
      const values = dataRange.getValues();
      let rowIndex = -1;

      // Loop to find the row (skip header)
      for (let i = 1; i < values.length; i++) {
        if (String(values[i][0]) === orderIdToFind) {
          rowIndex = i + 1; // +1 because array is 0-indexed and sheets are 1-indexed
          break;
        }
      }

      if (rowIndex !== -1) {
        // Update Status (Column I - index 9)
        if (data.status) {
          sheet.getRange(rowIndex, 9).setValue(data.status);
        }
        
        // Update Payment Method (Column E - index 5)
        if (data.paymentMethod) {
          sheet.getRange(rowIndex, 5).setValue(data.paymentMethod);
        }
        
        // Update GCash Ref (Column F - index 6)
        if (data.gcashRef && data.gcashRef !== "N/A") {
          sheet.getRange(rowIndex, 6).setValue(data.gcashRef);
        }
        
        response.message = `Transaction ${orderIdToFind} updated.`;
      } else {
        response = { status: "error", message: "Order ID not found." };
      }

    } else if (action === "CHECK_STATUS") {
      const orderIdToFind = String(data.transactionId || data.orderId);
      
      const dataRange = sheet.getDataRange();
      const values = dataRange.getValues();
      let orderStatus = "Not Found";

      for (let i = 1; i < values.length; i++) {
        if (String(values[i][0]) === orderIdToFind) {
          orderStatus = values[i][8]; // Status is in Column I (index 8)
          break;
        }
      }

      response.message = "Status retrieved.";
      response.orderStatus = orderStatus;
    } else {
      response = { status: "error", message: "Unknown action." };
    }

    return ContentService.createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests (optional, to respond to basic pings or browsers)
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    message: "Tabo sa UCLM Webhook is active and listening for POST requests."
  })).setMimeType(ContentService.MimeType.JSON);
}
