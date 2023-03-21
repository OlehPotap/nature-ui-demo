import s from "./walletDetails.module.scss";

import React, { useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllWallets } from "../../redux/wallets/wallets-selectors";
import { useParams } from "react-router-dom";

import { HandySvg } from "handy-svg";
import homeIcon from "../../assets/images/home.svg";
import arrowLeftIcon from "../../assets/images/arrow-left.svg";
import { updateWallet } from "../../redux/wallets/wallets-operations";

const WalletDetails = () => {
  const wallets = useSelector(getAllWallets);
  const dispatch = useDispatch();
  const params = useParams();
  const wallet = wallets.find((el) => {
    return el._id === params.id;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!wallet) {
      navigate("/");
    }
    return; // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className={s.modalWrapper}>
        <button onClick={() => navigate(-1)} className={s.arrowLeftIcon}>
          <HandySvg src={arrowLeftIcon} width="45" height="45" />
        </button>
        <Link to="/" className={s.homeIcon}>
          <HandySvg src={homeIcon} width="45" height="45" />
        </Link>
        <div className={s.formWrapper}>
          <Formik
            initialValues={{
              walletName:
                wallet?.walletName === "Untitled wallet"
                  ? ""
                  : wallet?.walletName,
            }}
            onSubmit={(data) => {
              if (data.walletName === "") {
                navigate("/");
                return;
              }
              dispatch(
                updateWallet({
                  _id: params.id,
                  walletName: data.walletName,
                })
              );
              navigate("/");
            }}
          >
            <Form autoComplete="off" className={s.form}>
              <label className={s.formFieldLabel} htmlFor="walletName">
                WALLET NAME
              </label>
              <Field
                autoComplete="off"
                className={s.formField}
                id="walletName"
                name="walletName"
                placeholder="New Wallet Name"
                type="text"
              />
              <button className={s["formButton--top"]} type="submit">
                OK
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default WalletDetails;
