import s from "./walletsListItem.module.scss";
import { HandySvg } from "handy-svg";
import walletIcon from "../../../../assets/images/wallet-icon.svg";
import { useNavigate } from "react-router-dom";

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
  const formatedAmount = amount.toFixed(4);
  let formatedAdress = "";

  if (adress.includes("NATURE")) {
    formatedAdress = adress.split("");
    formatedAdress.splice(15, 110);
    formatedAdress = formatedAdress.join("");
  }

  if (adress.length >= 17) {
    formatedAdress = formatedAdress.split("");
    formatedAdress.splice(15, formatedAdress[formatedAdress.length - 1], "...");
    formatedAdress = formatedAdress.join("");
  }

  return (
    <li
      onClick={() => {
        if (pageWidth < 768) {
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
            {formatedAmount} NATURE
          </p>
        </div>
        <p className={isSelected ? s.listItemTextSelected : s.listItemText}>
          {formatedAdress}
        </p>
      </div>
    </li>
  );
};

export default WalletsListItem;
