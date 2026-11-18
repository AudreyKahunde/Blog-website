import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../backend/convex/_generated/api";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function AdminEditor() {
  const navigate = useNavigate();
  const createPost = useMutation(api.posts.create);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return alert("Title and Content are required");

    setIsSubmitting(true);
    try {
      await createPost({
        title,
        subtitle: subtitle || undefined, // Don't send empty strings
        content,
        author: "Kahunde Audrey",
        // imageId: ... add your image logic here if you have it
      });
      navigate("/admin");
    } catch (error) {
      console.error(error);
      alert("Failed to create post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Create New Post</h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        {/* Title */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter article title..."
            required
          />
        </div>

        {/* Subtitle */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Subtitle (Optional)</label>
          <textarea
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
            placeholder="A catchy short sentence to highlight under the title..."
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-96 resize-y"
            placeholder="Write your article here. Press Enter twice to create a new paragraph..."
            required
          />
        </div>

        <Button type="submit" disabled={isSubmitting} className="mt-4">
          {isSubmitting ? "Publishing..." : "Publish Post"}
        </Button>

      </form>
    </div>
  );
}