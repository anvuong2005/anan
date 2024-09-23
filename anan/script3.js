// Biến để lưu trữ modal nạp tiền
let depositModal;

// Hàm để xử lý nạp tiền
function handleDeposit(event) {
    event.preventDefault(); // Ngăn chặn form submit mặc định
    console.log('Handling deposit');
    const amountInput = document.getElementById('depositAmount');
    const amount = parseInt(amountInput.value);

    if (isNaN(amount) || amount < 10000) {
        alert('Vui lòng nhập số tiền hợp lệ (tối thiểu 10,000 VNĐ)');
        return;
    }

    const pendingDeposits = getData('pendingDeposits') || [];
    const newDeposit = {
        id: pendingDeposits.length + 1,
        userId: window.currentUser.id,
        amount: amount,
        status: 'Đang chờ xử lý',
        date: new Date().toISOString()
    };
    pendingDeposits.push(newDeposit);
    updateData('pendingDeposits', pendingDeposits);

    alert(`Đã tạo yêu cầu nạp ${amount.toLocaleString('vi-VN')} VNĐ. Vui lòng chuyển khoản với nội dung: naptien ${window.currentUser.transferCode}`);
    document.getElementById('depositAmount').value = '';
    displayPendingDepositsForUser();
    
    // Đóng modal sau khi xử lý xong
    const depositModal = document.getElementById('depositModal');
    if (depositModal) {
        depositModal.style.display = 'none';
    }
}

// Hàm khởi tạo chức năng nạp tiền
function initializeDeposit() {
    console.log('Initializing deposit functionality');
    const depositModal = document.getElementById('depositModal');
    if (!depositModal) {
        console.error('Không tìm thấy modal có id "depositModal"');
        return;
    }

    const depositBtn = document.getElementById('depositBtn');
    if (depositBtn) {
        depositBtn.onclick = function() {
            console.log('Deposit button clicked');
            if (window.currentUser) {
                console.log('Current user exists, updating modal content');
                updateDepositModalContent();
                depositModal.style.display = 'block';
                console.log('Modal display set to block');
            } else {
                console.log('User not logged in');
                alert('Vui lòng đăng nhập để nạp tiền.');
            }
        }
    } else {
        console.error('Deposit button not found');
    }

    // Thêm sự kiện đóng modal
    const closeBtn = depositModal.querySelector('.close');
    if (closeBtn) {
        closeBtn.onclick = function() {
            depositModal.style.display = 'none';
        };
    }

    // Đóng modal khi click bên ngoài
    window.onclick = function(event) {
        if (event.target == depositModal) {
            depositModal.style.display = 'none';
        }
    };

    // Thêm sự kiện submit cho form nạp tiền
    const depositForm = document.getElementById('depositForm');
    if (depositForm) {
        depositForm.onsubmit = handleDeposit;
    } else {
        console.error('Deposit form not found');
    }
}

// Thêm event listener để gọi initializeDeposit khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM content loaded, initializing deposit');
    initializeDeposit();
});

// Hàm giả lập kiểm tra giao dịch ngân hàng
function simulateBankTransactionCheck() {
    console.log('Checking for new bank transactions...');
    const pendingDeposits = getData('pendingDeposits') || [];
    const users = getUsers();

    pendingDeposits.forEach((deposit, index) => {
        // Giả lập xác suất 50% giao dịch thành công
        if (Math.random() < 0.5) {
            console.log(`Transaction confirmed for user ${deposit.userId}`);
            const user = users.find(u => u.id === deposit.userId);
            if (user) {
                user.balance += deposit.amount;
                updateUsers(users);

                // Cập nhật currentUser nếu đang đăng nhập
                if (window.currentUser && window.currentUser.id === user.id) {
                    window.currentUser.balance = user.balance;
                    localStorage.setItem('currentUser', JSON.stringify(window.currentUser));
                }

                // Thêm giao dịch vào lịch sử
                const transactions = getData('transactions') || [];
                transactions.push({
                    id: transactions.length + 1,
                    userId: user.id,
                    type: 'Nạp tiền',
                    amount: deposit.amount,
                    status: 'Thành công',
                    date: new Date().toISOString()
                });
                updateData('transactions', transactions);

                // Xóa giao dịch khỏi danh sách chờ
                pendingDeposits.splice(index, 1);
                updateData('pendingDeposits', pendingDeposits);

                // Cập nhật UI
                updateUIAfterDeposit(user.balance);
            }
        }
    });
}

