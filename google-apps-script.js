// Google Apps Script - Dance Team Applications + Kit Integration
// Paste into Extensions > Apps Script > Code.gs
// Deploy as Web App (Execute as: Me, Access: Anyone)

var KIT_API_SECRET = 'oH7ce18Lxq4yR2Josb19d9pf9bEQDBxEJGOMRu7jyeU';
var KIT_TAG_ID = 16511633;

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
                'Additional Notes',
                'Kit Status'
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
            data.additional || '',
            ''
        ]);

        var row = sheet.getLastRow();
        var kitStatus = 'Not sent';

        if (data.parent_email) {
            try {
                var kitPayload = {
                    api_secret: KIT_API_SECRET,
                    email: data.parent_email,
                    first_name: data.parent_name || data.dancer_name || ''
                };

                var kitResponse = UrlFetchApp.fetch(
                    'https://api.convertkit.com/v3/tags/' + KIT_TAG_ID + '/subscribe',
                    {
                        method: 'post',
                        contentType: 'application/json',
                        payload: JSON.stringify(kitPayload),
                        muteHttpExceptions: true
                    }
                );

                var kitCode = kitResponse.getResponseCode();
                if (kitCode === 200) {
                    kitStatus = 'Subscribed';
                } else {
                    kitStatus = 'Kit error ' + kitCode;
                }
            } catch (kitError) {
                kitStatus = 'Kit error';
            }

            sheet.getRange(row, 19).setValue(kitStatus);
        }

        return ContentService
            .createTextOutput(JSON.stringify({ result: 'success', kit: kitStatus }))
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
