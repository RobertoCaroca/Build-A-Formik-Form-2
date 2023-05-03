import React from "react";
import { useFormik } from "formik";

function App() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      alert("Login Successful");
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Field required";
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Username should be an email";
      }

      if (!values.password) {
        errors.password = "Field required";
      }

      return errors;
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="emailField">Email</label>
        <input
          id="emailField"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div id="emailError" style={{ color: "red" }}>
            {formik.errors.email}
          </div>
        ) : null}

        <label htmlFor="pswField">Password</label>
        <input
          id="pswField"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div id="pswError" style={{ color: "red" }}>
            {formik.errors.password}
          </div>
        ) : null}

        <button id="submitBtn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
