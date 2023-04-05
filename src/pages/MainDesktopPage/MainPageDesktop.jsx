import React, { useState, useEffect } from "react";
import LeftPanel from "../../components/LeftPanel/LeftPanel";
import {
  getWallets,
  getWalletsTransactions,
} from "../../redux/wallets/wallets-operations";
import {
  getAllWallets,
  walletsTransactions,
  getIsWalletsLoading,
} from "../../redux/wallets/wallets-selectors";
import { useDispatch, useSelector } from "react-redux";
import RightPanel from "../../components/RightPanel/RightPanel";
import TransactionsList from "../../components/TransactionsList/TransactionsList";
import WalletsListPageMobile from "../WalletsListPageMobile/WalletsListPageMobile";
import s from "./mainPageDesktop.module.scss";

export default function MainPageDesktop({ leftPanelIsOpen }) {
  const dispatch = useDispatch();
  const [selectedWallet, setSelectedWallet] = useState([]);
  const [walletData, setWalletData] = useState({});
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const wallets = useSelector(getAllWallets);
  const transactions = useSelector(walletsTransactions);
  const isWalletsLoading = useSelector(getIsWalletsLoading);

  useEffect(() => {
    dispatch(getWallets());
  }, [dispatch]);
  useEffect(() => {
    const wallet = selectedWallet.find((el) => el.isSelected === true);
    if (wallet) {
      dispatch(getWalletsTransactions(wallet.walletAdress));
    }
  }, [selectedWallet, dispatch]);

  const resizeHandler = () => {
    setWindowSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    resizeHandler();
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

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

  return (
    <>
      {windowSize < 768 ? (
        <WalletsListPageMobile
          handleSelectWallet={handleSelectWallet}
          wallets={selectedWallet.length > 0 ? selectedWallet : wallets}
        />
      ) : (
        <>
          <LeftPanel
            isLoading={isWalletsLoading.getWalletsLoading}
            wallets={selectedWallet.length > 0 ? selectedWallet : wallets}
            handleSelectWallet={handleSelectWallet}
            leftPanelIsOpen={leftPanelIsOpen}
          />
          <section className={s.section}>
            <RightPanel
              walletName={walletData.walletName}
              balance={walletData.amount}
              id={walletData._id}
              adress={walletData.walletAdress}
              leftPanelIsOpen={leftPanelIsOpen}
            />
            <TransactionsList
              isLoading={isWalletsLoading.getTransactionsLoading}
              selectedWalletAdress={
                selectedWallet.find((el) => el.isSelected === true)
                  ?.walletAdress
              }
              transactions={transactions}
              leftPanelIsOpen={leftPanelIsOpen}
            />
          </section>
        </>
      )}
    </>
  );
}
