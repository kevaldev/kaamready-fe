import { useTranslation } from "@hooks";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-white shadow-sm py-4 mt-auto">
      <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
        <p>
          &copy; {new Date().getFullYear()} KaamReady.{" "}
          {t("common.allRightsReserved")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
