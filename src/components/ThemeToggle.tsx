import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import Button from "./common/Button";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Check for user preference in localStorage
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  return (
    <Button onClick={toggleTheme} className="!rounded-full !p-2">
      {darkMode ? (
        <FiSun className="w-5 h-5" />
      ) : (
        <FiMoon className="w-5 h-5" />
      )}
    </Button>
    // <button
    //   onClick={toggleTheme}
    //   className="btn-primaey p-2 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-900 dark:text-primary-100 transition-colors"
    //   aria-label="Toggle dark mode"
    // >
    //   {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
    // </button>
  );
};

export default ThemeToggle;
