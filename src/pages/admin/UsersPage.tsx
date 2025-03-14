import React, { useState } from "react";
import { useTranslation } from "@hooks";
import { Card } from "@components/common";

const UsersPage = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data for users
  const users = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul.sharma@example.com",
      phone: "+91 9876543210",
      role: "customer",
      status: "active",
      joinedDate: "15 Jan 2023",
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya.patel@example.com",
      phone: "+91 9876543211",
      role: "customer",
      status: "active",
      joinedDate: "20 Feb 2023",
    },
    {
      id: 3,
      name: "Amit Kumar",
      email: "amit.kumar@example.com",
      phone: "+91 9876543212",
      role: "worker",
      status: "active",
      joinedDate: "05 Mar 2023",
    },
    {
      id: 4,
      name: "Neha Gupta",
      email: "neha.gupta@example.com",
      phone: "+91 9876543213",
      role: "customer",
      status: "inactive",
      joinedDate: "12 Apr 2023",
    },
    {
      id: 5,
      name: "Rajesh Verma",
      email: "rajesh.verma@example.com",
      phone: "+91 9876543214",
      role: "worker",
      status: "active",
      joinedDate: "18 May 2023",
    },
  ];

  // Filter users based on search term and status
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);

    const matchesStatus =
      filterStatus === "all" || user.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t("admin.users")}</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors">
          {t("admin.addUser")}
        </button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder={t("admin.searchUsers")}
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
              <option value="all">{t("admin.allUsers")}</option>
              <option value="active">{t("admin.activeUsers")}</option>
              <option value="inactive">{t("admin.inactiveUsers")}</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Users Table */}
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
                {t("admin.role")}
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
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{user.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.email}</div>
                  <div className="text-sm text-gray-500">{user.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {user.role === "customer"
                      ? t("admin.customer")
                      : t("admin.worker")}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.status === "active"
                      ? t("admin.active")
                      : t("admin.inactive")}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.joinedDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-primary hover:text-primary-dark mr-3">
                    {t("admin.edit")}
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    {t("admin.delete")}
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

export default UsersPage;
