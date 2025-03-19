import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiCalendar, FiClock, FiMapPin } from "react-icons/fi";

import { Card, Button } from "@components/common";
import { AppDispatch } from "@redux/store";
import { useTranslation } from "@hooks";
// These would be implemented in the actual application
// import { fetchUserBookings } from '@redux/slices/bookingSlice';
// import { selectUserBookings } from '@redux/slices/bookingSlice';

const DashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  // This would be implemented in the actual application
  // const bookings = useSelector(selectUserBookings);

  // Mock data for demonstration
  const bookings = [
    {
      id: "1",
      serviceName: "Home Cleaning",
      workerName: "Rahul Sharma",
      date: "2023-06-15",
      time: "10:00 AM",
      status: "confirmed",
      address: "123 Main St, Mumbai, MH 400001",
    },
    {
      id: "2",
      serviceName: "Plumbing Repair",
      workerName: "Amit Patel",
      date: "2023-06-18",
      time: "2:00 PM",
      status: "pending",
      address: "456 Park Ave, Mumbai, MH 400002",
    },
  ];

  useEffect(() => {
    // This would be implemented in the actual application
    // dispatch(fetchUserBookings());
  }, [dispatch]);

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {t("customer.dashboard")}
        </h1>
        <p className="text-gray-600">{t("customer.dashboardSubtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-primary-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {t("customer.upcomingBookings")}
              </h3>
              <p className="text-3xl font-bold text-primary mt-2">2</p>
            </div>
            <div className="p-3 bg-primary-100 rounded-full">
              <FiCalendar className="text-primary" size={24} />
            </div>
          </div>
        </Card>

        <Card className="bg-secondary-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {t("customer.completedServices")}
              </h3>
              <p className="text-3xl font-bold text-secondary mt-2">5</p>
            </div>
            <div className="p-3 bg-secondary-100 rounded-full">
              <FiClock className="text-secondary" size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {t("customer.savedAddresses")}
              </h3>
              <p className="text-3xl font-bold text-gray-700 mt-2">2</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-full">
              <FiMapPin className="text-gray-700" size={24} />
            </div>
          </div>
        </Card>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {t("customer.upcomingBookings")}
          </h2>
          <Button variant="outline" size="sm">
            {t("common.viewAll")}
          </Button>
        </div>

        {bookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <Card key={booking.id}>
                <div className="flex justify-between mb-3">
                  <h3 className="text-lg font-medium text-gray-900">
                    {booking.serviceName}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {t(`booking.status.${booking.status}`)}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">{t("common.worker")}:</span>{" "}
                    {booking.workerName}
                  </p>
                  <p className="flex items-center">
                    <FiCalendar className="mr-2" size={16} />
                    <span>
                      {booking.date} | {booking.time}
                    </span>
                  </p>
                  <p className="flex items-center">
                    <FiMapPin className="mr-2" size={16} />
                    <span>{booking.address}</span>
                  </p>
                </div>
                <div className="mt-4 flex space-x-2">
                  <Button variant="outline" size="sm">
                    {t("booking.reschedule")}
                  </Button>
                  <Button variant="danger" size="sm">
                    {t("booking.cancel")}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <div className="text-center py-8">
              <p className="text-gray-600">{t("customer.noBookings")}</p>
              <Button className="mt-4" variant="primary">
                {t("customer.findService")}
              </Button>
            </div>
          </Card>
        )}
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {t("customer.recommendedServices")}
          </h2>
          <Button variant="outline" size="sm">
            {t("common.viewAll")}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card hoverable>
            <div className="aspect-w-16 aspect-h-9 mb-4 bg-gray-200 rounded-md"></div>
            <h3 className="text-lg font-medium text-gray-900">Home Cleaning</h3>
            <p className="text-sm text-gray-600 mb-2">
              Professional cleaning services for your home
            </p>
            <p className="text-primary font-bold">₹499 onwards</p>
          </Card>
          <Card hoverable>
            <div className="aspect-w-16 aspect-h-9 mb-4 bg-gray-200 rounded-md"></div>
            <h3 className="text-lg font-medium text-gray-900">
              Plumbing Services
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              Expert plumbers for all your needs
            </p>
            <p className="text-primary font-bold">₹299 onwards</p>
          </Card>
          <Card hoverable>
            <div className="aspect-w-16 aspect-h-9 mb-4 bg-gray-200 rounded-md"></div>
            <h3 className="text-lg font-medium text-gray-900">Electrician</h3>
            <p className="text-sm text-gray-600 mb-2">
              Certified electricians for home repairs
            </p>
            <p className="text-primary font-bold">₹399 onwards</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
