import { useSearchParams, Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../../backend/convex/_generated/api";
import { ConvexImage } from "../components/ConvexImage";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

// Helper component for the large blue first letter (Drop Cap)
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

  const post = useQuery(
    api.posts.getPostById,
    id ? { id: id as any } : "skip"
  );

  if (!id) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-slate-500 gap-4">
        <p>Article not found.</p>
        <Link to="/" className="px-4 py-2 border rounded-md hover:bg-slate-50 transition-colors">
          Go back home
        </Link>
      </div>
    );
  }

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
        <Link to="/" className="px-4 py-2 border rounded-md hover:bg-slate-50 transition-colors">
          Go back home
        </Link>
      </div>
    );
  }

  // Split content into paragraphs, filtering out empty lines
  const paragraphs = post.content.split("\n").filter((p) => p.trim() !== "");

  return (
    <div className="bg-white min-h-screen">
      <article className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 mb-10 transition-colors px-4 py-2 border border-slate-200 rounded-full shadow-sm hover:shadow-md"
        >
          <ArrowLeft className="mr-2 size-4" /> Back to blogs
        </Link>

        {/* Category, Price & Meta Row */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 mb-6">
          <div className="flex items-center gap-2">
            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
              Article
            </span>
            <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full">
              Free
            </span>
          </div>
          <span className="flex items-center gap-1.5">
            <Calendar className="size-3.5" /> Recent
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5" /> 4 min read
          </span>
        </div>

        {/* Title */}
        <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-4 text-slate-900">
          {post.title}
        </h1>

        {/* Subtitle */}
        {post.subtitle && (
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed mb-10">
            {post.subtitle}
          </p>
        )}

        {/* Hero Image */}
        {post.imageId && (
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-100 mb-12">
            <ConvexImage
              storageId={post.imageId}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        {/* Blog Content */}
        <div className="text-slate-600 leading-relaxed text-[17px] md:text-lg">
          {paragraphs.map((paragraph, index) => {
            // If it's the first paragraph, apply the blue Drop Cap
            if (index === 0) {
              return <DropCapParagraph key={index} text={paragraph} />;
            }

            // Check if the paragraph is short (like a heading) or just standard text
            const isHeading = paragraph.length < 60 && !paragraph.endsWith('.');
            
            if (isHeading) {
              return (
                <h2 key={index} className="font-['Playfair_Display'] text-2xl md:text-3xl text-slate-900 mt-10 mb-4">
                  {paragraph}
                </h2>
              );
            }

            // Standard paragraph
            return (
              <p key={index} className="mb-6">
                {paragraph}
              </p>
            );
          })}
        </div>

      </article>
    </div>
  );
}