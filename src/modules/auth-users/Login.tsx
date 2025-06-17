import { UserType } from "@/@types/user.type";
import { Input, Button, Card, CardBody } from "@heroui/react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

export const Login = () => {
  type _createUserBody = Pick<UserType, "name" | "email" | "password"> & {
    confirmpassword: string;
  };
  const validateLoginData = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email must be required"),
    password: Yup.string()
      .required("Password must be required")
      .min(6, "Password must be at least 6 characters"),
  });
  const initialValues: Partial<_createUserBody> = {
    email: "",
    password: "",
  };

  const loginFormik = useFormik<Partial<_createUserBody>>({
    initialValues,
    validationSchema: validateLoginData,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
    },
  });
  const checkFormError = (field: keyof _createUserBody): boolean => {
    if (loginFormik.errors[field] && loginFormik.touched[field]) {
      return true;
    } else return false;
  };

  return (
    <div className="flex flex-row justify-center items-center h-lvh   w-full">
      <Card className="max-w-full w-[400px]  p-2">
        <CardBody className="overflow-hidden">
          <form
            onSubmit={loginFormik.handleSubmit}
            className="flex flex-col gap-4"
          >
            <h1 className="text-2xl font-semibold text-center mb-2 text-gray-800">
              Login
            </h1>
            <div>
              {" "}
              <Input
                label="Email:"
                placeholder="Enter your email"
                labelPlacement="outside"
                type="email"
                {...loginFormik.getFieldProps("email")}
              />
              {checkFormError("email") && (
                <span className="text-red-500 text-xs">
                  {loginFormik.errors.email}
                </span>
              )}
            </div>
            <div>
              <Input
                label="Password:"
                labelPlacement="outside"
                placeholder="Enter your password"
                type="password"
                {...loginFormik.getFieldProps("password")}
              />
              {checkFormError("password") && (
                <span className="text-red-500 text-xs">
                  {loginFormik.errors.password}
                </span>
              )}
            </div>
            <p className="text-center text-small">
              Need to create an account?{" "}
              <Link className="sm text-blue-500" to="/user/sign-up">
                Sign up
              </Link>
            </p>
            <div className="flex gap-2 justify-end">
              <Button type="submit" fullWidth color="primary">
                Login
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

// export default Login;
