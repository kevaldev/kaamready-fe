import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  FiDollarSign,
  FiCalendar,
  FiTrendingUp,
  FiDownload,
} from "react-icons/fi";
import Card from "@components/common/Card";
import Button from "@components/common/Button";
import { AppDispatch } from "@redux/store";
// These would be implemented in the actual application
// import { fetchWorkerEarnings } from '@redux/slices/workerSlice';
// import { selectWorkerEarnings } from '@redux/slices/workerSlice';

interface EarningRecord {
  id: string;
  jobId: string;
  serviceName: string;
  customerName: string;
  date: string;
  amount: number;
  status: "pending" | "completed" | "cancelled";
}

interface EarningsSummary {
  totalEarnings: number;
  pendingPayments: number;
  completedJobs: number;
  thisMonthEarnings: number;
}

const EarningsPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<
    "week" | "month" | "year"
  >("month");
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  });

  // This would be implemented in the actual application
  // const earnings = useSelector(selectWorkerEarnings);

  // Mock data for demonstration
  const earningRecords: EarningRecord[] = [
    {
      id: "1",
      jobId: "101",
      serviceName: "Home Cleaning",
      customerName: "Priya Sharma",
      date: "2023-06-15",
      amount: 499,
      status: "completed",
    },
    {
      id: "2",
      jobId: "102",
      serviceName: "Office Cleaning",
      customerName: "Ananya Desai",
      date: "2023-06-10",
      amount: 799,
      status: "completed",
    },
    {
      id: "3",
      jobId: "103",
      serviceName: "Home Cleaning",
      customerName: "Raj Patel",
      date: "2023-06-18",
      amount: 499,
      status: "pending",
    },
    {
      id: "4",
      jobId: "104",
      serviceName: "Carpet Cleaning",
      customerName: "Vikram Singh",
      date: "2023-06-05",
      amount: 599,
      status: "cancelled",
    },
    {
      id: "5",
      jobId: "105",
      serviceName: "Bathroom Cleaning",
      customerName: "Meera Joshi",
      date: "2023-06-20",
      amount: 399,
      status: "completed",
    },
  ];

  const earningsSummary: EarningsSummary = {
    totalEarnings: 2296, // Sum of all completed jobs
    pendingPayments: 499, // Sum of all pending jobs
    completedJobs: 3,
    thisMonthEarnings: 1697, // Sum of completed jobs this month
  };

  useEffect(() => {
    // This would be implemented in the actual application
    // dispatch(fetchWorkerEarnings());
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Set default date range for the current month
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    setDateRange({
      start: firstDay.toISOString().split("T")[0],
      end: lastDay.toISOString().split("T")[0],
    });
  }, [dispatch]);

  const handlePeriodChange = (period: "week" | "month" | "year") => {
    setSelectedPeriod(period);
    const now = new Date();
    let start: Date;
    let end: Date = now;

    if (period === "week") {
      // Last 7 days
      start = new Date(now);
      start.setDate(now.getDate() - 7);
    } else if (period === "month") {
      // Current month
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    } else {
      // Current year
      start = new Date(now.getFullYear(), 0, 1);
      end = new Date(now.getFullYear(), 11, 31);
    }

    setDateRange({
      start: start.toISOString().split("T")[0],
      end: end.toISOString().split("T")[0],
    });
  };

  const filteredEarnings = earningRecords.filter((record) => {
    const recordDate = new Date(record.date);
    const startDate = new Date(dateRange.start);
    const endDate = new Date(dateRange.end);

    // Reset hours to compare dates only
    recordDate.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    return recordDate >= startDate && recordDate <= endDate;
  });

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  };

  const getStatusBadgeClass = (
    status: "pending" | "completed" | "cancelled"
  ) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDownloadStatement = () => {
    // This would be implemented in the actual application
    console.log("Downloading earnings statement...");
    alert(t("worker.earningsStatementDownloaded"));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {t("worker.earnings")}
        </h1>
        <p className="text-gray-600">{t("worker.earningsSubtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-green-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {t("worker.totalEarnings")}
              </h3>
              <p className="text-3xl font-bold text-green-600 mt-2">
                ₹{earningsSummary.totalEarnings}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <FiDollarSign className="text-green-600" size={24} />
            </div>
          </div>
        </Card>

        <Card className="bg-yellow-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {t("worker.pendingPayments")}
              </h3>
              <p className="text-3xl font-bold text-yellow-600 mt-2">
                ₹{earningsSummary.pendingPayments}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <FiCalendar className="text-yellow-600" size={24} />
            </div>
          </div>
        </Card>

        <Card className="bg-blue-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {t("worker.completedJobs")}
              </h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {earningsSummary.completedJobs}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FiTrendingUp className="text-blue-600" size={24} />
            </div>
          </div>
        </Card>

        <Card className="bg-primary-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {t("worker.thisMonthEarnings")}
              </h3>
              <p className="text-3xl font-bold text-primary mt-2">
                ₹{earningsSummary.thisMonthEarnings}
              </p>
            </div>
            <div className="p-3 bg-primary-100 rounded-full">
              <FiDollarSign className="text-primary" size={24} />
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          <h2 className="text-xl font-semibold text-gray-900">
            {t("worker.earningsHistory")}
          </h2>

          <div className="flex space-x-4">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              <button
                className={`px-3 py-1 text-sm rounded-md ${
                  selectedPeriod === "week"
                    ? "bg-white shadow-sm"
                    : "text-gray-600"
                }`}
                onClick={() => handlePeriodChange("week")}
              >
                {t("worker.lastWeek")}
              </button>
              <button
                className={`px-3 py-1 text-sm rounded-md ${
                  selectedPeriod === "month"
                    ? "bg-white shadow-sm"
                    : "text-gray-600"
                }`}
                onClick={() => handlePeriodChange("month")}
              >
                {t("worker.thisMonth")}
              </button>
              <button
                className={`px-3 py-1 text-sm rounded-md ${
                  selectedPeriod === "year"
                    ? "bg-white shadow-sm"
                    : "text-gray-600"
                }`}
                onClick={() => handlePeriodChange("year")}
              >
                {t("worker.thisYear")}
              </button>
            </div>

            <Button
              variant="outline"
              size="sm"
              leftIcon={<FiDownload />}
              onClick={handleDownloadStatement}
            >
              {t("worker.downloadStatement")}
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>{t("worker.showing")}:</span>
            <span className="font-medium">{formatDate(dateRange.start)}</span>
            <span>-</span>
            <span className="font-medium">{formatDate(dateRange.end)}</span>
          </div>

          <div className="flex space-x-2">
            <input
              type="date"
              className="p-2 border rounded-md text-sm"
              value={dateRange.start}
              onChange={(e) =>
                setDateRange({ ...dateRange, start: e.target.value })
              }
            />
            <span className="self-center">-</span>
            <input
              type="date"
              className="p-2 border rounded-md text-sm"
              value={dateRange.end}
              onChange={(e) =>
                setDateRange({ ...dateRange, end: e.target.value })
              }
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : filteredEarnings.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">{t("worker.noEarningsFound")}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {t("worker.status")}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEarnings.map((earning) => (
                  <tr key={earning.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(earning.date)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {earning.serviceName}
                      </div>
                      <div className="text-xs text-gray-500">
                        #{earning.jobId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {earning.customerName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ₹{earning.amount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                          earning.status
                        )}`}
                      >
                        {t(`worker.paymentStatus.${earning.status}`)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Payment Methods Section */}
      <Card className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {t("worker.paymentMethods")}
          </h2>
          <Button variant="outline" leftIcon={<FiDollarSign />}>
            {t("worker.addPaymentMethod")}
          </Button>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
          <p className="text-sm text-yellow-700">
            {t("worker.paymentMethodsMessage")}
          </p>
        </div>

        {/* This would be implemented in the actual application */}
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between py-3 border-b">
            <div className="flex items-center">
              <div className="bg-gray-100 p-2 rounded-md mr-3">
                <FiDollarSign size={20} />
              </div>
              <div>
                <p className="font-medium">UPI - user@bank</p>
                <p className="text-sm text-gray-500">{t("worker.primary")}</p>
              </div>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
              {t("worker.verified")}
            </span>
          </div>
          <div className="flex items-center justify-between py-3 border-b">
            <div className="flex items-center">
              <div className="bg-gray-100 p-2 rounded-md mr-3">
                <FiDollarSign size={20} />
              </div>
              <div>
                <p className="font-medium">Bank Account - XXXX1234</p>
                <p className="text-sm text-gray-500">{t("worker.secondary")}</p>
              </div>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
              {t("worker.verified")}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EarningsPage;