// Gọi hàm kiểm tra giao dịch mỗi 30 giây (trong thực tế, có thể là mỗi vài phút)
setInterval(simulateBankTransactionCheck, 30000);

// Thêm hàm để hiển thị các giao dịch đang chờ xử lý cho người dùng
function displayPendingDepositsForUser() {
    if (!window.currentUser) return;

    const pendingDeposits = getData('pendingDeposits').filter(d => d.userId === window.currentUser.id);
    const pendingDepositsList = document.getElementById('pendingDepositsList');
    
    if (!pendingDepositsList) {
        console.error('Element with id "pendingDepositsList" not found');
        return;
    }

    pendingDepositsList.innerHTML = '';

    if (pendingDeposits.length === 0) {
        pendingDepositsList.innerHTML = '<p>Không có giao dịch nạp tiền đang chờ xử lý.</p>';
        return;
    }

    const ul = document.createElement('ul');
    pendingDeposits.forEach(deposit => {
        const li = document.createElement('li');
        li.textContent = `${deposit.amount.toLocaleString('vi-VN')} VNĐ - ${deposit.status} - ${new Date(deposit.date).toLocaleString()}`;
        ul.appendChild(li);
    });

    pendingDepositsList.appendChild(ul);
}

// Cập nhật hàm updateUIAfterLogin để hiển thị các giao dịch đang chờ xử lý
function updateUIAfterLogin() {
    // ... existing code ...
    displayPendingDepositsForUser();
}

// Hàm cập nhật UI sau khi đăng nhập
function updateUIAfterLoginDeposit() {
    document.getElementById('depositContainer').style.display = 'inline-block';
    document.getElementById('checkTransactionsContainer').style.display = 'inline-block';
}

// Hàm kiểm tra trạng thái đăng nhập và hiển thị nút nạp tiền
function checkLoginStatus() {
    if (window.currentUser) {
        document.getElementById('depositContainer').style.display = 'inline-block';
        console.log('User is logged in, deposit button should be visible');
    } else {
        document.getElementById('depositContainer').style.display = 'none';
        console.log('User is not logged in, deposit button should be hidden');
    }
}

// Khởi tạo chức năng nạp tiền khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM content loaded');
    initializeDeposit();
    checkLoginStatus();
    
    // Thêm đoạn code kiểm tra này
    setTimeout(function() {
        const depositBtn = document.getElementById('depositBtn');
        const depositContainer = document.getElementById('depositContainer');
        console.log('Deposit button:', depositBtn);
        console.log('Deposit container:', depositContainer);
        console.log('Deposit container display:', depositContainer.style.display);
    }, 2000);
});

// Export các hàm cần thiết để sử dụng trong các file khác
window.updateUIAfterLoginDeposit = updateUIAfterLoginDeposit;

// Thêm hàm mới để hiển thị modal xác nhận
function showConfirmationModal(amount) {
    const modal = document.getElementById('confirmationModal');
    if (!modal) {
        console.error('Không tìm thấy modal xác nhn');
        alert(`Bạn c chắc chắn muốn nạp ${amount.toLocaleString('vi-VN')} VNĐ không?`);
        if (confirm('Xác nhận nạp tiền?')) {
            processDeposit(amount);
        }
        return;
    }
    
    const message = modal.querySelector('#confirmationMessage');
    if (message) {
        message.textContent = `Bạn có chắc chắn muốn nạp ${amount.toLocaleString('vi-VN')} VNĐ không?`;
    }
    modal.style.display = 'block';

    const confirmBtn = modal.querySelector('#confirmDepositBtn');
    const cancelBtn = modal.querySelector('#cancelDepositBtn');

    if (confirmBtn && cancelBtn) {
        confirmBtn.onclick = function() {
            processDeposit(amount);
            modal.style.display = 'none';
        };
        cancelBtn.onclick = function() {
            modal.style.display = 'none';
        };
    } else {
        console.error('Không tìm thấy nút xác nhận hoặc hủy trong modal');
    }
}

