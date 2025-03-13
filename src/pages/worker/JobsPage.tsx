import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiDollarSign,
  FiCheck,
  FiX,
  FiFilter,
} from "react-icons/fi";
import Card from "@components/common/Card";
import Button from "@components/common/Button";
import { AppDispatch } from "@redux/store";
import { useTranslation } from "@hooks";
// These would be implemented in the actual application
// import { fetchWorkerJobs, updateJobStatus } from '@redux/slices/workerSlice';
// import { selectWorkerJobs } from '@redux/slices/workerSlice';

type JobStatus = "pending" | "confirmed" | "completed" | "cancelled";

interface Job {
  id: string;
  serviceName: string;
  customerName: string;
  date: string;
  time: string;
  status: JobStatus;
  address: string;
  payment: number;
  customerPhone?: string;
  notes?: string;
}

const JobsPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed" | "all">(
    "upcoming"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState<string>("");

  // This would be implemented in the actual application
  // const jobs = useSelector(selectWorkerJobs);

  // Mock data for demonstration
  const jobs: Job[] = [
    {
      id: "1",
      serviceName: "Home Cleaning",
      customerName: "Priya Sharma",
      date: "2023-06-15",
      time: "10:00 AM",
      status: "confirmed",
      address: "123 Main St, Mumbai, MH 400001",
      payment: 499,
      customerPhone: "+91 9876543210",
      notes: "Please bring eco-friendly cleaning supplies.",
    },
    {
      id: "2",
      serviceName: "Home Cleaning",
      customerName: "Raj Patel",
      date: "2023-06-18",
      time: "2:00 PM",
      status: "pending",
      address: "456 Park Ave, Mumbai, MH 400002",
      payment: 499,
    },
    {
      id: "3",
      serviceName: "Office Cleaning",
      customerName: "Ananya Desai",
      date: "2023-06-10",
      time: "9:00 AM",
      status: "completed",
      address: "789 Business Park, Mumbai, MH 400003",
      payment: 799,
    },
    {
      id: "4",
      serviceName: "Carpet Cleaning",
      customerName: "Vikram Singh",
      date: "2023-06-05",
      time: "11:00 AM",
      status: "cancelled",
      address: "101 Luxury Apts, Mumbai, MH 400004",
      payment: 599,
    },
  ];

  useEffect(() => {
    // This would be implemented in the actual application
    // dispatch(fetchWorkerJobs());
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [dispatch]);

  const handleUpdateStatus = async (jobId: string, newStatus: JobStatus) => {
    setIsLoading(true);
    try {
      // This would be implemented in the actual application
      // await dispatch(updateJobStatus({ jobId, status: newStatus }));
      console.log(`Job ${jobId} status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating job status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredJobs = jobs
    .filter((job) => {
      if (activeTab === "upcoming") {
        return ["pending", "confirmed"].includes(job.status);
      } else if (activeTab === "completed") {
        return ["completed", "cancelled"].includes(job.status);
      }
      return true; // 'all' tab
    })
    .filter((job) => {
      if (dateFilter) {
        return job.date === dateFilter;
      }
      return true;
    });

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  };

  const getStatusBadgeClass = (status: JobStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t("worker.jobs")}</h1>
        <p className="text-gray-600">{t("worker.jobsSubtitle")}</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "upcoming" ? "bg-white shadow-sm" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("upcoming")}
          >
            {t("worker.upcomingJobs")}
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "completed" ? "bg-white shadow-sm" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("completed")}
          >
            {t("worker.completedJobs")}
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "all" ? "bg-white shadow-sm" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("all")}
          >
            {t("worker.allJobs")}
          </button>
        </div>

        <div className="relative">
          <Button
            variant="outline"
            leftIcon={<FiFilter />}
            onClick={() => setFilterOpen(!filterOpen)}
          >
            {t("worker.filter")}
          </Button>

          {filterOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 p-4">
              <h3 className="font-medium mb-2">{t("worker.filterByDate")}</h3>
              <input
                type="date"
                className="w-full p-2 border rounded-md"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
              {dateFilter && (
                <Button
                  className="mt-2 text-sm"
                  onClick={() => setDateFilter("")}
                >
                  {t("worker.clearFilter")}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : filteredJobs.length === 0 ? (
        <Card>
          <div className="text-center py-8">
            <p className="text-gray-500">{t("worker.noJobsFound")}</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <Card key={job.id}>
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {job.serviceName}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
                        job.status
                      )}`}
                    >
                      {t(`worker.jobStatus.${job.status}`)}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-gray-600">
                      <FiCalendar className="mr-2" />
                      <span>{formatDate(job.date)}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FiClock className="mr-2" />
                      <span>{job.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FiMapPin className="mr-2" />
                      <span>{job.address}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FiDollarSign className="mr-2" />
                      <span>₹{job.payment}</span>
                    </div>
                  </div>

                  {job.notes && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">
                          {t("worker.customerNotes")}:
                        </span>{" "}
                        {job.notes}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6 md:mt-0 md:ml-6 flex flex-col items-end justify-between">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {t("worker.customer")}
                    </p>
                    <p className="text-base">{job.customerName}</p>
                    {job.customerPhone && (
                      <p className="text-sm text-gray-600">
                        {job.customerPhone}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 space-x-2">
                    {job.status === "pending" && (
                      <>
                        <Button
                          variant="primary"
                          size="sm"
                          leftIcon={<FiCheck />}
                          onClick={() =>
                            handleUpdateStatus(job.id, "confirmed")
                          }
                          isLoading={isLoading}
                        >
                          {t("worker.acceptJob")}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          leftIcon={<FiX />}
                          onClick={() =>
                            handleUpdateStatus(job.id, "cancelled")
                          }
                          isLoading={isLoading}
                        >
                          {t("worker.declineJob")}
                        </Button>
                      </>
                    )}

                    {job.status === "confirmed" && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleUpdateStatus(job.id, "completed")}
                        isLoading={isLoading}
                      >
                        {t("worker.markComplete")}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsPage;
