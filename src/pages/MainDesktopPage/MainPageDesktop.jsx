import React, { useState, useEffect } from "react";
import LeftPanel from "../../components/LeftPanel/LeftPanel";
import { getWallets } from "../../redux/wallets/wallets-operations";
import { getAllWallets } from "../../redux/wallets/wallets-selectors";
import { useDispatch, useSelector } from "react-redux";
import RightPanel from "../../components/RightPanel/RightPanel";
import TransactionsList from "../../components/TransactionsList/TransactionsList";
import WalletsListPageMobile from "../WalletsListPageMobile/WalletsListPageMobile";
// import throttle from "lodash/throttle";

export default function MainPageDesktop({ leftPanelIsOpen }) {
  const dispatch = useDispatch();
  const [selectedWallet, setSelectedWallet] = useState([]);
  const [walletData, setWalletData] = useState({});
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const wallets = useSelector(getAllWallets);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getWallets());
    }, 0);
  }, [dispatch]);

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
            wallets={selectedWallet.length > 0 ? selectedWallet : wallets}
            handleSelectWallet={handleSelectWallet}
            leftPanelIsOpen={leftPanelIsOpen}
          />
          <RightPanel
            walletName={walletData.walletName}
            balance={walletData.amount}
            id={walletData._id}
            adress={walletData.walletAdress}
            leftPanelIsOpen={leftPanelIsOpen}
          />
          {walletData.transactions ? (
            <>
              {walletData.transactions?.length > 0 ? (
                <TransactionsList
                  transactions={walletData.transactions}
                  leftPanelIsOpen={leftPanelIsOpen}
                />
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
}
