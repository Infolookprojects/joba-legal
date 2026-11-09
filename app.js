/**
 * Joba Legal & Trust Portal
 * Clean, Minimalist Client-Side Controller
 * Fetches real-time legal documents from Firestore REST API (Admin Panel Sync)
 * with instant fallback to pre-bundled Default Legal Data.
 */

// Application State
let currentLang = localStorage.getItem('joba_legal_lang') || 'bn'; // 'bn' | 'en'
let currentSection = 'privacy'; // 'privacy' | 'terms' | 'deletion'

const liveData = {
  privacyPolicy: null,
  termsConditions: null,
};

// UI Text Dictionary
const UI_TEXT = {
  bn: {
    navPrivacy: 'গোপনীয়তা নীতি',
    navTerms: 'নিয়ম ও শর্তাবলী',
    navDeletion: 'অ্যাকাউন্ট ডিলিট',
    langToggle: 'English',
    titlePrivacy: 'গোপনীয়তা নীতি (Privacy Policy)',
    titleTerms: 'নিয়ম ও শর্তাবলী (Terms & Conditions)',
    titleDeletion: 'অ্যাকাউন্ট ও ডেটা ডিলিট (Data Deletion)',
    updatedPrefix: 'সর্বশেষ আপডেট:',
    appScope: 'Joba Mobile Application',
    footerCopy: '© ২০২৬ Joba. সর্বস্বত্ব সংরক্ষিত। উইমেনস পিরিয়ড অ্যান্ড হেলথ ট্র্যাকার।',
    delLead: 'গুগল প্লে স্টোর ডেটা সুরক্ষা ও গোপনীয়তা নীতি অনুযায়ী আপনার যেকোনো সময় সমস্ত ব্যক্তিগত ও স্বাস্থ্য ডেটা মুছে ফেলার পূর্ণ অধিকার রয়েছে।',
    delInAppHeading: 'অ্যাপ থেকে সরাসরি ডিলিট করার নিয়ম',
    step1Title: '১. Joba অ্যাপ ওপেন করুন',
    step1Desc: 'আপনার ডিভাইসে Joba অ্যাপটি চালু করুন।',
    step2Title: '২. More ট্যাবে যান',
    step2Desc: 'নিচের মেনু বার থেকে ডানের "More (আরও)" অপশনে ট্যাপ করুন।',
    step3Title: '৩. Delete Account সিলেক্ট করুন',
    step3Desc: '"অ্যাকাউন্ট মুছুন (Delete Account)" অপশনটিতে চাপুন।',
    step4Title: '৪. নিশ্চিত করুন',
    step4Desc: 'নিশ্চিত করলে সাথে সাথে সার্ভার ও ফোন থেকে সমস্ত রেকর্ড মুছে যাবে।',
    delWhatTitle: 'অ্যাকাউন্ট ডিলিট করলে যা যা মুছে যায়',
    delReqTitle: 'ফোন বা অ্যাপ ছাড়া ডেটা মুছে ফেলার অনুরোধ',
    delReqDesc: 'অ্যাপটি আনইনস্টল করে থাকলে নিচের বাটনে ক্লিক করে আমাদের সাপোর্ট টিমের কাছে ইমেইল পাঠান। ৪৮ ঘণ্টার মধ্যে সমস্ত রেকর্ড মুছে দিয়ে নিশ্চিত করা হবে।',
    delReqBtn: 'ডেটা ডিলিটের অনুরোধ পাঠান',
    deletedItems: [
      'আপনার নাম, ইমেইল এবং সাইন-ইন সংক্রান্ত সমস্ত প্রমাণক',
      'পিরিয়ড শুরু/শেষের তারিখ, সাইকেল হিস্ট্রি এবং ওভুলেশন লগ',
      'শারীরিক লক্ষণ, মুড, ফ্লো এবং দৈনিক সেলফ-কেয়ার ট্র্যাকিং রেকর্ড',
      'ডিজিজ চেকআপ (PCOS, এন্ডোমেট্রিওসিস) স্ব-মূল্যায়ন স্কোর ও রিপোর্ট',
      'ওষুধ ও পিলস রিমাইন্ডার এবং স্থানীয় ব্যাকআপ ডেটাবেস'
    ]
  },
  en: {
    navPrivacy: 'Privacy Policy',
    navTerms: 'Terms of Service',
    navDeletion: 'Data Deletion',
    langToggle: 'বাংলা',
    titlePrivacy: 'Privacy Policy',
    titleTerms: 'Terms & Conditions',
    titleDeletion: 'Account & Data Deletion',
    updatedPrefix: 'Last Updated:',
    appScope: 'Joba Mobile Application',
    footerCopy: '© 2026 Joba. All rights reserved. Women’s Health & Cycle Tracker.',
    delLead: 'In strict compliance with Google Play Data Safety policies, you retain uninhibited sovereignty to purge your account and personal records at any time.',
    delInAppHeading: 'How to Delete Directly from the Joba App',
    step1Title: '1. Open Joba App',
    step1Desc: 'Launch the Joba application on your mobile device.',
    step2Title: '2. Go to More Tab',
    step2Desc: 'Tap the "More" option located on the bottom navigation bar.',
    step3Title: '3. Tap Delete Account',
    step3Desc: 'Select "Delete Account" under account management.',
    step4Title: '4. Confirm Permanent Deletion',
    step4Desc: 'Confirm the action to irrevocably purge all local and cloud data.',
    delWhatTitle: 'What Data Is Purged Upon Account Deletion?',
    delReqTitle: 'Need Deletion Without the Mobile App?',
    delReqDesc: 'If you have uninstalled the app or lost access to your device, you can submit an off-app data deletion request. We will permanently purge your records within 48 hours.',
    delReqBtn: 'Submit Deletion Request via Email',
    deletedItems: [
      'User profile, credentials, and authentication records',
      'Menstrual cycle logs, ovulation predictions, and period durations',
      'Physical symptoms, emotional logs, cervical discharge records',
      'Clinical triage self-screening scores (PCOS, Endometriosis)',
      'Medication reminders, custom note cards, and all cloud backups'
    ]
  }
};

