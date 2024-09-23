// Thêm biến để kiểm tra trạng thái đăng nhập của admin
let isAdminLoggedIn = false;
const ADMIN_PASSWORD = 'admin123'; // Thay đổi mật khẩu này trong môi trường thực tế

// Hàm đăng nhập admin
function adminLogin() {
    const password = prompt("Nhập mật khẩu admin:");
    if (password === ADMIN_PASSWORD) {
        isAdminLoggedIn = true;
        document.body.classList.add('admin-logged-in');
        loadAdminDashboard();
        document.getElementById('adminLoginBtn').style.display = 'none';
        document.getElementById('adminLogoutBtn').style.display = 'block';
        alert("Đăng nhập admin thành công!");
        
        // Thêm đoạn này để đồng bộ dữ liệu
        loadDataFromLocalStorage();
    } else {
        alert("Mật khẩu không đúng!");
    }
}

// Hàm đăng xuất admin
function adminLogout() {
    isAdminLoggedIn = false;
    document.body.classList.remove('admin-logged-in');
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('adminLoginBtn').style.display = 'block';
    document.getElementById('adminLogoutBtn').style.display = 'none';
    alert("Đã đăng xuất khỏi tài khoản admin.");
}

// Hàm tải dashboard admin
function loadAdminDashboard() {
    if (!isAdminLoggedIn) return;
    
    document.getElementById('adminDashboard').style.display = 'block';
    displayUsers();
    displayTransactions();
    displayGames();
    displayPendingDeposits();
}

// Thêm các hàm API
async function fetchUsers() {
    // Giả lập dữ liệu nếu không có API thực tế
    return [
        { id: 1, username: 'user1', email: 'user1@example.com', balance: 100000 },
        { id: 2, username: 'user2', email: 'user2@example.com', balance: 200000 },
    ];
}

async function fetchTransactions() {
    // Giả lập dữ liệu nếu không có API thực tế
    return [
        { id: 1, userId: 1, type: 'Nạp tiền', amount: 100000, status: 'Hoàn thành', date: '2023-05-01' },
        { id: 2, userId: 2, type: 'Mua key', amount: 50000, status: 'Đang xử lý', date: '2023-05-02' },
    ];
}

async function fetchGames() {
    // Giả lập dữ liệu nếu không có API thực tế
    return [
        { id: 1, name: 'Liên Quân Mobile', keyCount: 100 },
        { id: 2, name: 'PUBG Mobile', keyCount: 50 },
    ];
}

// Cập nhật các hàm hiển thị
async function displayUsers() {
    const users = getData('users');
    const userTableBody = document.querySelector('#userTable tbody');
    userTableBody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.balance.toLocaleString('vi-VN')} VNĐ</td>
            <td>${user.registrationDate}</td>
            <td>
                <button onclick="editUser(${user.id})">Sửa</button>
                <button onclick="deleteUserWithConfirmation(${user.id})">Xóa</button>
            </td>
        `;
        userTableBody.appendChild(row);
    });
}

async function displayTransactions() {
    const transactions = getData('transactions');
    const transactionTableBody = document.querySelector('#transactionTable tbody');
    transactionTableBody.innerHTML = '';

    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.id}</td>
            <td>${getUsernameById(transaction.userId)}</td>
            <td>${transaction.type}</td>
            <td>${transaction.amount ? transaction.amount.toLocaleString('vi-VN') + ' VNĐ' : 'N/A'}</td>
            <td>${transaction.status}</td>
            <td>${new Date(transaction.date).toLocaleString()}</td>
            <td>${transaction.details || ''}</td>
            <td>
                ${transaction.status === 'Đang xử lý' ? `
                    <button onclick="approveTransaction(${transaction.id})">Phê duyệt</button>
                    <button onclick="rejectTransaction(${transaction.id})">Từ chối</button>
                ` : ''}
            </td>
        `;
        transactionTableBody.appendChild(row);
    });
}

