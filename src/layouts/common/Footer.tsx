import { useTranslation } from "@hooks";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-white dark:bg-dark-800 shadow-sm py-4 mt-auto border-t border-gray-100 dark:border-gray-700">
      <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>
          &copy; {new Date().getFullYear()} KaamReady.{" "}
          {t("common.allRightsReserved")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
