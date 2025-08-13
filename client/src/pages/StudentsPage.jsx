import { useEffect, useState } from "react";
import axios from "../api/axios";
import Sidebar from "../components/Sidebar";
import StudentCard from "../components/StudentCard";
import StudentFormModal from "../components/StudentFormModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

export default function StudentsPage() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // Load students
  const fetchStudents = () => {
    axios
      .get("/students")
      .then((res) => setStudents(res.data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load students");
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Add or update student
  const handleFormSubmit = async (form) => {
    try {
      if (selectedStudent) {
        await axios.put(`/students/${selectedStudent._id}`, form);
        toast.success("Student updated successfully!");
      } else {
        await axios.post("/students", form);
        toast.success("Student added successfully!");
      }
      setFormModalOpen(false);
      setSelectedStudent(null);
      fetchStudents();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save student");
    }
  };

  // Delete student
  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`/students/${deleteId}`);
      toast.success("Student deleted successfully!");
      setDeleteModalOpen(false);
      setDeleteId(null);
      fetchStudents();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete student");
    }
  };

  // Edit click
  const handleEdit = (student) => {
    setSelectedStudent(student);
    setFormModalOpen(true);
  };

  // Delete click
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  // Add student button
  const handleAddClick = () => {
    setSelectedStudent(null);
    setFormModalOpen(true);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.info("You have been logged out");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar onLogout={handleLogout} />

      <div className="flex-1 p-8 bg-gradient-to-br from-blue-100 to-purple-200">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#1a2b4c]">Students</h1>
          <button
            onClick={handleAddClick}
            className="bg-[#4c8bf5] hover:bg-[#3b73cc] text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md"
          >
            <Plus size={18} /> Add Student
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <StudentCard
              key={student._id}
              student={student}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <StudentFormModal
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedStudent}
      />

      {/* Delete Confirm Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