// Lifecycle
document.addEventListener('DOMContentLoaded', () => {
  setupHashRouting();
  setupLanguageToggle();
  renderCurrentView();
  fetchLiveLegalDocuments();
});

// Navigation Handling
function setupHashRouting() {
  const hash = window.location.hash.toLowerCase().replace('#', '');
  if (hash === 'terms' || hash === 'terms_conditions') {
    currentSection = 'terms';
  } else if (hash === 'deletion' || hash === 'delete' || hash === 'delete-account') {
    currentSection = 'deletion';
  } else {
    currentSection = 'privacy';
  }

  window.addEventListener('hashchange', () => {
    const newHash = window.location.hash.toLowerCase().replace('#', '');
    if (newHash === 'terms' || newHash === 'terms_conditions') {
      navigateTo('terms', null, false);
    } else if (newHash === 'deletion' || newHash === 'delete' || newHash === 'delete-account') {
      navigateTo('deletion', null, false);
    } else {
      navigateTo('privacy', null, false);
    }
  });
}

function navigateTo(section, event, updateHash = true) {
  if (event) event.preventDefault();
  currentSection = section;

  if (updateHash) {
    window.location.hash = section;
  }

  // Update nav links active state
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.nav === section);
  });

  // Update content panels
  document.querySelectorAll('.content-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `panel-${section}`);
  });

  renderCurrentView();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Language Switcher
function setupLanguageToggle() {
  const langBtn = document.getElementById('lang-toggle-btn');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      currentLang = currentLang === 'bn' ? 'en' : 'bn';
      localStorage.setItem('joba_legal_lang', currentLang);
      renderCurrentView();
    });
  }
}

// Render Engine
function renderCurrentView() {
  const ui = UI_TEXT[currentLang];
  const isBn = currentLang === 'bn';

  // Navigation text
  setText('nav-text-privacy', ui.navPrivacy);
  setText('nav-text-terms', ui.navTerms);
  setText('nav-text-deletion', ui.navDeletion);
  setText('lang-toggle-text', ui.langToggle);
  setText('ui-footer-copy', ui.footerCopy);

  // Active Nav Link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.nav === currentSection);
  });

  // Active Panel
  document.querySelectorAll('.content-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `panel-${currentSection}`);
  });

  // Page Header Details
  if (currentSection === 'privacy') {
    setText('page-title', ui.titlePrivacy);
    renderLegalDoc('privacyPolicy', 'privacy-content');
  } else if (currentSection === 'terms') {
    setText('page-title', ui.titleTerms);
    renderLegalDoc('termsConditions', 'terms-content');
  } else if (currentSection === 'deletion') {
    setText('page-title', ui.titleDeletion);
    setText('page-meta-updated', `${ui.updatedPrefix} 2026`);
    setText('page-meta-app', ui.appScope);
    renderDeletionView();
  }
}

