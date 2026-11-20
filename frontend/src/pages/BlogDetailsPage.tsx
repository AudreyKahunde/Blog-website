import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../../backend/convex/_generated/api";
import { ConvexImage } from "../components/ConvexImage";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { PaywallComponent } from "../components/PaywallComponent";
import { Badge } from "@/components/ui/badge";

function calculateReadTime(content: string) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

function DropCapParagraph({ text }: { text: string }) {
  const firstLetter = text.charAt(0);
  const restOfText = text.slice(1);
  return (
    <p className="mb-6">
      <span className="float-left mr-2 mt-1 font-['Playfair_Display'] text-6xl leading-[0.8] text-blue-700">
        {firstLetter}
      </span>
      {restOfText}
    </p>
  );
}

export function BlogDetailsPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  
  const [userId, setUserId] = useState<string>("");
  const [forceUpdate, setForceUpdate] = useState(0); 

  useEffect(() => {
    let localId = localStorage.getItem("reader_id");
    if (!localId) {
      localId = "user_" + Math.random().toString(36).substring(2, 9);
      localStorage.setItem("reader_id", localId);
    }
    setUserId(localId);
  }, []);

  const post = useQuery(
    api.posts.getPostById,
    id && userId ? { id: id as any, userId } : "skip"
  );

  if (!id) return <div className="text-center py-20">Article not found.</div>;
  if (post === undefined || !userId) return <div className="text-center py-20 animate-pulse">Loading article...</div>;
  if (post === null) return <div className="text-center py-20">Article not found.</div>;

  const readTime = calculateReadTime(post.content);
  const paragraphs = post.content.split("\n").filter((p) => p.trim() !== "");

  return (
    // Just the <main> tag here — App.tsx handles the Navbar and Footer!
    <main className="flex-1 w-full bg-white">
      <article className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        
        <Link to="/" className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 mb-8 px-4 py-2 border border-slate-200 rounded-full shadow-sm">
          <ArrowLeft className="mr-2 size-4" /> Back to blogs
        </Link>

        <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500 mb-6">
          <Badge variant="outline" className="border-slate-200 text-slate-600 bg-slate-50 rounded-full px-3 py-1">
            {post.category || "Article"}
          </Badge>
          
          {post.price && post.price > 0 ? (
            <Badge className="bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100 rounded-full px-3 py-1">
              Premium - {post.currency} {post.price.toLocaleString()}
            </Badge>
          ) : (
            <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 rounded-full px-3 py-1">
              Free
            </Badge>
          )}
          
          <span className="flex items-center gap-1.5"><Calendar className="size-3.5" /> Recent</span>
          <span className="flex items-center gap-1.5"><Clock className="size-3.5" /> {readTime}</span>
        </div>

        <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-4 text-slate-900">
          {post.title}
        </h1>
        
        {post.subtitle && (
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed mb-6">{post.subtitle}</p>
        )}

        

        <div className="flex items-center gap-3 py-4 border-y border-slate-100 mb-8">
          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
            <User className="size-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">{post.author}</p>
            <p className="text-xs text-slate-500">Writer</p>
          </div>
        </div>

        {post.imageId && (
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-100 mb-8">
            <ConvexImage storageId={post.imageId} className="object-cover w-full h-full" />
          </div>
        )}

        <div className="relative">
          <div className="text-slate-600 leading-relaxed text-[17px] md:text-lg">
            {paragraphs.map((paragraph, index) => {
              if (index === 0) return <DropCapParagraph key={index} text={paragraph} />;
              return <p key={index} className="mb-6">{paragraph}</p>;
            })}
          </div>

          {post.isLocked && (
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          )}
        </div>

        {post.isLocked && (
          <div className="mt-12 mb-16 border-t border-slate-100 pt-10">
            <PaywallComponent 
              amount={post.price!} 
              currency={post.currency || "UGX"}
              postId={post._id}
              userId={userId}
              onSuccess={() => setForceUpdate(prev => prev + 1)} 
            />
          </div>
        )}

      </article>
    </main>
  );
}