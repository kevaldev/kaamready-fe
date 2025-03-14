import React, { useState } from "react";
import { useTranslation } from "@hooks";
import { Card } from "@components/common";

const WorkersPage = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data for workers
  const workers = [
    {
      id: 1,
      name: "Amit Kumar",
      email: "amit.kumar@example.com",
      phone: "+91 9876543212",
      skills: ["Plumbing", "Electrical"],
      rating: 4.8,
      status: "verified",
      joinedDate: "05 Mar 2023",
    },
    {
      id: 2,
      name: "Rajesh Verma",
      email: "rajesh.verma@example.com",
      phone: "+91 9876543214",
      skills: ["House Cleaning", "Gardening"],
      rating: 4.5,
      status: "verified",
      joinedDate: "18 May 2023",
    },
    {
      id: 3,
      name: "Sunil Patel",
      email: "sunil.patel@example.com",
      phone: "+91 9876543215",
      skills: ["Carpentry", "Painting"],
      rating: 4.2,
      status: "pending",
      joinedDate: "22 Jun 2023",
    },
    {
      id: 4,
      name: "Deepak Singh",
      email: "deepak.singh@example.com",
      phone: "+91 9876543216",
      skills: ["Electrical", "AC Repair"],
      rating: 4.9,
      status: "verified",
      joinedDate: "10 Jul 2023",
    },
    {
      id: 5,
      name: "Manoj Tiwari",
      email: "manoj.tiwari@example.com",
      phone: "+91 9876543217",
      skills: ["Plumbing", "Handyman"],
      rating: 4.0,
      status: "rejected",
      joinedDate: "15 Aug 2023",
    },
  ];

  // Filter workers based on search term and status
  const filteredWorkers = workers.filter((worker) => {
    const matchesSearch =
      worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.phone.includes(searchTerm) ||
      worker.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus =
      filterStatus === "all" || worker.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t("admin.workers")}</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors">
          {t("admin.addWorker")}
        </button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder={t("admin.searchWorkers")}
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
              <option value="all">{t("admin.allWorkers")}</option>
              <option value="verified">{t("admin.verifiedWorkers")}</option>
              <option value="pending">{t("admin.pendingWorkers")}</option>
              <option value="rejected">{t("admin.rejectedWorkers")}</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Workers Table */}
      <Card className="p-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("admin.name")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("admin.contact")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("admin.skills")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("admin.rating")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("admin.status")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("admin.joinedDate")}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("admin.actions")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredWorkers.map((worker) => (
              <tr key={worker.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{worker.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{worker.email}</div>
                  <div className="text-sm text-gray-500">{worker.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {worker.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm font-medium">{worker.rating}</span>
                    <svg
                      className="w-4 h-4 text-yellow-400 ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      worker.status === "verified"
                        ? "bg-green-100 text-green-800"
                        : worker.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {worker.status === "verified"
                      ? t("admin.verified")
                      : worker.status === "pending"
                      ? t("admin.pending")
                      : t("admin.rejected")}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {worker.joinedDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-primary hover:text-primary-dark mr-3">
                    {t("admin.view")}
                  </button>
                  <button className="text-primary hover:text-primary-dark mr-3">
                    {t("admin.verify")}
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    {t("admin.reject")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default WorkersPage;
