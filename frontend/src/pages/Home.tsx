import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Clock,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useQuery } from "convex/react";
import { api } from "../../../backend/convex/_generated/api";
import { ConvexImage } from "../components/ConvexImage";

// Helper function to calculate reading time
function calculateReadTime(content: string) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export function Home() {
  const navigate = useNavigate();
  const posts = useQuery(api.posts.listPublished);

  return (
    <div className="flex flex-col text-slate-900">
      {/* 1. Hero Section */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 md:gap-20 items-start">
        {/* Left: Image & Name */}
        <div className="flex flex-col gap-5">
          <div className="relative aspect-4/5 w-full overflow-hidden rounded-xl bg-slate-100">
            <img
              src="/Kahunde.png"
              alt="Kahunde Audrey"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white/70 via-white/30 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 h-3 bg-white/90 rounded-full shadow-sm backdrop-blur-sm" />
          </div>

          <div>
            <h3 className="font-sans font-bold text-lg text-slate-900">Kahunde Audrey</h3>
            <p className="text-sm text-slate-500 leading-relaxed mt-1">
              Aspiring Data Scientist, Machine Learning & AI Enthusiast
            </p>
          </div>
        </div>

        {/* Right: Text Content */}
        <div className="pt-2 md:pt-4">
          <span className="text-[11px] font-bold tracking-[0.2em] text-slate-500 uppercase mb-6 block">
            Authorial Focus
          </span>

          <h1 className="font-['Playfair_Display'] text-4xl md:text-6xl leading-[1.1] tracking-tight mb-8 text-slate-900">
            Beyond the Algorithm,{" "}
            <em className="italic text-slate-700">Into the Possibilities of Data</em>
          </h1>

          <div className="text-slate-600 text-base md:text-lg leading-relaxed mb-10 space-y-5">
            <p>
              I am a Computer Science graduate with a growing passion for Data Science, Machine
              Learning, and Artificial Intelligence. Fascinated by the ability of data to reveal
              patterns, uncover insights, and inform meaningful decisions, I enjoy exploring how
              intelligent systems are built and applied to real world challenges.
            </p>
            <p>
              Through this blog, I document my journey of learning, experimenting, and building
              with data. From exploring machine learning algorithms and deep learning architectures
              to discussing emerging AI technologies, I share technical discoveries, project
              experiences, lessons learned, and ideas worth exploring. I am particularly interested
              in the potential of AI to address challenges within Africa, where locally relevant
              data and thoughtful innovation can make a meaningful difference.
            </p>
            <p>
              This is a space for curiosity, experimentation, and thoughtful conversations about
              the future of intelligent technology.
            </p>
          </div>

          {/* Contact Links */}
          <div className="mt-8">
            <span className="text-[11px] font-bold tracking-[0.15em] text-slate-500 uppercase mb-4 block">
              Direct Inquiries &amp; Collaboration
            </span>

            <div className="flex flex-wrap gap-2.5">
              <a href="mailto:kahundeaudrey@gmail.com">
                <Button variant="outline" size="sm" className="rounded-full text-xs text-slate-600 bg-white">
                  <Mail className="mr-2 size-3.5" /> kahundeaudrey@gmail.com
                </Button>
              </a>

              <a href="tel:+256701848455">
                <Button variant="outline" size="sm" className="rounded-full text-xs text-slate-600 bg-white">
                  <Phone className="mr-2 size-3.5" /> +256 701 848455 / +256 765 085886
                </Button>
              </a>

              <a href="https://wa.me/256701848455" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="rounded-full text-xs text-slate-600 bg-white">
                  <MessageCircle className="mr-2 size-3.5" /> WhatsApp
                </Button>
              </a>

              <a
                href="https://www.linkedin.com/in/audrey-kahunde-778290310/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm" className="rounded-full text-xs text-slate-600 bg-white">
                  <Linkedin className="mr-2 size-3.5" /> LinkedIn
                </Button>
              </a>

              <a
                href="https://instagram.com/audrey______k"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm" className="rounded-full text-xs text-slate-600 bg-white">
                  <Instagram className="mr-2 size-3.5" /> @audrey______k
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Recent Blogs Section */}
      <section className="bg-[#F9FAFB] w-full py-16 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header & View All Button */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-[11px] font-bold tracking-[0.15em] text-slate-500 uppercase mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-900"></span> The Tech Report Archive
              </span>
              <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl text-slate-900">
                Recent Blogs
              </h2>
            </div>

            <div className="flex items-center">
              <Link
                to="/blog"
                className="group flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 hover:shadow-sm rounded-full px-5 py-2 text-sm font-medium transition-all"
              >
                View All Blogs
                <ArrowRight className="size-4 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Loading State */}
            {posts === undefined && (
              <div className="col-span-1 md:col-span-3 py-12 text-center text-slate-500 animate-pulse">
                Loading posts from Convex...
              </div>
            )}

            {/* Empty State */}
            {posts !== undefined && posts.length === 0 && (
              <div className="col-span-1 md:col-span-3 py-12 text-center text-slate-500">
                No published posts yet. Create one in the terminal!
              </div>
            )}

            {/* Render Real Posts */}
            {posts?.map((post) => (
              <Card
                key={post._id}
                className="group flex h-full flex-col gap-0 overflow-hidden rounded-xl border-slate-200 bg-white p-0 py-0 shadow-sm transition-shadow hover:shadow-md"
              >
                {/* Image */}
                <div className="aspect-16/10 w-full overflow-hidden bg-slate-100">
                  {post.imageId ? (
                    <ConvexImage
                      storageId={post.imageId}
                      className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-slate-400">
                      No Image
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="outline" className="text-[10px] font-medium border-slate-200 text-slate-500 rounded-full px-2.5">
                      Article
                    </Badge>

                    {post.price && post.price > 0 ? (
                      <Badge className="bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100 text-[10px] font-semibold rounded-full px-2.5">
                        PREMIUM &middot; {post.currency || "UGX"} {post.price.toLocaleString()}
                      </Badge>
                    ) : (
                      <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 text-[10px] font-semibold rounded-full px-2.5">
                        FREE
                      </Badge>
                    )}
                  </div>

                  <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500">
                    <Clock aria-hidden="true" className="size-3 shrink-0" />
                    <span>Recent &middot; {calculateReadTime(post.content)}</span>
                  </div>

                  <h3 className="mt-2 font-['Playfair_Display'] text-[17px] leading-snug font-semibold tracking-tight text-slate-900">
                    {post.title}
                  </h3>

                  <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-slate-500">
                    {post.content}
                  </p>

                  <div className="mt-4 border-t border-slate-200/70 pt-3.5">
                    <Button
                      type="button"
                      variant="link"
                      size="sm"
                      onClick={() => navigate(`/blog?id=${post._id}`)}
                      className="h-auto gap-1.5 p-0 text-xs font-medium text-blue-600 hover:no-underline"
                    >
                      <span>Read</span>
                      <ArrowRight
                        aria-hidden="true"
                        className="size-3 transition-transform group-hover:translate-x-0.5"
                      />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}