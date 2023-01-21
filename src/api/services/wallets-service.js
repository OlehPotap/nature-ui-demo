import $api from "../http";

export default class WalletsService {
  static async addWallet({ mnemonic, walletPassword, walletAdress }) {
    console.log(mnemonic, walletPassword, walletAdress);
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
}
