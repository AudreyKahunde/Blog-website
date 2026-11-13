import { useQuery } from "convex/react";
import { api } from "../../../backend/convex/_generated/api";
// 1. Import the Id type from Convex
import { Id } from "../../../backend/convex/_generated/dataModel";

// 2. Change 'storageId' from 'string' to 'Id<"_storage">'
export function ConvexImage({ storageId, className }: { storageId: Id<"_storage">, className?: string }) {
  const imageUrl = useQuery(api.posts.getImageUrl, { storageId });
  
  if (!imageUrl) return <div className="w-full h-full bg-slate-100 animate-pulse" />;
  
  return <img src={imageUrl} className={className} alt="Blog cover" />;
}