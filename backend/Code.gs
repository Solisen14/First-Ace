/**
 * The First Ace: anonymous prediction pilot.
 * Install in spreadsheet via Extensions > Apps Script.
 * Deploy as Web app: Execute as Me; access Anyone.
 * Spreadsheet stays private. Only aggregate counts are publicly returned.
 */
const SHEET_ID = '13hsx5r3dqAZEd_EBS7zQ6KyvnBnZOvi-cZA8mwAhF84';
const RESPONSES_TAB = 'Responses';
const OPTIONS = ['ace_spades', 'two_clubs', 'equally_likely', 'not_sure'];

function getResponsesSheet_() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(RESPONSES_TAB);
  if (!sheet) throw new Error('Responses tab is missing.');
  return sheet;
}

function validToken_(token) {
  return /^[A-Za-z0-9_-]{24,80}$/.test(token);
}

function tokenExists_(sheet, token) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;
  return sheet.getRange(2, 3, lastRow - 1, 1)
    .createTextFinder(token).matchEntireCell(true).findNext() !== null;
}

function totals_(sheet) {
  const counts = {ace_spades: 0, two_clubs: 0, equally_likely: 0, not_sure: 0};
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    const answers = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
    answers.forEach(([choice]) => {
      if (Object.prototype.hasOwnProperty.call(counts, choice)) counts[choice]++;
    });
  }
  return {total: Object.values(counts).reduce((a, b) => a + b, 0), counts};
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Public read-only JSONP endpoint. A callback name is required.
 * Optionally pass token to determine whether a particular submission
 * has been recorded. Returns no raw row data.
 */
function doGet(e) {
  const params = e && e.parameter || {};
  const callback = String(params.callback || '');
  if (!/^[A-Za-z_$][A-Za-z0-9_$]{0,79}$/.test(callback)) {
    return json_({ok: false, error: 'A valid callback is required.'});
  }
  let payload;
  try {
    const sheet = getResponsesSheet_();
    payload = {ok: true, ...totals_(sheet)};
    const token = String(params.token || '');
    if (validToken_(token)) payload.recorded = tokenExists_(sheet, token);
  } catch (err) {
    payload = {ok: false, error: 'Results unavailable.'};
  }
  return ContentService.createTextOutput(callback + '(' + JSON.stringify(payload) + ');')
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

/**
 * POST x-www-form-urlencoded fields choice and token.
 * The token is randomly generated in the browser and is not an identity.
 * Repeating the same token cannot record a second vote.
 */
function doPost(e) {
  const params = e && e.parameter || {};
  const choice = String(params.choice || '');
  const token = String(params.token || '');
  if (!OPTIONS.includes(choice) || !validToken_(token)) {
    return json_({ok: false, error: 'Invalid prediction.'});
  }

  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    const sheet = getResponsesSheet_();
    if (!tokenExists_(sheet, token)) {
      sheet.appendRow([new Date(), choice, token]);
      SpreadsheetApp.flush();
    }
    return json_({ok: true});
  } catch (err) {
    return json_({ok: false, error: 'Unable to save prediction.'});
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}
