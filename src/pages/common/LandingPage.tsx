import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiSearch,
  FiMapPin,
  FiCheck,
  FiStar,
  FiShield,
  FiHeadphones,
} from "react-icons/fi";
import { useTranslation } from "@hooks";

const LandingPage = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Will be implemented with actual search functionality
    console.log("Search:", searchQuery, "Location:", location);
  };

  const serviceCategories = [
    { id: 1, name: t("services.plumbing"), icon: "🔧" },
    { id: 2, name: t("services.electrical"), icon: "⚡" },
    { id: 3, name: t("services.cleaning"), icon: "🧹" },
    { id: 4, name: t("services.painting"), icon: "🖌️" },
    { id: 5, name: t("services.carpentry"), icon: "🪚" },
    { id: 6, name: t("services.gardening"), icon: "🌱" },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "customer",
      content: t("testimonials.customer1"),
      rating: 5,
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      role: "worker",
      content: t("testimonials.worker1"),
      rating: 5,
    },
    {
      id: 3,
      name: "Anita Patel",
      role: "customer",
      content: t("testimonials.customer2"),
      rating: 4,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              KaamReady
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-gray-700 hover:text-primary">
              {t("auth.login")}
            </Link>
            <Link to="/register" className="btn-primary">
              {t("auth.register")}
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <Link to="/login" className="text-gray-700 hover:text-primary mr-2">
              {t("auth.login")}
            </Link>
            <Link to="/register" className="btn-primary text-sm py-1 px-2">
              {t("auth.register")}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              {t("landing.hero.title")}
            </h1>
            <p className="text-lg md:text-xl mb-8">
              {t("landing.hero.subtitle")}
            </p>

            {/* Search Form */}
            <form
              onSubmit={handleSearch}
              className="bg-white p-2 md:p-4 rounded-lg shadow-lg flex flex-col md:flex-row"
            >
              <div className="flex items-center flex-1 border-b md:border-b-0 md:border-r pb-2 md:pb-0 md:pr-4 mb-2 md:mb-0">
                <FiSearch className="text-gray-400 mr-2" size={20} />
                <input
                  type="text"
                  placeholder={t("landing.search.servicePlaceholder")}
                  className="w-full outline-none text-gray-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center flex-1 md:px-4">
                <FiMapPin className="text-gray-400 mr-2" size={20} />
                <input
                  type="text"
                  placeholder={t("landing.search.locationPlaceholder")}
                  className="w-full outline-none text-gray-700"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn-secondary md:ml-4 mt-2 md:mt-0"
              >
                {t("landing.search.button")}
              </button>
            </form>

            <div className="mt-8 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
              <Link
                to="/register?role=customer"
                className="btn-primary py-3 px-8"
              >
                {t("landing.cta.findWorker")}
              </Link>
              <Link
                to="/register?role=worker"
                className="btn-secondary py-3 px-8"
              >
                {t("landing.cta.joinAsWorker")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t("landing.howItWorks.title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiSearch className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("landing.howItWorks.step1.title")}
              </h3>
              <p className="text-gray-600">
                {t("landing.howItWorks.step1.description")}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheck className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("landing.howItWorks.step2.title")}
              </h3>
              <p className="text-gray-600">
                {t("landing.howItWorks.step2.description")}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiShield className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("landing.howItWorks.step3.title")}
              </h3>
              <p className="text-gray-600">
                {t("landing.howItWorks.step3.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t("landing.popularServices.title")}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {serviceCategories.map((category) => (
              <div
                key={category.id}
                className="bg-light hover:bg-gray-100 p-4 rounded-lg text-center cursor-pointer transition-colors"
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="font-medium">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t("landing.whyChooseUs.title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-secondary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <FiShield className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("landing.whyChooseUs.reason1.title")}
              </h3>
              <p className="text-gray-600">
                {t("landing.whyChooseUs.reason1.description")}
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-secondary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <FiStar className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("landing.whyChooseUs.reason2.title")}
              </h3>
              <p className="text-gray-600">
                {t("landing.whyChooseUs.reason2.description")}
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-secondary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <FiHeadphones className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("landing.whyChooseUs.reason3.title")}
              </h3>
              <p className="text-gray-600">
                {t("landing.whyChooseUs.reason3.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t("landing.testimonials.title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-light p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={
                        i < testimonial.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }
                      size={18}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mr-3">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">
                      {testimonial.role === "customer"
                        ? t("common.customer")
                        : t("common.worker")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">KaamReady</h3>
              <p className="text-gray-300">{t("footer.description")}</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">
                {t("footer.quickLinks")}
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-white">
                    {t("footer.links.home")}
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-white">
                    {t("footer.links.about")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-gray-300 hover:text-white"
                  >
                    {t("footer.links.services")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-300 hover:text-white"
                  >
                    {t("footer.links.contact")}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">
                {t("footer.legal")}
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/terms" className="text-gray-300 hover:text-white">
                    {t("footer.links.terms")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-gray-300 hover:text-white"
                  >
                    {t("footer.links.privacy")}
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-gray-300 hover:text-white">
                    {t("footer.links.faq")}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">
                {t("footer.contactUs")}
              </h4>
              <p className="text-gray-300 mb-2">
                {t("footer.email")}: support@kaamready.com
              </p>
              <p className="text-gray-300">
                {t("footer.phone")}: +91 9876543210
              </p>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300 text-sm">
            <p>
              &copy; {new Date().getFullYear()} KaamReady.{" "}
              {t("common.allRightsReserved")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
