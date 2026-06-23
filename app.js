/* XPEL Signature Generator — application logic */
/* Requires assets.js to be loaded first       */

const state = {
  name: 'Enter Your Name',
  title: 'Enter Your Title',
  phone: '+1 234 567 8910',
  email: 'youremail@xpel.com',
  website: 'xpel.com',
  mode: 'dark'
};

/* ─── Wizard ─────────────────────────────────────────────────────── */
let currentPage = 1;

const $ = id => document.getElementById(id);
const previewFrame = $('preview-frame');
const toast = $('toast');

/* Set header logo from embedded asset */
$('header-logo').src = ASSETS.logoLight;

function showPage(n) {
  n = Math.max(1, Math.min(3, n));
  currentPage = n;

  document.querySelectorAll('.page').forEach((p, i) => {
    p.classList.toggle('active', i + 1 === n);
  });

  document.querySelectorAll('.step').forEach((s, i) => {
    const sn = i + 1;
    s.classList.toggle('active', sn === n);
    s.classList.toggle('done', sn < n);
  });

  if (n >= 2) render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* Allow clicking completed steps */
document.querySelectorAll('.step').forEach(s => {
  const go = () => {
    const t = parseInt(s.dataset.step, 10);
    if (t < currentPage) showPage(t);
  };
  s.addEventListener('click', go);
  s.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') go(); });
});

$('next-1').addEventListener('click', () => showPage(2));
$('back-2').addEventListener('click', () => showPage(1));
$('next-2').addEventListener('click', () => showPage(3));
$('back-3').addEventListener('click', () => showPage(2));

/* ─── Utilities ─────────────────────────────────────────────────── */
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
  })[c]);
}

function telHref(phone) {
  return 'tel:' + String(phone || '').replace(/[^\d+]/g, '');
}

