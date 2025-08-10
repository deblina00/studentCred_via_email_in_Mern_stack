import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import StudentFormModal from "../components/StudentFormModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
//import StudentCard from "../components/StudentCard";
import { LogOut, Plus, Users, Book, DollarSign } from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  //const [viewMode, setViewMode] = useState("table");

  const fetchStudents = async () => {
    try {
      const res = await axios.get("/students");
      setStudents(res.data);
    } catch (err) {
      console.error("Failed to fetch students:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    else fetchStudents();
  }, []);

  const handleAddClick = () => {
    setSelectedStudent(null);
    setFormModalOpen(true);
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setFormModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  const handleFormSubmit = async (form) => {
    try {
      if (selectedStudent) {
        await axios.put(`/students/${selectedStudent._id}`, {
          username: form.username,
          email: form.email,
          ...(form.password && { password: form.password }),
        });
        toast.success("Student updated successfully!");
      } else {
        await axios.post("/students", form);
        toast.success(
          "Student added successfully! Credentials have been sent to the student's email."
        );
      }
      fetchStudents();
      setFormModalOpen(false);
    } catch (err) {
      console.error("Form submit error:", err);
      toast.error("Failed to submit form.");
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`/students/${deleteId}`);
      toast.success("Student deleted successfully!");
      fetchStudents();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete student.");
    } finally {
      setDeleteModalOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    // <div className="p-8 min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
    //   {/* Top bar */}
    //   <div className="flex justify-between items-center mb-6">
    //     <h2 className="text-2xl font-bold">Admin Dashboard</h2>
    //     <div className="flex gap-2">
    //       <button
    //         onClick={() => setViewMode(viewMode === "table" ? "card" : "table")}
    //         className="bg-purple-500 text-white px-4 py-2 rounded"
    //       >
    //         {viewMode === "table" ? "Card View" : "Table View"}
    //       </button>
    //       <button
    //         onClick={handleAddClick}
    //         className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
    //       >
    //         Add Student
    //       </button>
    //       <button
    //         onClick={handleLogout}
    //         className="bg-red-500 text-white px-4 py-2 rounded"
    //       >
    //         Logout
    //       </button>
    //     </div>
    //   </div>

    //   {/* Content */}
    //   {loading ? (
    //     <p>Loading students...</p>
    //   ) : viewMode === "table" ? (
    //     <table className="w-full border bg-">
    //       <thead>
    //         <tr>
    //           <th className="border p-2">Username</th>
    //           <th className="border p-2">Email</th>
    //           <th className="border p-2">Actions</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {students.map((student) => (
    //           <tr key={student._id}>
    //             <td className="border p-2">{student.username}</td>
    //             <td className="border p-2">{student.email}</td>
    //             <td className="border p-2 flex gap-2">
    //               <button
    //                 onClick={() => handleEdit(student)}
    //                 className="bg-indigo-500 hover:bg-indigo-600 text-white px-2 py-1 rounded"
    //               >
    //                 Edit
    //               </button>
    //               <button
    //                 onClick={() => handleDeleteClick(student._id)}
    //                 className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
    //               >
    //                 Delete
    //               </button>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   ) : (
    //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    //       {students.map((student) => (
    //         <StudentCard
    //           key={student._id}
    //           student={student}
    //           onEdit={handleEdit}
    //           onDelete={handleDeleteClick}
    //         />
    //       ))}
    //     </div>
    //   )}

    //   {/* Modals */}
    //   <StudentFormModal
    //     isOpen={formModalOpen}
    //     onClose={() => setFormModalOpen(false)}
    //     onSubmit={handleFormSubmit}
    //     initialData={selectedStudent}
    //   />
    //   <DeleteConfirmModal
    //     isOpen={deleteModalOpen}
    //     onCancel={() => setDeleteModalOpen(false)}
    //     onConfirm={handleDeleteConfirm}
    //   />
    // </div>

    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a2b4c] text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8">School Admin</h2>
        <nav className="space-y-4">
          <a href="#" className="block hover:text-[#4c8bf5]">
            Dashboard
          </a>
          <a href="#" className="block hover:text-[#4c8bf5]">
            Students
          </a>
          <a href="#" className="block hover:text-[#4c8bf5]">
            Teachers
          </a>
          <a href="#" className="block hover:text-[#4c8bf5]">
            Reports
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gradient-to-br from-blue-100 to-purple-200">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#1a2b4c]">Dashboard</h1>
          <div className="flex gap-4">
            <button
              onClick={handleAddClick}
              className="bg-[#4c8bf5] hover:bg-[#3b73cc] text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md"
            >
              <Plus size={18} /> Add Student
            </button>
            <button
              onClick={handleLogout}
              className="bg-[#f54c61] hover:bg-[#d63d50] text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
            <div className="bg-[#4c8bf5] p-3 rounded-full text-white">
              <Users size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Students</h3>
              <p className="text-gray-500">1,245</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
            <div className="bg-[#f5b14c] p-3 rounded-full text-white">
              <Book size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Teachers</h3>
              <p className="text-gray-500">54</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
            <div className="bg-[#f54c61] p-3 rounded-full text-white">
              <Users size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Parents</h3>
              <p className="text-gray-500">1,020</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
            <div className="bg-green-500 p-3 rounded-full text-white">
              <DollarSign size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Earnings</h3>
              <p className="text-gray-500">$12,450</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          {loading ? (
            <p>Loading students...</p>
          ) : (
            <table className="w-full border rounded-lg overflow-hidden">
              <thead className="bg-[#f4f6f9]">
                <tr>
                  <th className="border p-2 text-left text-[#1a2b4c]">
                    Username
                  </th>
                  <th className="border p-2 text-left text-[#1a2b4c]">Email</th>
                  <th className="border p-2 text-left text-[#1a2b4c]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id} className="hover:bg-gray-50">
                    <td className="border p-2">{student.username}</td>
                    <td className="border p-2">{student.email}</td>
                    <td className="border p-2 flex gap-2">
                      <button
                        onClick={() => handleEdit(student)}
                        className="bg-[#234b9b] hover:bg-[#1a2b4c] text-white px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(student._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <StudentFormModal
            isOpen={formModalOpen}
            onClose={() => setFormModalOpen(false)}
            onSubmit={handleFormSubmit}
            initialData={selectedStudent}
          />
          <DeleteConfirmModal
            isOpen={deleteModalOpen}
            onCancel={() => setDeleteModalOpen(false)}
            onConfirm={handleDeleteConfirm}
          />
        </div>
      </div>
    </div>
  );
}
