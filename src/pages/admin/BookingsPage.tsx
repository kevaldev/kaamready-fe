import React, { useState } from "react";
import { useTranslation } from "@hooks";
import { Card } from "@components/common";

const BookingsPage = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data for bookings
  const bookings = [
    {
      id: "BK-2023-001",
      customer: "Rahul Sharma",
      worker: "Amit Kumar",
      service: "Plumbing",
      date: "15 Sep 2023",
      time: "10:00 AM - 12:00 PM",
      amount: "₹800",
      status: "completed",
      location: "Andheri, Mumbai",
    },
    {
      id: "BK-2023-002",
      customer: "Priya Patel",
      worker: "Rajesh Verma",
      service: "House Cleaning",
      date: "16 Sep 2023",
      time: "02:00 PM - 05:00 PM",
      amount: "₹1,200",
      status: "ongoing",
      location: "Bandra, Mumbai",
    },
    {
      id: "BK-2023-003",
      customer: "Vikram Desai",
      worker: "Sunil Patel",
      service: "Carpentry",
      date: "18 Sep 2023",
      time: "11:00 AM - 01:00 PM",
      amount: "₹950",
      status: "scheduled",
      location: "Powai, Mumbai",
    },
    {
      id: "BK-2023-004",
      customer: "Neha Gupta",
      worker: "Deepak Singh",
      service: "Electrical",
      date: "20 Sep 2023",
      time: "09:00 AM - 10:30 AM",
      amount: "₹600",
      status: "scheduled",
      location: "Juhu, Mumbai",
    },
    {
      id: "BK-2023-005",
      customer: "Sanjay Mehta",
      worker: "Manoj Tiwari",
      service: "Plumbing",
      date: "14 Sep 2023",
      time: "03:00 PM - 04:30 PM",
      amount: "₹750",
      status: "cancelled",
      location: "Dadar, Mumbai",
    },
  ];

  // Filter bookings based on search term and status
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.worker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || booking.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Function to get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "ongoing":
        return "bg-blue-100 text-blue-800";
      case "scheduled":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t("admin.bookings")}</h1>
        <div className="flex space-x-2">
          <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors">
            {t("admin.exportBookings")}
          </button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder={t("admin.searchBookings")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-48">
            <select
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">{t("admin.allBookings")}</option>
              <option value="scheduled">{t("admin.scheduledBookings")}</option>
              <option value="ongoing">{t("admin.ongoingBookings")}</option>
              <option value="completed">{t("admin.completedBookings")}</option>
              <option value="cancelled">{t("admin.cancelledBookings")}</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Bookings Table */}
      <Card className="p-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("admin.bookingId")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("admin.customer")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("admin.worker")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("admin.service")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("admin.dateTime")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("admin.amount")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("admin.status")}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("admin.actions")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{booking.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {booking.customer}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{booking.worker}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{booking.service}</div>
                  <div className="text-xs text-gray-500">
                    {booking.location}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{booking.date}</div>
                  <div className="text-xs text-gray-500">{booking.time}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium">{booking.amount}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                      booking.status
                    )}`}
                  >
                    {booking.status === "completed"
                      ? t("admin.statuses.completed")
                      : booking.status === "ongoing"
                      ? t("admin.statuses.ongoing")
                      : booking.status === "scheduled"
                      ? t("admin.statuses.scheduled")
                      : t("admin.statuses.cancelled")}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-primary hover:text-primary-dark mr-3">
                    {t("admin.view")}
                  </button>
                  {booking.status === "scheduled" && (
                    <button className="text-red-600 hover:text-red-900">
                      {t("admin.cancel")}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default BookingsPage;
