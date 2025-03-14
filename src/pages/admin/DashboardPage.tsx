import React from "react";
import { useTranslation } from "@hooks";
import { Card } from "@components/common";

const DashboardPage = () => {
  const { t } = useTranslation();

  // Mock data for dashboard stats
  const stats = [
    {
      title: t("admin.stats.totalUsers"),
      value: "1,245",
      change: "+12%",
      positive: true,
    },
    {
      title: t("admin.stats.totalWorkers"),
      value: "847",
      change: "+7%",
      positive: true,
    },
    {
      title: t("admin.stats.activeBookings"),
      value: "328",
      change: "+18%",
      positive: true,
    },
    {
      title: t("admin.stats.revenue"),
      value: "₹42,500",
      change: "+15%",
      positive: true,
    },
  ];

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      type: "user_registration",
      user: "Rahul Sharma",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "booking_completed",
      user: "Priya Patel",
      worker: "Amit Kumar",
      service: "Plumbing",
      time: "3 hours ago",
    },
    {
      id: 3,
      type: "worker_registration",
      worker: "Sanjay Singh",
      skills: ["Electrician", "Handyman"],
      time: "5 hours ago",
    },
    {
      id: 4,
      type: "dispute_raised",
      user: "Neha Gupta",
      worker: "Rajesh Verma",
      service: "House Cleaning",
      time: "6 hours ago",
    },
    {
      id: 5,
      type: "payment_processed",
      amount: "₹1,200",
      user: "Vikram Desai",
      time: "8 hours ago",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t("admin.dashboard")}</h1>
        <div className="flex space-x-2">
          <select className="border rounded-md px-3 py-1.5 text-sm">
            <option value="today">{t("common.today")}</option>
            <option value="week">{t("common.thisWeek")}</option>
            <option value="month">{t("common.thisMonth")}</option>
            <option value="year">{t("common.thisYear")}</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-4">
            <h3 className="text-gray-500 font-medium">{stat.title}</h3>
            <div className="flex items-end justify-between mt-2">
              <p className="text-2xl font-bold">{stat.value}</p>
              <span
                className={`text-sm font-medium ${
                  stat.positive ? "text-green-500" : "text-red-500"
                }`}
              >
                {stat.change}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-4">
          {t("admin.recentActivity")}
        </h2>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="border-b pb-3 last:border-0 last:pb-0"
            >
              <div className="flex justify-between">
                <div>
                  {activity.type === "user_registration" && (
                    <p>
                      <span className="font-medium">{activity.user}</span>{" "}
                      {t("admin.activity.userRegistered")}
                    </p>
                  )}
                  {activity.type === "booking_completed" && (
                    <p>
                      <span className="font-medium">{activity.user}</span>{" "}
                      {t("admin.activity.bookingCompleted")}{" "}
                      <span className="font-medium">{activity.worker}</span> for{" "}
                      {activity.service}
                    </p>
                  )}
                  {activity.type === "worker_registration" && (
                    <p>
                      <span className="font-medium">{activity.worker}</span>{" "}
                      {t("admin.activity.workerRegistered")}{" "}
                      {activity.skills.join(", ")}
                    </p>
                  )}
                  {activity.type === "dispute_raised" && (
                    <p>
                      <span className="font-medium">{activity.user}</span>{" "}
                      {t("admin.activity.disputeRaised")}{" "}
                      <span className="font-medium">{activity.worker}</span> for{" "}
                      {activity.service}
                    </p>
                  )}
                  {activity.type === "payment_processed" && (
                    <p>
                      <span className="font-medium">{activity.user}</span>{" "}
                      {t("admin.activity.paymentProcessed")}{" "}
                      <span className="font-medium">{activity.amount}</span>
                    </p>
                  )}
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;
