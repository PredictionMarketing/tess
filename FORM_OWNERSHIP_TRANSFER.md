# Tess Form Ownership Transfer
*Reference doc — do this when Tess is ready to fully own the form pipeline*

## Current State (Working)
- Form on `v2.html` submits to **Fran's Google Apps Script**, which logs to **Fran's Google Sheet**
- Script URL in `v2.html` line ~655: `const GOOGLE_SCRIPT_URL = '...'`
- This works fine for now (~50 applicants, manual review is fine)

---

## Option A: Google Apps Script (Tess's Sheet)
**Prerequisite:** Tess (or her workspace admin) must enable Apps Script API deployment.

1. **Enable in Tess's Google Workspace:**  
   Admin Console → Apps → Google Workspace → Drive & Docs → enable "Google Apps Script"  
   OR Tess goes to [myaccount.google.com](https://myaccount.google.com) → Security → enable API access

2. **Open Apps Script from inside Tess's sheet:**  
   Tess's Google Sheet → **Extensions → Apps Script**

3. **Paste the script:**  
   Delete everything in `Code.gs` → paste contents of [`google-apps-script.js`](./google-apps-script.js) → Save

4. **Deploy:**  
   Deploy → New Deployment → Type: **Web App** → Execute as: **Me** → Access: **Anyone** → Deploy  
   → Copy the new URL (looks like `https://script.google.com/macros/s/XXXXX/exec`)

5. **Update `v2.html`:**  
   Swap the URL on line ~655: `const GOOGLE_SCRIPT_URL = 'PASTE_NEW_URL_HERE';`  
   → Commit & push to GitHub → Vercel redeploys automatically

---

## Option B: Formspree (Recommended — simpler, no Google restrictions)

1. **Tess signs up** at [formspree.io](https://formspree.io) with her email
2. Click **+ New Form** → name it "Dance Team Applications"
3. Copy the form URL: `https://formspree.io/f/xxxxxxxx`
4. **Update `v2.html`:** swap `GOOGLE_SCRIPT_URL` value with the Formspree URL
5. In Formspree dashboard → set notification email to `tess@levelupdance.io`
6. Commit & push → done

**Free plan:** 50 submissions/month, email notifications per submission ✅

---

## Notes
- The fallback modal (copy/download/Gmail) in `v2.html` stays as a backup regardless of which option is used
- After swapping the URL, test with a dummy submission to confirm data arrives
