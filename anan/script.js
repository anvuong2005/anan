// Mảng chứa thông tin key game (ví dụ)
const gameKeys = [
    { id: 1, game: "Liên Quân Mobile ( No Menu )", hinhAnh: "lienquan.jpg", options: [
        { type: "2 tiếng", price: 10000, description: "Bản Thường" },
        { type: "1 ngày", price: 20000, description: "Bản Thường" },
        { type: "1 tuần", price: 100000, description: "Bản Vip - Liên hệ Admin để tải" },
        { type: "1 tháng", price: 150000, description: "Bản Vip - Liên hệ Admin để tải" },
        { type: "2 tháng", price: 200000, description: "Bản Vip - Liên hệ Admin để tải" },
    ]},
    { id: 2, game: "Liên Quân Mobile ( Có Menu )", hinhAnh: "lienquan.jpg", options: [
        { type: "2 tiếng", price: 20000, description: "Bản Thường" },
        { type: "1 ngày", price: 30000, description: "Bản Thường" },
        { type: "1 tuần", price: 150000, description: "Bản Vip - Liên hệ Admin để tải" },
        { type: "1 tháng", price: 200000, description: "Bản Vip - Liên hệ Admin để tải" },
        { type: "2 tháng", price: 250000, description: "Bản Vip - Liên hệ Admin để tải" },
    ]},

    { id: 3, game: "Pubg Mobile", hinhAnh: "pubg.jpg", options: [
        { type: "3 tiếng", price: 20000, description: "Bản Thường" },
        { type: "1 ngày", price: 30000, description: "Bản Thường" },
        { type: "1 tuần", price: 100000, description: "Bản Vip - Liên hệ Admin để tải" },
        { type: "1 tháng", price: 150000, description: "Bản Vip - Liên hệ Admin để tải" },
        { type: "2 tháng", price: 200000, description: "Bản Vip - Liên hệ Admin để tải" },
    ]},

    { id: 4, game: "Tốc Chiến", hinhAnh: "tocchien.jpg", options: [
        { type: "3 tiếng", price: 20000, description: "Bản Thường" },
        { type: "1 Ngày", price: 30000, description: "Bản Thường" },
        { type: "1 Tuần", price: 100000, description: "Bản Vip - Liên hệ Admin để tải" },
        { type: "1 Tháng", price: 150000, description: "Bản Vip - Liên hệ Admin để tải" },
        { type: "2 Thng", price: 200000, description: "Bản Vip - Liên hệ Admin để tải" }
    ]},

    { id: 5, game: "Call of Duty Mobile", hinhAnh: "codm.jpg", options: [
        { type: "3 tiếng", price: 20000, description: "Bản Thường" },
        { type: "1 Ngày", price: 30000, description: "Bản Thường" },
        { type: "1 Tuần", price: 100000, description: "Bản Vip - Liên hệ Admin để tải" },
        { type: "1 Tháng", price: 150000, description: "Bản Vip - Liên hệ Admin để tải" },
        { type: "2 Tháng", price: 200000, description: "Bản Vip - Liên hệ Admin để tải" }
    ]},
    // ... Thêm các game khác với nhiều lựa chọn tương tự ...
];

