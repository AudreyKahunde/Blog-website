import { Link } from "react-router-dom";
import { 
  ArrowUpRight, 
  Lock, 
  Mail, 
  Phone, 
  MessageCircle, 
  Linkedin, 
  Instagram, 
  Calendar, 
  Clock, 
  ArrowRight, 
  ArrowLeft 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "convex/react";
import { api } from "../../../backend/convex/_generated/api";

export function Home() {
  // 1. Fetch real data from Convex
  const posts = useQuery(api.posts.listPublished);

  return (
    <div className="flex flex-col bg-[#F9FAFB] text-slate-900">
      
      {/*  1. Hero Section  */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 md:gap-20 items-start">
        
        {/* Left: Image & Name */}
        <div className="flex flex-col gap-5">
          <div className="w-full aspect-4/5 rounded-2xl overflow-hidden shadow-sm border border-slate-200">
            <img 
              src="/Kahunde.png" 
              alt="Kahunde Audrey" 
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h3 className="font-sans font-bold text-lg text-slate-900">Kahunde Audrey</h3>
            <p className="text-sm text-slate-500 leading-relaxed mt-1">
              Data Scientist | Machine Learning Engineer | ML & AI enthusiast
            </p>
          </div>
        </div>
        
        {/* Right: Text Content */}
        <div className="pt-2 md:pt-4">
          <span className="text-[11px] font-bold tracking-[0.2em] text-slate-500 uppercase mb-6 block">
            Authorial Focus
          </span>
          
          <h1 className="font-['Playfair_Display'] text-4xl md:text-6xl leading-[1.1] tracking-tight mb-8 text-slate-900">
            Beyond the Algorithm,<em className="italic text-slate-700"></em> Into the Intelligence of Data
          </h1>
          
          <div className="text-slate-600 text-base md:text-lg leading-relaxed mb-10 space-y-5">
            <p>
            I am a Computer Science graduate with a growing passion for Data Science, Machine Learning, and Artificial Intelligence. Fascinated by the ability of data to reveal patterns, uncover insights, and inform meaningful decisions, I enjoy exploring how intelligent systems are built and applied to real-world challenges.

            Through this blog, I document my journey of learning, experimenting, and building with data. From exploring machine learning algorithms and deep learning architectures to discussing emerging AI technologies, I share technical discoveries, project experiences, lessons learned, and ideas worth exploring. I am particularly interested in the potential of AI to address challenges within Africa, where locally relevant data and thoughtful innovation can make a meaningful difference.

            This is a space for curiosity, experimentation, and thoughtful conversations about the future of intelligent technology.
            </p>
          </div>
          
          {/* Contact Links */}
          <div className="flex flex-wrap gap-2.5">
            {/* Email */}
            <a href="mailto:kahundeaudrey@gmail.com">
              <Button variant="outline" size="sm" className="rounded-full text-xs text-slate-600 bg-white">
                <Mail className="mr-2 size-3.5" /> kahundeaudrey@gmail.com
              </Button>
            </a>

            {/* Phone */}
            <a href="tel:+256701848455">
              <Button variant="outline" size="sm" className="rounded-full text-xs text-slate-600 bg-white">
                <Phone className="mr-2 size-3.5" /> +256 701848455
              </Button>
            </a>

            {/* WhatsApp */}
            <a href="https://wa.me/256701848455" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="rounded-full text-xs text-slate-600 bg-white">
                <MessageCircle className="mr-2 size-3.5" /> WhatsApp
              </Button>
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/audrey-kahunde-778290310/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="rounded-full text-xs text-slate-600 bg-white">
                <Linkedin className="mr-2 size-3.5" /> LinkedIn
              </Button>
            </a>

            {/* Instagram */}
            <a href="https://instagram.com/audrey______k" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="rounded-full text-xs text-slate-600 bg-white">
                <Instagram className="mr-2 size-3.5" /> @audrey______k
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/*  2. Recent Blogs Section */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-16">
        
        {/* Header & Filters */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-[11px] font-bold tracking-[0.15em] text-slate-500 uppercase mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-900"></span> The Tech Report Archive
            </span>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl text-slate-900">
              Recent Blogs
            </h2>
          </div>
          
          {/* Tabs & Pagination */}
          <div className="flex items-center gap-4">
            <Tabs defaultValue="all" className="w-auto">
              <TabsList className="bg-transparent border border-slate-200 rounded-full h-10 p-1">
                <TabsTrigger value="all" className="rounded-full px-5 text-sm data-[state=active]:bg-slate-900 data-[state=active]:text-white">
                  All
                </TabsTrigger>
                <TabsTrigger value="ai" className="rounded-full px-5 text-sm text-slate-600">
                  AI & Automation
                </TabsTrigger>
                <TabsTrigger value="mentorship" className="rounded-full px-5 text-sm text-slate-600">
                  Mentorship
                </TabsTrigger>
                <TabsTrigger value="architecture" className="rounded-full px-5 text-sm text-slate-600">
                  Architecture
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex items-center gap-2 text-sm text-slate-500 font-medium ml-2">
              <span>01 / 04</span>
              <div className="flex gap-1">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-md border-slate-200 text-slate-400">
                  <ArrowLeft className="size-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-md border-slate-200 text-slate-700">
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
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
            <Card key={post._id} className="flex flex-col border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white group cursor-pointer hover:shadow-md transition-all">
              
              <div className="aspect-16/10 bg-slate-100 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80" 
                  alt={post.title} 
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <CardContent className="p-6 flex flex-col flex-1 gap-4">
                
                {/* Meta Row */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">Article</span>
                  <Badge variant="outline" className="text-[10px] font-bold px-2 py-0.5 rounded-sm border-0 bg-emerald-50 text-emerald-600">
                    FREE
                  </Badge>
                </div>
                
                {/* Date & Read Time */}
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="size-3.5" /> Recent
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5" /> 5 min read
                  </span>
                </div>
                
                <h3 className="font-['Playfair_Display'] text-2xl leading-tight text-slate-900 mt-1">
                  {post.title}
                </h3>
                
                <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
                  {post.content}
                </p>
                
              </CardContent>
              
              <CardFooter className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 mt-auto">
                <Link to={`/blog/${post._id}`} className="text-sm font-medium text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read <ArrowRight className="size-4" />
                </Link>
              </CardFooter>
              
            </Card>
          ))}
        </div>
      </section>

      {/* =========================================
          3. Explore Archive Section 
          ========================================= */}
      <section className="w-full max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <h2 className="font-['Playfair_Display'] text-3xl text-slate-900 mb-3">
          Explore the Archive
        </h2>
        <p className="text-slate-500 mb-8 max-w-xl">
          Select a destination below to navigate to the blog details or the admin dashboard.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <Link to="/blog">
            <Button className="bg-[#1a2e2b] hover:bg-[#12201e] text-white rounded-full px-6 h-11">
              Read Dispatch <ArrowUpRight className="ml-2 size-4" />
            </Button>
          </Link>
          
          <Link to="/admin">
            <Button variant="outline" className="rounded-full px-6 h-11 bg-white border-slate-300 text-slate-700">
              <Lock className="mr-2 size-4 text-slate-400" /> Admin Dashboard <ArrowRight className="ml-2 size-4 text-slate-400" />
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}