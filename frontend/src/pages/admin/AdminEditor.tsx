import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../backend/convex/_generated/api";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function AdminEditor() {
  const navigate = useNavigate();
  const createPost = useMutation(api.posts.create);
  const generateUploadUrl = useMutation(api.posts.generateUploadUrl); // Added for image upload

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Technology"); // Added Category state
  const [imageFile, setImageFile] = useState<File | null>(null); // Added Image state
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return alert("Title and Content are required");

    setIsSubmitting(true);
    try {
      let imageId = undefined;

      // 1. If there's an image selected, upload it to Convex Storage
      if (imageFile) {
        const postUrl = await generateUploadUrl();
        const result = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": imageFile.type },
          body: imageFile,
        });
        const { storageId } = await result.json();
        imageId = storageId;
      }

      // 2. Save the post with all the data
      await createPost({
        title,
        subtitle: subtitle || undefined,
        content,
        author: "Kahunde Audrey",
        price: price ? Number(price) : 0,
        currency: "UGX",
        category: category, 
        imageId: imageId,   
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
            placeholder=" Enter a brief subtitle..."
          />
        </div>

        {/* Category and Price Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category Dropdown */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="Technology">Technology</option>
              <option value="Architecture">Architecture</option>
              <option value="Data Science">Data Science</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Privacy">Privacy</option>
            </select>
          </div>

          {/* Price */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Price in UGX (Leave empty or 0 for Free)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 9500"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Cover Image (Optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="p-2 border border-slate-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-96 resize-y"
            placeholder="Write your article here."
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