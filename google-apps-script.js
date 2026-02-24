// ═══════════════════════════════════════════════════════════
// Google Apps Script — Collegiate Dance Team Track Applications
// ═══════════════════════════════════════════════════════════
//
// SETUP INSTRUCTIONS:
// 1. Create a new Google Sheet
// 2. Click Extensions → Apps Script
// 3. Delete any existing code and paste THIS entire file
// 4. Click Deploy → New Deployment
// 5. Type: Web App
// 6. Execute as: Me
// 7. Who has access: Anyone
// 8. Click Deploy and copy the URL
// 9. Paste the URL into v2.html where it says GOOGLE_SCRIPT_URL
//
// The first row of your Sheet will automatically become headers.
// Each form submission will add a new row.
// ═══════════════════════════════════════════════════════════

function doPost(e) {
    try {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        const data = JSON.parse(e.postData.contents);

        // Create headers on first submission
        if (sheet.getLastRow() === 0) {
            sheet.appendRow([
                'Timestamp',
                'Dancer Name',
                'Parent/Guardian',
                'Parent Email',
                'Parent Phone',
                'Rising Grade',
                'Years Training',
                'Styles',
                'Current Team',
                'Collegiate Exposure',
                'Long-Term Goals',
                'Commitment Level',
                '2-3 Day/Week',
                'May Evaluation',
                'Location',
                'Greatest Strength',
                'Needs Development',
                'Additional Notes'
            ]);
        }

        // Add the submission as a new row
        sheet.appendRow([
            new Date().toLocaleString(),
            data.dancer_name || '',
            data.parent_name || '',
            data.parent_email || '',
            data.parent_phone || '',
            data.rising_grade || '',
            data.years_training || '',
            data.styles || '',
            data.current_team || '',
            data.exposure || '',
            data.goals || '',
            data.commitment_level || '',
            data.training_commitment || '',
            data.may_availability || '',
            data.location || '',
            data.strength || '',
            data.development || '',
            data.additional || ''
        ]);

        return ContentService
            .createTextOutput(JSON.stringify({ result: 'success' }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService
            .createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

// Required for CORS preflight
function doGet(e) {
    return ContentService
        .createTextOutput(JSON.stringify({ status: 'ok' }))
        .setMimeType(ContentService.MimeType.JSON);
}
