/**
 * Main JS - Navigation, Dark Mode, Image Modal, Collapsible, Copy
 */
(function () {
  'use strict';

  // ========== Dark Mode ==========
  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem('theme'); } catch (e) { /* ignore */ }

    if (saved === 'dark' || saved === 'light') {
      document.documentElement.setAttribute('data-theme', saved);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
  }

  // Apply theme before DOM ready to prevent flash
  initTheme();

  // ========== DOM Ready ==========
  document.addEventListener('DOMContentLoaded', function () {

    // --- Theme Toggle Button ---
    var themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
    }

    // --- Mobile Hamburger Menu ---
    var hamburger = document.getElementById('nav-hamburger');
    var navLinks = document.getElementById('nav-links');
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', function () {
        navLinks.classList.toggle('open');
        var expanded = navLinks.classList.contains('open');
        hamburger.setAttribute('aria-expanded', expanded);
      });

      // Close menu when clicking a link
      navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          navLinks.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
        });
      });

      // Close menu on outside click
      document.addEventListener('click', function (e) {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
          navLinks.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // --- Image Modal ---
    var modalOverlay = document.getElementById('image-modal');
    var modalImg = document.getElementById('image-modal-img');
    var modalClose = document.getElementById('image-modal-close');

    function openModal(src, alt) {
      if (!modalOverlay || !modalImg) return;
      modalImg.src = src;
      modalImg.alt = alt || '';
      modalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      if (!modalOverlay) return;
      modalOverlay.classList.remove('open');
      document.body.style.overflow = '';
      if (modalImg) modalImg.src = '';
    }

    // Attach click to all zoomable images
    document.querySelectorAll('[data-zoomable]').forEach(function (img) {
      img.style.cursor = 'pointer';
      img.addEventListener('click', function () {
        openModal(this.src, this.alt);
      });
    });

    if (modalOverlay) {
      modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) closeModal();
      });
    }
    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }

    // ESC to close modal
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });

    // --- Collapsible Sections ---
    document.querySelectorAll('.collapsible-header').forEach(function (header) {
      header.addEventListener('click', function () {
        this.classList.toggle('open');
        var content = this.nextElementSibling;
        if (content && content.classList.contains('collapsible-content')) {
          content.classList.toggle('open');
        }
      });
    });

    // --- Copy Buttons ---
    document.querySelectorAll('[data-copy-target]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var targetId = this.getAttribute('data-copy-target');
        var target = document.getElementById(targetId);
        if (!target) return;

        var text = target.textContent || target.innerText;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () {
            showCopyFeedback(btn, true);
          }).catch(function () {
            fallbackCopy(text, btn);
          });
        } else {
          fallbackCopy(text, btn);
        }
      });
    });

    function fallbackCopy(text, btn) {
      var textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        showCopyFeedback(btn, true);
      } catch (e) {
        showCopyFeedback(btn, false);
      }
      document.body.removeChild(textarea);
    }

    function showCopyFeedback(btn, success) {
      var original = btn.textContent;
      btn.textContent = success ? '已复制 ✓' : '复制失败';
      btn.disabled = true;
      setTimeout(function () {
        btn.textContent = original;
        btn.disabled = false;
      }, 2000);
    }

    // --- Load Config & Apply ---
    if (window.SiteConfig) {
      window.SiteConfig.load().then(function (config) {
        window.SiteConfig.apply(config);
      });
    }

    // --- Active Nav Link ---
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === './' + currentPage || href === currentPage ||
          (currentPage === '' && href === './index.html') ||
          (currentPage === 'index.html' && href === './index.html')) {
        link.classList.add('active');
      }
    });
  });
})();