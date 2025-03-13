import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiCalendar, FiDollarSign, FiStar, FiTrendingUp } from "react-icons/fi";
import { useTranslation } from "@hooks";
import Card from "@components/common/Card";
import Button from "@components/common/Button";
import { AppDispatch } from "@redux/store";
// These would be implemented in the actual application
// import { fetchWorkerJobs } from '@redux/slices/workerSlice';
// import { selectWorkerJobs } from '@redux/slices/workerSlice';

const DashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  // This would be implemented in the actual application
  // const jobs = useSelector(selectWorkerJobs);

  // Mock data for demonstration
  const jobs = [
    {
      id: "1",
      serviceName: "Home Cleaning",
      customerName: "Priya Sharma",
      date: "2023-06-15",
      time: "10:00 AM",
      status: "confirmed",
      address: "123 Main St, Mumbai, MH 400001",
      payment: 499,
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
  ];

  useEffect(() => {
    // This would be implemented in the actual application
    // dispatch(fetchWorkerJobs());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {t("worker.dashboard")}
        </h1>
        <p className="text-gray-600">{t("worker.dashboardSubtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-primary-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {t("worker.upcomingJobs")}
              </h3>
              <p className="text-3xl font-bold text-primary mt-2">2</p>
            </div>
            <div className="p-3 bg-primary-100 rounded-full">
              <FiCalendar className="text-primary" size={24} />
            </div>
          </div>
        </Card>

        <Card className="bg-green-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {t("worker.totalEarnings")}
              </h3>
              <p className="text-3xl font-bold text-green-600 mt-2">₹4,998</p>
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
                {t("worker.rating")}
              </h3>
              <p className="text-3xl font-bold text-yellow-600 mt-2">4.8</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <FiStar className="text-yellow-600" size={24} />
            </div>
          </div>
        </Card>

        <Card className="bg-blue-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {t("worker.completionRate")}
              </h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">98%</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FiTrendingUp className="text-blue-600" size={24} />
            </div>
          </div>
        </Card>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {t("worker.upcomingJobs")}
          </h2>
          <Button variant="outline" size="sm">
            {t("common.viewAll")}
          </Button>
        </div>

        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <Card key={job.id}>
                <div className="flex justify-between mb-3">
                  <h3 className="text-lg font-medium text-gray-900">
                    {job.serviceName}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      job.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {t(`job.status.${job.status}`)}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">{t("common.customer")}:</span>{" "}
                    {job.customerName}
                  </p>
                  <p className="flex items-center">
                    <FiCalendar className="mr-2" size={16} />
                    <span>
                      {job.date} | {job.time}
                    </span>
                  </p>
                  <p className="flex items-center">
                    <FiDollarSign className="mr-2" size={16} />
                    <span>₹{job.payment}</span>
                  </p>
                </div>
                <div className="mt-4 flex space-x-2">
                  <Button variant="primary" size="sm">
                    {t("job.accept")}
                  </Button>
                  <Button variant="outline" size="sm">
                    {t("job.details")}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <div className="text-center py-8">
              <p className="text-gray-600">{t("worker.noJobs")}</p>
              <Button className="mt-4" variant="primary">
                {t("worker.updateProfile")}
              </Button>
            </div>
          </Card>
        )}
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {t("worker.earnings")}
          </h2>
          <Button variant="outline" size="sm">
            {t("common.viewAll")}
          </Button>
        </div>

        <Card>
          <div className="flex flex-col md:flex-row justify-between mb-6">
            <div className="mb-4 md:mb-0">
              <h3 className="text-sm font-medium text-gray-500">
                {t("worker.thisMonth")}
              </h3>
              <p className="text-2xl font-bold text-gray-900">₹4,998</p>
            </div>
            <div className="mb-4 md:mb-0">
              <h3 className="text-sm font-medium text-gray-500">
                {t("worker.lastMonth")}
              </h3>
              <p className="text-2xl font-bold text-gray-900">₹3,750</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                {t("worker.totalEarnings")}
              </h3>
              <p className="text-2xl font-bold text-gray-900">₹8,748</p>
            </div>
          </div>

          <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
            <p className="text-gray-500">{t("worker.earningsChart")}</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
