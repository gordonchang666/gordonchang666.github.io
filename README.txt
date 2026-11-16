GORDON 個人部落格｜多層防護補丁（2026-11-16）

重要：本資料包不會自動執行，也不是 WAF（網站應用程式防火牆）。
請先備份 GitHub 原檔，再上傳檔案。

【必須上傳的兩個檔案】
1. index.html         → GitHub 儲存庫的根目錄；取代同名檔案。
2. security-guard.js  → GitHub 儲存庫的根目錄；新增檔案。

順序：建議先上傳 security-guard.js 並 Commit，再更新 index.html 並 Commit。
因為更新後的 index.html 會載入 security-guard.js，這樣可避免程式載入中途出現 404。
ZIP 內的 README 不必上傳。

【可選擇上傳的自動查核檔】
.github/workflows/blog-security-audit.yml  → 保留原路徑上傳。
.github/scripts/blog-security-audit.mjs    → 保留原路徑上傳。
建議這兩個檔案一起 Commit。這是 GitHub Actions 唯讀靜態檢查，
若沒有啟用 Actions 或 Repo 尚未設定可執行工作流程，可能不會運行。
這個檢查不會阻擋所有惡意提交；若要阻擋不合格提交，需搭配 GitHub 分支保護。

【五層控制，說明其作用與限制】
1. HTTPS 傳輸保護（GitHub Pages 設定，並非本次安裝）
2. CSP 限制任意腳本、外掛、表單、Frame、資料連線，限制行內樣式
3. 原有 main.js HTML 跳脫：防止將文章內容直接解讀為 HTML
4. 新 security-guard.js：限制編輯資料中的文章跳轉與圖片網址
5. GitHub Actions 唯讀掃描（可選）＋ GitHub 帳號 2FA、分支保護（需另行設定）
另有 Referrer Policy，減少網址來源資訊傳送。

【網站及資料的保留】
- 不包含、不覆蓋 site-content.js：原文章及其日期、分類、內容不會改變。
- 不包含、不覆蓋 main.js、styles.css：原介面及閱讀程式不變。
- index.html 僅更新 CSP 及加入 security-guard.js 的 script 標籤。
- 兩篇原有的獨立 HTML 文章跳轉仍然可用。

【限制】
- GitHub Pages 靜態檔案不能透過這個補丁自行設定伺服器端 WAF、防火牆或 HTTP 安全標頭。
- CSP 的 meta 標籤不能設定 frame-ancestors，也不能取代伺服器的 HSTS / X-Frame-Options。
- 此版保留從 HTTPS 載入外部圖片的能力；未阻斷所有第三方影像追蹤。
- 嚴格的行內 CSS 雜湊對應目前 main.js 固定注入的 2×2 分類布局。
  未來如果改 main.js 的這段 CSS，須同步更新 CSP style-src 雜湊。
- 若未來要將 externalUrl 改成站外文章連結，新增的網址白名單會阻止站外跳轉；
  屆時請先檢查需求再調整 security-guard.js。
- 這些是多層減風險措施，不能保證網站不被攻擊，也無法阻止 GitHub 帳號遭盜後改寫網站。

【管理面必做】
A. GitHub 帳號啟用通行密鑰 / 兩步驟驗證（2FA），不要共用存取權杖。
B. Repository Settings → Pages：確認 Enforce HTTPS。
C. Repository Settings → Rules → Rulesets：若方案與權限允許，針對 main 設定審核及必要檢查。
D. 勿將 API Key、帳號密碼、Cookie 或個人敏感資料放在公開網站與 GitHub repository。

【版本基準及安全回復】
基準 GitHub index.html blob SHA：6eb13814a88d2e8e1138af3ca2569167fbe26b62
基準 site-content.js blob SHA：b02f8834bbbc3da4afc1bba64ec405b2b7647dd9
若新版本導致網站出現問題，將 index.html 還原到原本版本，
就能停止載入新安全守衛程式；原有文章檔案不受影響。

【文章網址】
https://gordonchang666.github.io/#read/believe-in-myself-once
