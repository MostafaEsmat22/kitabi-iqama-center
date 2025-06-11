
import { Helmet } from "react-helmet-async";
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import { User, Mail, Phone, MapPin, Calendar, Edit3 } from 'lucide-react';
import { useState } from 'react';

const Profile = () => {
  const { user, profile, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    phone: profile?.phone || '',
    address: profile?.address || '',
    date_of_birth: profile?.date_of_birth || ''
  });

  const handleSave = async () => {
    await updateProfile(formData);
    setIsEditing(false);
  };

  return (
    <ProtectedRoute>
      <Helmet>
        <title>الملف الشخصي - مركز إقامة الكتاب</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  الملف الشخصي
                </h1>
                <p className="text-gray-600">
                  إدارة معلوماتك الشخصية وإعدادات الحساب
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Summary Card */}
                <Card className="lg:col-span-1">
                  <CardHeader className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="h-12 w-12 text-white" />
                    </div>
                    <CardTitle>{profile?.full_name}</CardTitle>
                    <CardDescription>
                      {profile?.role === 'student' && 'طالب'}
                      {profile?.role === 'teacher' && 'مدرب'}
                      {profile?.role === 'admin' && 'مدير'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{user?.email}</span>
                      </div>
                      {profile?.phone && (
                        <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
                          <Phone className="h-4 w-4" />
                          <span>{profile.phone}</span>
                        </div>
                      )}
                      {profile?.address && (
                        <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{profile.address}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Profile Details */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>المعلومات الشخصية</CardTitle>
                        <CardDescription>
                          تحديث بياناتك الشخصية
                        </CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        <Edit3 className="h-4 w-4 mr-2" />
                        {isEditing ? 'إلغاء' : 'تعديل'}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="full_name">الاسم الكامل</Label>
                          {isEditing ? (
                            <Input
                              id="full_name"
                              value={formData.full_name}
                              onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                            />
                          ) : (
                            <p className="py-2 px-3 bg-gray-50 rounded-md">{profile?.full_name}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">رقم الهاتف</Label>
                          {isEditing ? (
                            <Input
                              id="phone"
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            />
                          ) : (
                            <p className="py-2 px-3 bg-gray-50 rounded-md">{profile?.phone || 'غير محدد'}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">العنوان</Label>
                        {isEditing ? (
                          <Textarea
                            id="address"
                            value={formData.address}
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                          />
                        ) : (
                          <p className="py-2 px-3 bg-gray-50 rounded-md">{profile?.address || 'غير محدد'}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="date_of_birth">تاريخ الميلاد</Label>
                        {isEditing ? (
                          <Input
                            id="date_of_birth"
                            type="date"
                            value={formData.date_of_birth}
                            onChange={(e) => setFormData({...formData, date_of_birth: e.target.value})}
                          />
                        ) : (
                          <p className="py-2 px-3 bg-gray-50 rounded-md">{profile?.date_of_birth || 'غير محدد'}</p>
                        )}
                      </div>

                      {isEditing && (
                        <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                          <Button variant="outline" onClick={() => setIsEditing(false)}>
                            إلغاء
                          </Button>
                          <Button onClick={handleSave}>
                            حفظ التغييرات
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
