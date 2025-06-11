
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Plus,
  History,
  Wallet as WalletIcon,
  DollarSign
} from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

const Wallet = () => {
  const [language, setLanguage] = useState('ar');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showTopUp, setShowTopUp] = useState(false);

  const user = {
    name: "أحمد محمد",
    role: "طالب",
    avatar: "",
    notifications: 3,
    messages: 2
  };

  const walletData = {
    balance: 450,
    transactions: [
      {
        id: 1,
        type: "payment",
        description: "رسوم دورة القرآن الكريم - يونيو",
        amount: -300,
        date: "2024-06-01",
        status: "completed"
      },
      {
        id: 2,
        type: "topup",
        description: "شحن المحفظة",
        amount: 500,
        date: "2024-05-28",
        status: "completed"
      },
      {
        id: 3,
        type: "refund",
        description: "استرداد - إلغاء دورة",
        amount: 150,
        date: "2024-05-20",
        status: "completed"
      },
      {
        id: 4,
        type: "payment",
        description: "رسوم دورة القرآن الكريم - مايو",
        amount: -300,
        date: "2024-05-01",
        status: "completed"
      }
    ],
    paymentMethods: [
      {
        id: 1,
        type: "instapay",
        name: "Instapay",
        details: "01234567890",
        primary: true
      },
      {
        id: 2,
        type: "bank",
        name: "التحويل البنكي",
        details: "البنك الأهلي المصري - 1234567890",
        primary: false
      },
      {
        id: 3,
        type: "wallet",
        name: "فودافون كاش",
        details: "01234567890",
        primary: false
      }
    ]
  };

  const content = {
    ar: {
      title: "المحفظة الإلكترونية",
      balance: "الرصيد الحالي",
      topUp: "شحن المحفظة",
      transactions: "سجل المعاملات",
      paymentMethods: "طرق الدفع",
      amount: "المبلغ",
      date: "التاريخ",
      status: "الحالة",
      description: "الوصف",
      completed: "مكتمل",
      pending: "معلق",
      failed: "فشل",
      payment: "دفع",
      topup: "شحن",
      refund: "استرداد",
      egp: "ج.م",
      addPaymentMethod: "إضافة طريقة دفع",
      topUpAmount: "مبلغ الشحن",
      paymentDate: "تاريخ الدفع",
      paymentTime: "وقت الدفع",
      paymentMethod: "طريقة الدفع",
      uploadProof: "رفع إثبات الدفع",
      submitTopUp: "تأكيد الشحن",
      cancel: "إلغاء",
      primary: "رئيسي"
    }
  };

  const currentContent = content[language as keyof typeof content];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <ArrowUpRight className="h-4 w-4 text-red-500" />;
      case 'topup':
        return <ArrowDownLeft className="h-4 w-4 text-green-500" />;
      case 'refund':
        return <ArrowDownLeft className="h-4 w-4 text-blue-500" />;
      default:
        return <DollarSign className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'payment':
        return 'text-red-600';
      case 'topup':
      case 'refund':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      <Sidebar 
        language={language} 
        user={user} 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <div className="flex-1 flex flex-col">
        <Header 
          language={language}
          onLanguageToggle={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
          onMenuClick={() => setSidebarOpen(true)}
          user={user}
        />
        
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">{currentContent.title}</h1>
            
            {/* الرصيد الحالي */}
            <Card className="mb-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                      <WalletIcon className="h-8 w-8" />
                      <h2 className="text-2xl font-bold">{currentContent.balance}</h2>
                    </div>
                    <div className="text-4xl font-bold mb-2">
                      {walletData.balance} {currentContent.egp}
                    </div>
                  </div>
                  <Button 
                    variant="secondary" 
                    onClick={() => setShowTopUp(true)}
                    className="text-blue-600"
                  >
                    <Plus className="h-4 w-4 ml-1" />
                    {currentContent.topUp}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* سجل المعاملات */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <History className="h-5 w-5 ml-2" />
                    {currentContent.transactions}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {walletData.transactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          {getTransactionIcon(transaction.type)}
                          <div>
                            <div className="font-medium text-gray-900">
                              {transaction.description}
                            </div>
                            <div className="text-sm text-gray-600">
                              {transaction.date}
                            </div>
                          </div>
                        </div>
                        <div className="text-left rtl:text-right">
                          <div className={`font-bold ${getTransactionColor(transaction.type)}`}>
                            {transaction.amount > 0 ? '+' : ''}{transaction.amount} {currentContent.egp}
                          </div>
                          <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                            {transaction.status === 'completed' ? currentContent.completed : currentContent.pending}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* طرق الدفع */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 ml-2" />
                      {currentContent.paymentMethods}
                    </div>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 ml-1" />
                      إضافة طريقة
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {walletData.paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900 flex items-center">
                            {method.name}
                            {method.primary && (
                              <Badge variant="default" className="mr-2">
                                {currentContent.primary}
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-gray-600">{method.details}</div>
                        </div>
                        <Button variant="ghost" size="sm">
                          تعديل
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* نموذج شحن المحفظة */}
            {showTopUp && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <Card className="w-full max-w-md">
                  <CardHeader>
                    <CardTitle>{currentContent.topUp}</CardTitle>
                    <CardDescription>
                      إضافة رصيد جديد للمحفظة
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="topup-amount">{currentContent.topUpAmount}</Label>
                      <Input type="number" id="topup-amount" placeholder="0" />
                    </div>
                    <div>
                      <Label htmlFor="payment-date">{currentContent.paymentDate}</Label>
                      <Input type="date" id="payment-date" />
                    </div>
                    <div>
                      <Label htmlFor="payment-time">{currentContent.paymentTime}</Label>
                      <Input type="time" id="payment-time" />
                    </div>
                    <div>
                      <Label htmlFor="payment-method">{currentContent.paymentMethod}</Label>
                      <select className="w-full p-2 border rounded-md">
                        {walletData.paymentMethods.map((method) => (
                          <option key={method.id} value={method.id}>
                            {method.name} - {method.details}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="payment-proof">{currentContent.uploadProof}</Label>
                      <Input type="file" id="payment-proof" accept="image/*" />
                    </div>
                    <div className="flex space-x-3 rtl:space-x-reverse">
                      <Button className="flex-1">{currentContent.submitTopUp}</Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setShowTopUp(false)}
                      >
                        {currentContent.cancel}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Wallet;
