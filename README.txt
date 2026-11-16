Gordon GitHub Pages 部落格｜首頁快取與基本安全性修補
版本：2026-11-16

一、這份補丁會修改什麼？
- 只更新 GitHub 儲存庫根目錄的 index.html。
- site-content.js?v=20261116-b02f8834：使用新的資源 URL，讓瀏覽器不沿用舊版文章清單。
- 新增基本的 Content-Security-Policy (CSP)：限制網站執行的腳本來源、禁止 object 內容等。
- 新增 referrer=no-referrer：降低開啟外站時洩露來源網址的風險。
- 為相容原有 main.js 動態插入的 style 標籤，CSP 的 style-src 仍保留 unsafe-inline；這不是全面性的安全稽核。

二、不會修改什麼？
- 不包含、不更新 site-content.js（包含所有文章與個人資料）。
- 不包含、不更新 main.js、styles.css、其他獨立文章 HTML 或圖片。
- 保留所有既有版面、分類、導覽、文章閱讀與社群連結。

三、如何上傳？
1. 將 ZIP 解壓縮。解壓後有 index.html 和 README.txt。
2. 前往 https://github.com/gordonchang666/gordonchang666.github.io
3. 先備份 GitHub 原本的 index.html（如有自行修改，先核對差異）。
4. 將解壓縮的 index.html 上傳到儲存庫根目錄，取代同名檔案；不要上傳 ZIP 本身。
5. Commit changes 到 main 分支。
6. 查看 Settings > Pages，確保 GitHub Pages 的發佈來源設定正確、部署成功。
7. 用無痕視窗開啟 https://gordonchang666.github.io/#read/believe-in-myself-once。

注意：這是快取與瀏覽器端的基礎安全性修補。如果 GitHub Pages 發布來源不同、部署失敗或網站網址未指向此儲存庫，僅更新此檔無法修正。GitHub Pages 的 HTTP 安全標頭亦無法由此 HTML 檔完整配置。

原始 index.html（Git blob SHA）：84ce38c2bf8b9f42ff5240c87e50e23fd89ed53f
文章資料檔（查核時 Git blob SHA）：b02f8834bbbc3da4afc1bba64ec405b2b7647dd9