// Cập nhật hàm displayGames
async function displayGames() {
    const games = getAllGames();
    const gameTableBody = document.querySelector('#gameTable tbody');
    gameTableBody.innerHTML = '';

    games.forEach(game => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${game.id}</td>
            <td>${game.game}</td>
            <td>${game.options.length}</td>
            <td>
                <button onclick="editGame(${game.id})">Sửa</button>
                <button onclick="deleteGame(${game.id})">Xóa</button>
                <button onclick="viewGameDetails(${game.id})">Chi tiết</button>
            </td>
        `;
        gameTableBody.appendChild(row);
    });
}

// Thêm hàm để xem chi tiết game
function viewGameDetails(gameId) {
    const game = getAllGames().find(g => g.id === gameId);
    if (game) {
        let detailsHTML = `<h3>${game.game}</h3>
                           <img src="images/${game.hinhAnh}" alt="${game.game}" style="max-width: 200px;">
                           <h4>Các tùy chọn:</h4>
                           <ul>`;
        game.options.forEach(option => {
            detailsHTML += `<li>${option.type} - ${option.price.toLocaleString('vi-VN')} VNĐ - ${option.description}</li>`;
        });
        detailsHTML += '</ul>';
        
        // Hiển thị chi tiết trong một modal hoặc một phần tử HTML
        const detailsContainer = document.getElementById('gameDetailsContainer');
        detailsContainer.innerHTML = detailsHTML;
        detailsContainer.style.display = 'block';
    }
}

// Thêm biến để lưu trữ form thêm game mới
let addGameForm;

// Hàm tạo form thêm game mới
function createAddGameForm() {
    const form = document.createElement('form');
    form.innerHTML = `
        <h3>Thêm Game Mới</h3>
        <input type="text" id="newGameName" placeholder="Tên game" required>
        <select id="newGameStore" required>
            <!-- Populate this dynamically with available game stores -->
        </select>
        <button type="submit">Thêm Game</button>
    `;
    form.style.display = 'none';
    form.onsubmit = handleAddGame;
    document.getElementById('games').appendChild(form);
    return form;
}

// Cập nhật hàm handleAddGame
function handleAddGame(e) {
    e.preventDefault();
    const name = document.getElementById('newGameName').value;
    const storeId = parseInt(document.getElementById('newGameStore').value);

    if (name && !isNaN(storeId)) {
        const newGame = {
            id: getAllGames().length + 1,
            game: name,
            hinhAnh: "default.jpg", // Thêm hình nh mặc định
            options: [] // Thêm tùy chọn sau
        };
        
        const storeIndex = gameStores.findIndex(store => store.id === storeId);
        if (storeIndex !== -1) {
            gameStores[storeIndex].games.push(newGame);
            displayGames();
            addGameForm.style.display = 'none';
            alert('Game mới đã được thêm thành công!');
        } else {
            alert('Không tìm thấy kho game.');
        }
    } else {
        alert('Vui lòng nhập thông tin game hợp lệ.');
    }
}

// Cập nhật hàm khởi tạo trang
document.addEventListener('DOMContentLoaded', function() {
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    const adminLogoutBtn = document.getElementById('adminLogoutBtn');

    if (adminLoginBtn) {
        adminLoginBtn.addEventListener('click', adminLogin);
    } else {
        console.error("Không tìm thấy nút đăng nhập admin");
    }

    if (adminLogoutBtn) {
        adminLogoutBtn.addEventListener('click', adminLogout);
    } else {
        console.error("Không tìm thấy nút đăng xuất admin");
    }

    // Ẩn dashboard admin và nút đăng xuất khi trang được tải
    const adminDashboard = document.getElementById('adminDashboard');
    if (adminDashboard) {
        adminDashboard.style.display = 'none';
    } else {
        console.error("Không tìm thấy dashboard admin");
    }

    if (adminLogoutBtn) {
        adminLogoutBtn.style.display = 'none';
    }

    // Tạo form thêm game mới
    addGameForm = createAddGameForm();

    // Thêm sự kiện cho nút "Thêm game mới"
    document.getElementById('addGameBtn').addEventListener('click', function() {
        addGameForm.style.display = addGameForm.style.display === 'none' ? 'block' : 'none';
    });
});

// Các hàm CRUD v xử lý sự kiện (giữ nguyên như cũ)

// Khởi tạo trang
document.addEventListener('DOMContentLoaded', function() {
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    const adminLogoutBtn = document.getElementById('adminLogoutBtn');

    if (adminLoginBtn) {
        adminLoginBtn.addEventListener('click', adminLogin);
    } else {
        console.error("Không tìm thấy nút đăng nhập admin");
    }

    if (adminLogoutBtn) {
        adminLogoutBtn.addEventListener('click', adminLogout);
    } else {
        console.error("Không tìm thấy nút đăng xuất admin");
    }

    // Ẩn dashboard admin và nút đăng xuất khi trang được tải
    const adminDashboard = document.getElementById('adminDashboard');
    if (adminDashboard) {
        adminDashboard.style.display = 'none';
    } else {
        console.error("Không tìm thấy dashboard admin");
    }

    if (adminLogoutBtn) {
        adminLogoutBtn.style.display = 'none';
    }

    // Tạo form thêm game mới
    addGameForm = createAddGameForm();

    // Thêm sự kiện cho nút "Thêm game mới"
    document.getElementById('addGameBtn').addEventListener('click', function() {
        addGameForm.style.display = addGameForm.style.display === 'none' ? 'block' : 'none';
    });
});

function confirmAction(action, callback) {
    const password = prompt(`Nhập mật khẩu admin để ${action}:`);
    if (password === ADMIN_PASSWORD) {
        callback();
    } else {
        alert("Mật khẩu không đúng!");
    }
}

function deleteUserWithConfirmation(userId) {
    confirmAction("xóa người dùng", async () => {
        // Thực hiện xóa người dùng (cần triển khai)
        users = users.filter(user => user.id !== userId);
        displayUsers();
    });
}

// Hàm xử lý phê duyệt giao dịch
function approveTransaction(id) {
    confirmAction("phê duyệt giao dịch", () => {
        const transactions = getData('transactions');
        const transactionIndex = transactions.findIndex(t => t.id === id);
        if (transactionIndex !== -1) {
            transactions[transactionIndex].status = 'Đã phê duyệt';
            
            // Cập nhật số dư người dùng nếu là giao dịch nạp tiền
            if (transactions[transactionIndex].type === 'Nạp tiền') {
                const users = getData('users');
                const userIndex = users.findIndex(u => u.id === transactions[transactionIndex].userId);
                if (userIndex !== -1) {
                    users[userIndex].balance += transactions[transactionIndex].amount;
                    updateData('users', users);
                }
            }
            
            updateData('transactions', transactions);
            displayTransactions();
            alert('Giao dịch đã được phê duyệt.');
        }
    });
}

// Hàm xử lý từ chối giao dịch
function rejectTransaction(id) {
    confirmAction("từ chối giao dịch", () => {
        const transactions = getData('transactions');
        const transactionIndex = transactions.findIndex(t => t.id === id);
        if (transactionIndex !== -1) {
            transactions[transactionIndex].status = 'Đã từ chối';
            updateData('transactions', transactions);
            displayTransactions();
            alert('Giao dịch đã bị từ chối.');
        }
    });
}

// Hàm lấy tên người dùng từ ID
function getUsernameById(userId) {
    const users = getData('users');
    const user = users.find(u => u.id === userId);
    return user ? user.username : 'Unknown';
}

// Cập nhật hàm loadAdminDashboard để hiển thị giao dịch
function loadAdminDashboard() {
    if (!isAdminLoggedIn) return;
    
    document.getElementById('adminDashboard').style.display = 'block';
    displayUsers();
    displayTransactions();
    displayGames();
    displayPendingDeposits();
}

// Thêm hàm để hiển thị danh sách giao dịch nạp tiền đang chờ xử lý
function displayPendingDeposits() {
    const pendingDeposits = getData('pendingDeposits');
    const pendingDepositTableBody = document.querySelector('#pendingDepositTable tbody');
    pendingDepositTableBody.innerHTML = '';

    pendingDeposits.forEach(deposit => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${deposit.id}</td>
            <td>${getUsernameById(deposit.userId)}</td>
            <td>${deposit.amount.toLocaleString('vi-VN')} VNĐ</td>
            <td>${deposit.transferCode}</td>
            <td>${deposit.date}</td>
            <td>${deposit.status}</td>
            <td>
                <button onclick="approveDeposit(${deposit.id})">Phê duyệt</button>
                <button onclick="rejectDeposit(${deposit.id})">Từ chối</button>
            </td>
        `;
        pendingDepositTableBody.appendChild(row);
    });
}

