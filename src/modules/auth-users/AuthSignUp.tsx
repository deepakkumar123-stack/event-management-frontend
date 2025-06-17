import { UserType } from "@/@types/user.type";
import { Avatar, Image } from "@heroui/react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export const AuthSignUp = () => {
  const navigate = useNavigate();
  type _createUserBody = Pick<UserType, "name" | "email" | "password"> & {
    confirmpassword: string;
  };
  const validateSigupData = Yup.object({
    name: Yup.string()
      .required("Name must be required")
      .min(3, "Name at least 3 char")
      .max(20, "Name must be less than 20 char"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email must be required"),
    password: Yup.string()
      .required("Password must be required")
      .min(6, "Password must be at least 6 characters"),
    confirmpassword: Yup.string()
      .required("Confirm password must be required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const initialValues: Partial<_createUserBody> = {
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  };

  const signUpFormik = useFormik<Partial<_createUserBody>>({
    initialValues,
    validationSchema: validateSigupData,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
      navigate("/auth-login");
    },
  });

  const checkFormError = (field: keyof _createUserBody): boolean => {
    if (signUpFormik.errors[field] && signUpFormik.touched[field]) {
      return true;
    } else return false;
  };

  return (
    <>
      <div className="flex  h-lvh z-22">
        <div className="flex  flex-1 flex-col justify-center   mx-auto max-w-xs">
          <div>
            <img
              alt="Your Company"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-10 w-auto"
            />

            <h2 className="mt-1 text-center  text-2xl/9 font-bold tracking-tight text-gray-900">
              SignUp
            </h2>
            <div className="flex justify-center ">
              <Avatar
                size="lg"
                src={
                  signUpFormik.values.name
                    ? `https://ui-avatars.com/api/?name=${signUpFormik.values.name}`
                    : "https://as2.ftcdn.net/jpg/05/89/93/27/1000_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg"
                }
              />
            </div>
          </div>

          <div className="mt-1 mx-auto w-full max-w-xs">
            <form onSubmit={signUpFormik.handleSubmit} className="space-y-3">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    className="block w-full rounded-lg bg-neutral-100 px-3 py-1.5 text-base  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                    {...signUpFormik.getFieldProps("name")}
                  />
                  {checkFormError("name") && (
                    <span className="text-red-500 text-xs">
                      {signUpFormik.errors.name}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-lg bg-neutral-100 px-3 py-1.5 text-base  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                    {...signUpFormik.getFieldProps("email")}
                  />
                  {checkFormError("email") && (
                    <span className="text-red-500 text-xs">
                      {signUpFormik.errors.email}
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
                <div className="mt-1">
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    className="block w-full rounded-lg bg-neutral-100 px-3 py-1.5 text-base  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                    {...signUpFormik.getFieldProps("password")}
                  />
                  {checkFormError("password") && (
                    <span className="text-red-500 text-xs">
                      {signUpFormik.errors.password}
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
                    Confirm Password
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    id="confirmpassword"
                    type="password"
                    className="block w-full rounded-lg bg-neutral-100 px-3 py-1.5 text-base  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                    {...signUpFormik.getFieldProps("confirmpassword")}
                  />
                  {checkFormError("confirmpassword") && (
                    <span className="text-red-500 text-xs">
                      {signUpFormik.errors.confirmpassword}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-sm flex justify-center gap-1">
                <span>Need to create an account?</span>
                <Link
                  to="/auth-login"
                  className="font-semibold text-blue-600 hover:text-blue-500"
                >
                  Login
                </Link>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  SignUp
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className=" w-1/2 h-lvh flex justify-end px-4 py-4">
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

// export default AuthSignUp;
