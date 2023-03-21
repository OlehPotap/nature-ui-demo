import { createAsyncThunk } from "@reduxjs/toolkit";

import WalletsService from "../../api/services/wallets-service";

export const addWallet = createAsyncThunk(
  "wallets/addWallet",
  async ({ mnemonic, walletPassword, walletAdress }) => {
    const newWallet = await WalletsService.addWallet({
      mnemonic,
      walletPassword,
      walletAdress,
    });
    return newWallet;
  }
);

export const getWallets = createAsyncThunk(
  "wallets/getUserWallets",
  async () => {
    const wallets = await WalletsService.getUserWallets();
    return wallets;
  }
);

export const updateWallet = createAsyncThunk(
  "wallets/updateWallet",
  async ({ _id, walletName }) => {
    const updatedWallet = await WalletsService.updateWallet({
      _id,
      walletName,
    });
    return updatedWallet;
  }
);

export const sendTransaction = createAsyncThunk(
  "wallets/sendTransaction",
  async ({ _id, transactionAdress, transactionAmount }) => {
    const transaction = await WalletsService.sendTransaction({
      _id,
      transactionAdress,
      transactionAmount,
    });
    return transaction;
  }
);
