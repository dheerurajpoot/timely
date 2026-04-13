import { UsersTable } from '@/components/admin/users-table';

export const metadata = {
  title: 'User Management - Timely Admin',
  description: 'Manage users and permissions',
};

export default function UsersPage() {
  return <UsersTable />;
}