function urlHref(url) {
  url = String(url || '').trim();
  if (!url) return '#';
  if (/^https?:\/\//i.test(url)) return url;
  return 'https://' + url;
}

function generateSignature(s) {
  const isDark = s.mode === 'dark';
  const bg           = isDark ? '#141213' : '#FFFFFD';
  const nameColor    = isDark ? '#ffffff' : '#2d2d2d';
  const titleColor   = isDark ? '#a1a1a1' : '#2d2d2d';
  const contactColor = isDark ? '#ffffff' : '#2d2d2d';
  const dividerColor = isDark ? '#5a5a5a' : '#bcbcbc';
  const logo = isDark ? ASSETS.logoLight : ASSETS.logoDark;
  const divider = isDark ? ASSETS.dividerDark : ASSETS.dividerLight;

  const name    = escapeHtml(s.name);
  const title   = escapeHtml(s.title.toUpperCase());
  const phone   = escapeHtml(s.phone);
  const email   = escapeHtml(s.email);
  const website = escapeHtml(s.website);

  // Phone is optional — only emit the line when there's a value
  const hasPhone = (s.phone || '').trim().length > 0;
  const phoneLine = hasPhone
    ? `<p style="margin:0 0 5px 0;padding:0;font-size:13px;color:${contactColor};font-family:Helvetica,Arial,sans-serif;line-height:1.4;"><a href="${telHref(s.phone)}" style="color:${contactColor};text-decoration:none;">${phone}</a></p>`
    : '';

  return `<table cellpadding="0" cellspacing="0" border="0" width="600" style="border-collapse:collapse;background-color:${bg};font-family:Helvetica,Arial,sans-serif;width:600px;table-layout:fixed;">
  <tr>
    <td width="30" style="padding:0;width:30px;font-size:0;line-height:0;">&nbsp;</td>
    <td width="145" valign="middle" style="padding:38px 0;width:145px;font-size:0;line-height:0;">
      <img src="${logo}" width="145" alt="XPEL" style="display:block;border:0;outline:none;text-decoration:none;width:145px;height:auto;">
    </td>
    <td width="30" style="padding:0;width:30px;font-size:0;line-height:0;">&nbsp;</td>
    <td width="1" valign="middle" align="center" style="padding:0;width:1px;font-size:0;line-height:0;mso-line-height-rule:exactly;">
      <table cellpadding="0" cellspacing="0" border="0" align="center" style="border-collapse:collapse;">
        <tr>
          <td height="105" style="height:105px;width:1px;padding:0;font-size:0;line-height:0;mso-line-height-rule:exactly;">
            <img src="${divider}" width="1" height="105" alt="" border="0" style="display:block;width:1px;height:105px;border:0;outline:none;text-decoration:none;">
          </td>
        </tr>
      </table>
    </td>
    <td width="30" style="padding:0;width:30px;font-size:0;line-height:0;">&nbsp;</td>
    <td width="239" valign="middle" style="padding:38px 0;width:239px;font-family:Helvetica,Arial,sans-serif;">
      <p style="margin:0 0 6px 0;padding:0;font-size:32px;font-weight:700;color:${nameColor};line-height:1.1;font-family:Helvetica,Arial,sans-serif;white-space:nowrap;">${name}</p>
      <p style="margin:0 0 22px 0;padding:0;font-size:11px;color:${titleColor};font-weight:400;font-family:Helvetica,Arial,sans-serif;white-space:nowrap;">${title}</p>
      ${phoneLine}
      <p style="margin:0 0 5px 0;padding:0;font-size:13px;color:${contactColor};font-family:Helvetica,Arial,sans-serif;line-height:1.4;"><a href="mailto:${email}" style="color:${contactColor};text-decoration:none;">${email}</a></p>
      <p style="margin:0;padding:0;font-size:13px;color:${contactColor};font-family:Helvetica,Arial,sans-serif;line-height:1.4;"><a href="${urlHref(s.website)}" style="color:${contactColor};text-decoration:none;">${website}</a></p>
    </td>
    <td width="125" valign="bottom" align="right" style="padding:0;width:125px;font-size:0;line-height:0;">
      <img src="${ASSETS.diamonds}" width="125" alt="" style="display:block;border:0;outline:none;text-decoration:none;width:125px;height:auto;">
    </td>
  </tr>
</table>
<table cellpadding="0" cellspacing="0" border="0" width="600" style="border-collapse:collapse;width:600px;font-family:Helvetica,Arial,sans-serif;background-color:#ffffff;">
  <tr style="background-color:#ffffff;">
    <td bgcolor="#ffffff" style="padding:24px 0 0 0;font-size:10px;line-height:1.5;color:#000000;font-family:Helvetica,Arial,sans-serif;background-color:#ffffff;mso-line-height-rule:exactly;">
      Notice from XPEL Inc: This message may contain information that is proprietary, confidential, and not to be disclosed. It is intended for use only by the person to whom it is addressed. If you have received this in error, please do not forward or use this information and notify the sender immediately. Neither this information block nor the typed name of the sender constitutes an electronic signature unless expressly stated otherwise.
    </td>
  </tr>
</table>`;
}


function renderPreview(html, mode) {
  const cardBg = mode === 'dark' ? '#141213' : '#FFFFFD';
  // Two-tone background: top portion matches the card color so it sits
  // seamlessly; white below where the disclaimer renders. We measure the
  // actual card height after write so the transition is correct even when
  // optional rows (e.g. phone) are omitted.
  const doc = previewFrame.contentDocument;
  doc.open();
  doc.write(`<!doctype html><html><head><meta charset="utf-8"><style>
    html,body{margin:0;padding:0;}
    body{
      min-width:600px;
      padding:0;
      background:${cardBg};
      font-family:Helvetica,Arial,sans-serif;
    }
    body>table{margin:0 auto;}
    a{color:inherit;text-decoration:none;}
  </style></head><body>${html}</body></html>`);
  doc.close();

  // Size iframe to its content, and apply the two-tone gradient based on
  // the actual card height (which varies if the phone line is omitted).
  requestAnimationFrame(() => {
    try {
      const tables = doc.body.getElementsByTagName('table');
      const cardHeight = tables.length ? Math.round(tables[0].getBoundingClientRect().height) : 217;
      doc.body.style.background = `linear-gradient(to bottom, ${cardBg} 0, ${cardBg} ${cardHeight}px, #ffffff ${cardHeight}px, #ffffff 100%)`;
      const h = doc.body.scrollHeight || 240;
      previewFrame.style.height = h + 'px';
    } catch (e) { previewFrame.style.height = '260px'; }
  });
}


function render() {
  const html = generateSignature(state);
  renderPreview(html, state.mode);
}

/* ─── Toast ─────────────────────────────────────────────────────── */
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 4200);
}

