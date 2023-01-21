import s from "./leftPanel.module.scss";
import WalletsList from "./WalletsList/WalletsList";
// import { HandySvg } from "handy-svg";
// import arrowRight from "../../assets/images/323-circle-right.svg";
// import arrowLeft from "../../assets/images/325-circle-left.svg";

const LeftPanel = ({ wallets, handleSelectWallet, leftPanelIsOpen }) => {
  return (
    <div className={leftPanelIsOpen ? s.leftPanel : s.leftPanelHidden}>
      <WalletsList wallets={wallets} handleSelectWallet={handleSelectWallet} />
      {/* <button
        onClick={handleOpenLeftPanel}
        className={s.openButton}
        type="button"
      >
        <HandySvg
          className={s.svg}
          src={leftPanelIsOpen ? arrowLeft : arrowRight}
          width="40"
          height="40"
        />
      </button> */}
    </div>
  );
};

export default LeftPanel;
