import s from "./newWalletPage.module.scss";
import { Formik, Field, Form } from "formik";
import { useNavigate, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { HandySvg } from "handy-svg";
import homeIcon from "../../assets/images/home.svg";
import arrowLeftIcon from "../../assets/images/arrow-left.svg";
import WalletsService from "../../api/services/wallets-service";
const style = {
  // marginTop: "30vh",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const NewWalletModal = ({ open, handleClose }) => {
  const navigate = useNavigate();
  return (
    <div>
      <Box className={s.modalWrapper} sx={style}>
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
              adress: "",
              password: "",
            }}
            onSubmit={(data) => {
              console.log(data);
              WalletsService.addWallet({
                mnemonic: data.mnemonic,
                walletPassword: data.password,
                walletAdress: data.adress,
              });
            }}
          >
            <Form className={s.form}>
              <label className={s.formFieldLabel} htmlFor="mnemonic">
                MNEMONIC
              </label>
              <Field
                className={s["textarea"]}
                id="mnemonic"
                name="mnemonic"
                placeholder=""
                component="textarea"
              />
              <label className={s.formFieldLabel} htmlFor="password">
                PASSWORD
              </label>
              <Field
                className={s.formField}
                id="password"
                name="password"
                placeholder="Password"
                type="password"
              />
              <label className={s.formFieldLabel} htmlFor="adress">
                ADRESS
              </label>
              <Field
                className={s.formField}
                id="adress"
                name="adress"
                placeholder="Adress"
                type="text"
              />
              <button className={s["formButton--top"]} type="submit">
                ADD WALLET
              </button>
            </Form>
          </Formik>
        </div>
      </Box>
    </div>
  );
};

export default NewWalletModal;
