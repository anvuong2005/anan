// Dữ liệu chung
window.users = [
    // ...
];

// bằng đoạn code sau
let users = JSON.parse(localStorage.getItem('users')) || [];

// Hàm cập nhật dữ liệu người dùng
function updateUsers(updatedUsers) {
    updatedUsers = updatedUsers.map(user => {
        if (!user.transferCode) {
            user.transferCode = generateTransferCode();
        }
        return user;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    console.log('Updated users in localStorage:', updatedUsers);
}

window.transactions = [];
window.games = [];

// Thêm dữ liệu game từ trang web chính
window.gameStores = [
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
                { type: "1 ngày", price: 30000, description: "Bn Thường" },
                { type: "1 tuần", price: 150000, description: "Bản Vip - Liên hệ Admin để tải" },
                { type: "1 tháng", price: 200000, description: "Bản Vip - Liên hệ Admin để tải" },
                { type: "2 tháng", price: 250000, description: "Bản Vip - Liên hệ Admin để tải" },
            ]},
        ]
    },
    // ... other game stores ...
];

// Hàm để lấy tất cả các game từ tất cả các kho
function getAllGames() {
    return gameStores.flatMap(store => store.games);
}

// Thêm biến để lưu trữ thông tin về tiền ảo
// let virtualCurrencies = [
//     { id: 1, name: 'GameCoin', exchangeRate: 1000 }, // 1 GameCoin = 1000 VNĐ
//     { id: 2, name: 'StarToken', exchangeRate: 2000 }, // 1 StarToken = 2000 VNĐ
// ];

// Cập nhật hàm updateData
function updateData(dataType, newData) {
    switch(dataType) {
        case 'users':
            users = newData;
            break;
        case 'transactions':
            transactions = newData;
            break;
        case 'games':
            games = newData;
            break;
        // Remove this case: case 'virtualCurrencies': ...
        case 'pendingDeposits':
            pendingDeposits = newData;
            break;
    }
    // Cập nhật giao diện người dùng
    if (typeof updateUIForUser === 'function') updateUIForUser();
    if (typeof updateUIForAdmin === 'function') updateUIForAdmin();
    saveDataToLocalStorage();
}

// Cập nhật hàm getData
function getData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// Thêm hàm để chuyển đổi tiền thật sang tiền ảo
// function convertToVirtualCurrency(amount, currencyId) { ... }

// Thêm hàm để chuyển đổi tiền ảo sang tiền thật
// function convertFromVirtualCurrency(amount, currencyId) { ... }

// Thêm mảng transactions nếu chưa có
if (!getData('transactions')) {
    updateData('transactions', []);
}

// Thêm mảng để lưu trữ các giao dịch nạp tiền đang chờ xử lý
let pendingDeposits = [];

// Thêm một số dữ liệu mẫu cho người dùng và giao dịch
if (!getData('users')) {
    updateData('users', [
        { id: 1, username: 'user1', email: 'user1@example.com', password: 'password1', balance: 0, transferCode: 'ABC123' },
        { id: 2, username: 'user2', email: 'user2@example.com', password: 'password2', balance: 0, transferCode: 'XYZ789' }
    ]);
}

if (!getData('transactions')) {
    updateData('transactions', []);
}

if (!getData('pendingDeposits')) {
    updateData('pendingDeposits', []);
}

// Thêm vào cuối file
window.bankAccounts = [
    { bank: "Vietcombank", accountNumber: "1234567890", accountName: "NGUYEN VAN A" },
    { bank: "Techcombank", accountNumber: "0987654321", accountName: "NGUYEN VAN A" },
    { bank: "MBBank", accountNumber: "1357924680", accountName: "NGUYEN VAN A" }
];

// Lưu dữ liệu
function saveData() {
    localStorage.setItem('users', JSON.stringify(window.users));
    localStorage.setItem('transactions', JSON.stringify(window.transactions));
    // ... lưu các dữ liệu khác
}

// Tải dữ liệu
function loadData() {
    window.users = JSON.parse(localStorage.getItem('users')) || [];
    window.transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    // ... tải các dữ liệu khác
}

// Gọi loadData khi khởi động ứng dụng
document.addEventListener('DOMContentLoaded', loadData);

// Thêm vào cui file
function saveDataToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('transactions', JSON.stringify(transactions));
    localStorage.setItem('games', JSON.stringify(games));
    // Remove this line: localStorage.setItem('virtualCurrencies', JSON.stringify(virtualCurrencies));
    localStorage.setItem('pendingDeposits', JSON.stringify(pendingDeposits));
    console.log("All data saved to localStorage");
}

function loadDataFromLocalStorage() {
    users = JSON.parse(localStorage.getItem('users')) || users;
    transactions = JSON.parse(localStorage.getItem('transactions')) || transactions;
    games = JSON.parse(localStorage.getItem('games')) || games;
    // Remove this line: virtualCurrencies = JSON.parse(localStorage.getItem('virtualCurrencies')) || virtualCurrencies;
    pendingDeposits = JSON.parse(localStorage.getItem('pendingDeposits')) || pendingDeposits;
}

// Gọi hàm này mỗi khi có thay đổi dữ liệu
function updateData(dataType, newData) {
    // ... code hiện tại ...
    saveDataToLocalStorage();
}

