import $api from "../http";

export default class WalletsService {
  static async addWallet({ mnemonic, walletPassword, walletAdress }) {
    console.log(mnemonic);
    const wallet = await $api
      .post("/wallets", { mnemonic, walletPassword, walletAdress })
      .then((data) => {
        return data.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return wallet;
  }
  static async getUserWallets() {
    const wallets = await $api
      .get("/wallets")
      .then((data) => {
        return data.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return wallets;
  }

  static async updateWallet({ _id, walletName }) {
    const updatedWallet = await $api
      .patch("/wallets", { _id, walletName })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
    return updatedWallet;
  }

  static async sendTransaction({ _id, transactionAdress, transactionAmount }) {
    try {
      await $api.patch("/wallets/send-transaction", {
        _id,
        transactionAdress,
        transactionAmount,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
