import { useQuery } from "convex/react";
import { api } from "../../../backend/convex/_generated/api";

export function ConvexImage({ storageId, className }: { storageId: string, className?: string }) {
  // Fetch the real image URL from Convex using the ID
  const imageUrl = useQuery(api.posts.getImageUrl, { storageId });
  
  if (!imageUrl) {
    return <div className="w-full h-full bg-slate-100 animate-pulse" />;
  }
  
  return <img src={imageUrl} className={className} alt="Blog cover" />;
}