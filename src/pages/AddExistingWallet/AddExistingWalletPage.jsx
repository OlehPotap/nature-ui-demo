import { useNavigate, Link } from "react-router-dom";
import s from "./addExistingWalletPage.module.scss";
import { Formik, Field, Form } from "formik";
// import Box from "@mui/material/Box";
import { HandySvg } from "handy-svg";
import homeIcon from "../../assets/images/home.svg";
import arrowLeftIcon from "../../assets/images/arrow-left.svg";

import { addWallet } from "../../redux/wallets/wallets-operations";
// import { getUserPaypass } from "../../redux/auth/auth-selectors";
import { useDispatch } from "react-redux";
// import { AES } from "crypto-js";
// import { Crypto } from "../../modules/Nature/utils";
const style = {
  // marginTop: "30vh",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const AddExistingWalletPage = () => {
  // const userPaypass = useSelector(getUserPaypass);
  const dispath = useDispatch();
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
              mnemonic: "",
              walletAdress: "",
            }}
            onSubmit={(data) => {
              // if (localStorage.getItem("mnemonic") !== data.mnemonic) {
              //   Notiflix.Notify.failure("Wrong Mnemonic");
              //   return;
              // }
              // const encMnem = AES.encrypt(
              //   data.mnemonic,
              //   userPaypass
              // ).toString();
              console.log(data);
              dispath(
                addWallet({
                  mnemonic: data.mnemonic,
                })
              );
              localStorage.removeItem("mnemonic");
              navigate("/");
            }}
          >
            <Form className={s.form}>
              <label className={s.formFieldLabel} htmlFor="mnemonic">
                MNEMONIC
              </label>
              <p className={s.formFieldCapth}>
                Please type your wallets mnemonic
              </p>
              <Field
                className={s["textarea"]}
                // disabled={true}
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
              {/* <button className={s["formButton--top"]}>I FORGOT IT</button> */}
              <button
                // to="/add-wallet"
                className={s["formButton--bottom"]}
                type="submit"
              >
                ADD WALLET
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddExistingWalletPage;
