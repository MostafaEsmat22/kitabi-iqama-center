
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface ProgressChartProps {
  enrollments: any[];
  userRole?: string;
}

const ProgressChart = ({ enrollments, userRole }: ProgressChartProps) => {
  // Prepare data for charts
  const statusData = [
    { name: 'مقبول', value: enrollments.filter(e => e.status === 'approved').length, color: '#10B981' },
    { name: 'مكتمل', value: enrollments.filter(e => e.status === 'completed').length, color: '#8B5CF6' },
    { name: 'قيد الانتظار', value: enrollments.filter(e => e.status === 'pending').length, color: '#F59E0B' },
    { name: 'مرفوض', value: enrollments.filter(e => e.status === 'rejected').length, color: '#EF4444' },
  ];

  // Monthly enrollment data (mock data)
  const monthlyData = [
    { month: 'يناير', enrollments: 4 },
    { month: 'فبراير', enrollments: 6 },
    { month: 'مارس', enrollments: 8 },
    { month: 'أبريل', enrollments: 5 },
    { month: 'مايو', enrollments: 7 },
    { month: 'يونيو', enrollments: 9 },
  ];

  const chartConfig = {
    enrollments: {
      label: "التسجيلات",
      color: "#3B82F6",
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle>توزيع حالة الدورات</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>التسجيلات الشهرية</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Bar dataKey="enrollments" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <ChartTooltip content={<ChartTooltipContent />} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressChart;
