import { redirect } from "next/navigation";
import { verifyAdminAuth } from "@/lib/auth";
import AdminDashboard from "@/components/admin/admin-dashboard";
import AdminLoginForm from "../../components/admin/admin-login-form";

export default async function AdminPage() {
  const isAuthenticated = await verifyAdminAuth();

  if (!isAuthenticated) {
    return <AdminLoginForm />;
  }

  return <AdminDashboard />;
}
