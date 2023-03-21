import s from "./rightPanel.module.scss";
import { useNavigate, Link } from "react-router-dom";
import { HandySvg } from "handy-svg";
import walletIcon from "../../assets/images/wallet-icon.svg";
import buttonSend from "../../assets/images/button-send.svg";
import buttonRecive from "../../assets/images/button-recive.svg";
import arrowLeftIcon from "../../assets/images/arrow-left.svg";

const RightPanel = ({ walletName, balance, leftPanelIsOpen, id }) => {
  const navigate = useNavigate();
  return (
    <div className={leftPanelIsOpen ? s.rightPanelSided : s.rightPanel}>
      <button onClick={() => navigate(-1)} className={s.arrowLeftIcon}>
        <HandySvg src={arrowLeftIcon} width="45" height="45" />
      </button>
      <div className={s.headingWrapper}>
        <Link to={walletName ? `/wallet-details/${id}` : "#"}>
          <HandySvg
            className={s.walletIco}
            src={walletIcon}
            width="50"
            height="50"
          />
        </Link>
        <h2 className={s.rightPanelHeading}>
          {walletName ? walletName : `PLEASE SELECT A WALLET`}
        </h2>
      </div>
      <div className={s.walletBalaneWrapper}>
        <p className={s.walletBalaneHeading}>Balance:</p>
        <p className={s.walletBalane}>{`${
          balance ? balance : "0.00000"
        } NATURE`}</p>
      </div>
      <div className={s.buttonsWrapper}>
        <Link to={walletName ? `/send-from/${id}` : "#"} className={s.button}>
          <img src={buttonSend} alt="send" />
        </Link>
        <Link to={walletName ? `/recive/${id}` : "#"} className={s.button}>
          <img src={buttonRecive} alt="recive" />
        </Link>
      </div>
    </div>
  );
};

export default RightPanel;
