/**
 * Joba Legal & Trust Portal
 * Dynamic Client-Side Controller
 * Fetches real-time legal documents from Firestore REST API (Admin Panel Sync)
 * with instant zero-latency fallback to pre-bundled Default Legal Data.
 */

// State
let currentLang = localStorage.getItem('joba_legal_lang') || 'bn'; // 'bn' | 'en'
let activeTab = 'privacy'; // 'privacy' | 'terms' | 'deletion'

const liveData = {
  privacyPolicy: null,
  termsConditions: null,
};

// UI Translations
const UI_TEXT = {
  bn: {
    heroBadge: 'অফিসিয়াল পলিসি ও ডেটা সুরক্ষা পোর্টাল',
    heroTitle: 'আপনার স্বাস্থ্য ও ব্যক্তিগত তথ্যের সর্বোচ্চ নিরাপত্তা',
    heroSubtitle: 'Joba অ্যাপে আপনার পিরিয়ড ও স্বাস্থ্য তথ্যের গোপনীয়তা আমাদের মূল অগ্রাধিকার। এখানে আমাদের সম্পূর্ণ নীতিমালা স্বচ্ছভাবে উপস্থাপন করা হলো।',
    tabPrivacy: 'গোপনীয়তা নীতি (Privacy Policy)',
    tabTerms: 'নিয়ম ও শর্তাবলী (Terms & Conditions)',
    tabDeletion: 'অ্যাকাউন্ট ও ডেটা ডিলিট (Data Deletion)',
    langToggle: 'English',
    versionLabel: 'সংস্করণ:',
    updatedLabel: 'সর্বশেষ আপডেট:',
    liveSync: 'লাইভ সিঙ্ক সক্রিয়',
    printBtn: 'প্রিন্ট করুন',
    footerCopy: '© ২০২৬ Joba. সর্বস্বত্ব সংরক্ষিত। উইমেনস পিরিয়ড অ্যান্ড হেলথ ট্র্যাকার।',
    deletionTitle: 'অ্যাকাউন্ট ও সংগৃহীত ডেটা মুছে ফেলার অনুরোধ',
    deletionSubtitle: 'গুগল প্লে স্টোর ডেটা সেফটি নীতি অনুযায়ী আপনার যেকোনো সময় সমস্ত ব্যক্তিগত ও স্বাস্থ্য ডেটা মুছে ফেলার পূর্ণ অধিকার রয়েছে।',
    inAppStepTitle: 'অ্যাপ থেকে সরাসরি ডিলিট করার নিয়ম',
    step1Title: '১. Joba অ্যাপ ওপেন করুন',
    step1Desc: 'আপনার ফোনের Joba অ্যাপটিতে প্রবেশ করুন।',
    step2Title: '২. More (আরও) ট্যাবে যান',
    step2Desc: 'নিচের নেভিগেশন বার থেকে একদম ডানের "More" অপশনে চাপুন।',
    step3Title: '৩. Delete Account সিলেক্ট করুন',
    step3Desc: '"অ্যাকাউন্ট মুছুন (Delete Account)" অপশনে ট্যাপ করুন।',
    step4Title: '৪. নিশ্চিত করে স্থায়ীভাবে মুছে ফেলুন',
    step4Desc: 'নিশ্চিতকরণ বাটনে চাপ দিলেই সাথে সাথে ক্লাউড ও ডিভাইস থেকে সমস্ত তথ্য মুছে যাবে।',
    webRequestTitle: 'ফোন বা অ্যাপ ছাড়াই ডেটা মোছার অনুরোধ পাঠাতে চান?',
    webRequestDesc: 'আপনি যদি অ্যাপটি আনইনস্টল করে থাকেন এবং ক্লাউড থেকে আপনার সমস্ত ব্যাকআপ ও রেকর্ড মুছে ফেলতে চান, তবে নিচের বাটনে ক্লিক করে আমাদের সাপোর্ট টিমের কাছে অনুরোধ পাঠান। আমরা ৪৮ ঘণ্টার মধ্যে সমস্ত রেকর্ড মুছে দিয়ে নিশ্চিত করব।',
    btnSendRequest: 'ইমেইলে ডেটা ডিলিটের অনুরোধ পাঠান',
    whatDeletedTitle: 'অ্যাকাউন্ট ডিলিট করলে কী কী মুছে যায়?',
    deletedItems: [
      'আপনার নাম, ইমেইল এবং সাইন-ইন সংক্রান্ত সমস্ত প্রমাণক',
      'পিরিয়ড শুরু/শেষের তারিখ, সাইকেল হিস্ট্রি এবং ওভুলেশন লগ',
      'শারীরিক লক্ষণ, মুড, ফ্লো এবং দৈনিক সেলফ-কেয়ার ট্র্যাকিং রেকর্ড',
      'ডিজিজ চেকআপ (PCOS, এন্ডোমেট্রিওসিস) স্ব-মূল্যায়ন স্কোর ও রিপোর্ট',
      'ওষুধ ও পিলস রিমাইন্ডার এবং স্থানীয় ব্যাকআপ ডেটাবেস'
    ]
  },
  en: {
    heroBadge: 'Official Policy & Trust Portal',
    heroTitle: 'Guaranteed Sanctity for Your Personal Health Data',
    heroSubtitle: 'At Joba, your intimate menstrual and reproductive health privacy is our highest priority. Explore our exhaustive, transparent legal standards.',
    tabPrivacy: 'Privacy Policy',
    tabTerms: 'Terms & Conditions',
    tabDeletion: 'Account & Data Deletion',
    langToggle: 'বাংলা',
    versionLabel: 'Version:',
    updatedLabel: 'Last Updated:',
    liveSync: 'Live Cloud Sync',
    printBtn: 'Print Policy',
    footerCopy: '© 2026 Joba. All rights reserved. Women’s Health & Cycle Tracker.',
    deletionTitle: 'Account & Personal Data Deletion Request',
    deletionSubtitle: 'In strict compliance with Google Play Data Safety policies, you retain uninhibited sovereignty to purge your account and records at any time.',
    inAppStepTitle: 'How to Delete Directly from the Joba App',
    step1Title: '1. Open Joba App',
    step1Desc: 'Launch the Joba application on your mobile device.',
    step2Title: '2. Go to More Tab',
    step2Desc: 'Tap the "More" tab located on the bottom navigation bar.',
    step3Title: '3. Tap Delete Account',
    step3Desc: 'Select "Delete Account" under account management.',
    step4Title: '4. Confirm Permanent Deletion',
    step4Desc: 'Confirm the action to irrevocably purge all local and cloud data.',
    webRequestTitle: 'Need Deletion Without the Mobile App?',
    webRequestDesc: 'If you have uninstalled the app or lost access to your device, you can submit an off-app data deletion request. Our compliance team will permanently purge your records within 48 hours.',
    btnSendRequest: 'Submit Deletion Request via Email',
    whatDeletedTitle: 'What Data Is Purged Upon Account Deletion?',
    deletedItems: [
      'User profile, credentials, and authentication records',
      'Menstrual cycle logs, ovulation predictions, and period durations',
      'Physical symptoms, emotional logs, cervical discharge records',
      'Clinical triage self-screening scores (PCOS, Endometriosis)',
      'Medication reminders, custom note cards, and all cloud backups'
    ]
  }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  setupHashRouting();
  setupLanguage();
  renderCurrentView();
  fetchLiveLegalDocuments();
});

