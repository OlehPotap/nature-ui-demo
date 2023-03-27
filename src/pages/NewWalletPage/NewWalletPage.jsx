import s from "./newWalletPage.module.scss";
import { Formik, Field, Form } from "formik";
import { useNavigate, Link } from "react-router-dom";

import { HandySvg } from "handy-svg";
import homeIcon from "../../assets/images/home.svg";
import arrowLeftIcon from "../../assets/images/arrow-left.svg";
import { Crypto } from "../../modules/utils.js";
import { Buffer } from "buffer";
// import { sha512, sha512_256 } from "js-sha512";
const style = {
  // marginTop: "30vh",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const NewWalletModal = () => {
  window.Buffer = window.Buffer || Buffer;
  const genMnemonic = Crypto.generateMnemonic();
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
              mnemonic: genMnemonic,
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
                  localStorage.setItem("mnemonic", genMnemonic);
                }}
                to="/add-wallet"
                className={s["formButton--middle"]}
              >
                REMEMBERED
              </Link>
              <Link
                to="/add-existing-wallet"
                className={s["formButton--bottom"]}
              >
                I ALREADY HAVE WALLET
              </Link>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default NewWalletModal;