// Cấu trúc dữ liệu mới cho các kho game
const gameStores = [
    {
        id: 10,
        name: "Hack Map Liên Quân Mobile",
        games: [
            { id: 1, game: "Liên Quân Mobile ( No Menu )", hinhAnh: "lienquan.jpg", options: [
                { type: "2 tiếng", price: 10000, description: "Bản Thường" },
                { type: "1 ngày", price: 20000, description: "Bản Thường" },
                { type: "1 tuần", price: 100000, description: "Bản Vip - Liên hệ Admin để tải" },
                { type: "1 tháng", price: 150000, description: "Bản Vip - Liên hệ Admin để tải" },
                { type: "2 tháng", price: 200000, description: "Bản Vip - Liên hệ Admin để tải" },
            ]},
            { id: 2, game: "Liên Quân Mobile ( Có Menu )", hinhAnh: "lienquan.jpg", options: [
                { type: "2 tiếng", price: 20000, description: "Bản Thường" },
                { type: "1 ngày", price: 30000, description: "Bản Thường" },
                { type: "1 tuần", price: 150000, description: "Bản Vip - Liên hệ Admin để tải" },
                { type: "1 tháng", price: 200000, description: "Bản Vip - Liên hệ Admin để tải" },
                { type: "2 tháng", price: 250000, description: "Bản Vip - Liên hệ Admin để tải" },
            ]},
        
        
            // ... existing Liên Quân Mobile, Pubg Mobile, Tốc Chiến, Call of Duty Mobile ...
        ]
    },
    {
        id: 20,
        name: "Hack Pubg Mobile",
        games: [
             { id: 3, game: "Pubg Mobile", hinhAnh: "pubg.jpg", options: [
                { type: "3 tiếng", price: 20000, description: "Bản Thường" },
                { type: "1 ngày", price: 30000, description: "Bản Thường" },
                { type: "1 tuần", price: 100000, description: "Bản Vip - Liên hệ Admin để tải" },
                { type: "1 tháng", price: 150000, description: "Bản Vip - Liên hệ Admin để tải" },
                { type: "2 tháng", price: 200000, description: "Bản Vip - Liên hệ Admin để tải" },
            ]},
        
            
        ]
    },
    {
        id: 30,
        name: "Hack Tốc Chiến",
        games: [

            { id: 4, game: "Tốc Chiến", hinhAnh: "tocchien.jpg", options: [
                { type: "3 tiếng", price: 20000, description: "Bản Thường" },
                { type: "1 Ngày", price: 30000, description: "Bản Thường" },
                { type: "1 Tuần", price: 100000, description: "Bản Vip - Liên hệ Admin để tải" },
                { type: "1 Tháng", price: 150000, description: "Bản Vip - Liên hệ Admin để tải" },
                { type: "2 Tháng", price: 200000, description: "Bản Vip - Liên hệ Admin để tải" }
            ]},
            // ... other game keys ...
        ]
    },
    {
        id: 40,
        name: "Hack Call of Duty Mobile",
        games: [
            { id: 5, game: "Call of Duty Mobile", hinhAnh: "codm.jpg", options: [
                { type: "3 tiếng", price: 20000, description: "Bản Thường" },
                { type: "1 Ngày", price: 30000, description: "Bản Thường" },
                { type: "1 Tuần", price: 100000, description: "Bản Vip - Liên hệ Admin để tải" },
                { type: "1 Tháng", price: 150000, description: "Bản Vip - Liên hệ Admin để tải" },
                { type: "2 Tháng", price: 200000, description: "Bản Vip - Liên hệ Admin để tải" }
            ]},
            // ... other game keys ...
        ]
    },
    // ... other game stores ...
];

// Hiển thị danh sách kho game và các game trong mỗi kho
function displayGameStores() {
    const gameKeyList = document.getElementById('game-key-list');
    gameKeyList.innerHTML = '';

    gameStores.forEach(store => {
        const storeSection = document.createElement('div');
        storeSection.classList.add('game-store');
        storeSection.innerHTML = `
            <div class="store-header">
                <h2>${store.name}</h2>
                <button class="toggle-btn"><i class="fas fa-chevron-down"></i></button>
            </div>
            <div class="store-content">
                <!-- Game content will be added here -->
            </div>
        `;

        const storeContent = storeSection.querySelector('.store-content');
        const toggleBtn = storeSection.querySelector('.toggle-btn');

        store.games.forEach(gameKey => {
            const gameKeyItem = document.createElement('div');
            gameKeyItem.classList.add('game-key-item');
            gameKeyItem.innerHTML = `
                <img src="images/${gameKey.hinhAnh}" alt="${gameKey.game}" class="hinh-anh-game">
                <h3>${gameKey.game}</h3>
                <select id="options-${gameKey.id}">
                    ${gameKey.options.map((option, index) => `
                        <option value="${index}">
                            ${option.type} - ${option.price.toLocaleString('vi-VN')} VNĐ - ${option.description}
                        </option>
                    `).join('')}
                </select>
                <button id="buy-btn-${gameKey.id}" class="buy-button" onclick="buyGameKey(${gameKey.id})">
                    ${window.currentUser ? 'Mua ngay' : 'Đăng nhập để mua'}
                </button>
            `;
            storeContent.appendChild(gameKeyItem);
        });

        toggleBtn.addEventListener('click', () => {
            storeContent.classList.toggle('open');
            toggleBtn.classList.toggle('open');
        });

        gameKeyList.appendChild(storeSection);
    });
}

