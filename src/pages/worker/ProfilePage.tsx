import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FiUser, FiPhone, FiMapPin, FiDollarSign, FiFileText, FiCalendar } from 'react-icons/fi';
import Card from '@components/common/Card';
import Button from '@components/common/Button';
import FormField from '@components/common/FormField';
import { workerProfileSchema } from '@schemas/workerSchema';
import { AppDispatch } from '@redux/store';
// These would be implemented in the actual application
// import { updateWorkerProfile, selectWorkerProfile } from '@redux/slices/workerSlice';

interface ProfileFormInputs {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  idProofType: string;
  idProofNumber: string;
  bio: string;
  skills: string[];
  hourlyRate: number;
  availability: string[];
  experienceYears: number;
  serviceCategories: string[];
}

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // This would be implemented in the actual application
  // const workerProfile = useSelector(selectWorkerProfile);
  
  // Mock data for demonstration
  const workerProfile = {
    fullName: 'Rahul Sharma',
    phone: '+91 9876543210',
    address: '123 Main St, Apartment 4B',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    idProofType: 'aadhar',
    idProofNumber: '1234 5678 9012',
    bio: 'Professional cleaner with 5 years of experience in residential and commercial cleaning.',
    skills: ['home_cleaning', 'office_cleaning', 'carpet_cleaning'],
    hourlyRate: 250,
    availability: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    experienceYears: 5,
    serviceCategories: ['cleaning', 'housekeeping'],
  };

  const { control, handleSubmit, reset, formState: { errors } } = useForm<ProfileFormInputs>({
    resolver: yupResolver(workerProfileSchema),
    defaultValues: workerProfile,
  });

  useEffect(() => {
    // Reset form when profile data changes or when cancelling edit mode
    if (!isEditing) {
      reset(workerProfile);
    }
  }, [workerProfile, isEditing, reset]);

  const onSubmit = async (data: ProfileFormInputs) => {
    setIsLoading(true);
    try {
      // This would be implemented in the actual application
      // await dispatch(updateWorkerProfile(data));
      console.log('Profile updated:', data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const idProofOptions = [
    { value: 'aadhar', label: t('worker.idProofTypes.aadhar') },
    { value: 'pan', label: t('worker.idProofTypes.pan') },
    { value: 'voter', label: t('worker.idProofTypes.voter') },
    { value: 'driving', label: t('worker.idProofTypes.driving') },
  ];

  const skillOptions = [
    { value: 'home_cleaning', label: t('worker.skills.homeCleaning') },
    { value: 'office_cleaning', label: t('worker.skills.officeCleaning') },
    { value: 'carpet_cleaning', label: t('worker.skills.carpetCleaning') },
    { value: 'window_cleaning', label: t('worker.skills.windowCleaning') },
    { value: 'bathroom_cleaning', label: t('worker.skills.bathroomCleaning') },
  ];

  const availabilityOptions = [
    { value: 'monday', label: t('worker.days.monday') },
    { value: 'tuesday', label: t('worker.days.tuesday') },
    { value: 'wednesday', label: t('worker.days.wednesday') },
    { value: 'thursday', label: t('worker.days.thursday') },
    { value: 'friday', label: t('worker.days.friday') },
    { value: 'saturday', label: t('worker.days.saturday') },
    { value: 'sunday', label: t('worker.days.sunday') },
  ];

  const serviceCategoryOptions = [
    { value: 'cleaning', label: t('worker.categories.cleaning') },
    { value: 'plumbing', label: t('worker.categories.plumbing') },
    { value: 'electrical', label: t('worker.categories.electrical') },
    { value: 'carpentry', label: t('worker.categories.carpentry') },
    { value: 'painting', label: t('worker.categories.painting') },
    { value: 'housekeeping', label: t('worker.categories.housekeeping') },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t('worker.profile')}</h1>
        <p className="text-gray-600">{t('worker.profileSubtitle')}</p>
      </div>

      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">{t('worker.personalInformation')}</h2>
          {!isEditing ? (
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(true)}
              leftIcon={<FiUser />}
            >
              {t('common.edit')}
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(false)}
              >
                {t('common.cancel')}
              </Button>
              <Button 
                variant="primary" 
                onClick={handleSubmit(onSubmit)}
                isLoading={isLoading}
              >
                {t('common.save')}
              </Button>
            </div>
          )}
        </div>

        <form>
          {isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                name="fullName"
                control={control}
                label={t('worker.fullName')}
                placeholder={t('worker.fullNamePlaceholder')}
                leftIcon={<FiUser className="text-gray-400" />}
              />
              <FormField
                name="phone"
                control={control}
                label={t('worker.phone')}
                placeholder={t('worker.phonePlaceholder')}
                leftIcon={<FiPhone className="text-gray-400" />}
              />
              <FormField
                name="address"
                control={control}
                label={t('worker.address')}
                placeholder={t('worker.addressPlaceholder')}
                leftIcon={<FiMapPin className="text-gray-400" />}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  name="city"
                  control={control}
                  label={t('worker.city')}
                  placeholder={t('worker.cityPlaceholder')}
                />
                <FormField
                  name="state"
                  control={control}
                  label={t('worker.state')}
                  placeholder={t('worker.statePlaceholder')}
                />
              </div>
              <FormField
                name="pincode"
                control={control}
                label={t('worker.pincode')}
                placeholder={t('worker.pincodePlaceholder')}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  name="idProofType"
                  control={control}
                  label={t('worker.idProofType')}
                  fieldType="select"
                  options={idProofOptions}
                />
                <FormField
                  name="idProofNumber"
                  control={control}
                  label={t('worker.idProofNumber')}
                  placeholder={t('worker.idProofNumberPlaceholder')}
                />
              </div>
              <div className="col-span-2">
                <FormField
                  name="bio"
                  control={control}
                  label={t('worker.bio')}
                  placeholder={t('worker.bioPlaceholder')}
                  fieldType="textarea"
                  rows={4}
                />
              </div>
              <div className="col-span-2">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('worker.professionalDetails')}</h3>
              </div>
              <FormField
                name="hourlyRate"
                control={control}
                label={t('worker.hourlyRate')}
                placeholder={t('worker.hourlyRatePlaceholder')}
                type="number"
                leftIcon={<FiDollarSign className="text-gray-400" />}
              />
              <FormField
                name="experienceYears"
                control={control}
                label={t('worker.experienceYears')}
                placeholder={t('worker.experienceYearsPlaceholder')}
                type="number"
                leftIcon={<FiCalendar className="text-gray-400" />}
              />
              <div className="col-span-2">
                <FormField
                  name="skills"
                  control={control}
                  label={t('worker.skills.label')}
                  fieldType="select"
                  options={skillOptions}
                  helperText={t('worker.skills.helperText')}
                />
              </div>
              <div className="col-span-2">
                <FormField
                  name="availability"
                  control={control}
                  label={t('worker.availability.label')}
                  fieldType="select"
                  options={availabilityOptions}
                  helperText={t('worker.availability.helperText')}
                />
              </div>
              <div className="col-span-2">
                <FormField
                  name="serviceCategories"
                  control={control}
                  label={t('worker.serviceCategories.label')}
                  fieldType="select"
                  options={serviceCategoryOptions}
                  helperText={t('worker.serviceCategories.helperText')}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-500">{t('worker.fullName')}</p>
                  <p className="mt-1 text-base text-gray-900">{workerProfile.fullName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{t('worker.phone')}</p>
                  <p className="mt-1 text-base text-gray-900">{workerProfile.phone}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-gray-500">{t('worker.address')}</p>
                  <p className="mt-1 text-base text-gray-900">
                    {workerProfile.address}, {workerProfile.city}, {workerProfile.state} - {workerProfile.pincode}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{t('worker.idProofType')}</p>
                  <p className="mt-1 text-base text-gray-900">
                    {idProofOptions.find(option => option.value === workerProfile.idProofType)?.label}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{t('worker.idProofNumber')}</p>
                  <p className="mt-1 text-base text-gray-900">{workerProfile.idProofNumber}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-gray-500">{t('worker.bio')}</p>
                  <p className="mt-1 text-base text-gray-900">{workerProfile.bio}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('worker.professionalDetails')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{t('worker.hourlyRate')}</p>
                    <p className="mt-1 text-base text-gray-900">₹{workerProfile.hourlyRate}/hr</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">{t('worker.experienceYears')}</p>
                    <p className="mt-1 text-base text-gray-900">
                      {workerProfile.experienceYears} {workerProfile.experienceYears === 1 ? t('worker.year') : t('worker.years')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">{t('worker.skills.label')}</p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {workerProfile.skills.map(skill => (
                        <span key={skill} className="px-2 py-1 bg-primary-50 text-primary rounded-full text-sm">
                          {skillOptions.find(option => option.value === skill)?.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">{t('worker.availability.label')}</p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {workerProfile.availability.map(day => (
                        <span key={day} className="px-2 py-1 bg-green-50 text-green-600 rounded-full text-sm">
                          {availabilityOptions.find(option => option.value === day)?.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">{t('worker.serviceCategories.label')}</p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {workerProfile.serviceCategories.map(category => (
                        <span key={category} className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                          {serviceCategoryOptions.find(option => option.value === category)?.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      </Card>

      {/* Document Verification Section */}
      <Card className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">{t('worker.documentVerification')}</h2>
          <Button 
            variant="outline" 
            leftIcon={<FiFileText />}
          >
            {t('worker.uploadDocuments')}
          </Button>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <p className="text-sm text-yellow-700">
            {t('worker.documentVerificationMessage')}
          </p>
        </div>

        {/* This would be implemented in the actual application */}
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium">{t('worker.idProof')}</p>
              <p className="text-sm text-gray-500">{t('worker.idProofDescription')}</p>
            </div>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">
              {t('worker.pending')}
            </span>
          </div>
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium">{t('worker.addressProof')}</p>
              <p className="text-sm text-gray-500">{t('worker.addressProofDescription')}</p>
            </div>
            <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm">
              {t('worker.notUploaded')}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;