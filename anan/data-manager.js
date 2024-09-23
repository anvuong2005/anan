const DataManager = {
  getAllGames() {
    const gameStores = StateManager.getState('gameStores');
    return gameStores.flatMap(store => store.games);
  },

  // Thêm các hàm quản lý dữ liệu khác ở đây
};

// Xuất DataManager để sử dụng trong các file khác
window.DataManager = DataManager;
