import { scale, case_bud } from "../../assets";
import { Link } from "react-router-dom";
import { REGISTER, DASHBOARD } from "../../routes/constants";
import { useEffect } from "react";
import { Form, Field } from "react-final-form";
import { useLoginUserMutation } from "../../service/user.service";
import { useNavigate } from "react-router-dom";
import rtkMutation from "../../utils/rtkMutation";
import validate from "validate.js";
import { showAlert } from "../../static/alert";
import "./auth.css";

const constraints = {
  email: {
    presence: true,
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
    },
  },
};

function Login() {
  const [loginUser, { error, isSuccess }] = useLoginUserMutation({
    provideTag: ["User"],
  });

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    console.log(values);
    await rtkMutation(loginUser, values);
  };

  const validateForm = (values) => {
    return validate(values, constraints) || {};
  };

  useEffect(() => {
    if (isSuccess) {
      showAlert("", "Login Successful!", "success");
      navigate(DASHBOARD);
    } else if (error) {
      showAlert("Oops", error.data.message || "An error occurred", "error");
    }
  }, [isSuccess, error, navigate]);

  return (
    <>
      <section className="h-screen justify-center items-center hidden sm:block md:flex lg:flex">
        <div className="flex flex-col items-center w-full">
          <div className="text-center mb-8">
            <div className="flex flex-col justify-center items-center">
              <div className="md:block lg:flex gap-5 items-center justify-center justify-content-center pb-5">
                <div className="md:flex md:justify-center">
                  <img
                    src={case_bud}
                    alt="Nigerian Police Force Logo"
                    className="w-24 h-24"
                  />
                </div>
                {/* <h4 className="logo-head">THE NIGERIAN POLICE FORCE</h4> */}
              </div>
              <p className="text-project-green">
                Case management for every lawyer
              </p>
              <img src={scale} alt="Scale" className="mt-4" />
            </div>
          </div>
        </div>

        <div className="h-screen bg-project-dark-green p-5 w-full flex justify-center items-center">
          <div className="w-3/5">
            <h5 className="login-text mb-2">Login</h5>
            <p className="login-desc pb-7">Login to the dashboard</p>
            <Form
              onSubmit={onSubmit}
              validate={validateForm}
              render={({ handleSubmit, form, submitting }) => (
                <form onSubmit={handleSubmit}>
                  <div className="mb-7">
                    <div className="relative w-full input-component empty sm:inline-block sm:pr-1">
                      <Field
                        name="email"
                        component="input"
                        type="text"
                        className="auth-input block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 hover:border-gray-500 focus:border-green-500 peer"
                        placeholder=" "
                      />

                      <label
                        htmlFor="email"
                        className="auth-label absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-project-green px-1 peer-focus:px-1 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        Email/ID
                      </label>
                    </div>
                    {form.getState().submitFailed &&
                      form.getState().errors.email && (
                        <span className="text-red-600">
                          {form.getState().errors.email}
                        </span>
                      )}
                  </div>

                  <div className="mb-5">
                    <div className="relative w-full input-component empty sm:inline-block sm:pr-1">
                      <Field
                        name="password"
                        component="input"
                        type="password"
                        className="auth-input block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 hover:border-gray-500 focus:border-green-500 peer"
                        placeholder=" "
                      />

                      <label
                        htmlFor="password"
                        className="auth-label absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-project-green px-1 peer-focus:px-1 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        Password{" "}
                      </label>
                    </div>
                    {form.getState().submitFailed &&
                      form.getState().errors.password && (
                        <span className="text-red-600">
                          {form.getState().errors.password}
                        </span>
                      )}
                  </div>

                  <button className="auth-btn" type="submit">
                    {submitting ? (
                      <>
                        <span className="loading-dots">
                          <span className="loading-dots-dot"></span>
                          <span className="loading-dots-dot"></span>
                          <span className="loading-dots-dot"></span>
                        </span>
                      </>
                    ) : (
                      "Next"
                    )}
                  </button>
                </form>
              )}
            />
            <p className="auth-question flex gap-5 pt-5">
              Don’t have an account?{" "}
              <Link className="auth-link text-project-yellow" to={REGISTER}>
                Register
              </Link>{" "}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-project-dark-green min-h-screen flex flex-col justify-center items-center sm:hidden md:hidden lg:hidden">
        <div className="flex flex-col items-center gap-5 pt-5">
          <img
            src={case_bud}
            alt="case-bud Logo"
            className="w-24 h-24 bg-white rounded-lg p-1"
          />{" "}
          {/* <h4 className="logo-head text-center text-white">CaseBud</h4> */}
        </div>

        <div className="flex flex-col mt-10 w-full">
          <div className="w-full max-w-md mx-auto p-5">
            <h5 className="login-text mb-2">Login</h5>
            <p className="login-desc pb-7">Login to the dashboard</p>

            <Form
              onSubmit={onSubmit}
              validate={validateForm}
              render={({ handleSubmit, form, submitting }) => (
                <form onSubmit={handleSubmit}>
                  <div className="mb-7">
                    <div className="relative w-full input-component empty sm:inline-block sm:pr-1">
                      <Field
                        name="identifier"
                        component="input"
                        type="text"
                        className="auth-input block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 hover:border-gray-500 focus:border-green-500 peer"
                        placeholder=" "
                      />

                      <label
                        htmlFor="identifier"
                        className="auth-label absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-project-green px-1 peer-focus:px-1 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        Email/ID
                      </label>
                    </div>
                    {form.getState().submitFailed &&
                      form.getState().errors.identifier && (
                        <span className="text-red-600">
                          {form.getState().errors.identifier}
                        </span>
                      )}
                  </div>

                  <div className="mb-5">
                    <div className="relative w-full input-component empty sm:inline-block sm:pr-1">
                      <Field
                        name="password"
                        component="input"
                        type="password"
                        className="auth-input block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 hover:border-gray-500 focus:border-green-500 peer"
                        placeholder=" "
                      />

                      <label
                        htmlFor="password"
                        className="auth-label absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-project-green px-1 peer-focus:px-1 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        Password{" "}
                      </label>
                    </div>
                    {form.getState().submitFailed &&
                      form.getState().errors.password && (
                        <span className="text-red-600">
                          {form.getState().errors.password}
                        </span>
                      )}
                  </div>

                  <button className="auth-btn" type="submit">
                    {submitting ? (
                      <>
                        <span className="loading-dots">
                          <span className="loading-dots-dot"></span>
                          <span className="loading-dots-dot"></span>
                          <span className="loading-dots-dot"></span>
                        </span>
                      </>
                    ) : (
                      "Next"
                    )}
                  </button>
                </form>
              )}
            />
            <p className="auth-question flex gap-5 pt-5">
              Don’t have an account?{" "}
              <Link className="auth-link text-project-yellow" to={REGISTER}>
                Register
              </Link>{" "}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
