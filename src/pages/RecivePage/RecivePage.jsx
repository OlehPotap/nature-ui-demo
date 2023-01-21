import s from "./recivePage.module.scss";
import { Formik, Field, Form } from "formik";
import { useNavigate, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { HandySvg } from "handy-svg";
import homeIcon from "../../assets/images/home.svg";
import arrowLeftIcon from "../../assets/images/arrow-left.svg";
import qrIcon from "../../assets/images/QR-icon.png";
const style = {
  // marginTop: "30vh",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const ReciveModal = ({ open, handleClose }) => {
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
              adress: "NATURE275e9c7dcbfae554574bae220",
            }}
            onSubmit={(values) => {}}
          >
            <Form className={s.form}>
              <img
                className={s.formImg}
                width="277px"
                src={qrIcon}
                alt="qr code"
              />
              <label className={s.formFieldLabel} htmlFor="adress"></label>
              <Field
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
