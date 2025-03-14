import React, { useState } from "react";
import { useTranslation } from "@hooks";
import { Card } from "@components/common";

const DisputesPage = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data for disputes
  const disputes = [
    {
      id: "DSP-2023-001",
      customer: "Neha Gupta",
      worker: "Rajesh Verma",
      service: "House Cleaning",
      bookingId: "BK-2023-002",
      date: "16 Sep 2023",
      amount: "₹1,200",
      status: "pending",
      reason: "Service quality issues",
    },
    {
      id: "DSP-2023-002",
      customer: "Vikram Desai",
      worker: "Manoj Tiwari",
      service: "Plumbing",
      bookingId: "BK-2023-005",
      date: "14 Sep 2023",
      amount: "₹750",
      status: "resolved",
      reason: "Worker didn't arrive on time",
      resolution: "Partial refund processed",
    },
    {
      id: "DSP-2023-003",
      customer: "Rahul Sharma",
      worker: "Deepak Singh",
      service: "Electrical",
      bookingId: "BK-2023-006",
      date: "12 Sep 2023",
      amount: "₹900",
      status: "rejected",
      reason: "Incorrect service description",
      resolution: "No refund, service was provided as described",
    },
    {
      id: "DSP-2023-004",
      customer: "Sanjay Mehta",
      worker: "Amit Kumar",
      service: "Plumbing",
      bookingId: "BK-2023-007",
      date: "10 Sep 2023",
      amount: "₹850",
      status: "pending",
      reason: "Incomplete work",
    },
    {
      id: "DSP-2023-005",
      customer: "Priya Patel",
      worker: "Sunil Patel",
      service: "Carpentry",
      bookingId: "BK-2023-008",
      date: "08 Sep 2023",
      amount: "₹1,100",
      status: "in_review",
      reason: "Damage to property during service",
    },
  ];

  // Filter disputes based on search term and status
  const filteredDisputes = disputes.filter((dispute) => {
    const matchesSearch =
      dispute.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.worker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (dispute.resolution &&
        dispute.resolution.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      filterStatus === "all" || dispute.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Function to get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800";
      case "in_review":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t("admin.disputes")}</h1>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder={t("admin.searchDisputes")}
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
              <option value="all">{t("admin.allDisputes")}</option>
              <option value="pending">{t("admin.pendingDisputes")}</option>
              <option value="in_review">{t("admin.inReviewDisputes")}</option>
              <option value="resolved">{t("admin.resolvedDisputes")}</option>
              <option value="rejected">{t("admin.rejectedDisputes")}</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Disputes Table */}
      <Card className="p-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("admin.disputeId")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("admin.parties")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("admin.service")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("admin.reason")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("admin.date")}
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
            {filteredDisputes.map((dispute) => (
              <tr key={dispute.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{dispute.id}</div>
                  <div className="text-xs text-gray-500">
                    {dispute.bookingId}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    <span className="font-medium">{t("admin.customer")}:</span>{" "}
                    {dispute.customer}
                  </div>
                  <div className="text-sm text-gray-900">
                    <span className="font-medium">{t("admin.worker")}:</span>{" "}
                    {dispute.worker}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{dispute.service}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{dispute.reason}</div>
                  {dispute.resolution && (
                    <div className="text-xs text-gray-500 mt-1">
                      <span className="font-medium">
                        {t("admin.resolution")}:
                      </span>{" "}
                      {dispute.resolution}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{dispute.date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium">{dispute.amount}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                      dispute.status
                    )}`}
                  >
                    {dispute.status === "resolved"
                      ? t("admin.resolved")
                      : dispute.status === "in_review"
                      ? t("admin.inReview")
                      : dispute.status === "pending"
                      ? t("admin.pending")
                      : t("admin.rejected")}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-primary hover:text-primary-dark mr-3">
                    {t("admin.view")}
                  </button>
                  {(dispute.status === "pending" ||
                    dispute.status === "in_review") && (
                    <button className="text-primary hover:text-primary-dark">
                      {t("admin.resolve")}
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

export default DisputesPage;
