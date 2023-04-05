import { createAsyncThunk } from "@reduxjs/toolkit";

import WalletsService from "../../api/services/wallets-service";

// export const setSelectedWallet = createAsyncThunk(
//   "wallets/selectWallet",
//   async ({ wallet }) => {
//     const newWallet = await WalletsService.addWallet({
//       mnemonic,
//     });
//     return newWallet;
//   }
// );

export const addWallet = createAsyncThunk(
  "wallets/addWallet",
  async ({ mnemonic }) => {
    const newWallet = await WalletsService.addWallet({
      mnemonic,
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

export const getWalletsTransactions = createAsyncThunk(
  "wallets/getTransactions",
  async (adress, thunkApi) => {
    try {
      const transactions = await WalletsService.getWalletsTransactions({
        adress,
      });
      return transactions;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const sendTransaction = createAsyncThunk(
  "wallets/sendTransaction",
  async (
    { senderPublicKey, transactionAdress, transactionAmount },
    thunkApi
  ) => {
    try {
      const transaction = await WalletsService.sendTransaction({
        senderPublicKey,
        transactionAdress,
        transactionAmount,
      });
      return transaction;
    } catch (error) {
      // console.log(error);
      return thunkApi.rejectWithValue(error.response?.data?.message);
    }
  }
);
