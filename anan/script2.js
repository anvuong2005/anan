console.log('Initial users data:', getData('users'));

// Các biến DOM
const modal = document.getElementById('authModal');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const switchToRegister = document.getElementById('switchToRegister');
const switchToLogin = document.getElementById('switchToLogin');
const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const backToLogin = document.getElementById('backToLogin');

// Hiển thị modal đăng nhập
document.getElementById('loginBtn').onclick = function() {
    showLoginForm();
    modal.style.display = 'block';
};

// Hiển thị modal đăng ký
document.getElementById('registerBtn').onclick = function() {
    showRegisterForm();
    modal.style.display = 'block';
};

// Chuyển đổi giữa các form
switchToRegister.onclick = function(e) {
    e.preventDefault();
    showRegisterForm();
};

switchToLogin.onclick = function(e) {
    e.preventDefault();
    showLoginForm();
};

forgotPasswordLink.onclick = function(e) {
    e.preventDefault();
    showForgotPasswordForm();
};

backToLogin.onclick = function(e) {
    e.preventDefault();
    showLoginForm();
};

// Hàm hiển thị form
function showLoginForm() {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    forgotPasswordForm.style.display = 'none';
}

function showRegisterForm() {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    forgotPasswordForm.style.display = 'none';
}

function showForgotPasswordForm() {
    loginForm.style.display = 'none';
    registerForm.style.display = 'none';
    forgotPasswordForm.style.display = 'block';
}

// Xử lý đóng modal
document.getElementsByClassName('close')[0].onclick = function() {
    modal.style.display = 'none';
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

// Thêm một mảng để lưu trữ thông tin người dùng
let currentUser = null;

// Hàm tạo mã chuyển tiền ngẫu nhiên
function generateTransferCode() {
    return Math.random().toString(36).substr(2, 8).toUpperCase();
}

// Cập nhật hàm xử lý đăng ký
function handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Mật khẩu không khớp!');
        return;
    }

    const users = getUsers();
    if (users.some(u => u.username === username)) {
        alert('Tên đăng nhập đã tồn tại!');
        return;
    }

    const newUser = {
        id: users.length + 1,
        username: username,
        email: email,
        password: password,
        balance: 0,
        transferCode: generateTransferCode() // Thêm dòng này
    };

    addUser(newUser);
    alert('Đăng ký thành công!');
    document.getElementById('authModal').style.display = 'none';
}

// Đảm bảo rằng hàm này được gắn vào form đăng ký một lần duy nhất
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerFormElement');
    if (registerForm) {
        // Xóa tất cả các event listener cũ
        registerForm.replaceWith(registerForm.cloneNode(true));
        // Gắn event listener mới
        document.getElementById('registerFormElement').addEventListener('submit', handleRegister);
        console.log('Register form handler attached');
    } else {
        console.error('Register form not found');
    }
});

// Hàm hiển thị mã chuyển tiền
function showTransferCode() {
    if (window.currentUser && window.currentUser.transferCode) {
        alert(`Mã chuyển tiền của bạn là: ${window.currentUser.transferCode}`);
    } else {
        alert('Không thể hiển thị mã chuyển tiền. Vui lòng đăng nhập lại.');
    }
}

// Cập nhật hàm updateUIAfterLogin
function updateUIAfterLogin() {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('registerContainer').style.display = 'none';
    document.getElementById('logoutContainer').style.display = 'block';
    document.getElementById('balanceContainer').style.display = 'block';
    document.getElementById('transferCodeContainer').style.display = 'block';
    document.getElementById('depositContainer').style.display = 'block';
    
    // Update balance and transfer code display
    document.getElementById('accountBalance').textContent = `Số dư: ${window.currentUser.balance.toLocaleString('vi-VN')} VNĐ`;
    document.getElementById('transferCodeDisplay').textContent = window.currentUser.transferCode;
    
    console.log('UI updated after login');
    displayPendingDepositsForUser();
}

