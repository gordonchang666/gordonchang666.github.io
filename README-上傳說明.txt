《知微 ZHIWEI》創刊號網站新增套件｜2026-11-26

一、上傳到現有 GitHub Pages
已核對儲存庫 gordonchang666/gordonchang666.github.io 的 main/index.html，目前以靜態 HTML＋JS 為主。
1. 解壓縮 ZIP，保留 zhiwei 資料夾與其內部結構。
2. 前往 https://github.com/gordonchang666/gordonchang666.github.io ，選擇 main 分支 → Add file → Upload files。
3. 將整個 zhiwei 資料夾拖入上傳頁（電腦較方便），確認檔案路徑從 zhiwei/ 開始，而不是額外套一層資料夾。不要把 zhiwei/index.html 覆蓋到網站根目錄 index.html。
4. Commit changes。原有文章、JavaScript、CSS、個資及安全設定不需修改。
5. 新增首頁入口：打開儲存庫根目錄 index.html，按 Edit。找到下列原有導覽列一行：
        <a href="#journal">文章</a>
   在其下一行插入：
        <a href="zhiwei/">知微雜誌</a>
   再 Commit changes。此方法保留所有原有網站程式。若根目錄內容後續改動，仍可依實際導覽列位置插入。
6. 如需首頁另外顯示入口，可在同一個 index.html 的 hero-actions 中、原「更認識我」連結後增加：
        <a class="text-link" href="zhiwei/">閱讀《知微》創刊號 <span aria-hidden="true">↗</span></a>
   此為選用步驟。
7. 等待 GitHub Pages 部署成功後，分別開啟下方網址檢查。若使用手機，請確認 PDF 能儲存至「檔案」。

二、部署後網址（尚未上傳，並非已驗證的公開連結）
專區：https://gordonchang666.github.io/zhiwei/
創刊號完整網頁閱讀：https://gordonchang666.github.io/zhiwei/vol-01/
PDF：https://gordonchang666.github.io/zhiwei/vol-01/zhiwei-2026-autumn-vol01.pdf

三、套件說明
zhiwei/index.html：歷期專區；新增未來各期的刊物卡即可。
zhiwei/style.css：專區獨立響應式樣式，不影響既有網站。
zhiwei/vol-01/index.html：創刊介紹、全部六篇文字、目錄、原插畫、讀者提示、授權。
zhiwei/vol-01/cover.jpg、dessert.jpg、worker.jpg：由本期 PDF 擷取，非新生成圖。
zhiwei/vol-01/zhiwei-2026-autumn-vol01.pdf：十頁 CC 發行版，封底權利聲明更新，保留原頁與署名。
創刊介紹文案.md：方便另外發布的文案，不必放進公開儲存庫。

四、授權決策（公開前請主編核定）
本期暫採 CC BY-NC-ND 4.0 國際：姓名標示、非商業性、禁止散布改作。允許非商業分享原作；合理使用等法律例外不受限制；不是禁止一切轉載。CC 授權不可對已遵守條款的使用者撤回。僅就作者有權授權且受著作權保護的內容授權，不代表 AI 獨立生成部分必然具著作權，不涵蓋第三方權利及其他期數。若想允許非商業改作，可另選 CC BY-NC 4.0，但需在公開前決定。上傳前再次確認本人有權授權所有內容與涉及的個人隱私。
官方授權摘要：https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh-hant
完整條款：https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode.zh-hant
智慧財產局 AI 著作權函釋：https://www.tipo.gov.tw/tw/copyright/692-63403.html
