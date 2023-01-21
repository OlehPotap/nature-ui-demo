import React, { useState, useEffect } from "react";
import LeftPanel from "../../components/LeftPanel/LeftPanel";
import { getWallets } from "../../redux/wallets/wallets-operations";
import { getAllWallets } from "../../redux/wallets/wallets-selectors";
import { useDispatch, useSelector } from "react-redux";
import RightPanel from "../../components/RightPanel/RightPanel";
import TransactionsList from "../../components/TransactionsList/TransactionsList";
import WalletsListPageMobile from "../WalletsListPageMobile/WalletsListPageMobile";

export default function MainPageDesktop({ leftPanelIsOpen }) {
  const dispatch = useDispatch();
  const [selectedWallet, setSelectedWallet] = useState([]);
  const [walletData, setWalletData] = useState({});

  const wallets = useSelector(getAllWallets);

  useEffect(() => {
    dispatch(getWallets());
  }, [dispatch]);

  const handleSelectWallet = (id) => {
    setSelectedWallet(
      wallets.map((el) => {
        if (el._id === id) {
          setWalletData(el);
          return { isSelected: true, ...el };
        } else {
          return { isSelected: false, ...el };
        }
      })
    );
  };

  const pageWidth = window.innerWidth;

  return (
    <>
      {pageWidth < 768 ? (
        <WalletsListPageMobile
          handleSelectWallet={handleSelectWallet}
          wallets={selectedWallet.length > 0 ? selectedWallet : wallets}
        />
      ) : (
        <>
          <LeftPanel
            wallets={selectedWallet.length > 0 ? selectedWallet : wallets}
            handleSelectWallet={handleSelectWallet}
            leftPanelIsOpen={leftPanelIsOpen}
          />
          <RightPanel
            walletName={walletData.walletName}
            balance={walletData.amount}
            leftPanelIsOpen={leftPanelIsOpen}
          />
          <TransactionsList
            transactions={walletData.transactions}
            leftPanelIsOpen={leftPanelIsOpen}
          />
        </>
      )}
    </>
  );
}
