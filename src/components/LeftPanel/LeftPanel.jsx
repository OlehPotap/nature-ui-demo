import s from "./leftPanel.module.scss";
import WalletsList from "./WalletsList/WalletsList";

const LeftPanel = ({ wallets, handleSelectWallet, leftPanelIsOpen }) => {
  return (
    <div className={leftPanelIsOpen ? s.leftPanel : s.leftPanelHidden}>
      <WalletsList wallets={wallets} handleSelectWallet={handleSelectWallet} />
    </div>
  );
};

export default LeftPanel;
