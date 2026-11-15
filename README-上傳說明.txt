〈Chronos（Χρόνος）〉 GitHub Pages 上傳說明
=========================================

本套檔案依照你先前的個人網站結構製作：
你的部落格由 site-content.js 管理文章列表；部分文章使用獨立 HTML 頁面。
本文分類為「知微創作」（zhiwei）。

【發文步驟】
1. 先將 chronos.html 上傳至 GitHub 儲存庫與 site-content.js 相同的根目錄。
2. 在 GitHub 開啟既有的 site-content.js，點選 Edit（編輯）。
3. 找到 posts: [，將 chronos-post-entry.txt 裡面整段物件貼在 posts 陣列最前面，
   也就是第一篇文章的 { 之前。保留該段最後的逗號。
4. 提交（Commit changes）兩項異動。
5. 部署後到部落格「知微創作」分類點進〈Chronos（Χρόνος）〉確認；
   或在網站根網址後面加上 /chronos.html 直接檢查。

【請注意】
* 不要把 chronos-post-entry.txt 直接當成網站檔案上傳，
  因為它是要貼進 site-content.js 的文章資料片段。
* 如果網站架構之後曾更新，應先備份現在的 site-content.js；
  不要用過去下載的舊版檔案覆蓋目前網站內容。
* 2026-11-15-chronos.md 是一般 Markdown 備份，並非目前網站自動讀取的發文格式。
* chronos-original.txt 是使用者提供之定稿文字的純文字備份。
* HTML 內含 UTF-8、繁體中文與希臘文支援，不依賴外部 JavaScript 或圖片。
* 本文保留提供的原文，不更動字句，包括開頭的任明信引文；
  如需確認引文是否與原書逐字相符，仍請以原書為準。
