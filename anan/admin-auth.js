// Đảm bảo StateManager đã được định nghĩa trước khi sử dụng

const AdminAuth = {
  ADMIN_PASSWORD: 'admin123', // Thay đổi mật khẩu này trong môi trường thực tế

  adminLogin() {
    const password = prompt("Nhập mật khẩu admin:");
    if (password === this.ADMIN_PASSWORD) {
      StateManager.updateState('isAdminLoggedIn', true);
      document.body.classList.add('admin-logged-in');
      this.loadAdminDashboard();
      document.getElementById('adminLoginBtn').style.display = 'none';
      document.getElementById('adminLogoutBtn').style.display = 'block';
      alert("Đăng nhập admin thành công!");
    } else {
      alert("Mật khẩu không đúng!");
    }
  },

  adminLogout() {
    StateManager.updateState('isAdminLoggedIn', false);
    document.body.classList.remove('admin-logged-in');
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('adminLoginBtn').style.display = 'block';
    document.getElementById('adminLogoutBtn').style.display = 'none';
    alert("Đã đăng xuất khỏi tài khoản admin.");
  },

  loadAdminDashboard() {
    // Implement dashboard loading logic here
    console.log("Loading admin dashboard...");
    // You might want to call other functions like displayUsers, displayTransactions, etc.
  }
};

// Expose functions to global scope if needed
window.adminLogin = AdminAuth.adminLogin.bind(AdminAuth);
window.adminLogout = AdminAuth.adminLogout.bind(AdminAuth);