// Hash Routing: #privacy, #terms, #deletion
function setupHashRouting() {
  const hash = window.location.hash.toLowerCase().replace('#', '');
  if (hash === 'terms' || hash === 'terms_conditions') {
    activeTab = 'terms';
  } else if (hash === 'deletion' || hash === 'delete' || hash === 'delete-account') {
    activeTab = 'deletion';
  } else {
    activeTab = 'privacy';
  }

  window.addEventListener('hashchange', () => {
    const newHash = window.location.hash.toLowerCase().replace('#', '');
    if (newHash === 'terms' || newHash === 'terms_conditions') {
      switchTab('terms', false);
    } else if (newHash === 'deletion' || newHash === 'delete' || newHash === 'delete-account') {
      switchTab('deletion', false);
    } else {
      switchTab('privacy', false);
    }
  });
}

function switchTab(tabName, updateHash = true) {
  activeTab = tabName;
  if (updateHash) {
    window.location.hash = tabName;
  }

  // Update tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });

  // Update panels
  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `panel-${tabName}`);
  });

  renderCurrentView();
  window.scrollTo({ top: 220, behavior: 'smooth' });
}

// Language Toggle
function setupLanguage() {
  const langBtn = document.getElementById('lang-toggle-btn');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      currentLang = currentLang === 'bn' ? 'en' : 'bn';
      localStorage.setItem('joba_legal_lang', currentLang);
      renderCurrentView();
    });
  }
}

