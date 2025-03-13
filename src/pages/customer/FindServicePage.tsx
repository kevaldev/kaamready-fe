import React, { useState } from "react";
import { FiSearch, FiMapPin, FiFilter, FiStar } from "react-icons/fi";
import { useTranslation } from "@hooks";
import Card from "@components/common/Card";
import Button from "@components/common/Button";

interface ServiceItem {
  id: string;
  name: string;
  category: string;
  rating: number;
  ratingCount: number;
  price: number;
  image?: string;
  description: string;
  provider: {
    name: string;
    rating: number;
    jobsCompleted: number;
  };
}

const FindServicePage: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortBy, setSortBy] = useState("recommended");

  // Mock data for demonstration
  const categories = [
    { id: "all", name: t("services.all") },
    { id: "cleaning", name: t("services.cleaning") },
    { id: "plumbing", name: t("services.plumbing") },
    { id: "electrical", name: t("services.electrical") },
    { id: "carpentry", name: t("services.carpentry") },
    { id: "painting", name: t("services.painting") },
    { id: "gardening", name: t("services.gardening") },
  ];

  // Mock services data
  const services: ServiceItem[] = [
    {
      id: "1",
      name: "Home Deep Cleaning",
      category: "cleaning",
      rating: 4.8,
      ratingCount: 245,
      price: 1499,
      description: "Professional deep cleaning for your entire home",
      provider: {
        name: "CleanPro Services",
        rating: 4.9,
        jobsCompleted: 1240,
      },
    },
    {
      id: "2",
      name: "Bathroom Plumbing Repair",
      category: "plumbing",
      rating: 4.6,
      ratingCount: 189,
      price: 799,
      description: "Fix leaks, clogs, and other bathroom plumbing issues",
      provider: {
        name: "Plumb Perfect",
        rating: 4.7,
        jobsCompleted: 890,
      },
    },
    {
      id: "3",
      name: "Electrical Wiring & Repair",
      category: "electrical",
      rating: 4.9,
      ratingCount: 312,
      price: 999,
      description: "Professional electrical services for your home",
      provider: {
        name: "PowerFix Electricals",
        rating: 4.8,
        jobsCompleted: 1560,
      },
    },
    {
      id: "4",
      name: "Furniture Assembly",
      category: "carpentry",
      rating: 4.5,
      ratingCount: 156,
      price: 599,
      description: "Expert assembly of all types of furniture",
      provider: {
        name: "WoodWorks",
        rating: 4.6,
        jobsCompleted: 720,
      },
    },
    {
      id: "5",
      name: "Interior Wall Painting",
      category: "painting",
      rating: 4.7,
      ratingCount: 203,
      price: 2499,
      description: "Professional painting services with premium paints",
      provider: {
        name: "ColorMaster Painters",
        rating: 4.8,
        jobsCompleted: 950,
      },
    },
    {
      id: "6",
      name: "Garden Maintenance",
      category: "gardening",
      rating: 4.4,
      ratingCount: 132,
      price: 899,
      description: "Complete garden care and maintenance services",
      provider: {
        name: "GreenThumb Gardens",
        rating: 4.5,
        jobsCompleted: 680,
      },
    },
  ];

  // Filter services based on search, category, and price range
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory ||
      selectedCategory === "all" ||
      service.category === selectedCategory;
    const matchesPrice =
      service.price >= priceRange[0] && service.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort services based on selected sort option
  const sortedServices = [...filteredServices].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    // Default: recommended (no specific sort)
    return 0;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger an API call
    console.log("Searching for:", searchQuery, "in", location);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  const handlePriceRangeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = parseInt(e.target.value, 10);
    setPriceRange((prev) => {
      const newRange = [...prev] as [number, number];
      newRange[index] = value;
      return newRange;
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {t("customer.findService")}
        </h1>
        <p className="text-gray-600">{t("customer.findServiceSubtitle")}</p>
      </div>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row mb-8"
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
        <button type="submit" className="btn-primary md:ml-4 mt-2 md:mt-0">
          {t("landing.search.button")}
        </button>
      </form>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 bg-white rounded-lg shadow-md p-4 h-fit">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              {t("search.categories")}
            </h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                    selectedCategory === category.id
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              {t("search.priceRange")}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  {t("search.min")}
                </label>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="100"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceRangeChange(e, 0)}
                  className="w-full"
                />
                <span className="text-sm text-gray-700">₹{priceRange[0]}</span>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  {t("search.max")}
                </label>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="100"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceRangeChange(e, 1)}
                  className="w-full"
                />
                <span className="text-sm text-gray-700">₹{priceRange[1]}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              {t("search.sortBy")}
            </h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="recommended">{t("search.recommended")}</option>
              <option value="price-low">{t("search.priceLowToHigh")}</option>
              <option value="price-high">{t("search.priceHighToLow")}</option>
              <option value="rating">{t("search.topRated")}</option>
            </select>
          </div>
        </div>

        {/* Services List */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">
              {sortedServices.length} {t("search.resultsFound")}
            </p>
            <div className="flex items-center">
              <FiFilter className="mr-2" />
              <span className="text-sm">{t("search.filters")}</span>
            </div>
          </div>

          {sortedServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedServices.map((service) => (
                <Card key={service.id} hoverable>
                  <div className="aspect-w-16 aspect-h-9 mb-4 bg-gray-200 rounded-md"></div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium text-gray-900">
                      {service.name}
                    </h3>
                    <span className="text-primary font-bold">
                      ₹{service.price}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {service.description}
                  </p>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      <FiStar
                        className="text-yellow-400 fill-current"
                        size={16}
                      />
                      <span className="ml-1 text-sm font-medium">
                        {service.rating}
                      </span>
                    </div>
                    <span className="mx-2 text-gray-300">|</span>
                    <span className="text-sm text-gray-500">
                      {service.ratingCount} {t("common.reviews")}
                    </span>
                  </div>
                  <div className="border-t pt-3">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">
                        {t("booking.provider")}:
                      </span>{" "}
                      {service.provider.name}
                    </p>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <FiStar
                        className="text-yellow-400 fill-current mr-1"
                        size={14}
                      />
                      <span>{service.provider.rating}</span>
                      <span className="mx-2">•</span>
                      <span>
                        {service.provider.jobsCompleted}+{" "}
                        {t("worker.jobsCompleted")}
                      </span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="primary">
                    {t("booking.bookNow")}
                  </Button>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">{t("search.noResults")}</p>
                <Button
                  variant="primary"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory(null);
                    setPriceRange([0, 5000]);
                  }}
                >
                  {t("search.clearFilters")}
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindServicePage;
