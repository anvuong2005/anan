// Hàm kiểm tra trạng thái nạp tiền
function checkDepositStatus() {
    const userId = getCurrentUserId();
    if (!userId) {
        console.error('Không thể lấy ID người dùng hiện tại');
        return;
    }

    // Giả sử bạn có một API endpoint để kiểm tra trạng thái nạp tiền
    fetch('/api/check-deposit-status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: userId,
            transferCode: getCurrentTransferCode() // Hàm này cần được định nghĩa để lấy mã chuyển tiền hiện tại
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            // Nếu nạp tiền thành công, cập nhật số dư và hiển thị thông báo
            updateBalance(data.newBalance);
            showDepositResult('Nạp tiền thành công! Số dư mới của bạn là: ' + data.newBalance + ' VNĐ');
        } else if (data.status === 'pending') {
            // Nếu giao dịch vẫn đang xử lý, đợi và kiểm tra lại sau một khoảng thời gian
            setTimeout(checkDepositStatus, 30000); // Kiểm tra lại sau 30 giây
        } else {
            // Nếu có lỗi, hiển thị thông báo lỗi
            showDepositResult('Có lỗi xảy ra: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showDepositResult('Có lỗi xảy ra khi kiểm tra trạng thái nạp tiền');
    });
}

// Hàm cập nhật số dư
function updateBalance(newBalance) {
    document.getElementById('accountBalance').textContent = 'Số dư: ' + newBalance + ' VNĐ';
}

// Hàm hiển thị kết quả nạp tiền
function showDepositResult(message) {
    const modal = document.getElementById('depositResultModal');
    const messageElement = document.getElementById('depositResultMessage');
    messageElement.textContent = message;
    modal.style.display = 'block';

    // Đóng modal khi click vào nút đóng
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    // Đóng modal khi click bên ngoài modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

// Thêm định nghĩa cho hàm getCurrentUserId
function getCurrentUserId() {
    // Kiểm tra xem window.currentUser có tồn tại không
    if (window.currentUser && window.currentUser.id) {
        return window.currentUser.id;
    }
    // Nếu không có currentUser, có thể lấy từ localStorage hoặc từ một nguồn khác
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    return storedUser ? storedUser.id : null;
}

// Bắt đầu kiểm tra trạng thái nạp tiền khi người dùng nhấn nút nạp tiền
document.getElementById('checkDepositStatusBtn').addEventListener('click', function() {
    checkDepositStatus();
});

function handleLogin(user) {
    window.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    // ... các xử lý khác sau khi đăng nhập ...
}