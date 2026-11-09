# Joba - Official Legal, Privacy & Data Trust Portal 🌸

Official public web portal for **Joba (Women's Period, Fertility & Health Companion)** hosting the Privacy Policy, Terms & Conditions, and Account Deletion requests in compliance with Google Play Store & Apple App Store policies.

---

## ✨ Features

- **🌸 Joba Mobile App Aesthetic:** Matches the app's signature warm rose `#E94789` branding, clean typography, responsive layout, and mobile-first experience.
- **🔄 Live Admin Panel Sync:** Automatically fetches real-time updates from Firebase Firestore (`app_config/privacy_policy` and `app_config/terms_conditions`) whenever the legal text is updated in the Joba Admin Panel.
- **⚡ Zero-Latency Fallback:** Pre-hydrated with comprehensive default legal text so the page never renders blank, even offline or on slow networks.
- **🌐 Dual Language Support:** Instant toggle between **বাংলা (Bengali)** and **English**.
- **🔒 Google Play Data Safety & Account Deletion Compliant:** Provides step-by-step in-app deletion instructions, data purging guarantees, and a direct off-app email request channel.
- **🛡️ Public Git Safe:** Contains zero secrets, zero private keys, and zero administrative credentials.

---

## 🚀 How to Publish on GitHub Pages (in 2 Minutes)

1. **Create a New Repository on GitHub:**
   - Go to [GitHub.com](https://github.com/new).
   - Repository name: e.g. `joba-legal` (or `joba-privacy`).
   - Visibility: **Public**.
   - Do not check "Add README" (we already have one).

2. **Push this directory to GitHub:**
   ```bash
   cd "d:\Skill Development\professional_project\joba\joba-legal-web"
   git init
   git add .
   git commit -m "feat: initial release of Joba legal and trust portal"
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - In your GitHub repository, click **Settings** (⚙️).
   - On the left sidebar, click **Pages**.
   - Under **Build and deployment** > **Source**: Select `Deploy from a branch`.
   - Branch: `main` / `/(root)`.
   - Click **Save**.

4. **Your Live URLs for Google Play Console:**
   - **Privacy Policy URL:** `https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPO_NAME>/#privacy`
   - **Terms & Conditions URL:** `https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPO_NAME>/#terms`
   - **Account & Data Deletion URL:** `https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPO_NAME>/#deletion`

