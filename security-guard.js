/*
 * Gordon blog: additive URL security guard.
 * Runs after site-content.js and before main.js (defer ordering).
 * No layout, article text, category, dates, or original files are changed.
 * This is defense-in-depth, not a firewall or protection against account takeover.
 */
(() => {
  'use strict';
  const data = window.GORDON_SITE;
  if (!data || !Array.isArray(data.posts)) return;

  // Only same-origin HTML documents may be used for article redirects.
  // Existing "chronos.html" and "law-ai-medical-device-pccp.html" remain valid.
  const safeArticleUrl = value => {
    if (typeof value !== 'string' || value.length > 500 || !value.trim()) return false;
    if (/^[\s\\]|[\x00-\x1f\x7f]/.test(value) || value.includes('\\')) return false;
    try {
      const url = new URL(value, window.location.href);
      if (url.origin !== window.location.origin || url.protocol !== 'https:') return false;
      if (url.username || url.password || url.search || url.hash) return false;
      if (!/\/[A-Za-z0-9_-]+\.html$/.test(url.pathname)) return false;
      // Reject confusing relative segments and network-path references.
      if (/^\/\//.test(value) || /(^|\/)\.\.?($|\/)/.test(value)) return false;
      return true;
    } catch (_) { return false; }
  };

  // Images may use normal HTTPS URLs or ordinary same-site relative paths.
  // javascript:, data:, blob:, file:, and protocol-relative URLs are not accepted
  // from editable content. CSS data-URI decorations remain unaffected.
  const safeImageUrl = value => {
    if (typeof value !== 'string' || !value || value.length > 2000) return false;
    if (/^[\s\\]|[\x00-\x1f\x7f]/.test(value) || value.includes('\\') || value.startsWith('//')) return false;
    try {
      const url = new URL(value, window.location.href);
      return url.protocol === 'https:' && !url.username && !url.password;
    } catch (_) { return false; }
  };

  for (const post of data.posts) {
    if (!post || typeof post !== 'object') continue;
    if (post.externalUrl && !safeArticleUrl(post.externalUrl)) {
      // Safer fallback: the existing internal article route handles the record.
      delete post.externalUrl;
    }
    if (post.coverImage && !safeImageUrl(post.coverImage)) {
      post.coverImage = '';
    }
  }
})();
