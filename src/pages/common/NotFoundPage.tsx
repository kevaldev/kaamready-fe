import { Link } from "react-router-dom";
import { useTranslation } from "@hooks";

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-light px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-3xl font-semibold mt-4 mb-6">
          {t("notFound.title")}
        </h2>
        <p className="text-gray-600 mb-8">{t("notFound.message")}</p>
        <Link to="/" className="btn-primary">
          {t("notFound.backToHome")}
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
