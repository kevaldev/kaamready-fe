import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface ForgotPasswordFormInputs {
  email: string;
}

const schema = yup.object({
  email: yup.string().email('auth.errors.invalidEmail').required('auth.errors.requiredEmail'),
});

const ForgotPasswordPage = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: ForgotPasswordFormInputs) => {
    setIsLoading(true);
    setError(null);
    try {
      // This will be replaced with actual API call
      // await authService.forgotPassword(data.email);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
    } catch (err) {
      setError('auth.errors.resetPasswordFailed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold text-primary">
            KaamReady
          </Link>
          <h2 className="text-2xl font-semibold mt-4">{t('auth.forgotPasswordTitle')}</h2>
          <p className="text-gray-600 mt-2">{t('auth.forgotPasswordSubtitle')}</p>
        </div>

        {error && (
          <div className="bg-error bg-opacity-10 text-error px-4 py-3 rounded-md mb-4">
            {t(error)}
          </div>
        )}

        {isSubmitted ? (
          <div className="text-center">
            <div className="bg-success bg-opacity-10 text-success px-4 py-3 rounded-md mb-6">
              {t('auth.resetLinkSent')}
            </div>
            <p className="text-gray-600 mb-6">{t('auth.checkEmailInstructions')}</p>
            <Link to="/login" className="btn-primary inline-block">
              {t('auth.backToLogin')}
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth.email')}
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className="input-field"
                placeholder={t('auth.emailPlaceholder')}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-error text-sm mt-1">{t(errors.email.message || '')}</p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full btn-primary py-3 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? t('common.loading') : t('auth.resetPassword')}
            </button>

            <div className="text-center mt-4">
              <Link to="/login" className="text-primary hover:underline text-sm">
                {t('auth.backToLogin')}
              </Link>
            </div>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            {t('auth.noAccount')}{' '}
            <Link to="/register" className="text-primary hover:underline">
              {t('auth.register')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;