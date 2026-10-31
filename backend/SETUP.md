# First Ace Prediction Pilot

This backend stores anonymous predictions in a **private** Google Sheet. It is independent of Collatz Laboratory.

**Spreadsheet:** https://docs.google.com/spreadsheets/d/13hsx5r3dqAZEd_EBS7zQ6KyvnBnZOvi-cZA8mwAhF84/edit

## One-time owner setup

1. Open the spreadsheet link above.
2. Choose **Extensions → Apps Script**.
3. Replace all starter code in `Code.gs` with the complete contents of [Code.gs](./Code.gs). Save the project as **First Ace Prediction Pilot**.
4. Choose **Deploy → New deployment → Web app**.
5. Set **Execute as: Me** and **Who has access: Anyone** (including anonymous visitors).
6. Deploy, authorize your Google account if requested, and copy the URL ending in **/exec**.
7. Provide that URL to ChatGPT, so the prediction interface can be connected and tested on the **First-Ace** GitHub Pages site.

If your school account does not offer **Anyone**, a Workspace administrator may restrict anonymous Apps Script web apps. Do **not** make the spreadsheet itself publicly editable or viewable as a workaround.

## What is stored

The **Responses** tab records only a submission timestamp, a prediction code and a randomly generated token for duplicate suppression. No names, emails, student IDs, school IDs, IPs, or browser information are intentionally collected by the script. Google may maintain its own service logs.

The **Summary** tab computes aggregate totals for Ace of Spades, Two of Clubs, Equally likely, and Not sure. The dataset begins with zero votes.

## API contract for the website

- `GET /exec?callback=someJsFunction` responds with JavaScript calling that function with `{ok:true,total,counts:{ace_spades,two_clubs,equally_likely,not_sure}}`. Optional `&token=RANDOMTOKEN` adds `recorded: true/false`.
- `POST /exec` with `Content-Type: application/x-www-form-urlencoded` accepts `choice` (one of the four codes) and `token` (24–80 ASCII letters, digits, `_`, `-`). It returns JSON. On GitHub Pages a `fetch` POST can use `mode: 'no-cors'`, then confirm submission through the JSONP GET endpoint.
- Duplicated tokens are ignored. A random browser token can be saved to localStorage so accidental resubmissions are not counted.

This is a pilot and **not** a tamper-proof survey. Determined visitors can submit additional votes with different tokens; Apps Script quotas and your organization's deployment policies apply. For shared student devices, provide a deliberate reset facility or use a unique browser session per participant. Keep results hidden until a visitor makes their own prediction.

Changes to the backend require updating/redeploying a new version via **Deploy → Manage deployments**.
