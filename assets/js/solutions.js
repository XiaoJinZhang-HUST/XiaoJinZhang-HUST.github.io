/**
 * Solutions Page - PDF availability detection
 */
(function () {
  'use strict';

  var chapters = [
    { num: 2, title: '联邦学习基础算法' },
    { num: 3, title: '联邦大模型' },
    { num: 4, title: '联邦学习安全性' },
    { num: 5, title: '联邦学习效率' },
    { num: 6, title: '无免费午餐定理' },
    { num: 7, title: '联邦学习的多目标优化' },
    { num: 8, title: '个性化联邦学习' },
    { num: 9, title: '联邦学习公平性' },
    { num: 10, title: '联邦学习贡献度与激励机制' },
    { num: 11, title: '模型知识产权保护' },
    { num: 12, title: '联邦学习应用' }
  ];

  function getPdfPath(chapterNum) {
    var numStr = chapterNum < 10 ? '0' + chapterNum : '' + chapterNum;
    return './assets/pdfs/ch' + numStr + '.pdf';
  }

  /**
   * Check if a PDF exists using fetch HEAD, fallback to GET
   */
  async function checkPdfExists(path) {
    try {
      var resp = await fetch(path, { method: 'HEAD' });
      if (resp.ok) {
        var contentType = resp.headers.get('content-type') || '';
        // On GitHub Pages, 404 may return HTML
        if (contentType.includes('application/pdf') || contentType.includes('octet-stream')) {
          return true;
        }
        // If HEAD doesn't give content-type, try GET with range
        if (!contentType.includes('text/html')) {
          return true;
        }
      }
      // Fallback: try GET and check first bytes
      var getResp = await fetch(path, { method: 'GET', headers: { 'Range': 'bytes=0-4' } });
      if (getResp.ok || getResp.status === 206) {
        var ct = getResp.headers.get('content-type') || '';
        if (ct.includes('text/html')) return false;
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  function renderSolutions() {
    var container = document.getElementById('solutions-list');
    if (!container) return;

    chapters.forEach(function (ch) {
      var pdfPath = getPdfPath(ch.num);
      var numStr = ch.num < 10 ? '0' + ch.num : '' + ch.num;
      var itemId = 'solution-ch' + numStr;

      var item = document.createElement('div');
      item.className = 'solution-item';
      item.id = itemId;
      item.innerHTML =
        '<div class="solution-info">' +
          '<div class="solution-chapter-num">' + ch.num + '</div>' +
          '<div class="solution-title">第' + ch.num + '章 ' + ch.title + '</div>' +
        '</div>' +
        '<div class="solution-actions">' +
          '<span class="status-badge unavailable" data-status="badge">⏳ 检测中…</span>' +
          '<a class="btn btn-sm btn-primary disabled" data-action="open" target="_blank" rel="noopener" aria-disabled="true">打开 PDF</a>' +
          '<a class="btn btn-sm btn-outline disabled" data-action="download" aria-disabled="true">下载 PDF</a>' +
        '</div>';

      container.appendChild(item);

      // Check PDF availability
      checkPdfExists(pdfPath).then(function (exists) {
        var badge = item.querySelector('[data-status="badge"]');
        var openBtn = item.querySelector('[data-action="open"]');
        var dlBtn = item.querySelector('[data-action="download"]');

        if (exists) {
          badge.className = 'status-badge available';
          badge.textContent = '✓ 已发布';
          openBtn.href = pdfPath;
          openBtn.classList.remove('disabled');
          openBtn.removeAttribute('aria-disabled');
          dlBtn.href = pdfPath;
          dlBtn.setAttribute('download', 'ch' + numStr + '.pdf');
          dlBtn.classList.remove('disabled');
          dlBtn.removeAttribute('aria-disabled');
        } else {
          badge.className = 'status-badge unavailable';
          badge.textContent = '⏳ 未上传 / 待更新';
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', renderSolutions);
})();