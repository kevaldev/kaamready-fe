import { useState } from "react";
import { useTranslation } from "@hooks";
import { Dropdown, DropdownItem } from "./ui/dropdown";
import { LanguageSwitchIcon } from "@assets/icons";

interface Language {
  code: string;
  name: string;
  flag: string;
  shortName: string;
}

const LanguageSwitcher = () => {
  const { getCurrentLanguage, changeLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages: Language[] = [
    { code: "en", name: "English", shortName: "Eng.", flag: "(A)" },
    { code: "hi", name: "हिंदी", shortName: "हि.", flag: "(अ)" },
    { code: "gu", name: "ગુજરાતી", shortName: "ગુજ.", flag: "(અ)" },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === getCurrentLanguage()) ||
    languages[0];

  const handleLanguageChange = (languageCode: string) => {
    changeLanguage(languageCode);
    setIsOpen(false);
  };
  const handleClick = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="relative">
        <button
          className="relative flex items-center h-11 w-11 justify-center rounded-full text-gray-500 transition-colors bg-white border border-gray-200 dropdown-toggle hover:text-gray-700 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white duration-300 gap-1"
          onClick={handleClick}
        >
          <LanguageSwitchIcon className="h-9 w-9 fill-current" />
          {/* <span className="hidden md:block">{currentLanguage.name}</span>
          <span className="text-xs sm:text-sm">
            {currentLanguage.shortName}
          </span>
          <span
            className={`hidden sm:block text-gray-600 text-xs dark:text-indigo-100 ${
              currentLanguage.flag === languages[0].flag ? "leading-tight" : ""
            }`}
          >
            {currentLanguage.flag}
          </span> */}
        </button>
        <Dropdown
          isOpen={isOpen}
          onClose={handleClick}
          className="absolute mt-[17px] flex max-w-38 flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark sm:w-[361px] !-right-12 lg:right-0"
        >
          <ul className="flex flex-col h-auto overflow-y-auto custom-scrollbar">
            {languages.map((language, index) => (
              <li key={index}>
                <DropdownItem
                  isActive={currentLanguage.code === language.code}
                  onItemClick={() => handleLanguageChange(language.code)}
                  className="flex gap-3 rounded-lg border-b border-gray-100 p-1.5 py-2 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-900 dark:text-gray-100">
                      {language.flag}
                    </span>
                    <span className="text-md font-medium text-gray-600 dark:text-indigo-100">
                      {language.name}
                    </span>
                  </div>
                </DropdownItem>
              </li>
            ))}
          </ul>
        </Dropdown>
      </div>
    </>
  );
};

export default LanguageSwitcher;
