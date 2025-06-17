import { UserType } from "@/@types/user.type";
import { Input, Button, Card, CardBody, Avatar } from "@heroui/react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

export const SignUp = () => {
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
    },
  });

  const checkFormError = (field: keyof _createUserBody): boolean => {
    if (signUpFormik.errors[field] && signUpFormik.touched[field]) {
      return true;
    } else return false;
  };

  return (
    <div className="flex flex-row justify-center items-center h-lvh  w-full">
      <Card className="max-w-full w-[450px]  p-2">
        <CardBody className="overflow-hidden">
          <form
            onSubmit={signUpFormik.handleSubmit}
            className="flex flex-col gap-4 "
          >
            <h1 className="text-2xl font-semibold text-center mb-2 text-gray-800">
              SignUp
            </h1>
            <div className="flex justify-center">
              <Avatar
                size="lg"
                src={
                  signUpFormik.values.name
                    ? `https://ui-avatars.com/api/?name=${signUpFormik.values.name}`
                    : "https://as2.ftcdn.net/jpg/05/89/93/27/1000_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg"
                }
              />
            </div>
            <div>
              <Input
                label="Name:"
                placeholder="Enter your name"
                labelPlacement="outside"
                type="text"
                {...signUpFormik.getFieldProps("name")}
              />
              {checkFormError("name") && (
                <span className="text-red-500 text-xs">
                  {signUpFormik.errors.name}
                </span>
              )}
            </div>
            <div>
              <Input
                label="Email:"
                placeholder="Enter your email"
                labelPlacement="outside"
                type="email"
                {...signUpFormik.getFieldProps("email")}
              />
              {checkFormError("email") && (
                <span className="text-red-500 text-xs">
                  {signUpFormik.errors.email}
                </span>
              )}
            </div>{" "}
            <div>
              <Input
                label="Password:"
                labelPlacement="outside"
                placeholder="Enter your password"
                type="password"
                {...signUpFormik.getFieldProps("password")}
              />
              {checkFormError("password") && (
                <span className="text-red-500 text-xs">
                  {signUpFormik.errors.password}
                </span>
              )}
            </div>
            <div>
              <Input
                label="Confirm Password:"
                labelPlacement="outside"
                placeholder="Re-Enter password"
                type="password"
                {...signUpFormik.getFieldProps("confirmpassword")}
              />
              {checkFormError("confirmpassword") && (
                <span className="text-red-500 text-xs">
                  {signUpFormik.errors.confirmpassword}
                </span>
              )}
            </div>
            <p className="text-center text-small">
              Already have an account?{" "}
              <Link className="sm text-blue-500" to="/user/login">
                Login
              </Link>
            </p>
            <div className="flex gap-2 justify-end">
              <Button type="submit" fullWidth color="primary">
                Sign up
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
