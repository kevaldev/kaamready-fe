import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { login } from '@redux/slices/authSlice';
import { AppDispatch } from '@redux/store';

interface LoginFormInputs {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email('auth.errors.invalidEmail').required('auth.errors.requiredEmail'),
  password: yup.string().required('auth.errors.requiredPassword'),
});

const LoginPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setIsLoading(true);
    setError(null);
    try {
      const resultAction = await dispatch(login({ email: data.email, password: data.password }));
      if (login.fulfilled.match(resultAction)) {
        // Redirect based on user role
        const userRole = resultAction.payload.userRole;
        const from = location.state?.from?.pathname || `/${userRole}/dashboard`;
        navigate(from, { replace: true });
      } else if (login.rejected.match(resultAction)) {
        setError(resultAction.payload as string || 'auth.errors.loginFailed');
      }
    } catch (err) {
      setError('auth.errors.loginFailed');
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
          <h2 className="text-2xl font-semibold mt-4">{t('auth.loginTitle')}</h2>
          <p className="text-gray-600 mt-2">{t('auth.loginSubtitle')}</p>
        </div>

        {error && (
          <div className="bg-error bg-opacity-10 text-error px-4 py-3 rounded-md mb-4">
            {t(error)}
          </div>
        )}

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

          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t('auth.password')}
              </label>
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                {t('auth.forgotPassword')}
              </Link>
            </div>
            <input
              id="password"
              type="password"
              {...register('password')}
              className="input-field"
              placeholder={t('auth.passwordPlaceholder')}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-error text-sm mt-1">{t(errors.password.message || '')}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full btn-primary py-3 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? t('common.loading') : t('auth.login')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {t('auth.noAccount')}{' '}
            <Link to="/register" className="text-primary hover:underline">
              {t('auth.register')}
            </Link>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            {t('auth.termsNotice')}{' '}
            <Link to="/terms" className="text-primary hover:underline">
              {t('footer.links.terms')}
            </Link>{' '}
            {t('common.and')}{' '}
            <Link to="/privacy" className="text-primary hover:underline">
              {t('footer.links.privacy')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;