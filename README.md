<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Game Key Shop - Key Game IOS Cao Cấp</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Roboto:wght@300;400;700&display=swap" rel="stylesheet" />
    <!-- Liên kết đến file CSS của bạn -->
    <link rel="stylesheet" href="style.css" />
    <link rel="stylesheet" href="modal.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
</head>
<body>
    <header>
        <div class="header-content">
            <h1 class="site-title">Hack IOS Shop</h1>
            <nav>
                <ul>
                    <li><a href="#home" class="nav-link"><i class="fas fa-home"></i> Trang chủ</a></li>
                    <li><a href="#game-keys" class="nav-link"><i class="fas fa-gamepad"></i> Shop Hack</a></li>
                    <li><a href="#about" class="nav-link"><i class="fas fa-info-circle"></i> Về chúng tôi</a></li>
                    <li><a href="#contact" class="nav-link"><i class="fas fa-envelope"></i> Liên hệ</a></li>
                </ul>
            </nav>
            <div class="account-actions">
                <div id="balanceContainer" style="display: none;">
                    <span id="accountBalance">Số dư: 0 VNĐ</span>
                </div>
                <div id="transferCodeContainer" style="display: none;">
                    <span>Mã chuyển tiền: <span id="transferCodeDisplay"></span></span>
                    <button id="copyTransferCode" class="copy-button" title="Sao chép mã">
                        <i class="fas fa-copy"></i>
                    </button>
                </div>
                <div id="depositContainer" style="display: none;">
                    <button id="depositBtn" class="modern-button deposit-button">Nạp tiền</button>
                </div>
                <div id="transferCodeButtonContainer" style="display: none;">
                    <button id="showTransferCodeBtn" class="modern-button">Xem mã chuyển tiền</button>
                </div>
                <div id="loginContainer">
                    <a href="#" id="loginBtn" class="modern-button login-button">Đăng nhập</a>
                </div>
                <div id="registerContainer">
                    <a href="#" id="registerBtn" class="modern-button register-button">Đăng ký</a>
                </div>
                <div id="logoutContainer" style="display: none;">
                    <a href="#" id="logoutBtn" class="modern-button logout-button">Đăng xuất</a>
                </div>
            </div>
        </div>
    </header>

    <main>
        <section class="hero">
            <div class="hero-content">
                <h1>Chào mừng đến với Hack IOS Shop</h1>
                <p>Nơi bán Hack Game IOS cao cấp uy tín nhất</p>
                <a href="#game-keys" class="cta-button">Khám phá ngay</a>
            </div>
        </section>

        <section id="game-keys" class="game-stores">
            <h2>Kho Hack Game IOS</h2>
            <div id="game-key-list">
                <!-- Danh sách key game sẽ được thêm vào đây bằng JavaScript -->
            </div>
        </section>

        <section id="about">
            <h2>Về chúng tôi</h2>
            <p>Chúng tôi là đơn vị cung cấp Hack Game IOS an toàn và rẻ nhất thị trường Việt Nam</p>
        </section>

        <section id="contact">
            <h2>Liên hệ</h2>
            <div class="contact-info">
                <div class="contact-item">
                    <i class="fas fa-phone-alt"></i>
                    <div>
                        <h3>Zalo</h3>
                        <p>0966642216</p>
                    </div>
                </div>
                <div class="contact-item">
                    <i class="fas fa-envelope"></i>
                    <div>
                        <h3>Email</h3>
                        <p>aan123274@gmail.com</p>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer>
        <p class="copyright">&copy; Hack Game Shop - Uy Tín - An toàn - Giá rẻ nhất thị trường Việt Nam.</p>
    </footer>

    <div id="authModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <div id="loginForm">
                <h2>Đăng nhập</h2>
                <form id="loginFormElement">
                    <input type="text" id="loginUsername" placeholder="Tên đăng nhập" required autocomplete="username">
                    <input type="password" id="loginPassword" placeholder="Mật khẩu" required autocomplete="current-password">
                    <button type="submit">Đăng nhập</button>
                </form>
                <p>Chưa có tài khoản? <a href="#" id="switchToRegister">Đăng ký ngay</a></p>
                <p><a href="#" id="forgotPasswordLink">Quên mật khẩu?</a></p>
            </div>
            <div id="registerForm" style="display:none;">
                <h2>Đăng ký</h2>
                <form id="registerFormElement">
                    <input type="text" id="registerUsername" placeholder="Tên đăng nhập" required autocomplete="username">
                    <input type="email" id="registerEmail" placeholder="Email" required autocomplete="email">
                    <input type="password" id="registerPassword" placeholder="Mật khẩu" required autocomplete="new-password">
                    <input type="password" id="confirmPassword" placeholder="Xác nhận mật khẩu" required autocomplete="new-password">
                    <button type="submit" class="modern-button register-button">Đăng ký</button>
                </form>
                <p>Đã có tài khoản? <a href="#" id="switchToLogin">Đăng nhập</a></p>
            </div>
            <div id="forgotPasswordForm" style="display:none;">
                <h2>Quên mật khẩu</h2>
                <form id="forgotPassword">
                    <input type="email" id="forgotEmail" placeholder="Email" required>
                    <button type="submit" class="modern-button">Gửi yêu cầu đặt lại mật khẩu</button>
                </form>
                <p><a href="#" id="backToLogin">Quay lại đăng nhập</a></p>
            </div>
        </div>
    </div>

    <div id="userDashboard" style="display: none;">
        <h2>Thông tin tài khoản</h2>
        <p id="accountBalance"></p>
        <p id="transferCode"></p>
        <h3>Giao dịch nạp tiền đang chờ xử lý</h3>
        <div id="pendingDepositsList"></div>
    </div>

    <div id="virtualCurrencyBalances" style="display: none;">
        <!-- Virtual currency balances will be displayed here -->
    </div>

    <!-- Liên kết đến các file JavaScript của bạn -->
    <script src="shared-data.js"></script>
    <script src="script1.js"></script>
    <script src="script2.js"></script>
    <script src="script3.js"></script>
    <script src="script.js"></script>
    <script src="path/to/auto-deposit.js"></script>
    <!-- Thêm script mới để xử lý nạp tiền tự động -->
    <script src="auto-deposit.js"></script>

    <!-- Thêm modal thông báo kết quả nạp tiền -->
    <div id="depositResultModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Kết quả nạp tiền</h2>
            <p id="depositResultMessage"></p>
        </div>
    </div>

    <div id="depositModal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Nạp tiền vào tài khoản</h2>
        <div class="bank-info">
          <h3>Bạn hãy nhập số tiền muốn nạp để tạo yêu cầu nạp tiền, sau đó chuyển khoản đến số tài khoản của admin với số tiền bằng số tiền đã yêu cầu. Nếu số tiền chuyển khoản không giống với số tiền đã yêu cầu, hệ thống sẽ không thể xử lý tự động và tiền sẽ không được cộng vào tài khoản của bạn.</h3> 
          <h3>Thông tin chuyển khoản</h3>
          <p><strong>Ngân hàng:</strong> TP Bank</p>
          <p><strong>Số tài khoản:</strong> 12072005000 </p>
          <p><strong>Chủ tài khoản:</strong> VƯƠNG ĐÌNH DUY AN </p>
          <p><strong>Nội dung chuyển khoản:</strong> naptien <span id="transferCodeDisplay"></span></p>
        </div>
        <div class="momo-info">
          <h3>Khi chuyển tiền vui lòng ghi nội dung chuyển khoản là: naptien <span id="transferCodeDisplay"></span></p></h3> 
          <h3>Thông tin Momo</h3>
          <p><strong>Số điện thoại Momo:</strong> 0966642216 </p>
          <p><strong>Tên tài khoản:</strong> VƯƠNG ĐÌNH DUY AN</p>
          <p><strong>Nội dung chuyển khoản:</strong> naptien <span id="transferCodeDisplay"></span></p>
        </div>
        <form id="depositForm">
          <div class="input-group">
            <input type="number" id="depositAmount" min="10000" step="10000" required>
            <label for="depositAmount">Số tiền nạp (VNĐ)</label>
          </div>
          <button type="submit" id="depositSubmit">Xác nhận nạp tiền</button>
        </form>
        <p class="transfer-info">Mã chuyển tiền: <span id="transferCode"></span></p>
      </div>
    </div>

    <style>
      .modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
      }

      .modal-content {
        background-color: #fff;
        margin: 10% auto;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        max-width: 500px;
        width: 90%;
      }

      .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
        transition: color 0.3s;
      }

      .close:hover {
        color: #000;
      }

      h2 {
        color: #333;
        margin-bottom: 20px;
        text-align: center;
      }

      .deposit-options {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
      }

      .deposit-option {
        background-color: #f0f0f0;
        border-radius: 8px;
        padding: 15px;
        text-align: center;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.3s;
        flex-basis: 30%;
      }

      .deposit-option:hover {
        background-color: #e0e0e0;
        transform: translateY(-5px);
      }

      .deposit-option.selected {
        background-color: #4CAF50;
        color: white;
      }

      .deposit-option h3 {
        margin: 0 0 10px;
        font-size: 18px;
      }

      .deposit-option p {
        margin: 0;
        font-size: 14px;
      }

      .input-group {
        position: relative;
        margin-bottom: 20px;
      }

      .input-group input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
        transition: border-color 0.3s;
      }

      .input-group label {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: #999;
        pointer-events: none;
        transition: all 0.3s;
      }

      .input-group input:focus + label,
      .input-group input:not(:placeholder-shown) + label {
        top: 0;
        font-size: 12px;
        color: #4CAF50;
        background-color: white;
        padding: 0 5px;
      }

      #depositSubmit {
        width: 100%;
        padding: 12px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s;
      }

      #depositSubmit:hover {
        background-color: #45a049;
      }

      .transfer-info {
        margin-top: 20px;
        text-align: center;
        font-size: 14px;
        color: #666;
      }

      #transferCode {
        font-weight: bold;
        color: #4CAF50;
      }

      .bank-info, .momo-info {
        background-color: #f9f9f9;
        border: 1px solid #e0e0e0;
        border-radius: 5px;
        padding: 15px;
        margin-bottom: 20px;
      }

      .bank-info h3, .momo-info h3 {
        margin-top: 0;
        color: #333;
      }

      .bank-info p, .momo-info p {
        margin: 5px 0;
      }
    </style>

    <script>
      function initializeDeposit() {
        const depositModal = document.getElementById('depositModal');
        const depositBtn = document.getElementById('depositBtn');
        const closeBtn = depositModal.querySelector('.close');
        const depositOptions = depositModal.querySelectorAll('.deposit-option');
        const depositForm = document.getElementById('depositForm');
      }
