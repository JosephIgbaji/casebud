import { useState, useEffect } from "react";
import { case_bud, scale } from "../../assets";
import { Link } from "react-router-dom";
import { LOGIN } from "../../routes/constants";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import "./auth.css";
import { Form, Field } from "react-final-form";
import { useRegisterUserMutation } from "../../service/user.service";
import { useNavigate } from "react-router-dom";
import rtkMutation from "../../utils/rtkMutation";
import validate from "validate.js";
import { showAlert } from "../../static/alert";
// import { useGetDivisionQuery } from "../../service/division.service";

const constraints = {
  name: {
    presence: true,
  },
  email: {
    presence: true,
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
    },
  },
  confirm_password: {
    presence: true,
    equality: "password",
  },
};

function Register() {
  // const { data: divisionData } = useGetDivisionQuery();
  // console.log(divisionData);

  const navigate = useNavigate();
  const validateForm = (values) => {
    return validate(values, constraints) || {};
  };

  const [registerUser, { error, isSuccess }] = useRegisterUserMutation({
    provideTag: ["User"],
  });

  const onSubmit = async (values) => {
    try {
      console.log(values);
      await rtkMutation(registerUser, values);
    } catch (error) {
      showAlert("Oops", error.message || "An error occurred", "error");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(LOGIN);
      showAlert(
        "Account created successfully!",
        "Pls login to continue",
        "success"
      );
    } else if (error) {
      showAlert("Oops", error.data.message || "An error occurred", "error");
    }
  }, [error, isSuccess, navigate]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword((prevState) => !prevState);
    } else if (field === "confirm_password") {
      setShowConfirmPassword((prevState) => !prevState);
    }
  };

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
                    className="w-48 h-48"
                  />
                </div>
                {/* <h4 className="logo-head">THE NIGERIAN POLICE FORCE</h4> */}
              </div>
              <p className="text-project-green">
                Case management for every lawyer
              </p>
              {/* <img src={scale} alt="Scale" className="mt-4" /> */}
            </div>
          </div>
        </div>

        <div className="h-screen bg-project-dark-green w-full flex justify-center items-center">
          <div className="lg:w-4/5 p-8">
            <h5 className="login-text pb-7">Register </h5>
            <Form
              onSubmit={(values, form) => onSubmit(values, form)}
              validate={validateForm}
              render={({ handleSubmit, form, submitting }) => (
                <form onSubmit={handleSubmit}>
                  <div className="mb-5">
                    <div className="relative w-full input-component empty sm:inline-block sm:pr-1">
                      <Field
                        type="text"
                        name="name"
                        component="input"
                        className="auth-input block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 hover:border-gray-500 focus:border-green-500 peer"
                        placeholder="Full name"
                      />
                      <label
                        htmlFor="name"
                        className="auth-label absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-project-green px-1 peer-focus:px-1 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        Full Name{" "}
                      </label>
                    </div>
                    {form.getState().submitFailed &&
                      form.getState().errors.name && (
                        <span className="text-red-600">
                          {form.getState().errors.name}
                        </span>
                      )}
                  </div>

                  <div className="mb-5">
                    <div className="relative w-full input-component empty sm:inline-block sm:pr-1">
                      <Field
                        type="email"
                        name="email"
                        component="input"
                        className="auth-input block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 hover:border-gray-500 focus:border-green-500 peer"
                        placeholder="johnmoore@gmail.com"
                      />
                      <label
                        htmlFor="email"
                        className="auth-label absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-project-green px-1 peer-focus:px-1 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        Email Address{" "}
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
                        type={showPassword ? "text" : "password"}
                        name="password"
                        component="input"
                        className="auth-input block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 hover:border-gray-500 focus:border-green-500 peer"
                        placeholder="Enter Password"
                      />
                      <label
                        htmlFor="password"
                        className="auth-label absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-project-green px-1 peer-focus:px-1 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        Password{" "}
                      </label>
                      <div
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                        onClick={() => togglePasswordVisibility("password")}
                      >
                        {showPassword ? (
                          <BsEyeSlash className="h-6 w-6 text-gray-400" />
                        ) : (
                          <BsEye className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                    </div>
                    {form.getState().submitFailed &&
                      form.getState().errors.password && (
                        <span className="text-red-600">
                          {form.getState().errors.password}
                        </span>
                      )}
                  </div>

                  <div className="mb-5">
                    <div className="relative w-full input-component empty sm:inline-block sm:pr-1">
                      <Field
                        id="confirm_password"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirm_password"
                        component="input"
                        className="auth-input block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 hover:border-gray-500 focus:border-green-500 peer"
                        placeholder="Re-enter Password"
                      />
                      <label
                        id="outlined"
                        htmlFor="confirm_password"
                        className="auth-label absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-project-green px-1 peer-focus:px-1 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        Re-enter Password{" "}
                      </label>
                      <div
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                        onClick={() =>
                          togglePasswordVisibility("confirm_password")
                        }
                      >
                        {showConfirmPassword ? (
                          <BsEyeSlash className="h-6 w-6 text-gray-400" />
                        ) : (
                          <BsEye className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                    </div>
                    {form.getState().submitFailed &&
                      form.getState().errors.confirm_password && (
                        <span className="text-red-600">
                          {form.getState().errors.confirm_password}
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
              Already have an account?{" "}
              <Link className="auth-link text-project-yellow" to={LOGIN}>
                Login
              </Link>{" "}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-project-dark-green min-h-screen flex flex-col justify-center items-center sm:hidden md:hidden lg:hidden">
        <div className="flex flex-col items-center gap-5 pt-5">
          <img
            src={case_bud}
            alt="case bud Logo"
            className="w-24 h-24 bg-white p-1 rounded-lg"
          />
        </div>

        <div className="flex flex-col mt-10 w-full">
          <div className="w-full max-w-md mx-auto p-5">
            <h5 className="login-text pb-7">Register</h5>

            <Form
              onSubmit={(values, form) => onSubmit(values, form)}
              validate={validateForm}
              render={({ handleSubmit, form, submitting }) => (
                <form onSubmit={handleSubmit}>
                  <div className="mb-5">
                    <div className="relative w-full input-component empty sm:inline-block sm:pr-1">
                      <Field
                        type="text"
                        name="name"
                        component="input"
                        className="auth-input block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 hover:border-gray-500 focus:border-green-500 peer"
                        placeholder="Full name"
                      />
                      <label
                        htmlFor="name"
                        className="auth-label absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-project-green px-1 peer-focus:px-1 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        Full Name{" "}
                      </label>
                    </div>
                    {form.getState().submitFailed &&
                      form.getState().errors.name && (
                        <span className="text-red-600">
                          {form.getState().errors.name}
                        </span>
                      )}
                  </div>

                  <div className="mb-5">
                    <div className="relative w-full input-component empty sm:inline-block sm:pr-1">
                      <Field
                        type="email"
                        name="email"
                        component="input"
                        className="auth-input block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 hover:border-gray-500 focus:border-green-500 peer"
                        placeholder="johnmooore@gmail.com"
                      />
                      <label
                        htmlFor="email"
                        className="auth-label absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-project-green px-1 peer-focus:px-1 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        Email Address{" "}
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
                        type={showPassword ? "text" : "password"}
                        name="password"
                        component="input"
                        className="auth-input block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 hover:border-gray-500 focus:border-green-500 peer"
                        placeholder="Enter password"
                      />
                      <label
                        htmlFor="password"
                        className="auth-label absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-project-green px-1 peer-focus:px-1 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        Password{" "}
                      </label>
                      <div
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                        onClick={() => togglePasswordVisibility("password")}
                      >
                        {showPassword ? (
                          <BsEyeSlash className="h-6 w-6 text-gray-400" />
                        ) : (
                          <BsEye className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                    </div>
                    {form.getState().submitFailed &&
                      form.getState().errors.password && (
                        <span className="text-red-600">
                          {form.getState().errors.password}
                        </span>
                      )}
                  </div>

                  <div className="mb-5">
                    <div className="relative w-full input-component empty sm:inline-block sm:pr-1">
                      <Field
                        id="confirm_password"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirm_password"
                        component="input"
                        className="auth-input block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 hover:border-gray-500 focus:border-green-500 peer"
                        placeholder="Re-enter password"
                      />
                      <label
                        id="outlined"
                        htmlFor="confirm_password"
                        className="auth-label absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-project-green px-1 peer-focus:px-1 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        Re-enter Password{" "}
                      </label>
                      <div
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                        onClick={() =>
                          togglePasswordVisibility("confirm_password")
                        }
                      >
                        {showConfirmPassword ? (
                          <BsEyeSlash className="h-6 w-6 text-gray-400" />
                        ) : (
                          <BsEye className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                    </div>
                    {form.getState().submitFailed &&
                      form.getState().errors.confirm_password && (
                        <span className="text-red-600">
                          {form.getState().errors.confirm_password}
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
              Already have an account?{" "}
              <Link className="auth-link text-project-yellow" to={LOGIN}>
                Login
              </Link>{" "}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