// Hàm phê duyệt giao dịch nạp tiền
function approveDeposit(depositId) {
    const pendingDeposits = getData('pendingDeposits');
    const depositIndex = pendingDeposits.findIndex(d => d.id === depositId);
    
    if (depositIndex !== -1) {
        const deposit = pendingDeposits[depositIndex];
        const users = getData('users');
        const userIndex = users.findIndex(u => u.id === deposit.userId);
        
        if (userIndex !== -1) {
            // Cập nhật số dư người dùng
            users[userIndex].balance += deposit.amount;
            updateData('users', users);

            // Cập nhật trạng thái giao dịch
            pendingDeposits[depositIndex].status = 'Đã phê duyệt';
            updateData('pendingDeposits', pendingDeposits);

            // Tạo giao dịch mới trong lịch sử giao dịch
            const newTransaction = {
                id: getData('transactions').length + 1,
                userId: deposit.userId,
                type: 'Nạp tiền',
                amount: deposit.amount,
                status: 'Hoàn thành',
                date: new Date().toISOString().split('T')[0]
            };
            const updatedTransactions = [...getData('transactions'), newTransaction];
            updateData('transactions', updatedTransactions);

            alert(`Đã cộng ${deposit.amount.toLocaleString('vi-VN')} VNĐ vào tài khoản của người dùng ${users[userIndex].username}.`);
            displayPendingDeposits();
            displayTransactions();
            displayUsers();
        } else {
            alert('Không tìm thấy người dùng với ID đã nhập.');
        }
    } else {
        alert('Không tìm thấy giao dịch nạp tiền với ID đã nhập.');
    }
}

