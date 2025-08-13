
import { LogOut } from "lucide-react";

export default function Sidebar({ onLogout }) {
  return (
    <aside className="w-64 bg-[#1a2b4c] text-white p-6 flex flex-col justify-between">
      {/* Top Links */}
      <div>
        <h2 className="text-2xl font-bold mb-8">School Admin</h2>
        <nav className="space-y-4">
          <a href="/admin" className="block hover:text-[#4c8bf5]">
            Dashboard
          </a>
          <a href="/students" className="block hover:text-[#4c8bf5]">
            Students
          </a>
        </nav>
      </div>

      {/* Bottom Logout */}
      <button
        onClick={onLogout}
        className="flex items-center gap-2 bg-[#f54c61] hover:bg-[#d63d50] px-4 py-2 rounded-lg shadow-md mt-8"
      >
        <LogOut size={18} /> Logout
      </button>
    </aside>
  );
}
