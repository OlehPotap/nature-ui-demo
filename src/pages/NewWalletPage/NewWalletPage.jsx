import s from "./newWalletPage.module.scss";
import { Formik, Field, Form } from "formik";
import { useNavigate, Link } from "react-router-dom";

import { HandySvg } from "handy-svg";
import homeIcon from "../../assets/images/home.svg";
import arrowLeftIcon from "../../assets/images/arrow-left.svg";
import wordsArr from "../../mnemonic.json";
import { sha3_512, sha3_224 } from "js-sha3";
// import { sha512, sha512_256 } from "js-sha512";
const style = {
  // marginTop: "30vh",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const NewWalletModal = ({ open, handleClose }) => {
  const mnemonicArr = [];

  for (let i = 0; i <= 20; i++) {
    mnemonicArr.push(wordsArr[Math.floor(Math.random() * 2047)]);
  }
  const navigate = useNavigate();
  return (
    <div>
      <div className={s.modalWrapper} sx={style}>
        <button onClick={() => navigate(-1)} className={s.arrowLeftIcon}>
          <HandySvg src={arrowLeftIcon} width="45" height="45" />
        </button>
        <Link to="/" className={s.homeIcon}>
          <HandySvg src={homeIcon} width="45" height="45" />
        </Link>
        <div className={s.formWrapper}>
          <Formik
            initialValues={{
              mnemonic: mnemonicArr.join(" "),
              adress: `NATURE${sha3_512(mnemonicArr.join(" "))}`,
              password: sha3_224(mnemonicArr.join(" ")),
            }}
            onSubmit={(formData, { setSubmitting }) => {
              setSubmitting(false);
              // console.log(formData);
              navigator.clipboard.writeText(formData.mnemonic);
            }}
          >
            <Form className={s.form}>
              <label className={s.formFieldLabel} htmlFor="mnemonic">
                MNEMONIC
              </label>
              <p className={s.formFieldCapth}>
                You must remember this mnemonic as it will be used to restore
                the wallet or to add a wallet on other accounts
              </p>
              <Field
                className={s["textarea"]}
                disabled={true}
                id="mnemonic"
                name="mnemonic"
                placeholder=""
                component="textarea"
              />
              {/* <label className={s.formFieldLabel} htmlFor="password">
                PASSWORD
              </label>
              <Field
                className={s.formField}
                disabled={true}
                id="password"
                name="password"
                placeholder="Password"
                type="text"
              />
              <label className={s.formFieldLabel} htmlFor="adress">
                ADRESS
              </label>
              <Field
                className={s.formField}
                disabled={true}
                id="adress"
                name="adress"
                placeholder="Adress"
                type="text"
              /> */}
              <button type="submit" className={s["formButton--top"]}>
                COPY
              </button>
              <Link
                onClick={() => {
                  localStorage.setItem("mnemonic", mnemonicArr.join(" "));
                }}
                to="/add-wallet"
                className={s["formButton--bottom"]}
              >
                REMEMBERED
              </Link>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default NewWalletModal;
