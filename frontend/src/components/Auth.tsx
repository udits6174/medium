import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupType } from "@azxkikr/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [formdata, setformdata] = useState<SignupType>({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const HandleClick = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        formdata
      );
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (error) {
      alert("Request failed!");
    }
  };
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="max-w-lg">
        <div className="px-10">
          <div className="text-3xl font-bold my-2">Create an Account</div>
          <div className="flex flex-row gap-5 font-normal text-slate-400 mb-5">
            <div>
              {type === "signup"
                ? "Already have an account?"
                : "Don't have an account"}
            </div>
            <div className="underline">
              <Link to={type === "signup" ? "/signin" : "/signup"}>
                {type === "signup" ? "Sign in" : "Sign up"}
              </Link>
            </div>
          </div>
        </div>
        {type === "signup" ? (
          <LabelledInput
            label="Username"
            type="text"
            placeholder="Enter your name"
            onChange={(e) => {
              setformdata((formdata) => ({
                ...formdata,
                username: e.target.value,
              }));
            }}
          />
        ) : null}
        <LabelledInput
          label="Email"
          type="email"
          placeholder="devian@example.com"
          onChange={(e) => {
            setformdata((formdata) => ({
              ...formdata,
              email: e.target.value,
            }));
          }}
        />
        <LabelledInput
          label="Password"
          type="password"
          placeholder=""
          onChange={(e) => {
            setformdata((formdata) => ({
              ...formdata,
              password: e.target.value,
            }));
          }}
        />
        <div className="bg-black text-white border rounded-md text-center mt-5 p-2">
          <button onClick={HandleClick} type="submit">
            {type === "signup" ? "Sign up" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

type LabelledInputTypes = {
  label: string;
  type: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
function LabelledInput({
  label,
  type,
  placeholder,
  onChange,
}: LabelledInputTypes) {
  return (
    <>
      <div>
        <label className="block mt-2 mb-2 text-sm font-medium text-gray-900">
          {label}
        </label>
        <input
          type={type}
          onChange={onChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder={placeholder}
          required
        />
      </div>
    </>
  );
}