// Render Content
function renderCurrentView() {
  const ui = UI_TEXT[currentLang];
  const isBn = currentLang === 'bn';

  // Update UI Elements
  setText('ui-hero-badge', ui.heroBadge);
  setText('ui-hero-title', ui.heroTitle);
  setText('ui-hero-subtitle', ui.heroSubtitle);
  setText('tab-label-privacy', ui.tabPrivacy);
  setText('tab-label-terms', ui.tabTerms);
  setText('tab-label-deletion', ui.tabDeletion);
  setText('lang-toggle-text', ui.langToggle);
  setText('ui-footer-copy', ui.footerCopy);

  // Active Tab Buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === activeTab);
  });

  // Active Panels
  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `panel-${activeTab}`);
  });

  // Render Document Content
  if (activeTab === 'privacy') {
    renderLegalDoc('privacyPolicy', 'privacy-content', 'privacy-version', 'privacy-updated');
  } else if (activeTab === 'terms') {
    renderLegalDoc('termsConditions', 'terms-content', 'terms-version', 'terms-updated');
  } else if (activeTab === 'deletion') {
    renderDeletionView();
  }
}

function renderLegalDoc(key, contentElId, versionElId, updatedElId) {
  const isBn = currentLang === 'bn';
  const data = liveData[key] || DEFAULT_LEGAL[key];

  const content = isBn ? data.contentBn : data.contentEn;
  const version = data.version || '1.0.0';
  const dateStr = formatDate(data.updatedAt, isBn);

  const container = document.getElementById(contentElId);
  if (container) {
    if (typeof marked !== 'undefined') {
      container.innerHTML = marked.parse(content);
    } else {
      container.innerText = content;
    }
  }

  setText(versionElId, `${UI_TEXT[currentLang].versionLabel} ${version}`);
  setText(updatedElId, `${UI_TEXT[currentLang].updatedLabel} ${dateStr}`);
}

function renderDeletionView() {
  const ui = UI_TEXT[currentLang];
  const isBn = currentLang === 'bn';

  setText('ui-del-title', ui.deletionTitle);
  setText('ui-del-subtitle', ui.deletionSubtitle);
  setText('ui-del-step-title', ui.inAppStepTitle);

  setText('step1-title', ui.step1Title);
  setText('step1-desc', ui.step1Desc);
  setText('step2-title', ui.step2Title);
  setText('step2-desc', ui.step2Desc);
  setText('step3-title', ui.step3Title);
  setText('step3-desc', ui.step3Desc);
  setText('step4-title', ui.step4Title);
  setText('step4-desc', ui.step4Desc);

  setText('ui-del-req-title', ui.webRequestTitle);
  setText('ui-del-req-desc', ui.webRequestDesc);
  setText('ui-del-req-btn', ui.btnSendRequest);
  setText('ui-del-what-title', ui.whatDeletedTitle);

  const listEl = document.getElementById('deletion-items-list');
  if (listEl) {
    listEl.innerHTML = ui.deletedItems.map(item => `<li>${item}</li>`).join('');
  }
}

// Fetch Real-time Firestore Documents (Admin Panel Live Sync)
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

    // Update view with live data
    renderCurrentView();
    console.log('✅ [Joba Legal] Synced with Firestore app_config successfully');
  } catch (err) {
    console.warn('⚡ [Joba Legal] Serving pre-bundled default legal documents:', err);
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
    if (isBn) {
      return d.toLocaleDateString('bn-BD', options);
    }
    return d.toLocaleDateString('en-US', options);
  } catch (_) {
    return isoStr;
  }
}
