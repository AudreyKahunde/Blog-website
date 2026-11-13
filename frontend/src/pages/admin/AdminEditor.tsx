import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../backend/convex/_generated/api"; // Check your relative path!
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, Link } from "react-router-dom";
import { ImagePlus, Loader2, ArrowLeft } from "lucide-react";

export function AdminEditor() {
  const createPost = useMutation(api.posts.create);
  const generateUploadUrl = useMutation(api.posts.generateUploadUrl);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return alert("Title and content are required");
    
    setIsUploading(true);

    try {
      let imageId = undefined;

      // 1. Upload image to Convex Storage if selected
      if (file) {
        const postUrl = await generateUploadUrl();
        const result = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });
        const { storageId } = await result.json();
        imageId = storageId;
      }

      // 2. Save the blog post to the Convex Database
      await createPost({
        title,
        content,
        author: "Kahunde Audrey", 
        imageId,
      });

      alert("Blog published successfully!");
      navigate("/admin"); // Go back to the dashboard list
    } catch (error) {
      console.error(error);
      alert("Failed to upload blog");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-8">
        <Link to="/admin" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 mb-6 transition-colors">
          <ArrowLeft className="mr-2 size-4" /> Back to Dashboard
        </Link>
        <h1 className="font-['Playfair_Display'] text-4xl text-slate-900">
          Write a New Dispatch
        </h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 border border-slate-200 rounded-xl shadow-sm">
        <div className="space-y-2">
          <label className="text-sm font-bold tracking-wide text-slate-700 uppercase">Title</label>
          <Input 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Enter a title for your article " 
            className="text-lg py-6 bg-slate-50 border-slate-200 focus-visible:ring-slate-900"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold tracking-wide text-slate-700 uppercase">Cover Image</label>
          <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <ImagePlus className="w-8 h-8 mb-3 text-slate-400" />
                <p className="mb-2 text-sm text-slate-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-slate-400">
                  {file ? file.name : "PNG, JPG or WEBP"}
                </p>
              </div>
              <input 
                id="dropzone-file" 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)} 
              />
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold tracking-wide text-slate-700 uppercase">Content</label>
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            placeholder="Start writing your article here..."
            className="flex min-h-[300px] w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-base placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>

        <Button 
          type="submit" 
          disabled={isUploading} 
          className="w-full h-12 bg-[#1a2e2b] hover:bg-[#12201e] text-white text-lg font-medium rounded-full transition-all"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Publishing...
            </>
          ) : (
            "Publish to Archive"
          )}
        </Button>
      </form>
    </div>
  );
}