// Thêm hàm updateUIAfterLogout
function updateUIAfterLogout() {
    document.getElementById('loginContainer').style.display = 'block';
    document.getElementById('registerContainer').style.display = 'block';
    document.getElementById('logoutContainer').style.display = 'none';
    document.getElementById('balanceContainer').style.display = 'none';
    document.getElementById('transferCodeContainer').style.display = 'none';
    document.getElementById('depositContainer').style.display = 'none';
    console.log('UI updated after logout');
}

// Cập nhật hàm checkLoginStatus
function checkLoginStatus() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        window.currentUser = JSON.parse(savedUser);
        updateUIAfterLogin();
    }
}

// Thêm hàm này để khởi tạo UI khi trang được tải
function initializeUI() {
    console.log('Initializing UI');
    checkLoginStatus();
}

// Gọi hàm này khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing UI');
    initializeUI();
});

// Thêm xử lý cho nút xem mã chuyển tiền
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, attaching event listeners');
    const showTransferCodeBtn = document.getElementById('showTransferCodeBtn');
    if (showTransferCodeBtn) {
        showTransferCodeBtn.addEventListener('click', showTransferCode);
        console.log('Transfer code button handler attached');
    } else {
        console.error('Transfer code button not found');
    }
});

// Định nghĩa hàm showTransferCode nếu chưa có
function showTransferCode() {
    // Thêm logic để hiển thị mã chuyển tiền ở đây
    console.log('Hiển thị mã chuyển tiền');
}

// Thêm định nghĩa cho hàm closeModal
function closeModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Đảm bảo rằng closeModal được xuất ra global scope
window.closeModal = closeModal;

// Xuất các hàm cần thiết
window.handleRegister = handleRegister;
window.updateUIAfterLogout = updateUIAfterLogout;
window.updateUIAfterLogin = updateUIAfterLogin;
window.showTransferCode = showTransferCode;

// Thêm vào cuối file
console.log('script2.js loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, checking elements');
    const elements = [
        'balanceContainer', 'depositContainer', 'loginContainer', 
        'registerContainer', 'logoutContainer', 'transferCodeContainer', 
        'accountBalance', 'transferCodeDisplay', 'authModal', 'depositBtn'
    ];

    elements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            console.log(`${id} found`);
        } else {
            console.error(`${id} not found`);
        }
    });
});

function logout() {
    console.log('Logging out');
    if (window.currentUser) {
        const users = getUsers();
        const updatedUserIndex = users.findIndex(u => u.id === window.currentUser.id);
        if (updatedUserIndex !== -1) {
            users[updatedUserIndex] = {...users[updatedUserIndex], ...window.currentUser};
            updateUsers(users);
        }
    }
    localStorage.removeItem('currentUser');
    window.currentUser = null;
    updateUIAfterLogout();
    console.log('Logout completed');
}

document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    } else {
        console.error('Logout button not found');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        window.currentUser = JSON.parse(savedUser);
        updateUIAfterLogin();
    } else {
        updateUIAfterLogout();
    }
    console.log('Initial UI state set');
});

document.getElementById('loginFormElement').onsubmit = function(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    console.log('Attempting login for:', username);
    const users = getUsers();
    console.log('Current users:', users);

    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        console.log('Login successful for user:', user);
        window.currentUser = {...user};  // Create a copy of the user object
        localStorage.setItem('currentUser', JSON.stringify(window.currentUser));
        updateUIAfterLogin();
        document.getElementById('authModal').style.display = 'none';
        alert('Đăng nhập thành công!');
    } else {
        console.log('Login failed. No matching user found.');
        console.log('Entered username:', username);
        console.log('Entered password:', password);
        alert('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
}

console.log('getUsers function:', typeof getUsers);
console.log('updateUsers function:', typeof updateUsers);
console.log('addUser function:', typeof addUser);
