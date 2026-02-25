// Dance Team Applications - Google Apps Script
// Paste into Extensions > Apps Script > Code.gs
// Deploy as Web App (Execute as: Me, Access: Anyone)

function doPost(e) {
    try {
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        var data = JSON.parse(e.postData.contents);

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

function doGet(e) {
    return ContentService
        .createTextOutput(JSON.stringify({ status: 'ok' }))
        .setMimeType(ContentService.MimeType.JSON);
}