/* ─── Form fields ────────────────────────────────────────────────── */
document.querySelectorAll('[data-field]').forEach(input => {
  const key = input.dataset.field;
  input.value = state[key] ?? '';
  input.addEventListener('input', () => {
    state[key] = input.value;
    if (currentPage >= 2) render();
  });
});

/* ─── Mode toggle ────────────────────────────────────────────────── */
const modeBtns = document.querySelectorAll('.mode-btn');
modeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    state.mode = btn.dataset.mode;
    modeBtns.forEach(b => {
      b.classList.toggle('active', b === btn);
      b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
    });
    render();
  });
  btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
});

function copyRichViaExecCommand(html) {
  // Render the HTML into a hidden contenteditable, select it, run copy.
  // This older API path works from file:// origins and enterprise policies
  // that block the newer navigator.clipboard.write().
  const container = document.createElement('div');
  container.setAttribute('contenteditable', 'true');
  container.style.cssText = 'position:fixed;left:-99999px;top:0;opacity:0;pointer-events:none;width:600px;';
  container.innerHTML = html;
  document.body.appendChild(container);

  const range = document.createRange();
  range.selectNodeContents(container);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);

  let ok = false;
  try { ok = document.execCommand('copy'); } catch (_) { ok = false; }

  sel.removeAllRanges();
  document.body.removeChild(container);
  return ok;
}


function openManualCopyTab(html) {
  // Last resort: open a new tab with the rendered signature so the user
  // can select-all and copy from there using the OS clipboard.
  const doc = `<!doctype html><html><head><meta charset="utf-8"><title>XPEL Signature — manual copy</title>
<style>
  body{margin:0;padding:32px;background:#eee;font-family:Helvetica,Arial,sans-serif;color:#1a1a1a;}
  .notice{background:#FFB81C;padding:14px 18px;border-radius:6px;margin-bottom:24px;max-width:600px;font-size:14px;line-height:1.5;}
  .notice kbd{background:#1a1a1a;color:#fff;padding:2px 6px;border-radius:3px;font:12px ui-monospace,Menlo,Consolas,monospace;}
  .sig{max-width:600px;}
</style>
</head><body>
<div class="notice"><strong>Manual copy:</strong> click into the signature below, press <kbd>Ctrl</kbd>+<kbd>A</kbd> (or <kbd>⌘</kbd>+<kbd>A</kbd> on Mac) to select it, then <kbd>Ctrl</kbd>+<kbd>C</kbd> (or <kbd>⌘</kbd>+<kbd>C</kbd>) to copy. Paste into your Outlook signature editor.</div>
<div class="sig">${html}</div>
</body></html>`;
  try {
    const w = window.open('', '_blank');
    if (!w) return false;
    w.document.open();
    w.document.write(doc);
    w.document.close();
    return true;
  } catch (_) { return false; }
}


$('copy-rich').addEventListener('click', async () => {
  const html = generateSignature(state);

  if (window.ClipboardItem && navigator.clipboard && navigator.clipboard.write) {
    try {
      await navigator.clipboard.write([new ClipboardItem({
        'text/html':  new Blob([html], { type: 'text/html' }),
        'text/plain': new Blob([html], { type: 'text/plain' }),
      })]);
      showToast('Copied — paste into your Outlook signature editor');
      return;
    } catch (_) { /* fall through */ }
  }

  if (copyRichViaExecCommand(html)) {
    showToast('Copied — paste into your Outlook signature editor');
    return;
  }

  if (openManualCopyTab(html)) {
    showToast('Opened in a new tab — select and copy the signature from there');
    return;
  }

  showToast('Copy blocked — click the preview, Ctrl+A, Ctrl+C, then paste into Outlook');
});

/* ─── Initial render ─────────────────────────────────────────────── */
window.addEventListener('load', () => { render(); });
render();
