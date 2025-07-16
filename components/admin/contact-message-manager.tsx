"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Mail,
  MailOpen,
  Calendar,
  User,
  MessageSquare,
  Trash2,
  CheckCircle,
  AlertCircle,
  Clock,
  Filter,
} from "lucide-react";

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  replied: boolean;
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
}

export default function ContactMessageManager() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread" | "read" | "unreplied">(
    "all"
  );
  const { toast } = useToast();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/contact");
      const data = await response.json();

      if (data.success) {
        setMessages(data.messages);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch contact messages",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast({
        title: "Error",
        description: "Failed to fetch contact messages",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateMessage = async (
    id: string,
    updates: Partial<ContactMessage>
  ) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (data.success) {
        setMessages((prev) =>
          prev.map((msg) => (msg._id === id ? { ...msg, ...updates } : msg))
        );
        toast({
          title: "Success",
          description: "Message updated successfully",
        });
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error updating message:", error);
      toast({
        title: "Error",
        description: "Failed to update message",
        variant: "destructive",
      });
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        setMessages((prev) => prev.filter((msg) => msg._id !== id));
        toast({
          title: "Success",
          description: "Message deleted successfully",
        });
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive",
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const filteredMessages = messages.filter((message) => {
    switch (filter) {
      case "unread":
        return !message.read;
      case "read":
        return message.read;
      case "unreplied":
        return !message.replied;
      default:
        return true;
    }
  });

  const stats = {
    total: messages.length,
    unread: messages.filter((m) => !m.read).length,
    unreplied: messages.filter((m) => !m.replied).length,
    high_priority: messages.filter((m) => m.priority === "high").length,
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Contact Messages</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-muted rounded w-1/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Contact Messages</h2>
        <Button onClick={fetchMessages} variant="outline">
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Total</span>
            </div>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <MailOpen className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Unread</span>
            </div>
            <div className="text-2xl font-bold text-blue-500">
              {stats.unread}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">Unreplied</span>
            </div>
            <div className="text-2xl font-bold text-orange-500">
              {stats.unreplied}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium">High Priority</span>
            </div>
            <div className="text-2xl font-bold text-red-500">
              {stats.high_priority}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex items-center space-x-2">
        <Filter className="h-4 w-4" />
        <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter messages" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Messages</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
            <SelectItem value="read">Read</SelectItem>
            <SelectItem value="unreplied">Unreplied</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No messages found</p>
            </CardContent>
          </Card>
        ) : (
          filteredMessages.map((message) => (
            <Card
              key={message._id}
              className={`${
                !message.read ? "border-blue-200 bg-blue-50/50" : ""
              }`}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{message.subject}</h3>
                      <Badge
                        className={`${getPriorityColor(
                          message.priority
                        )} text-white`}
                      >
                        {message.priority}
                      </Badge>
                      {!message.read && (
                        <Badge variant="secondary">
                          <MailOpen className="h-3 w-3 mr-1" />
                          Unread
                        </Badge>
                      )}
                      {!message.replied && (
                        <Badge variant="outline">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Needs Reply
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{message.name}</span>
                      </span>
                      <span>{message.email}</span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {new Date(message.createdAt).toLocaleDateString()}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {!message.read && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updateMessage(message._id, { read: true })
                        }
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Mark Read
                      </Button>
                    )}
                    {!message.replied && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updateMessage(message._id, { replied: true })
                        }
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Mark Replied
                      </Button>
                    )}
                    <Select
                      value={message.priority}
                      onValueChange={(value) =>
                        updateMessage(message._id, { priority: value as any })
                      }
                    >
                      <SelectTrigger className="w-[100px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Message</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this message from{" "}
                            {message.name}? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteMessage(message._id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm whitespace-pre-wrap">
                    {message.message}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
