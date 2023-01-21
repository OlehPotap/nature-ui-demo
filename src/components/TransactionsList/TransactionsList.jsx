import s from "./transactionsList.module.scss";
import Transaction from "./Transaction/Transaction";

const TransactionsList = ({ transactions, leftPanelIsOpen }) => {
  return (
    <ul
      className={leftPanelIsOpen ? s.transactionsListSided : s.transactionsList}
    >
      {transactions
        ? transactions.map((el) => {
            return (
              <Transaction
                key={el._id}
                amount={el.transactionAmount}
                direction={el.transactionDirection}
              />
            );
          })
        : ""}
    </ul>
  );
};

export default TransactionsList;
