import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiDollarSign,
  FiUser,
  FiCheck,
} from "react-icons/fi";
import { useTranslation } from "@hooks";
import Card from "@components/common/Card";
import Button from "@components/common/Button";
import FormField from "@components/common/FormField";
import { AppDispatch } from "@redux/store";
// These would be implemented in the actual application
// import { createBooking } from '@redux/slices/bookingSlice';
// import { selectUserProfile } from '@redux/slices/userSlice';
// import { selectAvailableServices } from '@redux/slices/serviceSlice';

interface BookingFormInputs {
  serviceId: string;
  workerId: string;
  date: string;
  timeSlot: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes: string;
}

const schema = yup.object({
  serviceId: yup.string().required("booking.errors.requiredService"),
  workerId: yup.string().required("booking.errors.requiredWorker"),
  date: yup.string().required("booking.errors.requiredDate"),
  timeSlot: yup.string().required("booking.errors.requiredTimeSlot"),
  address: yup.string().required("booking.errors.requiredAddress"),
  city: yup.string().required("booking.errors.requiredCity"),
  state: yup.string().required("booking.errors.requiredState"),
  pincode: yup.string().required("booking.errors.requiredPincode"),
  notes: yup.string(),
});

const BookingPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedWorker, setSelectedWorker] = useState<string>("");
  const [bookingStep, setBookingStep] = useState<number>(1);
  const [bookingComplete, setBookingComplete] = useState<boolean>(false);
  const [bookingId, setBookingId] = useState<string>("");

  // This would be implemented in the actual application
  // const userProfile = useSelector(selectUserProfile);
  // const availableServices = useSelector(selectAvailableServices);

  // Mock data for demonstration
  const userProfile = {
    fullName: "Priya Sharma",
    phone: "+91 9876543210",
    email: "priya.sharma@example.com",
    address: "123 Main St, Apartment 4B",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
  };

  const availableServices = [
    { id: "1", name: "Home Cleaning", icon: "cleaning", basePrice: 499 },
    { id: "2", name: "Office Cleaning", icon: "cleaning", basePrice: 799 },
    { id: "3", name: "Plumbing Repair", icon: "plumbing", basePrice: 599 },
    { id: "4", name: "Electrical Work", icon: "electrical", basePrice: 699 },
    { id: "5", name: "Carpentry", icon: "carpentry", basePrice: 899 },
    { id: "6", name: "Painting", icon: "painting", basePrice: 1299 },
  ];

  const availableWorkers = [
    {
      id: "1",
      name: "Rahul Sharma",
      rating: 4.8,
      completedJobs: 120,
      hourlyRate: 250,
      skills: ["home_cleaning", "office_cleaning", "carpet_cleaning"],
      availability: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    },
    {
      id: "2",
      name: "Amit Patel",
      rating: 4.6,
      completedJobs: 85,
      hourlyRate: 300,
      skills: ["plumbing"],
      availability: ["monday", "wednesday", "friday", "saturday"],
    },
    {
      id: "3",
      name: "Neha Singh",
      rating: 4.9,
      completedJobs: 150,
      hourlyRate: 280,
      skills: ["home_cleaning", "office_cleaning"],
      availability: ["tuesday", "thursday", "saturday", "sunday"],
    },
  ];

  const timeSlots = [
    { id: "1", time: "09:00 AM - 11:00 AM" },
    { id: "2", time: "11:00 AM - 01:00 PM" },
    { id: "3", time: "02:00 PM - 04:00 PM" },
    { id: "4", time: "04:00 PM - 06:00 PM" },
  ];

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookingFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      address: userProfile.address,
      city: userProfile.city,
      state: userProfile.state,
      pincode: userProfile.pincode,
    },
  });

  const watchServiceId = watch("serviceId");
  const watchWorkerId = watch("workerId");
  const watchDate = watch("date");
  const watchTimeSlot = watch("timeSlot");

  useEffect(() => {
    if (watchServiceId && watchServiceId !== selectedService) {
      setSelectedService(watchServiceId);
    }
  }, [watchServiceId, selectedService]);

  useEffect(() => {
    if (watchWorkerId && watchWorkerId !== selectedWorker) {
      setSelectedWorker(watchWorkerId);
    }
  }, [watchWorkerId, selectedWorker]);

  const getServiceById = (id: string) => {
    return availableServices.find((service) => service.id === id);
  };

  const getWorkerById = (id: string) => {
    return availableWorkers.find((worker) => worker.id === id);
  };

  const getTimeSlotById = (id: string) => {
    return timeSlots.find((slot) => slot.id === id);
  };

  const handleNextStep = () => {
    setBookingStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setBookingStep((prev) => prev - 1);
  };

  const onSubmit = async (data: BookingFormInputs) => {
    setIsLoading(true);
    try {
      // This would be implemented in the actual application
      // const result = await dispatch(createBooking(data));
      // setBookingId(result.payload.id);
      console.log("Booking created:", data);

      // Mock booking ID for demonstration
      setBookingId("BK" + Math.floor(100000 + Math.random() * 900000));
      setBookingComplete(true);
    } catch (error) {
      console.error("Error creating booking:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderServiceSelection = () => {
    return (
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {t("booking.selectService")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {availableServices.map((service) => (
            <div
              key={service.id}
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                watchServiceId === service.id
                  ? "border-primary bg-primary-50"
                  : "border-gray-200 hover:border-primary-200"
              }`}
              onClick={() => setValue("serviceId", service.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{service.name}</h3>
                <span className="text-primary font-medium">
                  ₹{service.basePrice}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {t(`services.${service.icon}Description`)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <Button
            variant="primary"
            onClick={handleNextStep}
            disabled={!watchServiceId}
          >
            {t("booking.next")}
          </Button>
        </div>
      </div>
    );
  };

  const renderWorkerSelection = () => {
    const filteredWorkers = availableWorkers.filter((worker) => {
      // In a real app, you would filter workers based on the selected service
      return true;
    });

    return (
      <div>
        <div className="flex items-center mb-6">
          <Button variant="text" onClick={handlePrevStep} className="mr-4">
            {t("booking.back")}
          </Button>
          <h2 className="text-xl font-semibold text-gray-900">
            {t("booking.selectWorker")}
          </h2>
        </div>

        <div className="space-y-4">
          {filteredWorkers.map((worker) => (
            <div
              key={worker.id}
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                watchWorkerId === worker.id
                  ? "border-primary bg-primary-50"
                  : "border-gray-200 hover:border-primary-200"
              }`}
              onClick={() => setValue("workerId", worker.id)}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mr-4">
                    {worker.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium">{worker.name}</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="text-sm">
                        {worker.rating} • {worker.completedJobs}{" "}
                        {t("booking.jobsCompleted")}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className="text-primary font-medium">
                    ₹{worker.hourlyRate}/hr
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <Button
            variant="primary"
            onClick={handleNextStep}
            disabled={!watchWorkerId}
          >
            {t("booking.next")}
          </Button>
        </div>
      </div>
    );
  };

  const renderDateTimeSelection = () => {
    return (
      <div>
        <div className="flex items-center mb-6">
          <Button variant="text" onClick={handlePrevStep} className="mr-4">
            {t("booking.back")}
          </Button>
          <h2 className="text-xl font-semibold text-gray-900">
            {t("booking.selectDateTime")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FormField
              name="date"
              control={control}
              label={t("booking.date")}
              type="date"
              leftIcon={<FiCalendar className="text-gray-400" />}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("booking.timeSlot")}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((slot) => (
                <div
                  key={slot.id}
                  className={`border rounded-md p-3 cursor-pointer transition-colors ${
                    watchTimeSlot === slot.id
                      ? "border-primary bg-primary-50"
                      : "border-gray-200 hover:border-primary-200"
                  }`}
                  onClick={() => setValue("timeSlot", slot.id)}
                >
                  <div className="flex items-center">
                    <FiClock className="mr-2 text-gray-400" />
                    <span>{slot.time}</span>
                  </div>
                </div>
              ))}
            </div>
            {errors.timeSlot && (
              <p className="mt-1 text-sm text-error">
                {t(errors.timeSlot.message as string)}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button
            variant="primary"
            onClick={handleNextStep}
            disabled={!watchDate || !watchTimeSlot}
          >
            {t("booking.next")}
          </Button>
        </div>
      </div>
    );
  };

  const renderAddressAndConfirmation = () => {
    const selectedService = getServiceById(watchServiceId);
    const selectedWorker = getWorkerById(watchWorkerId);
    const selectedTimeSlot = getTimeSlotById(watchTimeSlot);

    return (
      <div>
        <div className="flex items-center mb-6">
          <Button variant="text" onClick={handlePrevStep} className="mr-4">
            {t("booking.back")}
          </Button>
          <h2 className="text-xl font-semibold text-gray-900">
            {t("booking.confirmBooking")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-medium mb-4">{t("booking.address")}</h3>
            <div className="space-y-4">
              <FormField
                name="address"
                control={control}
                label={t("booking.addressLine")}
                leftIcon={<FiMapPin className="text-gray-400" />}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  name="city"
                  control={control}
                  label={t("booking.city")}
                />
                <FormField
                  name="state"
                  control={control}
                  label={t("booking.state")}
                />
              </div>

              <FormField
                name="pincode"
                control={control}
                label={t("booking.pincode")}
              />
            </div>

            <div className="mt-4">
              <FormField
                name="notes"
                control={control}
                label={t("booking.notes")}
                placeholder={t("booking.notesPlaceholder")}
                multiline
                rows={3}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">
              {t("booking.bookingDetails")}
            </h3>
            <Card className="mb-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="mr-3">
                      <FiUser className="text-primary" size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        {t("booking.selectWorker")}
                      </p>
                      <p className="font-medium">{selectedWorker?.name}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="mr-3">
                      <FiCalendar className="text-primary" size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        {t("booking.date")}
                      </p>
                      <p className="font-medium">{watchDate}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="mr-3">
                      <FiClock className="text-primary" size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        {t("booking.timeSlot")}
                      </p>
                      <p className="font-medium">{selectedTimeSlot?.time}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="mr-3">
                      <FiDollarSign className="text-primary" size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        {t("booking.paymentDetails")}
                      </p>
                      <p className="font-medium">
                        {selectedService?.name} - ₹{selectedService?.basePrice}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <h3 className="text-lg font-medium mb-4">
              {t("booking.paymentDetails")}
            </h3>
            <Card>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>{t("booking.serviceCharge")}</span>
                  <span>₹{selectedService?.basePrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("booking.tax")}</span>
                  <span>₹{Math.round(selectedService?.basePrice * 0.18)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>{t("booking.totalAmount")}</span>
                    <span className="text-primary">
                      ₹
                      {selectedService?.basePrice +
                        Math.round(selectedService?.basePrice * 0.18)}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button
            variant="primary"
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
            loading={isLoading}
          >
            {t("booking.bookNow")}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {t("booking.title")}
        </h1>
        <p className="text-gray-600">{t("booking.subtitle")}</p>
      </div>

      <Card>
        {bookingComplete ? (
          renderBookingComplete()
        ) : (
          <>
            {bookingStep === 1 && renderServiceSelection()}
            {bookingStep === 2 && renderWorkerSelection()}
            {bookingStep === 3 && renderDateTimeSelection()}
            {bookingStep === 4 && renderAddressAndConfirmation()}
          </>
        )}
      </Card>
    </div>
  );
};

export default BookingPage;
