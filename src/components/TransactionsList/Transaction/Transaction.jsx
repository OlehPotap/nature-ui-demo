import s from "./transaction.module.scss";
import sendIcon from "../../../assets/images/send-Icon.svg";
import reciveIcon from "../../../assets/images/recive-icon.svg";

const Transaction = ({ amount, direction }) => {
  const formatedAmount = amount.toFixed(4);
  let formatedDirection = "";

  // if (direction.includes("NATURE")) {
  //   formatedDirection = direction.split("");
  //   formatedDirection.splice(0, 6);
  //   formatedDirection = formatedDirection.join("");
  //   // console.log(formatedDirection);
  // }

  // if (direction.length >= 17) {
  //   formatedDirection = formatedDirection.split("");
  //   formatedDirection.splice(
  //     8,
  //     formatedDirection[formatedDirection.length - 1],
  //     "..."
  //   );
  //   formatedDirection = formatedDirection.join("");
  // }

  // console.log(direction.length >= 17);
  return (
    <li className={s.transaction}>
      {amount > 0 ? (
        <img className={s.image} src={reciveIcon} alt="recive" />
      ) : (
        <img className={s.image} src={sendIcon} alt="send" />
      )}
      <ul className={s.transactionInfoList}>
        <li className={s.transactionInfoListItem}>
          <p className={s.transactionInfo}>Amount:</p>
          <p className={s.transactionInfo}>
            {amount > 0
              ? `+${formatedAmount} NATURE`
              : `${formatedAmount} NATURE`}
          </p>
        </li>
        <li className={s.transactionInfoListItem}>
          <p className={s.transactionInfo}>To:</p>
          <p className={s.transactionInfo}>{formatedDirection}</p>
        </li>
        <li className={s.transactionInfoListItem}>
          <p className={s.date}>25 November, 2077, 14:55</p>
        </li>
      </ul>
    </li>
  );
};

export default Transaction;
