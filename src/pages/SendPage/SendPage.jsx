import s from "./sendPage.module.scss";
import { Formik, Field, Form } from "formik";
import { useNavigate, Link, useParams } from "react-router-dom";
import { HandySvg } from "handy-svg";
import homeIcon from "../../assets/images/home.svg";
import arrowLeftIcon from "../../assets/images/arrow-left.svg";
import qrIcon from "../../assets/images/QR-icon.png";
import { sendTransaction } from "../../redux/wallets/wallets-operations";
import { useDispatch } from "react-redux";

const SendPage = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const params = useParams();
  return (
    <div className={s.section}>
      <div className={s.modalWrapper}>
        <button onClick={() => navigate(-1)} className={s.arrowLeftIcon}>
          <HandySvg
            className={s.svg}
            src={arrowLeftIcon}
            width="45"
            height="45"
          />
        </button>
        <Link to="/" className={s.homeIcon}>
          <HandySvg className={s.svg} src={homeIcon} width="45" height="45" />
        </Link>
        <div className={s.formWrapper}>
          <Formik
            initialValues={{
              adress: "",
              amount: "",
            }}
            onSubmit={(data) => {
              if (data.adress && data.amount === "") {
                console.log("????");
                return;
              }
              dispath(
                sendTransaction({
                  senderPublicKey: params.id,
                  transactionAdress: data.adress,
                  transactionAmount: Number(data.amount),
                })
              ).then(() => {
                navigate("/");
              });
            }}
          >
            <Form autoComplete="off" className={s.form}>
              <label className={s.formFieldLabel} htmlFor="adress">
                <button
                  type="button"
                  onClick={() => {
                    navigate("/scaner");
                  }}
                  className={s.scannerButton}
                >
                  <img
                    className={s.formFieldImg}
                    width="45px"
                    src={qrIcon}
                    alt="qr code"
                  />
                </button>
              </label>
              <Field
                autoComplete="off"
                className={s["formField"]}
                id="adress"
                name="adress"
                placeholder="Recive address"
                type="text"
              />
              <label className={s.formFieldLabel} htmlFor="amount"></label>
              <Field
                autoComplete="off"
                className={s.formField}
                id="amount"
                name="amount"
                placeholder="Amount"
                type="text"
              />
              <p className={s.formInfo}>Total with fee: 0 NATURE</p>
              <button className={s["formButton--top"]} type="submit">
                SEND
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SendPage;
