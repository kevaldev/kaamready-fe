import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiDownload, FiFilter, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Card from '@components/common/Card';
import Button from '@components/common/Button';

interface PaymentItem {
  id: string;
  date: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  method: string;
  service: string;
  worker: string;
  invoiceNumber: string;
}

const PaymentsPage: React.FC = () => {
  const { t } = useTranslation();
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [expandedPayment, setExpandedPayment] = useState<string | null>(null);

  // Mock data for demonstration
  const payments: PaymentItem[] = [
    {
      id: '1',
      date: '2023-06-10',
      amount: 1499,
      status: 'completed',
      method: 'Credit Card',
      service: 'Home Deep Cleaning',
      worker: 'CleanPro Services',
      invoiceNumber: 'INV-2023-001',
    },
    {
      id: '2',
      date: '2023-06-05',
      amount: 799,
      status: 'completed',
      method: 'UPI',
      service: 'Bathroom Plumbing Repair',
      worker: 'Plumb Perfect',
      invoiceNumber: 'INV-2023-002',
    },
    {
      id: '3',
      date: '2023-06-18',
      amount: 999,
      status: 'pending',
      method: 'Net Banking',
      service: 'Electrical Wiring & Repair',
      worker: 'PowerFix Electricals',
      invoiceNumber: 'INV-2023-003',
    },
    {
      id: '4',
      date: '2023-05-28',
      amount: 599,
      status: 'failed',
      method: 'Credit Card',
      service: 'Furniture Assembly',
      worker: 'WoodWorks',
      invoiceNumber: 'INV-2023-004',
    },
  ];

  // Filter payments based on status
  const filteredPayments = payments.filter(
    (payment) => !filterStatus || payment.status === filterStatus
  );

  // Sort payments based on date
  const sortedPayments = [...filteredPayments].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const toggleExpandPayment = (paymentId: string) => {
    setExpandedPayment(expandedPayment === paymentId ? null : paymentId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t('customer.payments')}</h1>
        <p className="text-gray-600">{t('customer.paymentsSubtitle')}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-semibold text-gray-900">{t('payments.summary')}</h2>
            <p className="text-gray-600">{t('payments.currentMonth')}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-primary bg-opacity-10 p-4 rounded-lg">
              <p className="text-sm text-gray-600">{t('payments.totalSpent')}</p>
              <p className="text-xl font-bold text-primary">₹3,896</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600">{t('payments.completed')}</p>
              <p className="text-xl font-bold text-green-700">3</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600">{t('payments.pending')}</p>
              <p className="text-xl font-bold text-yellow-700">1</p>
            </div>
          </div>
        </div>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 md:mb-0">{t('payments.history')}</h2>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-auto">
            <div className="relative">
              <select
                className="input-field pr-10 appearance-none"
                value={filterStatus || ''}
                onChange={(e) => setFilterStatus(e.target.value || null)}
              >
                <option value="">{t('payments.allStatuses')}</option>
                <option value="completed">{t('payments.statusCompleted')}</option>
                <option value="pending">{t('payments.statusPending')}</option>
                <option value="failed">{t('payments.statusFailed')}</option>
              </select>
              <FiFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <Button
              variant="outline"
              onClick={toggleSortOrder}
              className="flex items-center justify-center"
            >
              {t('payments.sortByDate')}
              {sortOrder === 'asc' ? (
                <FiChevronUp className="ml-2" />
              ) : (
                <FiChevronDown className="ml-2" />
              )}
            </Button>
          </div>
        </div>

        {sortedPayments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('payments.date')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('payments.service')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('payments.amount')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('payments.status')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('payments.actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedPayments.map((payment) => (
                  <React.Fragment key={payment.id}>
                    <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => toggleExpandPayment(payment.id)}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{formatDate(payment.date)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{payment.service}</div>
                        <div className="text-sm text-gray-500">{payment.worker}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">₹{payment.amount}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                          {t(`payments.status${payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}`)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Download invoice functionality would be implemented here
                            console.log('Download invoice:', payment.invoiceNumber);
                          }}
                        >
                          <FiDownload className="mr-1" />
                          {t('payments.invoice')}
                        </Button>
                      </td>
                    </tr>
                    {expandedPayment === payment.id && (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 bg-gray-50">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500">{t('payments.invoiceNumber')}</p>
                              <p className="text-sm text-gray-900">{payment.invoiceNumber}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">{t('payments.paymentMethod')}</p>
                              <p className="text-sm text-gray-900">{payment.method}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">{t('payments.serviceProvider')}</p>
                              <p className="text-sm text-gray-900">{payment.worker}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">{t('payments.noPayments')}</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default PaymentsPage;