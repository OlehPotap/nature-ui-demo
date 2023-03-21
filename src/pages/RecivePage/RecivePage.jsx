import s from "./recivePage.module.scss";
import { Formik, Field, Form } from "formik";
import { useNavigate, Link, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { HandySvg } from "handy-svg";
import homeIcon from "../../assets/images/home.svg";
import arrowLeftIcon from "../../assets/images/arrow-left.svg";
import QRCode from "react-qr-code";

import { getAllWallets } from "../../redux/wallets/wallets-selectors";
import { useSelector } from "react-redux";
const style = {
  // marginTop: "30vh",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const ReciveModal = ({ open, handleClose }) => {
  const wallets = useSelector(getAllWallets);
  const params = useParams();
  const wallet = wallets.find((el) => {
    return el._id === params.id;
  });
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
              adress: wallet?.walletAdress,
            }}
            onSubmit={(values) => {
              navigator.clipboard.writeText(values.adress);
            }}
          >
            <Form autoComplete="off" className={s.form}>
              <QRCode
                size={256}
                level={"L"}
                className={s.formImg}
                width="277px"
                value={wallet?.walletAdress}
              />
              <label className={s.formFieldLabel} htmlFor="adress"></label>
              <Field
                autoComplete="off"
                className={s.formField}
                id="adress"
                name="adress"
                placeholder="Adress"
                type="text"
              />
              <button className={s["formButton--top"]} type="submit">
                COPY
              </button>
            </Form>
          </Formik>
        </div>
      </Box>
    </div>
  );
};

export default ReciveModal;
