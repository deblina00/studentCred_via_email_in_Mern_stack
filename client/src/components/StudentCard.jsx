export default function StudentCard({ student, onEdit, onDelete }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 border flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-bold">{student.username}</h3>
        <p className="text-gray-600">{student.email}</p>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onEdit(student)}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(student._id)}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
