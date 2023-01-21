import { createAsyncThunk } from "@reduxjs/toolkit";

import WalletsService from "../../api/services/wallets-service";

export const addWallet = createAsyncThunk("wallets/addWallet", async (body) => {
  //   const addedProduct = await walletsAPI.add(body);
  //   return addedProduct;
});

export const getWallets = createAsyncThunk(
  "wallets/getUserWallets",
  async () => {
    const wallets = await WalletsService.getUserWallets();
    return wallets;
  }
);
