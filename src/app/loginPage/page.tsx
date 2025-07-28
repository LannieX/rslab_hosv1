"use client";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { useMobileSize } from "../contexts/MobileSizeContext";
import Lottie from "lottie-react";
import animationData from "@/assets/gif/login.json";
import { getToken, login } from "@/service/api";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const LoginPage = () => {
  const mobileSize = useMobileSize();
  const [showPassword, setShowPassword] = useState(false);
  const [xcid, setXcid] = useState("");
  const [xmobile, setXmobile] = useState("");

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleToggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async () => {
    setLoading(true);

    try {
      const result = await login({ xcid, xmobile });
      console.log("result", result);

      if (result.success === true && result.data.length > 0) {
        if (Array.isArray(result.data) && result.data.length > 0) {
          sessionStorage.setItem("userInfo", JSON.stringify(result.data[0]));
          console.log("Login success:", result.data[0]);
        } else {
          sessionStorage.setItem("userInfo", JSON.stringify(result.data));
          console.log("Login success:", result.data);
        }
        try {
          const resToken = await getToken();
          console.log("resToken", resToken);
          Cookies.set("token", resToken);
        } catch (err) {
          console.log("getToken error:", err);
        }
        router.push("/");
      } else {
        toast.error(<div className="font-kanit">เข้าสู่ระบบไม่สำเร็จ!</div>);
        await new Promise((resolve) => setTimeout(resolve, 100));
        console.log("Login failed or no user info returned.");
      }
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div
        className={`w-full h-screen overflow-hidden flex ${
          mobileSize ? "flex-col items-center" : "flex-row"
        }`}
      >
        <div
          className={`flex flex-col items-center justify-center ${
            mobileSize ? "w-full bg-[#f19192] h-[50%] p-5" : "w-[50%] h-full"
          }`}
        >
          <Lottie
            animationData={animationData}
            loop={loading}
            className={` ${
              mobileSize ? " w-[150px] h-[150px]" : " w-[200px] h-[200px]"
            }`}
          />
          <p
            className={` ${
              mobileSize ? "text-[40px]" : "text-[60px]"
            }  font-bold text-gray-700`}
          >
            WELCOME
          </p>
          <p
            className={` ${
              mobileSize ? "text-[25px]" : "text-[45px]"
            }  font-bold text-gray-700`}
          >
            Yingo Hospitol
          </p>
        </div>
        <div
          className={`flex items-center justify-center ${
            mobileSize ? "w-full h-[50%]" : "w-[50%] bg-[#f19192] p-5 h-full"
          }`}
        >
          <div
            className={`flex flex-col items-center bg-gray-200 p-3 gap-2 ${
              mobileSize
                ? "w-full h-full p-5"
                : "rounded-2xl w-[500px] h-[380px]"
            }`}
          >
            <div className=" p-3 flex flex-col justify-center items-center">
              <p className="text-black text-[27px]">Sign In</p>
              <p className="text-gray-500">Hi, there Nice to see you again </p>
            </div>
            <div className="w-[90%] flex flex-col p-3 gap-5">
              <TextField
                id="outlined-textarea"
                label="Username"
                placeholder=""
                value={xcid}
                onChange={(e) => setXcid(e.target.value)}
                multiline
                variant="standard"
              />
              <TextField
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="standard"
                value={xmobile}
                onChange={(e) => setXmobile(e.target.value)}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleToggleVisibility} edge="end">
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="w-[50%] flex flex-col justify-center mt-8">
              <Button
                variant="contained"
                sx={{
                  fontFamily: '"Kanit", sans-serif',
                  backgroundColor: "#f19192",
                  "&:hover": {
                    backgroundColor: "#e67b7b",
                  },
                }}
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <p className="animate-pulse">Loading...</p>
                ) : (
                  "Sign In"
                )}
              </Button>
              <div className="w-full flex mt-3 justify-center text-[14px] font-light text-gray-400 cursor-pointer">
                forgot Password?
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