// Gọi hàm này khi khởi động ng dụng
document.addEventListener('DOMContentLoaded', loadDataFromLocalStorage);

function initializeData() {
    console.log('Initializing data...');
    if (!getData('users')) {
        console.log('No users found, creating initial users');
        updateData('users', [
            {id: 1, username: 'user1', password: 'pass1', balance: 100000, transferCode: 'ABC123'},
            {id: 2, username: 'user2', password: 'pass2', balance: 200000, transferCode: 'DEF456'}
        ]);
    }
    // ... other initializations ...
}

// Gi hàm này khi trang web được tải
document.addEventListener('DOMContentLoaded', initializeData);

// Khởi tạo dữ liệu người dùng nếu chưa có
if (!getData('users')) {
    const initialUsers = [
        {id: 1, username: 'user1', password: 'password1', balance: 0, transferCode: 'ABC123'},
        {id: 2, username: 'user2', password: 'password2', balance: 0, transferCode: 'DEF456'}
    ];
    localStorage.setItem('users', JSON.stringify(initialUsers));
}

console.log("Initial users data:", getData('users'));

function resetData() {
    localStorage.clear();
    console.log("All data has been cleared");
    location.reload();
}

document.addEventListener('DOMContentLoaded', function() {
    if (!getData('users')) {
        updateData('users', [
            {id: 1, username: 'user1', password: 'password1', balance: 0, transferCode: 'ABC123'},
            {id: 2, username: 'user2', password: 'password2', balance: 0, transferCode: 'DEF456'}
        ]);
    }
    if (!getData('transactions')) {
        updateData('transactions', []);
    }
    if (!getData('pendingDeposits')) {
        updateData('pendingDeposits', []);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    users = JSON.parse(localStorage.getItem('users')) || [];
    console.log('Loaded users:', users);
});

// Thêm hàm này vào shared-data.js
function addUser(newUser) {
    users.push(newUser);
    updateUsers();
    console.log('New user added:', newUser);
}

// Hàm để lấy dữ liệu người dùng từ localStorage
function getUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    console.log('Retrieved users from localStorage:', users);
    return users;
}

// Hàm để cập nhật dữ liệu người dùng trong localStorage
function updateUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
    console.log('Updated users in localStorage:', users);
}

// Hàm để thêm người dùng mới
function addUser(newUser) {
    const users = getUsers();
    users.push(newUser);
    updateUsers(users);
    console.log('New user added:', newUser);
}

// Xuất các hàm này ra global scope
window.getUsers = getUsers;
window.updateUsers = updateUsers;
window.addUser = addUser;

document.addEventListener('DOMContentLoaded', function() {
    if (!getUsers().length) {
        console.log('Initializing user data...');
        const initialUsers = [
            {id: 1, username: 'user1', password: 'password1', balance: 0, transferCode: 'ABC123'},
            {id: 2, username: 'user2', password: 'password2', balance: 0, transferCode: 'DEF456'}
        ];
        updateUsers(initialUsers);
        console.log('User data initialized:', getUsers());
    } else {
        console.log('Existing user data found:', getUsers());
    }
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('Current users in localStorage:', getUsers());
});

// Thêm hàm này nếu chưa có
function generateTransferCode() {
    return Math.random().toString(36).substr(2, 8).toUpperCase();
}

window.generateTransferCode = generateTransferCode;

function ensureAllUsersHaveTransferCodes() {
    const users = getUsers();
    const updatedUsers = users.map(user => {
        if (!user.transferCode) {
            user.transferCode = generateTransferCode();
        }
        return user;
    });
    updateUsers(updatedUsers);
}

// Gọi hàm này khi khởi động ứng dụng
document.addEventListener('DOMContentLoaded', ensureAllUsersHaveTransferCodes);

// Thêm hàm này để đảm bảo dữ liệu người dùng được khởi tạo
function initializeUserData() {
    const users = getUsers();
    if (users.length === 0) {
        console.log('Initializing user data...');
        const initialUsers = [
            {id: 1, username: 'user1', password: 'password1', balance: 0, transferCode: 'ABC123'},
            {id: 2, username: 'user2', password: 'password2', balance: 0, transferCode: 'DEF456'}
        ];
        updateUsers(initialUsers);
        console.log('User data initialized:', getUsers());
    } else {
        console.log('Existing user data found:', users);
    }
}

// Gọi hàm này khi trang web được tải
document.addEventListener('DOMContentLoaded', initializeUserData);

function repairUserData() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    console.log('Repairing user data...');
    console.log('Current users:', users);
    console.log('Current user:', currentUser);

    if (currentUser && !users.some(u => u.id === currentUser.id)) {
        users.push(currentUser);
        console.log('Added current user back to users array');
    }

    users = users.map(user => ({
        id: user.id,
        username: user.username,
        password: user.password,
        balance: user.balance || 0,
        transferCode: user.transferCode || generateTransferCode()
    }));

    localStorage.setItem('users', JSON.stringify(users));
    console.log('Repaired users:', users);
}

// Gọi hàm này khi trang web được tải
document.addEventListener('DOMContentLoaded', repairUserData);

// Thêm đoạn code này vào cuối file shared-data.js

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

// Xuất hàm ra global scope
window.getCurrentUser = getCurrentUser;
