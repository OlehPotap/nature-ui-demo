import { useNavigate, Link } from "react-router-dom";
import s from "./addWalletPage.module.scss";
import { Formik, Field, Form } from "formik";
import Box from "@mui/material/Box";
import { HandySvg } from "handy-svg";
import homeIcon from "../../assets/images/home.svg";
import arrowLeftIcon from "../../assets/images/arrow-left.svg";
import dudeIcon from "../../assets/images/dude-icon.png";
import adressIcon from "../../assets/images/address-icon.png";
import passIcon from "../../assets/images/pass-icon.png";

const style = {
  // marginTop: "30vh",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const AddWalletPage = () => {
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
          <img className={s.dudeIcon} width="150px" src={dudeIcon} alt="dude" />
          <Formik
            initialValues={{
              adress: "",
              password: "",
            }}
            onSubmit={(values) => {}}
          >
            <Form className={s.form}>
              <label className={s.formFieldLabel} htmlFor="adress">
                <img
                  className={s.formFieldImg}
                  width="45px"
                  src={adressIcon}
                  alt="dude"
                />
              </label>
              <Field
                className={s.formField}
                id="adress"
                name="adress"
                placeholder="Adress"
                type="text"
              />
              <label className={s.formFieldLabel} htmlFor="password">
                <img
                  className={s.formFieldImg}
                  width="45px"
                  src={passIcon}
                  alt="dude"
                />
              </label>
              <Field
                className={s.formField}
                id="password"
                name="password"
                placeholder="Password"
                type="password"
              />
              <button className={s["formButton--top"]} type="submit">
                ADD WALLET
              </button>
              <Link
                to="/new-wallet"
                className={s["formButton--bottom"]}
                type="button"
              >
                NEW WALLET
              </Link>
            </Form>
          </Formik>
        </div>
      </Box>
    </div>
  );
};

export default AddWalletPage;