// Thêm event listener để cập nhật UI sau khi đăng nhập
document.addEventListener('userLoggedIn', function() {
    console.log('User logged in event received');
    initializeDeposit();
});

// Thêm đoạn code mới để gắn sự kiện submit cho form nạp tiền
document.addEventListener('DOMContentLoaded', function() {
    const depositForm = document.getElementById('depositForm');
    if (depositForm) {
        // Xóa tất cả các event listener cũ
        depositForm.replaceWith(depositForm.cloneNode(true));
        // Gắn event listener mới
        document.getElementById('depositForm').addEventListener('submit', handleDeposit);
        console.log('Deposit form handler attached');
    } else {
        console.error('Deposit form not found');
    }
});

// Hàm xử lý nạp tiền
function processDeposit(amount) {
    if (!window.currentUser) {
        alert('Vui lòng đăng nhập để nạp tiền');
        return;
    }
    // Thêm logic xử lý nạp tiền ở đây
    console.log(`Đang xử lý nạp ${amount} VNĐ cho người dùng ${window.currentUser.username}`);
    // Ví d: cập nhật số dư người dùng
    window.currentUser.balance += amount;
    localStorage.setItem('currentUser', JSON.stringify(window.currentUser));
    updateUIAfterLogin(); // Cập nhật giao diện sau khi nạp tiền
    alert(`Nạp thành công ${amount.toLocaleString('vi-VN')} VNĐ vào tài khoản`);
}

// Hàm kiểm tra sự tồn tại của các phần tử DOM cần thiết
function checkDOMElements() {
    const elements = [
        'depositModal',
        'confirmationModal',
        'depositForm',
        'depositAmount',
        'confirmationMessage',
        'confirmDepositBtn',
        'cancelDepositBtn'
    ];

    elements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            console.log(`Phần tử ${id} đã được tìm thấy`);
        } else {
            console.error(`Phần tử ${id} không tìm thấy`);
        }
    });
}

document.addEventListener('DOMContentLoaded', checkDOMElements);

// Thêm event listener để gắn sự kiện click cho nút nạp tiền
document.addEventListener('DOMContentLoaded', function() {
    const depositBtn = document.getElementById('depositBtn');
    const depositModal = document.getElementById('depositModal');
    const closeBtn = depositModal.querySelector('.close');

    depositBtn.addEventListener('click', function() {
        depositModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', function() {
        depositModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == depositModal) {
            depositModal.style.display = 'none';
        }
    });
});

// Hàm xử lý nạp tiền thành công
function handleSuccessfulDeposit(amount) {
    console.log('Handling successful deposit of:', amount);
    let users = getUsers();
    const updatedUserIndex = users.findIndex(u => u.id === window.currentUser.id);
    if (updatedUserIndex !== -1) {
        users[updatedUserIndex].balance += amount;
        window.currentUser = {...users[updatedUserIndex]};
        updateUsers(users);
        localStorage.setItem('currentUser', JSON.stringify(window.currentUser));
        updateUIAfterDeposit(window.currentUser.balance);
        console.log('User data updated after deposit:', window.currentUser);
    } else {
        console.error('User not found when updating balance');
        // Thêm người dùng hiện tại vào mảng nếu không tìm thấy
        window.currentUser.balance += amount;
        users.push(window.currentUser);
        updateUsers(users);
        localStorage.setItem('currentUser', JSON.stringify(window.currentUser));
        updateUIAfterDeposit(window.currentUser.balance);
        console.log('Added current user and updated balance:', window.currentUser);
    }
}

// Thêm hoặc cập nhật hàm này trong script3.js

