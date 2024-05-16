"use client";
import Image from "next/image";
import { Input } from "./Input";
import logo from "../assets/B2Bit Logo.png";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Formik } from "formik";

export function LoginCard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/profile");
    }
  }, [router]);

  const submitFunc = async (login: { email: string; password: string }) => {
    try {
      const { data } = await api.post("auth/login/", login);
      localStorage.setItem("token", data.tokens.access);
      router.push("/profile");
    } catch (error: any) {
      const response = error.response;
      alert(response.data.detail);
    }
  };

  return (
    <section className=" w-[438px] h-[534px] rounded-[18px] shadow-[0px_0px_64px_0px_#00000040] flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mt-14 mb-[34.87px]">
        <Image
          className="w-[309.6px] h-[94.81px]"
          src={logo}
          width={1028}
          height={720}
          alt="b2bit logo"
        ></Image>
      </h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {} as any;
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          if (!values.password) {
            errors.password = "Required";
          } else if (values.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          submitFunc(values);
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form
            className="flex flex-col items-center justify-center gap-7"
            onSubmit={handleSubmit}
          >
            <Input
              label="E-mail"
              classLabel="gap-[9px] font-bold text-lg"
              className="w-[385.88px] h-[54.25] rounded-[9px] p-[18px_18px_20.25px_18px] bg-[#f1f1f1] text-base font-normal"
              placeholder="@gmail.com"
              type="text"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              data-testid="email"
            >
              {errors.email && touched.email && (
                <span className="absolute bottom-[-20px] text-sm text-[red]"
                data-testid="email-error"
                >
                  {errors.email}
                </span>
              )}
            </Input>
            <Input
              label="Password"
              classLabel="gap-[9px] font-bold text-lg"
              className="w-[385.88px] h-[54.25] rounded-[9px] p-[18px_18px_20.25px_18px] bg-[#f1f1f1] text-base font-normal"
              placeholder="*****************"
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              data-testid="password"
            >
              {errors.password && touched.password && (
                <span className="absolute bottom-[-20px] text-sm text-[red]"
                data-testid="password-error"
                >
                  {errors.password}
                </span>
              )}
            </Input>
            <button
              className="w-[385.88px] h-[54px] bg-[#02274F] text-[#FAFAFA] font-bold flex justify-center items-center text-lg rounded-[9px]"
              disabled={isSubmitting}
              type="submit"
              data-testid="submit-button"
            >
              Sign In
            </button>
          </form>
        )}
      </Formik>
    </section>
  );
}
