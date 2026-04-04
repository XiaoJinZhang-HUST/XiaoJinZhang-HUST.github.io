/**
 * Site Configuration Loader
 * Loads site.config.json and provides config to other modules
 */
(function () {
  'use strict';

  const CONFIG_PATH = './assets/site.config.json';
  let _config = null;

  /**
   * Load configuration from JSON file
   * @returns {Promise<Object>} config object
   */
  async function loadConfig() {
    if (_config) return _config;
    try {
      const resp = await fetch(CONFIG_PATH);
      if (!resp.ok) throw new Error('Config load failed');
      _config = await resp.json();
    } catch (e) {
      console.warn('Failed to load site config, using defaults:', e);
      _config = {
        siteTitle: '可信联邦学习',
        siteSubtitle: '配套资源与习题答案',
        purchaseLink: '',
        issuesLink: '',
        repoLink: '',
        lastUpdated: '',
        citation: {}
      };
    }
    return _config;
  }

  /**
   * Apply config values to DOM elements with data-config attributes
   */
  function applyConfig(config) {
    // Update last updated date
    document.querySelectorAll('[data-config="lastUpdated"]').forEach(function (el) {
      if (config.lastUpdated) el.textContent = config.lastUpdated;
    });

    // Update purchase button
    document.querySelectorAll('[data-config="purchaseLink"]').forEach(function (el) {
      if (config.purchaseLink) {
        el.href = config.purchaseLink;
        el.classList.remove('disabled');
        el.removeAttribute('aria-disabled');
        el.textContent = '购买纸质书';
      } else {
        el.removeAttribute('href');
        el.classList.add('disabled');
        el.setAttribute('aria-disabled', 'true');
        el.textContent = '即将上线（待正式出版）';
      }
    });

    // Update issues link
    document.querySelectorAll('[data-config="issuesLink"]').forEach(function (el) {
      if (config.issuesLink) {
        el.href = config.issuesLink;
        el.classList.remove('disabled');
        el.removeAttribute('aria-disabled');
      } else {
        el.removeAttribute('href');
        el.classList.add('disabled');
        el.setAttribute('aria-disabled', 'true');
      }
    });

    // Update repo link
    document.querySelectorAll('[data-config="repoLink"]').forEach(function (el) {
      if (config.repoLink) {
        el.href = config.repoLink;
        el.classList.remove('disabled');
        el.removeAttribute('aria-disabled');
      } else {
        el.removeAttribute('href');
        el.classList.add('disabled');
        el.setAttribute('aria-disabled', 'true');
      }
    });
  }

  // Expose globally
  window.SiteConfig = {
    load: loadConfig,
    apply: applyConfig,
    get: function () { return _config; }
  };
})();