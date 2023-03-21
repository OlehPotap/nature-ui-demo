import { createSlice } from "@reduxjs/toolkit";
import {
  addWallet,
  getWallets,
  sendTransaction,
  updateWallet,
} from "./wallets-operations";

const initialState = {
  wallets: [],
  error: null,
  loading: {
    getWalletsLoading: false,
    addWalletLoading: false,
    updateWalletLoading: false,
    sendTransactionLoading: false,
  },
};

const walletsSlice = createSlice({
  name: "wallets",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getWallets.pending, (state, { payload }) => {
      state.loading.getWalletsLoading = true;
      state.error = null;
    });
    builder.addCase(getWallets.fulfilled, (state, { payload }) => {
      if (!payload) {
        state.wallets = [];
      } else {
        state.wallets = payload;
      }

      state.loading.getWalletsLoading = false;
    });
    builder.addCase(getWallets.rejected, (state, { payload }) => {
      state.loading.getWalletsLoading = false;
      state.error = payload;
    });
    builder.addCase(addWallet.pending, (state, { payload }) => {
      state.loading.addWalletLoading = true;
      state.error = null;
    });
    builder.addCase(addWallet.fulfilled, (state, { payload }) => {
      // eslint-disable-next-line
      state.wallets = state.wallets;
      state.loading.addWalletLoading = false;
      state.error = null;
    });
    builder.addCase(addWallet.rejected, (state, { payload }) => {
      state.loading.addWalletLoading = false;
      state.error = payload;
    });

    builder.addCase(updateWallet.pending, (state, { payload }) => {
      state.loading.updateWalletLoading = true;
      state.error = null;
    });
    builder.addCase(updateWallet.fulfilled, (state, { payload }) => {
      // eslint-disable-next-line
      state.wallets = state.wallets;
      state.loading.updateWalletLoading = false;
      state.error = null;
    });
    builder.addCase(updateWallet.rejected, (state, { payload }) => {
      state.loading.updateWalletLoading = false;
      state.error = payload;
    });

    builder.addCase(sendTransaction.pending, (state, { payload }) => {
      state.loading.sendTransactionLoading = true;
      state.error = null;
    });
    builder.addCase(sendTransaction.fulfilled, (state, { payload }) => {
      // eslint-disable-next-line
      state.wallets = state.wallets;
      state.loading.sendTransactionLoading = false;
      state.error = null;
    });
    builder.addCase(sendTransaction.rejected, (state, { payload }) => {
      state.loading.sendTransactionLoading = false;
      state.error = payload;
    });
  },
});

export default walletsSlice.reducer;
