/**
 * SOL Collagen Plus — Order Receiver
 * ---------------------------------------------------
 * This script receives order data (POST request) from the landing page
 * and appends each order as a new row in a Google Sheet, so you can open
 * the sheet directly in Google Sheets or download it as an Excel (.xlsx) file.
 *
 * SETUP STEPS:
 * 1. Go to https://sheets.google.com and create a new blank spreadsheet.
 *    Name it e.g. "SOL Collagen Plus - Orders".
 * 2. In the first row, add these column headers (exactly, in this order):
 *    Timestamp | Full Name | Phone | Address | Postcode | Package | Total (RM)
 * 3. In the sheet, go to Extensions > Apps Script.
 * 4. Delete any starter code and paste ALL of this file's content in.
 * 5. Click the "Deploy" button (top right) > "New deployment".
 * 6. Click the gear icon next to "Select type" and choose "Web app".
 * 7. Set:
 *      - Description: SOL Order Receiver
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 8. Click "Deploy". Google will ask you to authorize — allow it.
 * 9. Copy the "Web app URL" it gives you (ends in /exec).
 * 10. Open index.html, find the line:
 *        const GOOGLE_SCRIPT_URL = "PASTE_GOOGLE_APPS_SCRIPT_URL_HERE";
 *     and replace PASTE_GOOGLE_APPS_SCRIPT_URL_HERE with the URL you copied.
 * 11. Re-upload/redeploy index.html to Netlify.
 *
 * Every order submitted on the website will now appear as a new row
 * in your Google Sheet in real time. You can open File > Download >
 * Microsoft Excel (.xlsx) any time to get an Excel copy.
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.fullname || '',
      data.phone || '',
      data.address || '',
      data.postcode || '',
      data.package || '',
      data.total || ''
    ]);

    return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ status: 'SOL order receiver is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}
