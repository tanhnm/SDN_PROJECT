import PetDog from "../../../assets/images/PetDog.png";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyAxios from "../../../setup/configAxios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initFormValue = {
  email: "",
  password: "",
};

// Check empty
const isEmptyValue = (value) => {
  return !value || value.trim().length < 1;
};

// Check email
const isEmailValid = (email) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

const LoginForm = () => {
  const [formValue, setFormValue] = useState(initFormValue);
  const [formError, setFormError] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const [loginFail, setLoginFail] = useState(false);

  // Xử lý remember me
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedRememberMe = localStorage.getItem("rememberMe");

    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setFormValue({
          email: user.email,
          password: "",
        });

        if (savedRememberMe === "true") {
          setRememberMe(true);
        } else {
          setRememberMe(false);
        }
      } catch (error) {
        console.error(error);
        localStorage.removeItem("user");
        localStorage.removeItem("rememberMe");
      }
    }
  }, []);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      [name]: value,
    }));
  };

  // Lấy trạng thái checked or unchecked
  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  // Post API
  const loginUser = async (email, password) => {
    try {
      const response = await MyAxios.post(
        "http://localhost:5000/api/v1/auth/login",
        {
          email,
          password,
        }
      );
      const { access_token, refresh_token } = response.data;
      console.log(response);
      console.log("st", response.data.data.status);

      if (response.data.status === "success") {
        if (rememberMe) {
          saveLoginInfo(access_token, refresh_token);
        }
        localStorage.setItem("access_token", response.data.data.access_token);
        localStorage.setItem("refresh_token", response.data.data.refresh_token);
        localStorage.setItem("userId", response.data.data.id);
        localStorage.setItem("userRole", response.data.data.role);

        const userRole = localStorage.getItem("userRole");
        if (userRole === "STAFF") {
          window.location.href = "/staff";
        } else if (userRole === "CUSTOMER") {
          window.location.href = "/";
        } else {
          // Handle other roles or unexpected cases
          console.log("Unknown user role:", userRole);
        }
      } else {
        setLoginFail(true);
        toast.error(
          `Đăng nhập thất bại: ${response.data.data.message || "Unknown error"}`
        );
      }
    } catch (error) {
      setLoginFail(true); // Cập nhật trạng thái đăng nhập thất bại
    }
  };

  // Xử lý validate
  const validateForm = () => {
    const errors = {};
    if (isEmptyValue(formValue.email)) {
      errors.email = "Email is required";
    } else if (!isEmailValid(formValue.email)) {
      errors.email = "Email is invalid";
    }
    if (isEmptyValue(formValue.password)) {
      errors.password = "Password is required";
    }
    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  const saveLoginInfo = (user, access_token, refresh_token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    localStorage.setItem("rememberMe", rememberMe);
  };

  // Xử lý đăng nhập
  const handleLogin = (e) => {
    e.preventDefault();
    if (validateForm()) {
      loginUser(formValue.email, formValue.password);
    } else {
      console.log("Form invalid");
    }
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center relative">
        <div className="w-full h-full flex flex-col absolute top-0 left-0 z-[1]">
          <img
            src={
              "https://t3.ftcdn.net/jpg/05/31/09/74/360_F_531097423_y1scBnLigyQpMNjLmleTWRh96WmULQo8.jpg"
            }
            className="w-full h-full"
            alt="Pet Dog"
          />
        </div>
        <div className="w-1/2 h-fit bg-white/70 flex flex-col p-20 items-center z-[10000000000000] relative ">
          <div className="w-full flex flex-col max-w-[550px]">
            <div className="w-full flex flex-col mb-2">
              <h3 className="text-4xl font-semibold mb-2">Đăng nhập</h3>
              <p className="text-base mb-2">Điền tài khoản.</p>
            </div>
            <form className="w-full flex flex-col" onSubmit={handleLogin}>
              <input
                type="email"
                name="email"
                value={formValue.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                required
                autoComplete="email"
              />
              {formError.email && (
                <div className="text-red-500 text-sm">{formError.email}</div>
              )}
              <input
                type="password"
                name="password"
                value={formValue.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                required
                autoComplete="current-password"
              />
              {formError.password && (
                <div className="text-red-500 text-sm">{formError.password}</div>
              )}
              <div className="w-full flex items-center justify-between">
                <div className="w-full flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                    className="w-4 h-4 mr-2"
                  />
                  <p className="text-sm">Ghi nhớ</p>
                </div>
                <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">
                  Quên mật khẩu?
                </p>
              </div>
              <div className="w-full flex flex-col my-4">
                <button
                  type="submit"
                  className="w-full text-white my-2 bg-[#060606] rounded-md p-4 text-center flex items-center justify-center cursor-pointer"
                >
                  Đăng nhập
                </button>
              </div>
            </form>
          </div>
          <div className="w-full flex items-center justify-center flex-col mt-5">
            <p className="text-sm font-normal text-black">
              Bạn không có tài khoản ?{" "}
              <Link to="/register">
                <span className="font-semibold underline underline-offset-2 cursor-pointer">
                  Đăng ký ngay
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default LoginForm;
