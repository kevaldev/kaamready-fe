import React, { useState } from "react";
import { useTranslation } from "@hooks";
import { Card } from "@components/common";

const PaymentsPage = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data for payments
  const payments = [
    {
      id: "PAY-2023-001",
      customer: "Rahul Sharma",
      worker: "Amit Kumar",
      service: "Plumbing",
      date: "15 Sep 2023",
      amount: "₹800",
      status: "completed",
      paymentMethod: "UPI",
    },
    {
      id: "PAY-2023-002",
      customer: "Priya Patel",
      worker: "Rajesh Verma",
      service: "House Cleaning",
      date: "16 Sep 2023",
      amount: "₹1,200",
      status: "completed",
      paymentMethod: "Credit Card",
    },
    {
      id: "PAY-2023-003",
      customer: "Vikram Desai",
      worker: "Sunil Patel",
      service: "Carpentry",
      date: "18 Sep 2023",
      amount: "₹950",
      status: "pending",
      paymentMethod: "Wallet",
    },
    {
      id: "PAY-2023-004",
      customer: "Neha Gupta",
      worker: "Deepak Singh",
      service: "Electrical",
      date: "20 Sep 2023",
      amount: "₹600",
      status: "pending",
      paymentMethod: "UPI",
    },
    {
      id: "PAY-2023-005",
      customer: "Sanjay Mehta",
      worker: "Manoj Tiwari",
      service: "Plumbing",
      date: "14 Sep 2023",
      amount: "₹750",
      status: "failed",
      paymentMethod: "Debit Card",
    },
  ];

  // Filter payments based on search term and status
  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.worker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || payment.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Function to get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t("admin.payments")}</h1>
        <div className="flex space-x-2">
          <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors">
            {t("admin.exportPayments")}
          </button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder={t("admin.searchPayments")}
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
              <option value="all">{t("admin.allPayments")}</option>
              <option value="completed">{t("admin.completedPayments")}</option>
              <option value="pending">{t("admin.pendingPayments")}</option>
              <option value="failed">{t("admin.failedPayments")}</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Payments Table */}
      <Card className="p-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("admin.paymentId")}
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
                {t("admin.date")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("admin.amount")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("admin.paymentMethod")}
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
            {filteredPayments.map((payment) => (
              <tr key={payment.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{payment.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {payment.customer}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{payment.worker}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{payment.service}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{payment.date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium">{payment.amount}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {payment.paymentMethod}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                      payment.status
                    )}`}
                  >
                    {payment.status === "completed"
                      ? t("admin.statuses.completed")
                      : payment.status === "pending"
                      ? t("admin.statuses.pending")
                      : t("admin.statuses.failed")}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-primary hover:text-primary-dark mr-3">
                    {t("admin.view")}
                  </button>
                  {payment.status === "pending" && (
                    <button className="text-primary hover:text-primary-dark">
                      {t("admin.process")}
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

export default PaymentsPage;
