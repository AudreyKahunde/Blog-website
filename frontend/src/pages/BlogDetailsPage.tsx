import { useParams, Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../../backend/convex/_generated/api";
import { ConvexImage } from "../components/ConvexImage";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BlogDetailsPage() {
  
  const { id } = useParams();

  
  const post = useQuery(api.posts.getPostById, { id: id as any });

  
  if (post === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 animate-pulse">
        Loading article...
      </div>
    );
  }

  
  if (post === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-slate-500 gap-4">
        <p>Article not found.</p>
        <Link to="/">
          <Button variant="outline">Go back home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <article className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 mb-8 transition-colors">
          <ArrowLeft className="mr-2 size-4" /> Back to Archive
        </Link>

        {/* More Information */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 uppercase tracking-wider mb-6">
          <span className="flex items-center gap-1.5"><User className="size-3.5" /> {post.author}</span>
          <span className="flex items-center gap-1.5"><Calendar className="size-3.5" /> Recent</span>
          <span className="flex items-center gap-1.5"><Clock className="size-3.5" /> 8 min read</span>
        </div>

        {/* Title */}
        <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-8 text-slate-900">
          {post.title}
        </h1>

        {/* Hero Image*/}
        {post.imageId && (
          <div className="w-full bg-white p-2.5 rounded-2xl shadow-sm border border-slate-200 mb-12">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-100">
              <ConvexImage 
                storageId={post.imageId} 
                className="object-cover w-full h-full" 
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/70 via-white/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 h-1.5 bg-white/90 rounded-full shadow-sm backdrop-blur-sm" />
            </div>
          </div>
        )}

        {/* Blog Content */}
        <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed space-y-6">
          
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

      </article>
    </div>
  );
}