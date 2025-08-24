"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Eye, Calendar, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { BlogPost } from "@/types";

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: "",
    tags: "",
    read_time: "",
    published: false,
    pdfs: [] as Array<{ title: string; url: string; downloadCount?: number }>,
  });

  // Fetch blog posts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/blog");
      if (response.ok) {
        const allPosts = await response.json();
        setPosts(allPosts); // Get all posts (published and unpublished) for admin
      }
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validPdfs = (formData.pdfs || []).filter((pdf) => {
      if (!pdf.title || !pdf.url) return false;

      const isGoogleDriveUrl =
        pdf.url.includes("drive.google.com") &&
        (pdf.url.includes("/file/d/") || pdf.url.includes("?id="));
      return isGoogleDriveUrl;
    });

    // Check if any PDFs were removed due to validation
    const invalidPdfs = (formData.pdfs || []).filter((pdf) => {
      if (!pdf.title || !pdf.url) return false;
      return !pdf.url.includes("drive.google.com");
    });

    if (invalidPdfs.length > 0) {
      toast.error("Invalid PDF links found. Please use Google Drive links.");
      return; // Prevent form submission if there are invalid PDFs
    }

    const postData = {
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      image: formData.image,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
      read_time: formData.read_time,
      published: formData.published,
      pdfs: validPdfs.map((pdf) => ({
        title: pdf.title.trim(),
        url: pdf.url.trim(),
        downloadCount: pdf.downloadCount || 0,
      })),
      date: editingPost?.date || new Date(),
    };

    try {
      if (editingPost) {
        // Update existing post
        const response = await fetch(`/api/blog/${editingPost._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        });

        if (response.ok) {
          const updatedPost = await response.json();
          setPosts(
            posts.map((p) => (p._id === editingPost._id ? updatedPost : p))
          );
          toast.success("Blog post updated successfully!");
        }
      } else {
        // Create new post
        const response = await fetch("/api/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        });

        if (response.ok) {
          const newPost = await response.json();
          setPosts([newPost, ...posts]);
          toast.success("Blog post added successfully!");
        }
      }
    } catch (error) {
      console.error("Error saving blog post:", error);
    }

    setIsDialogOpen(false);
    setEditingPost(null);
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      image: "",
      tags: "",
      read_time: "",
      published: false,
      pdfs: [],
    });
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      tags: post.tags.join(", "),
      read_time: post.read_time,
      published: post.published,
      pdfs:
        post.pdfs?.map((pdf) => ({
          title: pdf.title,
          url: pdf.url,
          downloadCount: pdf.downloadCount || 0,
        })) || [],
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPosts(posts.filter((p) => p._id !== id));
        toast.success("Blog post deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting blog post:", error);
    }
  };

  const togglePublished = async (id: string) => {
    try {
      const post = posts.find((p) => p._id === id);
      if (!post) return;

      // Prepare the update data, preserving all existing post data
      const updateData = {
        ...post,
        published: !post.published,
        pdfs:
          post.pdfs?.map((pdf) => ({
            title: pdf.title,
            url: pdf.url,
            downloadCount: pdf.downloadCount || 0,
          })) || [],
      };

      const response = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        const updatedPost = await response.json();
        setPosts(posts.map((p) => (p._id === id ? updatedPost : p)));
        toast.success("Post status updated!");
      }
    } catch (error) {
      console.error("Error updating post status:", error);
      toast.error("Failed to update post status");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[90vw] md:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPost ? "Edit Blog Post" : "Add New Blog Post"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="readTime">Read Time</Label>
                  <Input
                    id="readTime"
                    value={formData.read_time}
                    onChange={(e) =>
                      setFormData({ ...formData, read_time: e.target.value })
                    }
                    placeholder="8 min read"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
                    placeholder="React, Node.js, MongoDB"
                    required
                  />
                </div>
              </div>

              {/* PDF Management Section */}
              <div>
                <Label>PDF Attachments</Label>
                <div className="space-y-4">
                  {formData.pdfs?.map((pdf, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3 border rounded-md"
                    >
                      <div className="flex-1 space-y-3">
                        <div>
                          <Label htmlFor={`pdf-title-${index}`}>Title</Label>
                          <Input
                            id={`pdf-title-${index}`}
                            value={pdf.title}
                            onChange={(e) => {
                              const newPdfs = [...(formData.pdfs || [])];
                              newPdfs[index] = {
                                ...pdf,
                                title: e.target.value.trim(),
                              };
                              setFormData({ ...formData, pdfs: newPdfs });
                            }}
                            placeholder="PDF Title"
                            className="mb-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`pdf-url-${index}`}>URL</Label>
                          <Input
                            id={`pdf-url-${index}`}
                            value={pdf.url}
                            onChange={(e) => {
                              const newPdfs = [...(formData.pdfs || [])];
                              newPdfs[index] = {
                                ...pdf,
                                url: e.target.value.trim(),
                                downloadCount: pdf.downloadCount || 0,
                              };
                              setFormData({ ...formData, pdfs: newPdfs });
                            }}
                            placeholder="https://drive.google.com/file/d/..."
                            pattern=".*drive\.google\.com.*"
                            title="Please enter a Google Drive link"
                          />
                        </div>
                        {pdf.downloadCount !== undefined &&
                          pdf.downloadCount > 0 && (
                            <p className="text-sm text-muted-foreground">
                              Downloads: {pdf.downloadCount}
                            </p>
                          )}
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          const newPdfs = formData.pdfs?.filter(
                            (_, i) => i !== index
                          );
                          setFormData({ ...formData, pdfs: newPdfs });
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          pdfs: [
                            ...(formData.pdfs || []),
                            { title: "", url: "", downloadCount: 0 },
                          ],
                        });
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add PDF
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, published: checked })
                  }
                />
                <Label htmlFor="published">Published</Label>
              </div>

              <div>
                <Label htmlFor="content">Content (Markdown)</Label>
                <Tabs defaultValue="edit">
                  <TabsList>
                    <TabsTrigger value="edit">Edit</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                  </TabsList>
                  <TabsContent value="edit">
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      rows={20}
                      className="font-mono"
                      placeholder="Write your blog post in Markdown..."
                      required
                    />
                  </TabsContent>
                  <TabsContent value="preview">
                    <div className="border rounded-lg p-4 h-80 overflow-y-auto prose prose-sm max-w-none dark:prose-invert">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm, require("remark-math")]}
                        rehypePlugins={[require("rehype-katex")]}
                        components={{
                          code: ({
                            node,
                            className,
                            children,
                            ...props
                          }: any) => {
                            const match = /language-(\w+)/.exec(
                              className || ""
                            );
                            const isInline = !match;
                            return !isInline && match ? (
                              <SyntaxHighlighter
                                style={tomorrow as any}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                              >
                                {String(children).replace(/\n$/, "")}
                              </SyntaxHighlighter>
                            ) : (
                              <code className={className} {...props}>
                                {children}
                              </code>
                            );
                          },
                        }}
                      >
                        {formData.content}
                      </ReactMarkdown>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingPost ? "Update" : "Add"} Post
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <motion.div
            key={post._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardContent className="p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h3 className="text-base lg:text-lg font-semibold line-clamp-1">
                      {post.title}
                    </h3>
                    <Badge variant={post.published ? "default" : "secondary"}>
                      {post.published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                  <div className="flex space-x-2 self-end sm:self-start">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(post)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => post._id && togglePublished(post._id)}
                      className="h-8 w-8 p-0"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => post._id && handleDelete(post._id)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>{" "}
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {post.createdAt
                      ? new Date(post.createdAt).toLocaleDateString()
                      : new Date().toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.read_time}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