function updateUIAfterDeposit(newBalance) {
    const balanceElement = document.getElementById('accountBalance');
    if (balanceElement) {
        balanceElement.textContent = `Số dư: ${newBalance.toLocaleString('vi-VN')} VNĐ`;
    }
    displayPendingDepositsForUser();
}

// Cập nhật hàm updateDepositModalContent
function updateDepositModalContent() {
    console.log('Updating deposit modal content');
    const modalContent = `
        <div class="modal-header">
            <h2 class="deposit-title">Nạp tiền vào tài khoản</h2>
            <span class="close">&times;</span>
        </div>
        <div class="modal-body">
            <div class="payment-methods">
                <div class="payment-method bank-info">
                    <h3>Tài khoản ngân hàng</h3>
                    <p><strong>Ngân hàng:</strong> TP Bank </p>
                    <p><strong>Số tài khoản:</strong> 12072005000 </p>
                    <p><strong>Chủ tài khoản:</strong> VƯƠNG ĐÌNH DUY AN </p>
                    <p><strong>Nội dung chuyển khoản:</strong> naptien <span id="transferCodeDisplay">${window.currentUser.transferCode || 'N/A'}</span></p>
                </div>
                <div class="payment-method momo-info">
                    <h3>Tài khoản Momo</h3>
                    <p><strong>Số điện thoại:</strong> 0966642216 </p>
                    <p><strong>Tên tài khoản:</strong> VƯƠNG ĐÌNH DUY AN </p>
                    <p><strong>Nội dung chuyển khoản:</strong> naptien <span id="transferCodeDisplay">${window.currentUser.transferCode || 'N/A'}</span></p>
                </div>
            </div>
            <div class="deposit-instruction">
                <h3>Hướng dẫn nạp tiền</h3>
                <p>Bạn hãy nhập số tiền muốn nạp để tạo yêu cầu nạp tiền, sau đó chuyển khoản đến số tài khoản của admin với số tiền bằng số tiền đã yêu cầu. Nếu số tiền chuyển khoản không giống với số tiền đã yêu cầu, hệ thống sẽ không thể xử lý tự động và tiền sẽ không được cộng vào tài khoản của bạn.</p>
            </div>
            <form id="depositForm">
                <div class="input-group">
                    <input type="number" id="depositAmount" class="deposit-input" min="10000" step="1" placeholder="Nhập số tiền (VNĐ)" required>
                </div>
                <button type="submit" id="depositSubmit" class="deposit-btn">Xác nhận nạp tiền</button>
            </form>
            <p class="transfer-code">Mã chuyển tiền của bạn: <span id="transferCodeDisplay">${window.currentUser.transferCode || 'N/A'}</span></p>
        </div>
    `;
    
    const depositModal = document.getElementById('depositModal');
    if (depositModal) {
        depositModal.innerHTML = modalContent;
        
        // Add event listener for deposit form
        const depositForm = document.getElementById('depositForm');
        if (depositForm) {
            depositForm.addEventListener('submit', handleDeposit);
        } else {
            console.error('Deposit form not found in modal');
        }
    } else {
        console.error('Deposit modal not found');
    }
}

// Gọi hàm này khi mở modal nạp tiền
document.getElementById('depositBtn').addEventListener('click', function() {
    updateDepositModalContent();
    document.getElementById('depositModal').style.display = 'block';
});

function showAlertWithCopyButton(message, contentToCopy) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert-modal';
    
    alertDiv.innerHTML = `
        <p>${message}</p>
        <button id="copyButton">
            <i class="fas fa-copy"></i> Sao chép nội dung chuyển khoản
        </button>
        <button id="closeButton">Đóng</button>
    `;

    document.body.appendChild(alertDiv);

    document.getElementById('copyButton').addEventListener('click', function() {
        navigator.clipboard.writeText(contentToCopy).then(function() {
            alert('Đã sao chép nội dung chuyển khoản!');
        }, function(err) {
            console.error('Không thể sao chép nội dung: ', err);
        });
    });

    document.getElementById('closeButton').addEventListener('click', function() {
        document.body.removeChild(alertDiv);
    });
}
