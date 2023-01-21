import React from "react";
import { useParams } from "react-router-dom";
import { getAllWallets } from "../../redux/wallets/wallets-selectors";
import { useSelector } from "react-redux";
import RightPanel from "../../components/RightPanel";
import TransactionsList from "../../components/TransactionsList";

export default function WalletInfoPageMobile() {
  const params = useParams();
  const wallets = useSelector(getAllWallets);
  const wallet = wallets.find((el) => {
    return el._id === params.id;
  });
  return (
    <div>
      <RightPanel walletName={wallet.walletName} balance={wallet.amount} />
      <TransactionsList transactions={wallet.transactions} />
    </div>
  );
}
