import { useState, useEffect } from "react";

export default function StudentFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({ ...initialData, password: "" });
    } else {
      setForm({ username: "", email: "", password: "" });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg">
        <h3 className="text-2xl font-bold text-[#1a2b4c] mb-6 border-b pb-2">
          {initialData ? "Update Student" : "Add Student"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
            className="w-full border border-gray-300 focus:border-[#4c8bf5] focus:ring-2 focus:ring-[#4c8bf5] outline-none p-3 rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full border border-gray-300 focus:border-[#4c8bf5] focus:ring-2 focus:ring-[#4c8bf5] outline-none p-3 rounded-lg"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={initialData ? "New Password (optional)" : "Password"}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border border-gray-300 focus:border-[#4c8bf5] focus:ring-2 focus:ring-[#4c8bf5] outline-none p-3 rounded-lg pr-20"
              required={!initialData}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 text-sm font-medium text-[#4c8bf5] hover:underline"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-lg shadow-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${
                initialData
                  ? "bg-[#234b9b] hover:bg-[#1a2b4c]"
                  : "bg-green-500 hover:bg-green-600"
              } text-white px-5 py-2 rounded-lg shadow-md`}
            >
              {initialData ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
