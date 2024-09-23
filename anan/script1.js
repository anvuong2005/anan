window.currentUser = null;

console.log('Initial users data:', getUsers());

(function() {
    // Xóa dòng này: let users = [];

    let usersReady = false;

    function generateTransferCode() {
        return Math.random().toString(36).substr(2, 8).toUpperCase();
    }

    function checkUsers() {
        if (typeof window.users !== 'undefined') {
            usersReady = true;
            console.log('users is now defined');
            // Gọi các hàm khởi tạo khác ở đây nếu cần
        } else {
            console.log('users is not defined yet, waiting...');
            setTimeout(checkUsers, 100); // Kiểm tra lại sau 100ms
        }
    }

    checkUsers();

    document.addEventListener('DOMContentLoaded', function() {
        const modal = document.getElementById('authModal');
        const loginBtn = document.getElementById('loginBtn');
        const registerBtn = document.getElementById('registerBtn');
        const closeBtn = document.getElementsByClassName('close')[0];
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const forgotPasswordForm = document.getElementById('forgotPasswordForm');
        const forgotPasswordLink = document.getElementById('forgotPasswordLink');
        const switchToRegister = document.getElementById('switchToRegister');
        const switchToLogin = document.getElementById('switchToLogin');
        const backToLogin = document.getElementById('backToLogin');

        // Hiển thị modal
        loginBtn.onclick = function() {
            modal.style.display = 'block';
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
            forgotPasswordForm.style.display = 'none';
        }

        registerBtn.onclick = function() {
            modal.style.display = 'block';
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
            forgotPasswordForm.style.display = 'none';
        }

        // Đóng modal
        closeBtn.onclick = function() {
            modal.style.display = 'none';
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }

        // Chuyển đổi giữa các form
        forgotPasswordLink.onclick = function(e) {
            e.preventDefault();
            loginForm.style.display = 'none';
            forgotPasswordForm.style.display = 'block';
        }

        switchToRegister.onclick = function(e) {
            e.preventDefault();
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
            forgotPasswordForm.style.display = 'none';
        }

        switchToLogin.onclick = function(e) {
            e.preventDefault();
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
            forgotPasswordForm.style.display = 'none';
        }

        backToLogin.onclick = function(e) {
            e.preventDefault();
            loginForm.style.display = 'block';
            forgotPasswordForm.style.display = 'none';
        }

        // Xử lý đăng nhập
        // Xóa hoặc comment bất kỳ code nào liên quan đến xử lý đăng nhập ở đây
        // Ví dụ:
        // document.getElementById('loginForm').onsubmit = function(e) { ... }

        // Cập nhật hàm xử lý đăng ký
        document.getElementById('registerFormElement').onsubmit = function(e) {
            e.preventDefault();
            const username = document.getElementById('registerUsername').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                alert('Mật khẩu xác nhận không khớp');
                return;
            }

            const newUser = {
                id: getUsers().length + 1,
                username: username,
                email: email,
                password: password,
                balance: 0,
                transferCode: generateTransferCode()
            };

            addUser(newUser);
            console.log('New user registered:', newUser);
            console.log('Updated users list:', getUsers());
            alert('Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.');
            // Chuyển về form đăng nhập
            document.getElementById('loginForm').style.display = 'block';
            document.getElementById('registerForm').style.display = 'none';
        }

        // Thêm xử lý đăng nhập
        document.getElementById('loginFormElement').onsubmit = function(e) {
            e.preventDefault();
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;
            
            console.log('Attempting login for:', username);
            const users = getUsers(); // Sử dụng hàm getUsers từ shared-data.js
            console.log('Current users:', users);

            const user = users.find(u => u.username === username && u.password === password);
            
            if (user) {
                console.log('Login successful for user:', user);
                window.currentUser = {...user};  // Create a copy of the user object
                localStorage.setItem('currentUser', JSON.stringify(window.currentUser));
                updateUIAfterLogin();
                document.getElementById('authModal').style.display = 'none';
                alert('Đăng nhập thành công!');
                // Thêm dòng này để cập nhật UI cho các nút mua và nạp tiền
                updateButtonsAfterLogin();
            } else {
                console.log('Login failed. No matching user found.');
                console.log('Entered username:', username);
                console.log('Entered password:', password);
                console.log('Available users:', users);
                alert('Tên đăng nhập hoặc mật khẩu không đúng!');
            }
        }

        // Xử lý quên mật khẩu
        document.getElementById('forgotPassword').onsubmit = function(e) {
            e.preventDefault();
            const email = document.getElementById('forgotEmail').value;
            console.log('Yêu cầu đặt lại mật khẩu cho:', email);
            // Thêm logic xử lý quên mật khẩu ở đây
        }

        let currentUser = null;
        let accountBalance = 0;

        function updateAccountBalance() {
            const balanceElement = document.getElementById('accountBalance');
            balanceElement.textContent = `Số dư: ${accountBalance.toLocaleString('vi-VN')} VNĐ`;
        }

        function updateUIAfterLogin() {
            console.log('Bắt đầu cập nhật UI sau khi đăng nhập');
            
            document.getElementById('loginContainer').style.display = 'none';
            document.getElementById('registerContainer').style.display = 'none';
            document.getElementById('logoutContainer').style.display = 'block';
            document.getElementById('balanceContainer').style.display = 'block';
            document.getElementById('transferCodeContainer').style.display = 'block';
            document.getElementById('depositContainer').style.display = 'block';

            if (window.currentUser) {
                document.getElementById('accountBalance').textContent = `Số dư: ${window.currentUser.balance.toLocaleString('vi-VN')} VNĐ`;
                document.getElementById('transferCodeDisplay').textContent = window.currentUser.transferCode || generateRandomCode();
            }

            console.log('Kết thúc cập nhật UI sau khi đăng nhp');
        }

        function updateUIAfterLogout() {
            document.getElementById('loginContainer').style.display = 'block';
            document.getElementById('registerContainer').style.display = 'block';
            document.getElementById('logoutContainer').style.display = 'none';
            document.getElementById('balanceContainer').style.display = 'none';
            document.getElementById('transferCodeContainer').style.display = 'none';
            document.getElementById('depositContainer').style.display = 'none';
        }

        // Add logout functionality
        document.getElementById('logoutBtn').onclick = function() {
            const users = getUsers();
            const updatedUser = users.find(u => u.id === window.currentUser.id);
            if (updatedUser) {
                Object.assign(updatedUser, window.currentUser);
                updateUsers(users);
            }
            window.currentUser = null;
            localStorage.removeItem('currentUser');
            updateUIAfterLogout();
            alert('Đăng xuất thành công!');
            console.log('Users after logout:', getUsers());
        }

        // Initialize the UI
        window.onload = function() {
            displayGameStores();
            updateUIAfterLogout(); // Ensure the UI is in the correct state on page load
        };

        // Thêm vào cuối file
        if (typeof displayGameStores === 'function') {
            displayGameStores();
        }

        // Thêm đoạn code này vào cuối file
        console.log('Current users:', users);
    });

    // Đảm bảo rằng bạn đang sử dụng biến users từ phạm vi toàn cục
    if (typeof window.users === 'undefined') {
        console.error('users is not defined. Make sure shared-data.js is loaded before script1.js');
    }
})();