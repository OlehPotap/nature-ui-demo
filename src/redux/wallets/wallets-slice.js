import { createSlice } from "@reduxjs/toolkit";
import {
  // addWallet,
  getWallets,
} from "./wallets-operations";

const initialState = {
  wallets: [],
  error: null,
  loading: false,
};

const walletsSlice = createSlice({
  name: "wallets",
  initialState,
  extraReducers: {
    [getWallets.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getWallets.fulfilled]: (state, { payload }) => {
      if (!payload) {
        state.wallets = [];
      } else {
        state.wallets = payload;
        // console.log(payload);
      }

      state.loading = false;
    },
    [getWallets.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default walletsSlice.reducer;
