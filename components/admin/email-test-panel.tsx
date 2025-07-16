"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";

export default function EmailTestPanel() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastTestResult, setLastTestResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const { toast } = useToast();

  const testEmailConfiguration = async () => {
    if (!password.trim()) {
      toast({
        title: "Error",
        description: "Please enter the admin password",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setLastTestResult(null);

    try {
      const response = await fetch("/api/test-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      setLastTestResult({
        success: response.ok,
        message: data.message || data.error || "Unknown error",
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: data.message,
        });
      } else {
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error testing email:", error);
      setLastTestResult({
        success: false,
        message: "Failed to test email configuration",
      });
      toast({
        title: "Error",
        description: "Failed to test email configuration",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Mail className="h-6 w-6" />
        <h2 className="text-2xl font-bold">Email Configuration Test</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Test Email Setup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Admin Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              disabled={loading}
            />
          </div>

          <Button
            onClick={testEmailConfiguration}
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              "Testing..."
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Test Email
              </>
            )}
          </Button>

          {lastTestResult && (
            <Alert
              className={
                lastTestResult.success
                  ? "border-green-200 bg-green-50"
                  : "border-red-200 bg-red-50"
              }
            >
              <div className="flex items-center space-x-2">
                {lastTestResult.success ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertDescription
                  className={
                    lastTestResult.success ? "text-green-800" : "text-red-800"
                  }
                >
                  {lastTestResult.message}
                </AlertDescription>
              </div>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Configuration Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <h4 className="font-medium">Required Environment Variables:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                •{" "}
                <code className="bg-muted px-1 rounded">SENDGRID_API_KEY</code>{" "}
                - Your SendGrid API key
              </li>
              <li>
                • <code className="bg-muted px-1 rounded">ADMIN_EMAIL</code> -
                Email to receive notifications
              </li>
              <li>
                • <code className="bg-muted px-1 rounded">FROM_EMAIL</code> -
                Sender email address (optional)
              </li>
            </ul>

            <h4 className="font-medium mt-4">Setup Instructions:</h4>
            <ol className="space-y-1 text-sm text-muted-foreground">
              <li>1. Create a SendGrid account at sendgrid.com</li>
              <li>2. Create an API key with "Mail Send" permissions</li>
              <li>
                3. Add the variables to your{" "}
                <code className="bg-muted px-1 rounded">.env.local</code> file
              </li>
              <li>4. Restart your development server</li>
              <li>5. Test the configuration using the button above</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
