import { Routes, Route } from "react-router-dom";

// Pages
import AddWalletPage from "./pages/AddWalletPage";
import LoginPage from "./pages/LoginPage";
import MainPageDesktop from "./pages/MainDesktopPage";
import NewWalletPage from "./pages/NewWalletPage";
import RecivePage from "./pages/RecivePage";
import RegisterPage from "./pages/RegisterPage";
import SendPage from "./pages/SendPage";
import NotFoundPage from "./pages/NotFoundPage";
import WalletInfoPageMobile from "./pages/WalletInfoPageMobile";
// Components
import Layout from "./components/Layout/Layout";
// HOC
import RequireAuth from "./hoc/RequireAuth";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports.js";
import { checkAuth } from "./redux/auth/auth-operations";

import { getIsLoading, authCheking } from "./redux/auth/auth-selectors";

function App() {
  //========== root vars ==========
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const isAuthCheking = useSelector(authCheking);

  //========= Cheking autorization ==========
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  //========= State for leftPanel component ==========
  const [leftPanelIsOpen, setLeftPanelIsOpen] = useState(false);

  //========== LeftPanel state handler ==========
  const handleOpenLeftPanel = () => {
    setLeftPanelIsOpen(!leftPanelIsOpen);
  };

  return (
    <div className="App">
      {isLoading || isAuthCheking ? (
        <div>Loading...</div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={<Layout handleOpenLeftPanel={handleOpenLeftPanel} />}
          >
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route element={<RequireAuth />}>
              <Route
                index
                element={<MainPageDesktop leftPanelIsOpen={leftPanelIsOpen} />}
              />
              <Route path="add-wallet" element={<AddWalletPage />} />
              <Route path="new-wallet" element={<NewWalletPage />} />
              <Route path="send" element={<SendPage />} />
              <Route path="recive" element={<RecivePage />} />
              <Route path=":id" element={<WalletInfoPageMobile />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
