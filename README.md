# Bluestar Care & Support Ltd — Non-WordPress Website

Modern, ultra-lightweight website built specifically for deployment on **Cloudflare Pages**.

## Features
- **Zero WordPress bloat**: Blazing fast load times, 100/100 Lighthouse performance.
- **7 Fully Responsive Pages**:
  - `index.html`: Modern Homepage with hero slider, about overview, 4 service cards, 12 daily activity checklist, trust badges.
  - `about.html`: Company story, holistic philosophy, vision, care team, and Real Living Wage accreditation.
  - `services.html`: 5 deep-linked homecare pillars (*Homecare, Live-in Care, Dementia Care, Respite Care, Complex Care*) + 12 daily living tasks.
  - `job-seekers.html`: Healthcare careers overview, training, Real Living Wage benefits, and recruitment stages.
  - `candidate-app.html`: Logezy-powered candidate mobile app showcase (shift alerts, timesheets, compliance, availability).
  - `contact.html`: Office address, phone, email, Google Maps embed, interactive contact & CV application form.
  - `legal.html`: Complete policy library with live instant search & category filters for 22 statutory PDF documents.
- **AI-Generated Custom Healthcare Imagery**: Warm, authentic high-resolution British care photos.
- **Official Brand Assets**: High-resolution vector logos, Real Living Wage badge, REC Member badge.

---

## 1. Local Testing
To run the website locally on your computer:

```bash
# In this directory:
python -m http.server 3000
```
Then open your browser at `http://localhost:3000`.

---

## 2. Deploying to Cloudflare Pages

### Method A: Direct Upload (No Git Required — 1 Minute)
1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. In the left sidebar, navigate to **Compute (Workers) > Workers & Pages**.
3. Click **Create Application** > choose the **Pages** tab.
4. Select **Upload assets**.
5. Give your project a name (e.g. `bluestar-caresupport`).
6. Drag and drop this entire `non-wordpress-site/` folder directly into the upload area.
7. Click **Deploy site**.
8. Your website is instantly live at `https://bluestar-caresupport.pages.dev` with free automatic SSL, HTTP/3, and global edge CDN caching!

### Method B: Git Integration (GitHub / GitLab)
1. Push this folder to a GitHub repository.
2. In Cloudflare Pages, click **Connect to Git** and choose the repository.
3. Configure build settings:
   - **Framework preset**: None
   - **Build command**: Leave empty (or `npm run build`)
   - **Build output directory**: `/` (or leave empty)
4. Click **Save and Deploy**. Future git commits will auto-deploy immediately.

### Custom Domain
To connect your live domain (`bluestar-caresupport.co.uk`):
1. In Cloudflare Pages, go to **Custom domains** tab.
2. Click **Set up a custom domain**.
3. Enter `bluestar-caresupport.co.uk` and follow the DNS verification instructions.
