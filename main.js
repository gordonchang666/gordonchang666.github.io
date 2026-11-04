/* 輕量網站程式：分類、文章檢視、回到首頁；不使用外部追蹤套件。 */
(() => {
  'use strict';
  const data = window.GORDON_SITE;
  if (!data) return;
  const $ = (selector) => document.querySelector(selector);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const categories = data.categories;
  const categoryName = id => id === 'about' ? '認識我' : (categories.find(c => c.id === id)?.name || '文章');
  let activeCategory = 'all';

  $('.brand-title strong').textContent = data.site.title;
  $('.brand-title small').textContent = data.site.subtitle;
  $('#hero-description').textContent = data.site.heroDescription;
  $('#about-main').textContent = data.site.about;
  $('#current-year').textContent = String(new Date().getFullYear());

  const socialLinks = [];
  const instagramPattern = /^https:\/\/(?:www\.)?instagram\.com\/[A-Za-z0-9_.]+\/?$/;
  const linkedinPattern = /^https:\/\/(?:www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/;
  const addSocial = (url, pattern, label, secondary = false) => {
    if (typeof url === 'string' && pattern.test(url)) {
      socialLinks.push(`<a class="social-btn${secondary ? ' social-secondary' : ''}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`);
    }
  };
  addSocial(data.site.instagramPersonalUrl, instagramPattern, '個人 Instagram');
  addSocial(data.site.instagramCreativeUrl, instagramPattern, '知微創作 Instagram');
  addSocial(data.site.linkedinUrl, linkedinPattern, 'LinkedIn', true);
  if (data.site.email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.site.email)) {
    socialLinks.push(`<a class="social-btn social-secondary" href="mailto:${encodeURIComponent(data.site.email)}">合作聯絡信箱 ↗</a>`);
  }
  $('#social-area').innerHTML = socialLinks.length ? socialLinks.join('') : '<p class="social-pending">社群與合作聯絡方式尚待設定。</p>';

  // Four category cards fit naturally in a balanced 2×2 desktop layout.
  if (categories.length === 4) {
    const gridStyle = document.createElement('style');
    gridStyle.textContent = '@media (min-width: 721px) {.category-grid {grid-template-columns: repeat(2, minmax(0, 1fr));}}';
    document.head.appendChild(gridStyle);
  }
  $('#category-grid').innerHTML = categories.map(c => `
    <a class="category-card" href="#journal/${encodeURIComponent(c.id)}">
      <div class="category-card-top"><span>${esc(c.en)}</span><span>↗</span></div>
      <span class="category-num">${esc(c.number)}</span>
      <h3>${esc(c.name)}</h3><p>${esc(c.description)}</p>
    </a>
  `).join('');

  function renderPosts() {
    const filters = [{id:'all', name:'全部文章'}, ...categories];
    $('#filters').innerHTML = filters.map(c => `<button type="button" class="filter ${c.id === activeCategory ? 'active' : ''}" data-category="${esc(c.id)}" aria-pressed="${c.id === activeCategory}">${esc(c.name)}</button>`).join('');
    $('#filters').querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => {activeCategory = btn.dataset.category; renderPosts();}));
    const posts = data.posts.filter(p => activeCategory === 'all' || p.category === activeCategory);
    $('#post-count').textContent = `${posts.length} 篇作品`;
    $('#posts-list').innerHTML = posts.length ? posts.map((p,i) => {
      const catName = categoryName(p.category);
      const image = p.coverImage ? `<img class="post-thumb-image" src="${esc(p.coverImage)}" alt="${esc(p.title)}封面" loading="lazy">` : `<div class="post-thumb-art" aria-hidden="true"><span>✦</span><div></div><small>GORDON'S JOURNAL</small></div>`;
      const articleLink = p.externalUrl || `#read/${encodeURIComponent(p.slug)}`;
      return `<article class="post-card ${i===0 ? 'featured-post' : ''}"><a href="${esc(articleLink)}" class="post-card-link">
        <div class="post-thumb">${image}</div><div class="post-card-text"><div class="post-meta">${esc(catName)} <span>／</span> ${esc(p.date)}</div><h3>${esc(p.title)}</h3><p class="post-subtitle">${esc(p.subtitle)}</p><p class="post-excerpt">${esc(p.excerpt)}</p><span class="read-more">閱讀全文 <span>↗</span></span></div>
      </a></article>`;
    }).join('') : `<div class="empty-state"><span>✳</span><h3>這個專區正在慢慢整理中。</h3><p>這個專區目前正在整理，之後會陸續加入新的文字與作品。</p><a href="#journal/film">先讀電影心得 ↗</a></div>`;
  }

  function renderArticle(slug) {
    const p = data.posts.find(post => post.slug === slug);
    if (!p) {
      $('#article-body').innerHTML = '<h1>找不到這篇文章</h1><p><a href="#journal">回到文章列表</a></p>';
      return;
    }
    if (p.externalUrl) {
      window.location.replace(p.externalUrl);
      return;
    }
    const catName = categoryName(p.category);
    const cover = p.coverImage ? `<figure class="article-cover"><img src="${esc(p.coverImage)}" alt="${esc(p.title)}的封面照片"><figcaption>${esc(p.coverCaption)}</figcaption></figure>` : (p.category === 'about' ? '' : `<div class="article-cover-pending" role="note"><div class="placeholder-symbol">✦</div><p>封面照片位置</p><small>${esc(p.coverCaption)}</small></div>`);
    $('#article-body').innerHTML = `<article class="full-article">
      <div class="article-eyebrow">${esc(catName)} <span>／</span> ${esc(p.date)}</div>
      <h1>${esc(p.title)}</h1><p class="article-subtitle">${esc(p.subtitle)}</p><p class="article-byline">${esc(p.date)}　${esc(p.author)}</p>
      ${cover}
      <div class="article-prose">${p.paragraphs.map(text => `<p>${esc(text)}</p>`).join('')}</div>
      <p class="article-footnote">${esc(p.footnote || '')}</p>
      <div class="article-endmark">✳</div><div class="article-bottom"><p>感謝你讀到這裡。</p><a href="#journal">← 繼續閱讀其他作品</a></div>
    </article>`;
  }

  function route() {
    const hash = decodeURIComponent(window.location.hash.replace(/^#/, '')) || 'home';
    const isArticle = hash.startsWith('read/');
    $('#home-view').hidden = isArticle;
    $('#article-view').hidden = !isArticle;
    if (isArticle) {
      renderArticle(hash.slice(5));
      document.title = `${data.posts.find(p=>p.slug===hash.slice(5))?.title || '文章'}｜${data.site.title}`;
      window.scrollTo({top:0,behavior:'instant'});
    } else {
      document.title = `${data.site.title}｜${data.site.subtitle}`;
      if (hash.startsWith('journal/')) {activeCategory = hash.split('/')[1] || 'all';renderPosts();}
      const targetId = hash.split('/')[0];
      requestAnimationFrame(() => {
        const target = document.getElementById(targetId);
        if (target && hash !== 'home') target.scrollIntoView({behavior:'smooth',block:'start'});
        else if (hash === 'home') window.scrollTo({top:0,behavior:'smooth'});
      });
    }
  }
  renderPosts();
  window.addEventListener('hashchange',route);
  route();
})();