// Hàm từ chối giao dịch nạp tiền
function rejectDeposit(depositId) {
    const pendingDeposits = getData('pendingDeposits');
    const depositIndex = pendingDeposits.findIndex(d => d.id === depositId);
    
    if (depositIndex !== -1) {
        pendingDeposits[depositIndex].status = 'Đã từ chối';
        updateData('pendingDeposits', pendingDeposits);

        alert('Giao dịch nạp tiền đã bị từ chối.');
        displayPendingDeposits();
    }
}

// Hàm cộng tiền thủ công cho người dùng
function addManualDeposit() {
    const userId = parseInt(document.getElementById('manualDepositUserId').value);
    const amount = parseFloat(document.getElementById('manualDepositAmount').value);

    if (isNaN(userId) || isNaN(amount) || amount <= 0) {
        alert('Vui lòng nhập thông tin hợp lệ.');
        return;
    }

    const users = getData('users');
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
        // Cập nhật số dư người dùng
        users[userIndex].balance += amount;
        updateData('users', users);

        // Tạo giao dịch mới
        const newTransaction = {
            id: getData('transactions').length + 1,
            userId: userId,
            type: 'Nạp tiền thủ công',
            amount: amount,
            status: 'Hoàn thành',
            date: new Date().toISOString().split('T')[0]
        };
        const updatedTransactions = [...getData('transactions'), newTransaction];
        updateData('transactions', updatedTransactions);

        alert(`Đã cộng ${amount.toLocaleString('vi-VN')} VNĐ vào tài khoản của người dùng ${users[userIndex].username}.`);
        displayUsers();
        displayTransactions();
    } else {
        alert('Không tìm thấy người dùng với ID đã nhập.');
    }
}

// Hàm tự động phê duyệt giao dịch nạp tiền
function autoApproveDeposits() {
    const pendingDeposits = getData('pendingDeposits');
    let updatedPendingDeposits = [...pendingDeposits];
    let updatedUsers = [...getData('users')];
    let updatedTransactions = [...getData('transactions')];

    pendingDeposits.forEach((deposit, index) => {
        if (deposit.status === 'Chờ xử lý') {
            const userIndex = updatedUsers.findIndex(u => u.id === deposit.userId);
            
            if (userIndex !== -1) {
                // Cập nhật số dư người dùng
                updatedUsers[userIndex].balance += deposit.amount;

                // Cập nhật trạng thái giao dịch
                updatedPendingDeposits[index].status = 'Đã phê duyệt';

                // Tạo giao dịch mới trong lịch sử giao dịch
                const newTransaction = {
                    id: updatedTransactions.length + 1,
                    userId: deposit.userId,
                    type: 'Nạp tiền',
                    amount: deposit.amount,
                    status: 'Hoàn thành',
                    date: new Date().toISOString().split('T')[0]
                };
                updatedTransactions.push(newTransaction);

                console.log(`Auto-approved deposit: ${JSON.stringify(deposit)}`);
            }
        }
    });

    updateData('pendingDeposits', updatedPendingDeposits);
    updateData('users', updatedUsers);
    updateData('transactions', updatedTransactions);

    displayPendingDeposits();
    displayTransactions();
    displayUsers();
}

// Gọi hàm tự động phê duyệt mỗi phút (có thể điều chỉnh thời gian này)
setInterval(autoApproveDeposits, 60000);

// Thêm hàm này vào admin-script.js
function updateAdminUI() {
    if (isAdminLoggedIn) {
        displayUsers();
        displayTransactions();
        displayGames();
        displayPendingDeposits();
    }
}

// Thêm event listener để cập nhật giao diện admin định kỳ
setInterval(updateAdminUI, 5000); // Cập nhật mỗi 5 giây

// Thêm hàm editGame vào file admin-script.js
function editGame(gameId) {
    const game = getAllGames().find(g => g.id === gameId);
    if (game) {
        const newName = prompt('Nhập tên mới cho game:', game.game);
        if (newName && newName !== game.game) {
            // Tìm store chứa game
            const storeIndex = gameStores.findIndex(store => 
                store.games.some(g => g.id === gameId)
            );
            
            if (storeIndex !== -1) {
                // Cập nhật tên game
                gameStores[storeIndex].games = gameStores[storeIndex].games.map(g => 
                    g.id === gameId ? { ...g, game: newName } : g
                );
                
                // Cập nhật giao diện
                displayGames();
                alert('Đã cập nhật tên game thành công!');
            } else {
                alert('Không tìm thấy game trong kho.');
            }
        } else if (newName === game.game) {
            alert('Tên game không thay đổi.');
        } else {
            alert('Hủy chỉnh sửa game.');
        }
    } else {
        alert('Không tìm thấy game.');
    }
}

// Đảm bảo rằng hàm getAllGames đã được định nghĩa
function getAllGames() {
    return gameStores.flatMap(store => store.games);
}