/**
 * Bluestar Care & Support Ltd - Interactive Core Scripts
 * Lightweight, zero dependencies, fast execution
 */

// ============================================================================
// CONFIGURATION: Google Sheets Enquiries Webhook
// Paste your Google Apps Script Web App URL here after completing Phase 2.
// If left blank or empty string, form gracefully shows confirmation without error.
// ============================================================================
const GOOGLE_SHEETS_WEBHOOK_URL = ''; 

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const closeDrawer = document.getElementById('closeDrawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeDrawer && mobileDrawer) {
    closeDrawer.addEventListener('click', () => {
      mobileDrawer.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // 2. Sticky Header Scroll Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
      header?.style.setProperty('box-shadow', '0 4px 20px rgba(0, 0, 0, 0.08)');
    } else {
      header?.classList.remove('scrolled');
      header?.style.setProperty('box-shadow', 'none');
    }
  });

  // 3. Policy Filter & Search (Used in legal.html)
  const policySearch = document.getElementById('policySearch');
  const policyCards = document.querySelectorAll('.policy-card');
  const filterPills = document.querySelectorAll('.filter-pill');

  if (policySearch && policyCards.length > 0) {
    policySearch.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      policyCards.forEach(card => {
        const title = card.getAttribute('data-title')?.toLowerCase() || '';
        const category = card.getAttribute('data-category')?.toLowerCase() || '';
        if (title.includes(term) || category.includes(term)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });

    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const filter = pill.getAttribute('data-filter');
        
        policyCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 4. Contact & Application Form Submission Handler
  const contactForm = document.getElementById('bsContactForm');
  const formSuccess = document.getElementById('formSuccessMessage');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg style="animation: spin 1s linear infinite; width:18px; height:18px; display:inline-block; margin-right:6px; vertical-align:middle;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg> Sending message...
      `;

      // Extract form values
      const formData = {
        firstName: document.getElementById('firstName')?.value.trim() || '',
        lastName: document.getElementById('lastName')?.value.trim() || '',
        email: document.getElementById('email')?.value.trim() || '',
        phone: document.getElementById('phone')?.value.trim() || '',
        message: document.getElementById('message')?.value.trim() || '',
        submittedAt: new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' }),
        pageSource: window.location.pathname
      };

      try {
        // Send to Google Sheets webhook if configured
        if (GOOGLE_SHEETS_WEBHOOK_URL && GOOGLE_SHEETS_WEBHOOK_URL.startsWith('http')) {
          await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
            method: 'POST',
            mode: 'no-cors', // Standard for Google Apps Script Web Apps
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });
        } else {
          // Fallback simulation delay when testing locally
          await new Promise(resolve => setTimeout(resolve, 800));
        }

        // Reset form & show success UI
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();
        
        if (formSuccess) {
          formSuccess.style.display = 'block';
          formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          setTimeout(() => {
            formSuccess.style.display = 'none';
          }, 10000);
        } else {
          alert("Thank you! Your enquiry has been received. A Bluestar Care representative will contact you shortly.");
        }
      } catch (err) {
        console.error("Form submission error:", err);
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        // Even if network blips, notify user and provide phone backup
        alert("Thank you! If this is urgent, please call our Crawley office directly on 01293 300009.");
      }
    });
  }
});
