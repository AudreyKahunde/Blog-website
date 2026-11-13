import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";

// Import the Admin layout and pages you just created
import { AdminLayout } from "./components/AdminLayout";
import { AdminBlogsPage } from "./pages/admin/AdminBlogsPage";
import { AdminTransactionsPage } from "./pages/admin/AdminTransactionsPage";
import { AdminUsersPage } from "./pages/admin/AdminUsersPage";
import { AdminEditor } from "./pages/admin/AdminEditor";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white font-sans text-slate-900">
        <div className="mx-auto max-w-[10000px] bg-white border overflow-hidden min-h-screen flex flex-col">
          
          <Routes>
            {/* PUBLIC ROUTES (Uses your existing Navbar & Footer) */}
            <Route path="/" element={
              <>
                <Navbar />
                <main className="flex-1"><Home /></main>
                <Footer />
              </>
            } />

            {/* ADMIN ROUTES (Uses the new Admin Layout */}
            {/* Note: Because this is inside your existing wrapper, the Admin sidebar 
                will sit nicely inside the white board you created */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminBlogsPage />} />
              <Route path="transactions" element={<AdminTransactionsPage />} />
              <Route path="users" element={<AdminUsersPage />} />
              <Route path="new" element={<AdminEditor />} />
            </Route>
          </Routes>

        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;