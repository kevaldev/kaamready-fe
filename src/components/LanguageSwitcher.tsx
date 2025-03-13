import { useState } from "react";
import Button from "./common/Button";
import { useTranslation } from "@hooks";

interface Language {
  code: string;
  name: string;
  flag: string;
}

const LanguageSwitcher = () => {
  const { getCurrentLanguage, changeLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages: Language[] = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "gu", name: "ગુજરાતી", flag: "🇮🇳" },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === getCurrentLanguage()) ||
    languages[0];

  const handleLanguageChange = (languageCode: string) => {
    changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button variant="outline" onClick={() => setIsOpen(!isOpen)}>
        {/* <span className="text-lg">{currentLanguage.flag}</span> */}
        <span>{currentLanguage.name}</span>
        <svg
          className={`h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  language.code === currentLanguage.code
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                role="menuitem"
              >
                <div className="flex items-center space-x-2">
                  {/* <span className="text-lg">{language.flag}</span> */}
                  <span>{language.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
