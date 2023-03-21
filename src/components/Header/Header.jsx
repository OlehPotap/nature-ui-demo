import s from "./header.module.scss";
import mainLogo from "../../assets/images/main-logo.svg";
import { Link } from "react-router-dom";
import {
  // getUser,
  getIslogin,
} from "../../redux/auth/auth-selectors";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/auth/auth-operations";

const Header = ({ handleOpenLeftPanel }) => {
  const dispatch = useDispatch();
  // const user = useSelector(getUser);
  const islogin = useSelector(getIslogin);
  return (
    <header className={s.header}>
      <div className={s.headerContainer}>
        <div onClick={handleOpenLeftPanel} className={s.logoWrapper}>
          <img className={s.logo} src={mainLogo} alt="logo" />
          <h1 className={s.heading}>NATURE WALLET</h1>
        </div>
        {islogin ? (
          <div className={s.headerButtonsWrapper}>
            <Link to="/new-wallet" className={s.headerButton} type="button">
              NEW WALLET
            </Link>
            <button
              onClick={() => {
                dispatch(logout());
              }}
              className={s.headerButton}
              type="button"
            >
              LOG OUT
            </button>
          </div>
        ) : (
          <div className={s.headerButtonsWrapper}>
            <Link
              to="/login"
              // onClick={handleOpenAddWalletModal}
              className={s.headerButton}
            >
              SIGN IN
            </Link>
            <Link
              to="/register"
              // onClick={handleOpenAddWalletModal}
              className={s.headerButton}
            >
              REGISTER
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