function renderLegalDoc(key, contentElId) {
  const ui = UI_TEXT[currentLang];
  const isBn = currentLang === 'bn';
  const data = liveData[key] || DEFAULT_LEGAL[key];

  const content = isBn ? data.contentBn : data.contentEn;
  const dateStr = formatDate(data.updatedAt, isBn);

  setText('page-meta-updated', `${ui.updatedPrefix} ${dateStr}`);
  setText('page-meta-app', ui.appScope);

  const container = document.getElementById(contentElId);
  if (container) {
    if (typeof marked !== 'undefined') {
      container.innerHTML = marked.parse(content);
    } else {
      container.innerText = content;
    }
  }
}

function renderDeletionView() {
  const ui = UI_TEXT[currentLang];

  setText('ui-del-lead', ui.delLead);
  setText('ui-del-inapp-heading', ui.delInAppHeading);

  setText('step1-title', ui.step1Title);
  setText('step1-desc', ui.step1Desc);
  setText('step2-title', ui.step2Title);
  setText('step2-desc', ui.step2Desc);
  setText('step3-title', ui.step3Title);
  setText('step3-desc', ui.step3Desc);
  setText('step4-title', ui.step4Title);
  setText('step4-desc', ui.step4Desc);

  setText('ui-del-what-title', ui.delWhatTitle);
  setText('ui-del-req-title', ui.delReqTitle);
  setText('ui-del-req-desc', ui.delReqDesc);

  const reqBtn = document.getElementById('ui-del-req-btn');
  if (reqBtn) {
    const span = reqBtn.querySelector('span');
    if (span) span.textContent = ui.delReqBtn;
  }

  const listEl = document.getElementById('deletion-items-list');
  if (listEl) {
    listEl.innerHTML = ui.deletedItems.map(item => `<li>${item}</li>`).join('');
  }
}

// Live Sync from Firestore REST
async function fetchLiveLegalDocuments() {
  const BASE_URL = 'https://firestore.googleapis.com/v1/projects/joba-a913b/databases/(default)/documents/app_config';

  try {
    const [privacyRes, termsRes] = await Promise.all([
      fetch(`${BASE_URL}/privacy_policy`).catch(() => null),
      fetch(`${BASE_URL}/terms_conditions`).catch(() => null)
    ]);

    if (privacyRes && privacyRes.ok) {
      const json = await privacyRes.json();
      liveData.privacyPolicy = parseFirestoreDoc(json, 'privacyPolicy');
    }

    if (termsRes && termsRes.ok) {
      const json = await termsRes.json();
      liveData.termsConditions = parseFirestoreDoc(json, 'termsConditions');
    }

    renderCurrentView();
  } catch (_) {
    // Fail silently — pre-bundled fallback is active
  }
}

function parseFirestoreDoc(doc, fallbackKey) {
  const fields = doc.fields || {};
  const fallback = DEFAULT_LEGAL[fallbackKey];

  return {
    titleBn: fields.titleBn?.stringValue || fallback.titleBn,
    titleEn: fields.titleEn?.stringValue || fallback.titleEn,
    contentBn: fields.contentBn?.stringValue || fallback.contentBn,
    contentEn: fields.contentEn?.stringValue || fallback.contentEn,
    version: fields.version?.stringValue || fallback.version,
    updatedAt: fields.updatedAt?.timestampValue || fallback.updatedAt,
  };
}

// Helpers
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function formatDate(isoStr, isBn) {
  try {
    const d = new Date(isoStr);
    if (isNaN(d.getTime())) return isoStr;

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return isBn ? d.toLocaleDateString('bn-BD', options) : d.toLocaleDateString('en-US', options);
  } catch (_) {
    return isoStr;
  }
}
