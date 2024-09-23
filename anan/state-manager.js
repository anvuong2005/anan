const StateManager = {
  state: {
    users: [],
    transactions: [],
    games: [],
    virtualCurrencies: [],
    pendingDeposits: [],
    currentUser: null,
    isAdminLoggedIn: false
  },

  loadState() {
    const savedState = localStorage.getItem('appState');
    if (savedState) {
      this.state = JSON.parse(savedState);
    }
  },

  saveState() {
    localStorage.setItem('appState', JSON.stringify(this.state));
  },

  updateState(key, value) {
    console.log(`Updating state for ${key}:`, value);
    this.state[key] = value;
    this.saveState();
  },

  getState(key) {
    console.log(`Getting state for ${key}:`, this.state[key]);
    return this.state[key];
  }
};

// Khởi tạo trạng thái khi tải trang
document.addEventListener('DOMContentLoaded', () => StateManager.loadState());
