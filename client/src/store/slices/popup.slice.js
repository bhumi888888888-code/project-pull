import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    isAdddProductModalOpen: false,
    isSidebarOpen: false,
    isMenuOpen: false,
    isCreatePostOpen : false,
  },
  reducers: {
    toggleProductModal: (state) => {
      state.isAdddProductModalOpen = !state.isAdddProductModalOpen;
    },
    toggleSideBar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    toggleMenuModal: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    toggleCreatePost: (state) => {
      state.isCreatePostOpen = !state.isCreatePostOpen;
    }
  },
});

export const { toggleProductModal, toggleSideBar, toggleMenuModal, toggleCreatePost} = popupSlice.actions;

export default popupSlice.reducer;
