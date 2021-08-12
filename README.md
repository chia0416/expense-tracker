# Expense-tracker

一個使用 Node.js + Express 打造的餐廳美食網站，提供使用者可依照餐廳名稱與類別進行搜尋及排序。

# 專案畫面

![image](https://github.com/chia0416/expense-tracker/blob/main/public/HomePage.jpg)

# Features - 產品功能

<ol>
<li>使用 Node.js + Express + Mongodb 打造簡易支出表 </li>
<li>使用者可以紀錄生活開銷</li>
<li>使用者可以依照種類或名稱進行分類</li>
<li>新增了"新增"、"修改"、"刪除"功能，並可將資訊傳至資料庫</li>
<li>重構路由器的位置，增加文件的易讀性</li>
<li>新增了heroku雲端服務,可在此網址使用:https://secure-eyrie-91990.herokuapp.com/</li>
<li>新增"使用者介面"、信箱"註冊及登入"功能</li>
<li>新增"FB登入"功能</li>
</ol>

# Installing - 專案安裝流程

<ol>
<li>確認是否已安裝Node.js</li>
<pre><code>在Terminal 輸入 node -v 指令</code></pre>

<li>如果沒出現版本符號，請先使用nvm 安裝Node.js</li>
<pre><code>請參考此網址 https://www.onejar99.com/nvm-install-for-windows/</code></pre>

<li>打開你的 terminal，Clone 此專案至本機電腦 </li>
<pre><code>https://github.com/chia0416/expense-tracker.git </code></pre>

<li>開啟終端機(Terminal)，進入存放此專案的資料夾 </li>
<pre><code> cd restaurant_list </code></pre>

<li>安裝 npm 套件 </li>
<pre><code>在 Terminal 輸入 npm install 指令</code></pre>

<li>安裝 nodemon 套件 </li>
<pre><code>在 Terminal 輸入 npm install -g nodemon 指令</code></pre>

<li>啟動伺服器，執行 app.js 檔案 </li>
<pre><code>在 Terminal 輸入 nodemon app.js 或者 npm run dev 指令即可</code></pre>

<li>建立種子資料</li>
<pre><code>在 Terminal 輸入npm run seed 指令</code></pre>

<li>當 terminal 出現以下字樣，表示伺服器已啟動並成功連結 </li>
<pre><code> Express is running on http://localhost:3000 </code></pre>  
  
現在，你可開啟任一瀏覽器瀏覽器輸入 http://localhost:3000

### 套件

  <ul type=disc>
    <li>"bcryptjs": "^2.4.3",
    <li>"body-parser": "^1.19.0",
    <li>"connect-flash": "^0.1.1",
    <li>"dotenv": "^10.0.0",
    <li>"express": "^4.17.1",
    <li>"express-handlebars": "^5.2.1",
    <li>"express-session": "^1.17.2",
    <li>"method-override": "^3.0.0",
    <li>"mongoose": "^5.12.2",
    <li>"passport": "^0.4.1",
    <li>"passport-facebook": "^3.0.0",
    <li>"passport-local": "^1.0.0"
  </ul>
