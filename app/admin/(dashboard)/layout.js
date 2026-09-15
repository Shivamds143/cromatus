import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/requireAdmin';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function AdminDashboardLayout({ children }) {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  return (
    <div className="min-h-screen flex">
      <AdminSidebar username={session.username} />
      <main className="flex-1 min-w-0 p-6 sm:p-10">{children}</main>
    </div>
  );
}
