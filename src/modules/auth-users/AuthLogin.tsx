import { UserType } from "@/@types/user.type";
import { Image } from "@heroui/react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export const AuthLogin = () => {
  const navigate = useNavigate();

  const validateLoginData = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email must be required"),
    password: Yup.string()
      .required("Password must be required")
      .min(6, "Password must be at least 6 characters"),
  });
  const initialValues: Partial<UserType> = {
    email: "",
    password: "",
  };

  const loginFormik = useFormik<Partial<UserType>>({
    initialValues,
    validationSchema: validateLoginData,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
      navigate("/events");
    },
  });
  const checkFormError = (field: keyof UserType): boolean => {
    if (loginFormik.errors[field] && loginFormik.touched[field]) {
      return true;
    } else return false;
  };

  return (
    <>
      <div className="flex h-lvh bg-white z-40">
        <div className="flex w-1/2  bg-white flex-1 flex-col justify-center px-15 py-12 ">
          <div className="sm:mx-auto z-40 sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-10 z-40s w-auto"
            />

            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Login
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={loginFormik.handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-lg bg-neutral-100 px-3 py-1.5 text-base  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                    {...loginFormik.getFieldProps("email")}
                  />
                  {checkFormError("email") && (
                    <span className="text-red-500 text-xs">
                      {loginFormik.errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    type="password"
                    className="block w-full rounded-lg bg-neutral-100 px-3 py-1.5 text-base  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                    {...loginFormik.getFieldProps("password")}
                  />
                  {checkFormError("password") && (
                    <span className="text-red-500 text-xs">
                      {loginFormik.errors.password}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-sm flex justify-center gap-1">
                <span>Need to create an account?</span>
                <Link
                  to="/auth-sign"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  SignUp
                </Link>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Not a member?{" "}
              <a
                href="#"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Start a 14 day free trial
              </a>
            </p>
          </div>
        </div>
        <div className=" w-1/2 flex justify-end px-4 py-4">
          <Image
            alt="Card example background"
            className="  "
            src="auth.png"
            height={550}
            width={550}
          />
        </div>
      </div>
    </>
  );
};

// export default AuthLogin;
