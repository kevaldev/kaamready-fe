import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { FiUser, FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import Card from "@components/common/Card";
import Button from "@components/common/Button";
import FormField from "@components/common/FormField";
import { AppDispatch } from "@redux/store";
import { customerProfileSchema } from "@schemas/customerSchema";
import { useTranslation } from "@hooks";
// These would be implemented in the actual application
// import { updateUserProfile, selectUserProfile } from '@redux/slices/userSlice';

interface ProfileFormInputs {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  preferredLanguage: string;
}

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // This would be implemented in the actual application
  // const userProfile = useSelector(selectUserProfile);

  // Mock data for demonstration
  const userProfile = {
    fullName: "Priya Sharma",
    phone: "+91 9876543210",
    email: "priya.sharma@example.com",
    address: "123 Main St, Apartment 4B",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    preferredLanguage: "en",
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormInputs>({
    resolver: yupResolver(customerProfileSchema),
    defaultValues: userProfile,
  });

  useEffect(() => {
    // Reset form when profile data changes or when cancelling edit mode
    if (!isEditing) {
      reset(userProfile);
    }
  }, [userProfile, isEditing, reset]);

  const onSubmit = async (data: ProfileFormInputs) => {
    setIsLoading(true);
    try {
      // This would be implemented in the actual application
      // await dispatch(updateUserProfile(data));
      console.log("Profile updated:", data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const languageOptions = [
    { value: "en", label: t("languages.english") },
    { value: "hi", label: t("languages.hindi") },
    { value: "gu", label: t("languages.gujarati") },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {t("customer.profile")}
        </h1>
        <p className="text-gray-600">{t("customer.profileSubtitle")}</p>
      </div>

      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {t("customer.personalInformation")}
          </h2>
          {!isEditing ? (
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
              leftIcon={<FiUser />}
            >
              {t("common.edit")}
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                {t("common.cancel")}
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmit(onSubmit)}
                isLoading={isLoading}
              >
                {t("common.save")}
              </Button>
            </div>
          )}
        </div>

        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isEditing ? (
              <>
                <FormField
                  name="fullName"
                  control={control}
                  label={t("customer.fullName")}
                  placeholder={t("customer.fullNamePlaceholder")}
                  leftIcon={<FiUser className="text-gray-400" />}
                />
                <FormField
                  name="phone"
                  control={control}
                  label={t("customer.phone")}
                  placeholder={t("customer.phonePlaceholder")}
                  leftIcon={<FiPhone className="text-gray-400" />}
                />
                <FormField
                  name="email"
                  control={control}
                  label={t("customer.email")}
                  placeholder={t("customer.emailPlaceholder")}
                  leftIcon={<FiMail className="text-gray-400" />}
                  disabled
                />
                <FormField
                  name="preferredLanguage"
                  control={control}
                  label={t("customer.preferredLanguage")}
                  fieldType="select"
                  options={languageOptions}
                />
                <FormField
                  name="address"
                  control={control}
                  label={t("customer.address")}
                  placeholder={t("customer.addressPlaceholder")}
                  leftIcon={<FiMapPin className="text-gray-400" />}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    name="city"
                    control={control}
                    label={t("customer.city")}
                    placeholder={t("customer.cityPlaceholder")}
                  />
                  <FormField
                    name="state"
                    control={control}
                    label={t("customer.state")}
                    placeholder={t("customer.statePlaceholder")}
                  />
                </div>
                <FormField
                  name="pincode"
                  control={control}
                  label={t("customer.pincode")}
                  placeholder={t("customer.pincodePlaceholder")}
                />
              </>
            ) : (
              <>
                <div className="col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {t("customer.fullName")}
                      </p>
                      <p className="mt-1 text-base text-gray-900">
                        {userProfile.fullName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {t("customer.phone")}
                      </p>
                      <p className="mt-1 text-base text-gray-900">
                        {userProfile.phone}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {t("customer.email")}
                      </p>
                      <p className="mt-1 text-base text-gray-900">
                        {userProfile.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {t("customer.preferredLanguage")}
                      </p>
                      <p className="mt-1 text-base text-gray-900">
                        {
                          languageOptions.find(
                            (lang) =>
                              lang.value === userProfile.preferredLanguage
                          )?.label
                        }
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm font-medium text-gray-500">
                        {t("customer.address")}
                      </p>
                      <p className="mt-1 text-base text-gray-900">
                        {userProfile.address}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {t("customer.city")}
                      </p>
                      <p className="mt-1 text-base text-gray-900">
                        {userProfile.city}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {t("customer.state")}
                      </p>
                      <p className="mt-1 text-base text-gray-900">
                        {userProfile.state}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {t("customer.pincode")}
                      </p>
                      <p className="mt-1 text-base text-gray-900">
                        {userProfile.pincode}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </form>
      </Card>

      <div className="mt-8">
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {t("customer.savedAddresses")}
            </h2>
            <Button variant="outline">{t("customer.addNewAddress")}</Button>
          </div>

          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-md">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium text-gray-900">Home</p>
                  <p className="text-gray-600 mt-1">
                    {userProfile.address}, {userProfile.city},{" "}
                    {userProfile.state} - {userProfile.pincode}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    {t("common.edit")}
                  </Button>
                  <Button variant="outline" size="sm">
                    {t("common.delete")}
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-md">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium text-gray-900">Office</p>
                  <p className="text-gray-600 mt-1">
                    456 Business Park, Floor 3, Mumbai, Maharashtra - 400002
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    {t("common.edit")}
                  </Button>
                  <Button variant="outline" size="sm">
                    {t("common.delete")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
