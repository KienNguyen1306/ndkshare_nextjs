import * as yup from "yup";

export const schemaRegister = yup.object().shape({
    username: yup
      .string()
      .min(5, "Username phải có ít nhất 5 kí tự")
      .matches(/^\S*$/, "Username không được chứa khoảng trắng")
      .required("Username là trường bắt buộc")
      .test('len', 'Họ và tên không vượt quá 30 kí tự', val => val.length <= 30),
    fullname: yup
      .string()
      .max(30, "Họ và tên không vượt quá 30 kí tự")
      .required("Username là trường bắt buộc"),
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Email là trường bắt buộc"),
    password: yup
      .string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Mật khẩu phải có ít nhất 8 kí tự, bao gồm chữ hoa, chữ thường và số"
      )
      .required("Password là trường bắt buộc"),
  });
