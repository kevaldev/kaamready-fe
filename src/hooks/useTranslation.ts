import { useTranslation as useI18nTranslation } from "react-i18next";

/**
 * Custom hook for handling translations in the application
 * Wraps the react-i18next useTranslation hook to provide additional functionality
 *
 * @returns The translation functions and utilities
 */
const useTranslation = () => {
  const { t, i18n } = useI18nTranslation();

  /**
   * Change the current language
   * @param language The language code to switch to
   */
  const changeLanguage = async (language: string) => {
    try {
      await i18n.changeLanguage(language);
      // Store the language preference in localStorage
      localStorage.setItem("preferredLanguage", language);
    } catch (error) {
      console.error("Failed to change language:", error);
    }
  };

  /**
   * Get the current language
   * @returns The current language code
   */
  const getCurrentLanguage = () => {
    return i18n.language;
  };

  /**
   * Check if the current language is RTL (Right-to-Left)
   * @returns Boolean indicating if the current language is RTL
   */
  const isRTL = () => {
    const rtlLanguages = ["ar", "he", "ur"];
    return rtlLanguages.includes(getCurrentLanguage());
  };

  return {
    t,
    i18n,
    changeLanguage,
    getCurrentLanguage,
    isRTL,
  };
};

export default useTranslation;