// Cập nhật hàm buyGameKey
function buyGameKey(id) {
    if (!window.currentUser) {
        alert('Vui lòng đăng nhập để mua sản phẩm.');
        return;
    }

    const gameKey = getAllGames().find(game => game.id === id);
    if (!gameKey) {
        alert('Không tìm thấy sản phẩm.');
        return;
    }

    const selectedOption = document.getElementById(`options-${id}`).value;
    const option = gameKey.options[selectedOption];
    const price = option.price;

    if (window.currentUser.balance < price) {
        alert('Số dư không đủ để mua sản phẩm này. Vui lòng nạp thêm tiền.');
        return;
    }

    const confirmed = confirm(`Bạn có chắc chắn muốn mua ${gameKey.game} (${option.description}) với giá ${price.toLocaleString('vi-VN')} VNĐ không?`);
    
    if (confirmed) {
        console.log('Số dư trước khi mua:', window.currentUser.balance);
        window.currentUser.balance -= price;
        console.log('Số dư sau khi mua:', window.currentUser.balance);
        
        // Cập nhật dữ liệu người dùng trong localStorage và mảng users
        let users = getUsers();
        const userIndex = users.findIndex(user => user.id === window.currentUser.id);
        if (userIndex !== -1) {
            users[userIndex] = {...users[userIndex], balance: window.currentUser.balance};
            updateUsers(users);
            localStorage.setItem('currentUser', JSON.stringify(window.currentUser));
        }

        console.log('User data sau khi cập nhật:', window.currentUser);
        console.log('Dữ liệu users sau khi cập nhật:', getUsers());

        // Tạo giao dịch mua key mới
        const newTransaction = {
            id: getData('transactions').length + 1,
            userId: window.currentUser.id,
            type: 'Mua key',
            amount: price,
            status: 'Hoàn thành',
            date: new Date().toISOString(),
            details: `Mua key game ${gameKey.game} (${option.description})`
        };

        // Cập nhật dữ liệu giao dịch
        const transactions = getData('transactions') || [];
        transactions.push(newTransaction);
        updateData('transactions', transactions);

        // Cập nhật giao diện
        updateUIAfterPurchase();

        alert(`Bạn đã mua thành công ${gameKey.game} (${option.description}). Số dư còn lại: ${window.currentUser.balance.toLocaleString('vi-VN')} VNĐ`);
    }
}

function updateUIAfterPurchase() {
    const balanceElement = document.getElementById('accountBalance');
    if (balanceElement) {
        balanceElement.textContent = `Số dư: ${window.currentUser.balance.toLocaleString('vi-VN')} VNĐ`;
    }
    // Cập nhật các phần khác của UI nếu cần
}

// Khởi tạo trang web
document.addEventListener('DOMContentLoaded', function() {
    displayGameStores();
    // Các hàm khởi tạo khác...
});

// Xuất các hàm cần thiết
window.buyGameKey = buyGameKey;
window.updateUIAfterLogin = updateUIAfterLogin;

// Hàm cập nhật UI sau khi đăng nhập
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
        const transferCodeDisplay = document.getElementById('transferCodeDisplay');
        if (transferCodeDisplay) {
            transferCodeDisplay.textContent = window.currentUser.transferCode || 'N/A';
        } else {
            console.error('Element with id "transferCodeDisplay" not found');
        }
    }

    document.getElementById('transferCodeContainer').style.display = 'inline-block';
    document.getElementById('copyTransferCode').style.display = 'inline-block';

    console.log('Kết thúc cập nhật UI sau khi đăng nhập');
    console.log('Current user after login:', window.currentUser);

    updateButtonsAfterLogin();
}

function generateRandomCode() {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
}

function logout() {
    console.log('Logging out');
    const currentUser = getCurrentUser();
    if (currentUser) {
        addOrUpdateUser(currentUser);
        console.log('User data updated before logout:', currentUser);
    }
    clearCurrentUser();
    updateUIAfterLogout();
    console.log('Logout completed');
}

