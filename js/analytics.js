document.addEventListener('DOMContentLoaded', function () {
  if (typeof gtag !== 'function') return;

  // WhatsApp contact clicks. Matches any link to wa.me or whatsapp.com by
  // href, so it works for whichever WhatsApp buttons exist now or get added
  // later, without needing a specific class on every one.
  // NOTE: no WhatsApp links exist on the site yet (contact/index.html still
  // has a "Phone / WhatsApp: PLACEHOLDER" line) — this fires as soon as a
  // real wa.me / whatsapp.com link is added anywhere.
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href*="wa.me"], a[href*="whatsapp.com"]');
    if (link) {
      gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: link.href,
        page_path: window.location.pathname
      });
    }
  });

  // Bokun "Book Now" button clicks.
  // NOTE: the Bokun booking widget is not embedded on the site yet (see
  // README.md "Still to do"). The selector below is a best-effort guess at
  // common Bokun embed patterns (a data attribute, a class, or a link to
  // bokun.io / widget.bokun.io) and MUST be checked against the real widget
  // markup once it's added — open GA4 DebugView, click the actual button,
  // and confirm this fires. If Bokun renders its widget inside a
  // cross-origin <iframe> (common for embedded booking widgets), clicks
  // inside that iframe are invisible to this script entirely — this
  // listener would then only catch a wrapping link/button on our own page,
  // not the "Book Now" click inside the iframe itself. The postMessage
  // listener below is a starting point for that case, since Bokun (like
  // most iframe widgets) may post events to the parent window instead.
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-bokun-book], .bokun-book-now, a[href*="bokun.io"], a[href*="widget.bokun"]');
    if (btn) {
      gtag('event', 'bokun_book_now_click', {
        event_category: 'booking',
        event_label: btn.href || (btn.dataset && btn.dataset.bokunBook) || 'bokun_widget',
        page_path: window.location.pathname
      });
    }
  });

  // Best-effort catch for a Bokun iframe posting messages to the parent
  // window. The exact message format isn't confirmed here since the widget
  // isn't embedded yet — verify against real payloads once it is, and
  // narrow this to the specific event Bokun sends for a completed "Book
  // Now" click rather than every message from their origin.
  window.addEventListener('message', function (e) {
    if (!e.origin || e.origin.indexOf('bokun') === -1) return;
    gtag('event', 'bokun_widget_message', {
      event_category: 'booking',
      event_label: JSON.stringify(e.data).slice(0, 100)
    });
  });

  // Contact form submission (contact/index.html, <form id="contact-form">).
  // Fires on submit regardless of whether the form has a working backend
  // yet — see the HTML comment on that form about connecting it to
  // Formspree/Getform/Web3Forms before launch.
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function () {
      gtag('event', 'contact_form_submit', {
        event_category: 'lead',
        page_path: window.location.pathname
      });
    });
  }
});
