import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export function AdminBlogsPage() {
  return (
    <div className="flex flex-1 flex-col p-8 md:p-12 max-w-6xl mx-auto w-full">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-normal tracking-tight text-slate-900">
          Articles &amp; Essays
        </h1>
        
        {/* THIS IS THE FIX: Link the button to the /admin/new route */}
        <Link to="/admin/new">
          <Button
            type="button"
            className="self-start px-4 py-2 text-xs font-medium shadow-sm bg-[#1a2e2b] hover:bg-[#12201e] text-white rounded-full sm:self-auto"
          >
            <Plus aria-hidden="true" className="mr-2 size-4" />
            <span>Create New Blog</span>
          </Button>
        </Link>
      </div>

      <div className="my-auto py-16 border-t border-slate-200 mt-8">
        <p className="text-sm text-slate-500">
          Articles and essays management content will appear here.
        </p>
      </div>
    </div>
  )
}