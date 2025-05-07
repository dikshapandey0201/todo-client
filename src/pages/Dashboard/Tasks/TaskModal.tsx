import React, { useState, useEffect } from "react";

export type PropsTask = {
  id?: string;
  title: string;
  description?: string;
  dueDate?: Date | string;
  status?: "Pending" | "In Progress" | "Completed";
  user?: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: PropsTask) => void;
  initialData?: PropsTask | null;
};

const statuses: PropsTask["status"][] = ["Pending", "In Progress", "Completed"];

export default function TaskModal({ isOpen, onClose, onSave, initialData }: Props) {
  const [form, setForm] = useState<PropsTask>({
    title: "",
    description: "",
    dueDate: "",
    status: "Pending",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        dueDate: initialData.dueDate
          ? new Date(initialData.dueDate).toISOString().split("T")[0]
          : "",
        status: initialData.status || "Pending",
      });
    } else {
      setForm({
        title: "",
        description: "",
        dueDate: "",
        status: "Pending",
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {

    if (!form.title.trim()) {
      alert("Title is required");
      return;
    }
    if (!form.dueDate) {
      alert("Due date is required");
      return;
    }
    if (!form.status) {
      alert("Status is required");
      return;
    }
   
    if (!form.description) {
      alert("Description is required");
      return;
    }

      onSave(form);
      onClose();
    
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md md:rounded-xl shadow-lg p-5 md:p-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">
          {initialData ? "Edit Task" : "Add Task"}
        </h2>

        <div className="space-y-4">
          <input
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full px-3 py-2 rounded border dark:bg-gray-800 dark:text-white"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full px-3 py-2 rounded border dark:bg-gray-800 dark:text-white"
          />
          <input
            name="dueDate"
            type="date"
            value={form.dueDate as string}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border dark:bg-gray-800 dark:text-white"
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border dark:bg-gray-800 dark:text-white"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
