import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";

import { useTranslation } from "@hooks";
import { register as registerUser } from "@redux/slices/authSlice";
import { AppDispatch } from "@redux/store";

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "customer" | "worker";
}

const RegisterPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get role from URL query params if available
  const queryParams = new URLSearchParams(location.search);
  const defaultRole =
    (queryParams.get("role") as "customer" | "worker") || "customer";

  const schema = yup.object({
    name: yup.string().required("auth.errors.requiredName"),
    email: yup
      .string()
      .email("auth.errors.invalidEmail")
      .required("auth.errors.requiredEmail"),
    password: yup
      .string()
      .min(6, "auth.errors.passwordLength")
      .required("auth.errors.requiredPassword"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "auth.errors.passwordMatch")
      .required("auth.errors.requiredConfirmPassword"),
    role: yup
      .string()
      .oneOf(["customer", "worker"])
      .required("auth.errors.requiredRole"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      role: defaultRole,
    },
  });

  const selectedRole = watch("role");

  const onSubmit = async (data: RegisterFormInputs) => {
    setIsLoading(true);
    setError(null);
    try {
      const resultAction = await dispatch(
        registerUser({
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
        })
      );
      if (registerUser.fulfilled.match(resultAction)) {
        // Redirect based on user role
        navigate(`/${data.role}/dashboard`, { replace: true });
      } else if (registerUser.rejected.match(resultAction)) {
        setError(
          (resultAction.payload as string) || "auth.errors.registrationFailed"
        );
      }
    } catch (err) {
      setError("auth.errors.registrationFailed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold text-primary">
            KaamReady
          </Link>
          <h2 className="text-2xl font-semibold mt-4">
            {t("auth.registerTitle")}
          </h2>
          <p className="text-gray-600 mt-2">{t("auth.registerSubtitle")}</p>
        </div>

        {error && (
          <div className="bg-error bg-opacity-10 text-error px-4 py-3 rounded-md mb-4">
            {t(error)}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("auth.name")}
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className="input-field"
              placeholder={t("auth.namePlaceholder")}
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-error text-sm mt-1">
                {t(errors.name.message || "")}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("auth.email")}
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="input-field"
              placeholder={t("auth.emailPlaceholder")}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-error text-sm mt-1">
                {t(errors.email.message || "")}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("auth.password")}
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className="input-field"
              placeholder={t("auth.passwordPlaceholder")}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-error text-sm mt-1">
                {t(errors.password.message || "")}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("auth.confirmPassword")}
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              className="input-field"
              placeholder={t("auth.confirmPasswordPlaceholder")}
              disabled={isLoading}
            />
            {errors.confirmPassword && (
              <p className="text-error text-sm mt-1">
                {t(errors.confirmPassword.message || "")}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("auth.selectRole")}
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label
                className={`flex items-center justify-center p-3 border rounded-md cursor-pointer transition-colors ${
                  selectedRole === "customer"
                    ? "bg-primary-700 bg-opacity-5 text-white"
                    : "border-gray-300 hover:border-primary hover:bg-primary-50"
                }`}
              >
                <input
                  type="radio"
                  value="customer"
                  {...register("role")}
                  className="sr-only"
                  disabled={isLoading}
                />
                <span>{t("auth.roles.customer")}</span>
              </label>
              <label
                className={`flex items-center justify-center p-3 border rounded-md cursor-pointer transition-colors ${
                  selectedRole === "worker"
                    ? "bg-primary-700 bg-opacity-5 text-white"
                    : "border-gray-300 hover:border-primary hover:bg-primary-50"
                }`}
              >
                <input
                  type="radio"
                  value="worker"
                  {...register("role")}
                  className="sr-only"
                  disabled={isLoading}
                />
                <span>{t("auth.roles.worker")}</span>
              </label>
            </div>
            {errors.role && (
              <p className="text-error text-sm mt-1">
                {t(errors.role.message || "")}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full btn-primary py-3 mt-6 ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? t("common.loading") : t("auth.register")}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {t("auth.haveAccount")}{" "}
            <Link to="/login" className="text-primary hover:underline">
              {t("auth.login")}
            </Link>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            {t("auth.termsNotice")}{" "}
            <Link to="/terms" className="text-primary hover:underline">
              {t("footer.links.terms")}
            </Link>{" "}
            {t("common.and")}{" "}
            <Link to="/privacy" className="text-primary hover:underline">
              {t("footer.links.privacy")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
