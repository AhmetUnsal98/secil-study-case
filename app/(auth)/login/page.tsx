"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Checkbox } from "@mui/material";
import { signIn, useSession } from "next-auth/react";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const res = await signIn("credentials", {
      redirect: false,
      username: email,
      password: password,
    });
    if (res?.error) {
      setError("Giriş başarısız oldu. Lütfen bilgilerinizi kontrol edin.");
    } else {
      setError("");
      router.push("/collections");
    }
  };

  useEffect(() => {
    if (session) {
      router.push("/collections");
    }
  }, [session, router]);

  return (
    <div className="w-full sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/4 h-auto max-w-md rounded-lg shadow-2xl flex flex-col justify-center p-4 border border-gray-100 mx-auto mt-12">
      <h1 className="font-bold text-gray-600 text-3xl self-center mb-4">
        LOGO.
      </h1>
      <TextField
        id="outlined-basic"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        label="E-mail"
        variant="outlined"
        sx={{
          mt: 2,
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            "& fieldset": {
              borderColor: "#b0b0b0",
              borderWidth: "2px",
            },
            "&:hover fieldset": {
              borderColor: "darkgray",
            },
            "&.Mui-focused fieldset": {
              borderColor: "gray",
            },
          },
          "& .MuiInputLabel-root": {
            color: "gray",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "gray",
          },
        }}
      />
      <TextField
        id="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        label="Şifre"
        type={showPassword ? "text" : "password"}
        variant="outlined"
        sx={{
          mt: 2,
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            "& fieldset": {
              borderColor: "#b0b0b0",
              borderWidth: "2px",
            },
            "&:hover fieldset": {
              borderColor: "darkgray",
            },
            "&.Mui-focused fieldset": {
              borderColor: "gray",
            },
          },

          "& .MuiInputLabel-root": {
            color: "gray",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "gray",
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <div className="flex flex-row items-center mt-2">
        <Checkbox
          sx={{
            m: 0,
            p: 0,
            color: "gray",
            "&.Mui-checked": {
              color: "gray",
            },
          }}
          defaultChecked
        />
        <span>Beni hatirla</span>
      </div>
      {error && <div className="text-red-500 mt-2">{error}</div>}{" "}
      <Button
        onClick={handleSubmit}
        sx={{
          mt: 2,
          p: "12px",
          borderRadius: "10px",
          backgroundColor: "#1c1c1c",
          color: "white",
          textTransform: "none",
          border: "2px solid transparent",
          "&:hover": {
            backgroundColor: "white",
            color: "#1c1c1c",
            border: "2px solid #1c1c1c",
          },
        }}
        fullWidth
        loading={false}
        loadingPosition="end"
        variant="outlined"
      >
        Giriş Yap
      </Button>
    </div>
  );
};

export default Login;
