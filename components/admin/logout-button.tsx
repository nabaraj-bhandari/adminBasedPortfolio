"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth", {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Logged out successfully");
        router.refresh(); // Refresh to re-run server-side auth check
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  return (
    <Button
      variant="outline"
      className="w-full justify-start"
      onClick={handleLogout}
    >
      <LogOut className="w-4 h-4 mr-2" />
      Logout
    </Button>
  );
}
