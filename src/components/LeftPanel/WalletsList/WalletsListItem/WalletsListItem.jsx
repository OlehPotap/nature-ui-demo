import s from "./walletsListItem.module.scss";
import { HandySvg } from "handy-svg";
import walletIcon from "../../../../assets/images/wallet-icon.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getWalletsTransactions } from "../../../../redux/wallets/wallets-operations";

const WalletsListItem = ({
  isSelected,
  handleSelectWallet,
  id,
  name,
  adress,
  amount,
}) => {
  const navigate = useNavigate();
  const pageWidth = window.innerWidth;
  const dispatch = useDispatch();

  const handleFormatAmount = (amount) => {
    const stringLength = String(amount.toFixed(6)).length;
    if (stringLength > 10) {
      return `${String(amount.toFixed(6)).slice(0, 9)}...`;
    } else {
      return String(amount.toFixed(6));
    }
  };

  // console.log();
  const handleDirectionStringFormat = (adress) => {
    let formatedAdress = adress.split("");
    formatedAdress.splice(15, 45, "...");

    return formatedAdress;
  };

  return (
    <li
      onClick={() => {
        if (pageWidth < 768) {
          dispatch(getWalletsTransactions(adress));
          navigate(`/${id}`);
        }
        handleSelectWallet(id);
      }}
      className={isSelected ? s.listItemSelected : s.listItem}
    >
      <HandySvg
        className={s.listItemSvg}
        src={walletIcon}
        width="50"
        height="50"
      />
      <div className={s.listitemInfoWrapper}>
        <div className={s.walletInfoWrapper}>
          <p className={isSelected ? s.listItemTextSelected : s.listItemText}>
            {name}
          </p>
          <p className={isSelected ? s.listItemTextSelected : s.listItemText}>
            {handleFormatAmount(amount)} NATURE
          </p>
        </div>
        <p className={isSelected ? s.listItemTextSelected : s.listItemText}>
          {handleDirectionStringFormat(adress)}
        </p>
      </div>
    </li>
  );
};

export default WalletsListItem;
