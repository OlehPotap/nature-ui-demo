import { useNavigate, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import s from "./registerPage.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  useDispatch,
  // useSelector
} from "react-redux";
import { signup } from "../../redux/auth/auth-operations";
// import { getUser } from "../../redux/auth/auth-selectors";

const style = {
  // marginTop: "30vh",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const schema = Yup.object().shape({
    userName: Yup.string().trim().max(40).required(),
    password: Yup.string()
      .trim()
      .min(8)
      .max(20)
      .matches(/[0-9a-zA-Z]{8,}/g)
      .required(),
  });

  const dispatch = useDispatch();
  // const user = useSelector(getUser);

  return (
    <section className={s.section}>
      <Box className={s.modalWrapper} sx={style}>
        <Formik
          initialValues={{ userName: "", password: "" }}
          validationSchema={schema}
          onSubmit={({ userName, password }) => {
            dispatch(signup({ userName: userName, password: password }));
            navigate("/");
          }}
        >
          <Form className={s.form}>
            {/* <h1>Please Register</h1> */}

            <label className={s.formFieldLabel} htmlFor="email">
              User Name *
            </label>
            <Field
              className={s.formField}
              id="userName"
              name="userName"
              type="text"
              autoComplete="off"
            />
            <ErrorMessage
              name="userName"
              render={() => <p className={s.errorMessage}>userName required</p>}
            />
            <label className={s.formFieldLabel} htmlFor="password">
              Password *
            </label>
            <Field
              className={s.formField}
              id="password"
              name="password"
              type="password"
              autoComplete="off"
            />
            <ErrorMessage
              name="password"
              render={() => (
                <p className={s.errorMessage}>
                  Password required, use only 0-9, a-z, A-Z chars, min 8 max 20
                </p>
              )}
            />
            <p className={s.errorMessage}>
              Please note that we dont use any of your personal data, therefore
              make sure you remember your user name and password accurately,
              there will be no way to restore that data
            </p>
            <button className={s["formButton--top"]} type="submit">
              Register
            </button>

            <Link className={s["formButton--top"]} to={"/login"}>
              Login
            </Link>
          </Form>
        </Formik>
      </Box>
    </section>
  );
};

export default RegisterPage;