
import { Helmet } from "react-helmet-async";
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import { CreditCard, DollarSign, Clock, CheckCircle, XCircle, Upload } from 'lucide-react';

const Wallet = () => {
  // Dummy transaction data
  const transactions = [
    {
      id: '1',
      courseName: 'دورة أساسيات التجويد',
      amount: 150,
      status: 'completed',
      date: '2024-06-01',
      dueDate: '2024-06-10'
    },
    {
      id: '2',
      courseName: 'دورة السيرة النبوية',
      amount: 200,
      status: 'pending',
      date: null,
      dueDate: '2024-06-15'
    },
    {
      id: '3',
      courseName: 'دورة الفقه الميسر',
      amount: 180,
      status: 'overdue',
      date: null,
      dueDate: '2024-06-05'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'overdue':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'تم الدفع';
      case 'pending':
        return 'في انتظار الدفع';
      case 'overdue':
        return 'متأخر';
      default:
        return 'غير محدد';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalPending = transactions
    .filter(t => t.status === 'pending' || t.status === 'overdue')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalPaid = transactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <ProtectedRoute>
      <Helmet>
        <title>المحفظة - مركز إقامة الكتاب</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  المحفظة
                </h1>
                <p className="text-gray-600">
                  إدارة المدفوعات والرسوم الدراسية
                </p>
              </div>

              {/* Financial Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      إجمالي المدفوع
                    </CardTitle>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{totalPaid} ريال</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      المطلوب دفعه
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-yellow-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-yellow-600">{totalPending} ريال</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      الرسوم المتأخرة
                    </CardTitle>
                    <XCircle className="h-4 w-4 text-red-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">
                      {transactions.filter(t => t.status === 'overdue').reduce((sum, t) => sum + t.amount, 0)} ريال
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Payment Notice */}
              <Card className="mb-6 border-yellow-200 bg-yellow-50">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3 rtl:space-x-reverse">
                    <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-yellow-800">تنبيه مهم</h3>
                      <p className="text-sm text-yellow-700 mt-1">
                        عدم دفع المصروفات حتى يوم 10 في الشهر يحجب كل ما في المنصة باستثناء قسم الدفع والتواصل مع مشرف الدورة.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Transactions List */}
              <Card>
                <CardHeader>
                  <CardTitle>سجل المعاملات المالية</CardTitle>
                  <CardDescription>
                    تفاصيل جميع الرسوم والمدفوعات
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.map((transaction) => (
                      <div key={transaction.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3 rtl:space-x-reverse">
                            <CreditCard className="h-5 w-5 text-gray-600" />
                            <div>
                              <h4 className="font-medium">{transaction.courseName}</h4>
                              <p className="text-sm text-gray-600">
                                استحقاق: {transaction.dueDate}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold">{transaction.amount} ريال</p>
                            <Badge className={getStatusColor(transaction.status)}>
                              {getStatusIcon(transaction.status)}
                              <span className="mr-1">{getStatusText(transaction.status)}</span>
                            </Badge>
                          </div>
                        </div>

                        {transaction.status !== 'completed' && (
                          <div className="flex space-x-2 rtl:space-x-reverse">
                            <Button size="sm" className="flex items-center space-x-1 rtl:space-x-reverse">
                              <DollarSign className="h-4 w-4" />
                              <span>دفع المصروفات</span>
                            </Button>
                            <Button size="sm" variant="outline" className="flex items-center space-x-1 rtl:space-x-reverse">
                              <Upload className="h-4 w-4" />
                              <span>إرفاق إثبات الدفع</span>
                            </Button>
                          </div>
                        )}

                        {transaction.date && (
                          <p className="text-xs text-gray-500 mt-2">
                            تم الدفع في: {transaction.date}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Wallet;
