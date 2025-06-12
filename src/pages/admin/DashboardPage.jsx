
import React from 'react';
import StatCard from '@/components/admin/StatCard';
import { Users, BookOpen, Activity, BarChart } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const DashboardPage = () => {
  const recentUsers = [
    { name: 'John Doe', email: 'john@example.com', date: '2025-06-12' },
    { name: 'Jane Smith', email: 'jane@example.com', date: '2025-06-12' },
    { name: 'Sam Wilson', email: 'sam@example.com', date: '2025-06-11' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Users" value="1,234" icon={Users} description="+20.1% from last month" />
        <StatCard title="Total Courses" value="4" icon={BookOpen} description="All active" />
        <StatCard title="Daily Active Users" value="456" icon={Activity} description="+15% from yesterday" />
        <StatCard title="Completion Rate" value="78%" icon={BarChart} description="+5% from last week" />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Signups</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Join Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentUsers.map((user, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
