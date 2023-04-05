import $api from "../http";

export default class WalletsService {
  static async addWallet({ mnemonic }) {
    const wallet = await $api
      .post("/wallets", { mnemonic })
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

  static async getWalletsTransactions({ adress }) {
    const transactions = await $api
      .post("/wallets/transactions", { adress })
      .then((data) => {
        return data.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return transactions;
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

  static async sendTransaction({
    senderPublicKey,
    transactionAdress,
    transactionAmount,
  }) {
    return $api.patch("/wallets/send-transaction", {
      senderPublicKey,
      transactionAdress,
      transactionAmount,
    });
  }
}
