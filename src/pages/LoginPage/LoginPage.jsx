import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import s from "./loginPage.module.scss";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/auth-operations";

const style = {
  // marginTop: "30vh",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export default function LoginPage() {
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

  return (
    <section className={s.section}>
      <Box className={s.modalWrapper} sx={style}>
        <Formik
          initialValues={{ userName: "", password: "" }}
          validationSchema={schema}
          onSubmit={({ userName, password }) => {
            dispatch(login({ userName: userName, password: password }));
            navigate("/");
          }}
        >
          <Form className={s.form}>
            {/* <h1>Please Login</h1> */}
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
            <button className={s["formButton--top"]} type="submit">
              Login
            </button>

            <Link className={s["formButton--top"]} to={"/register"}>
              Register
            </Link>
          </Form>
        </Formik>
      </Box>
    </section>
  );
}