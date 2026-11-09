〈願我也能成為一朵臺灣花〉｜修正版網站上傳說明
2026-11-09｜章竣 Gordon

本包針對「封面照片檔案路徑不符」修正。
新版會直接從 GitHub 網站根目錄讀取 taiwan-flower-cover-20261109.jpg。
其他文章與網站設定維持原樣，僅改動新文章的 coverImage 路徑。

【GitHub 手動更新：請依序進行】
1. 解壓縮這個 ZIP。切勿把 ZIP 整包直接放入儲存庫。
2. 開啟：https://github.com/gordonchang666/gordonchang666.github.io/upload/main
3. 將本資料夾的「site-content.js」與「taiwan-flower-cover-20261109.jpg」一起選取上傳到 main 分支的根目錄（不需要建立 assets 資料夾）。
4. 按「Commit changes」，等待 GitHub Pages 部署完成。
5. 檢查新文章與封面：
   https://gordonchang666.github.io/#read/may-i-be-a-taiwan-flower
6. 確認新封面顯示後，再刪除根目錄的舊圖片「taiwan-flower-cover.jpg」（不要刪新圖片）：
   https://github.com/gordonchang666/gordonchang666.github.io/blob/main/taiwan-flower-cover.jpg
   在 GitHub 開啟該檔案，使用刪除檔案功能並提交變更。

【不要上傳】
README-上傳說明.txt：只供閱讀。

【校對】
文章標題、日期、作者及四個正文段落均維持原始版。
新封面圖檔與前次提供的封面照片畫面一致，只是為避免路徑衝突而改名。
若你在上次上傳後又修改過網站其他文章，請先備份線上最新的 site-content.js，再考慮合併，避免覆寫更新。
