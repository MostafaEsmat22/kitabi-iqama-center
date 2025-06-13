
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Video, Image, File } from 'lucide-react';

interface CourseMaterialsProps {
  materials: string[];
  userRole?: string;
}

const CourseMaterials = ({ materials, userRole }: CourseMaterialsProps) => {
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
      case 'doc':
      case 'docx':
        return <FileText className="h-4 w-4 text-red-600" />;
      case 'mp4':
      case 'mov':
      case 'avi':
        return <Video className="h-4 w-4 text-blue-600" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <Image className="h-4 w-4 text-green-600" />;
      default:
        return <File className="h-4 w-4 text-gray-600" />;
    }
  };

  const getFileType = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return 'PDF';
      case 'doc':
      case 'docx':
        return 'Word';
      case 'mp4':
      case 'mov':
      case 'avi':
        return 'فيديو';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return 'صورة';
      default:
        return 'ملف';
    }
  };

  if (!materials || materials.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
            <FileText className="h-5 w-5" />
            <span>المواد التعليمية</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center p-8">
            <p className="text-gray-500">لا توجد مواد تعليمية متاحة حالياً</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
          <FileText className="h-5 w-5" />
          <span>المواد التعليمية ({materials.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {materials.map((material, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                {getFileIcon(material)}
                <div>
                  <p className="font-medium text-gray-900">{material}</p>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Badge variant="outline" className="text-xs">
                      {getFileType(material)}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center space-x-1 rtl:space-x-reverse"
                  onClick={() => {
                    // In a real app, this would trigger the actual download
                    console.log('Downloading:', material);
                  }}
                >
                  <Download className="h-4 w-4" />
                  <span>تحميل</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseMaterials;
