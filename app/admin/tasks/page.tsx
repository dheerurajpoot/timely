import { TasksTable } from '@/components/admin/tasks-table';

export const metadata = {
  title: 'Global Tasks - Timely Admin',
  description: 'Manage all tasks globally across users.',
};

export default function AdminTasksPage() {
  return <TasksTable />;
}