function updateUIAfterLogout() {
    document.getElementById('loginContainer').style.display = 'block';
    document.getElementById('registerContainer').style.display = 'block';
    document.getElementById('logoutContainer').style.display = 'none';
    document.getElementById('balanceContainer').style.display = 'none';
    document.getElementById('transferCodeContainer').style.display = 'none';
    document.getElementById('depositContainer').style.display = 'none';
}

// Kiểm tra trạng thái đăng nhập khi tải trang
document.addEventListener('DOMContentLoaded', function() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        window.currentUser = JSON.parse(savedUser);
        updateUIAfterLogin();
    } else {
        updateUIAfterLogout();
    }
    displayGameStores();
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('loginContainer:', document.getElementById('loginContainer'));
    console.log('registerContainer:', document.getElementById('registerContainer'));
    console.log('logoutContainer:', document.getElementById('logoutContainer'));
    console.log('balanceContainer:', document.getElementById('balanceContainer'));
    console.log('transferCodeContainer:', document.getElementById('transferCodeContainer'));
    console.log('depositContainer:', document.getElementById('depositContainer'));
});

document.addEventListener('userLoggedIn', function() {
    console.log('User logged in event received');
    updateUIAfterLogin();
});

window.addEventListener('storage', function(e) {
    if (e.key === 'currentUser') {
        console.log('currentUser changed in localStorage:', e.newValue);
        window.currentUser = JSON.parse(e.newValue);
        updateUIAfterPurchase();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const copyButton = document.getElementById('copyTransferCode');
    if (copyButton) {
        copyButton.addEventListener('click', function() {
            const transferCode = document.getElementById('transferCodeDisplay').textContent;
            navigator.clipboard.writeText(transferCode).then(function() {
                alert('Đã sao chép mã chuyển khoản!');
            }, function(err) {
                console.error('Không thể sao chép mã: ', err);
            });
        });
    }
});

// Thay thế hàm checkUserData hiện tại bằng đoạn code sau
function checkUserData() {
    console.log('Checking user data...');
    const currentUser = getCurrentUser();
    console.log('Current user:', currentUser);
    console.log('Users in localStorage:', getUsers());
}

// Gọi hàm này sau mỗi thao tác quan trọng
document.addEventListener('DOMContentLoaded', checkUserData);
document.getElementById('depositBtn').addEventListener('click', () => {
    setTimeout(checkUserData, 1000);  // Kiểm tra sau khi nạp tiền
});
document.getElementById('logoutBtn').addEventListener('click', () => {
    setTimeout(checkUserData, 1000);  // Kiểm tra sau khi đăng xuất
});

function updateButtonsAfterLogin() {
    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
        button.textContent = 'Mua ngay';
    });
    const depositBtn = document.getElementById('depositBtn');
    if (depositBtn) {
        depositBtn.onclick = handleDeposit;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, checking for saved user");
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        console.log("Found saved user:", savedUser);
        window.currentUser = JSON.parse(savedUser);
        updateUIAfterLogin();
        updateButtonsAfterLogin();
    } else {
        console.log("No saved user found");
    }

    displayGameStores();
});

// Thêm vào cuối file script.js

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('authModal');
    const closeBtn = modal.querySelector('.close');

    // Đóng modal khi nhấp vào nút đóng
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    // Đóng modal khi nhấp vào bên ngoài modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Hiển thị modal khi nhấp vào nút đăng nhập hoặc đăng ký
    document.getElementById('loginBtn').onclick = function() {
        modal.style.display = "block";
        document.getElementById('loginForm').style.display = "block";
        document.getElementById('registerForm').style.display = "none";
    }

    document.getElementById('registerBtn').onclick = function() {
        modal.style.display = "block";
        document.getElementById('loginForm').style.display = "none";
        document.getElementById('registerForm').style.display = "block";
    }

    // Thêm đoạn code sau vào cuối file script.js

document.addEventListener('DOMContentLoaded', function() {
    const dragon = document.getElementById('dragon');
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;

    function moveDragon() {
        x += (targetX - x) * 0.1;
        y += (targetY - y) * 0.1;

        dragon.style.transform = `translate(${x}px, ${y}px)`;

        requestAnimationFrame(moveDragon);
    }

    function updateTargetPosition() {
        targetX = Math.random() * (window.innerWidth - 100);
        targetY = Math.random() * (window.innerHeight - 100);
    }

    updateTargetPosition();
    setInterval(updateTargetPosition, 2000);
    moveDragon();
});
});