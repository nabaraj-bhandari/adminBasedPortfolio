"use client";

import { useEffect, useState } from "react";
import { apiService } from "@/lib/api-service";

interface PersonalInfoFooter {
  full_name: string;
}

export default function Footer() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoFooter | null>(
    null
  );

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        const data = await apiService.getPersonalInfo();
        if (data) {
          setPersonalInfo(data);
        }
      } catch (error) {
        console.error("Error fetching personal info:", error);
      }
    };

    fetchPersonalInfo();
  }, []);

  const displayName = personalInfo?.full_name || "Your Name";

  return (
    <footer className="bg-background border-t border-border/50 unselectable">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">Made with ❤️ by {displayName}</p>
          <p className="text-sm text-muted-foreground mt-2">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
