import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { useAddTaskMutation, useDeleteTaskMutation, useGetTasksQuery, useUpdateTaskMutation, type CreateTaskRequest } from "../../../redux/slices/TaskSlice";
import { useEffect, useState } from "react";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import TaskModal from "./TaskModal";
import type { PropsTask } from "./TaskModal";

type Status = "Pending"| "In Progress"| "Completed";

const statuses: Status[] = ["Pending", "In Progress", "Completed"];
interface Task {

    id: string;
    title: string;
    description?: string;
    status?: "Pending" | "In Progress" | "Completed";
    dueDate?: Date ;
    user?: string;
    totalTasks?: number;
    
}
export default function DragAndDrop() {
    const userId = useSelector((state: RootState) => state.user.user?._id);
    const [page, setPage] = useState(1);
    const { data, isLoading } = useGetTasksQuery({ userId: userId || "", page });
    const [tasks, setTasks] = useState<Task[] | undefined>();
    const [draggingTask, setDraggingTask] = useState<Task | null>(null);
    const [updateTask] = useUpdateTaskMutation();
    const [deleteTask] = useDeleteTaskMutation();
    const [modalOpen, setModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<PropsTask | null>(null);
    const [addTask] = useAddTaskMutation();



    useEffect(() => {
        if (data) {
            setTasks(data?.tasks?.map((task: any) => ({
                id: task._id,
                title: task.title,
                description: task.description,
                status: task.status,
                dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
                user: task.user,

            })) || []);
        }
    }
        , [data]);


    const onDragStart = (task: Task) => {
        setDraggingTask(task);
      };

 
    const onDrop = async (newStatus: Status) => {
        if (draggingTask && draggingTask.status !== newStatus) {
          try {
            await updateTask({
              taskId: draggingTask.id,
                body: { status: newStatus },
            }).unwrap();
          } catch (error) {
            console.error('Failed to update task', error);
          }
        }
        setDraggingTask(null);
      };
    
   
        const handleDelete = async (taskId: string) => {
            try {
            await deleteTask(taskId).unwrap();
            } catch (error) {
            console.error('Failed to delete task', error);
            }
        };
        const handleSave = async (task: PropsTask) => {
            try {
              if (task.id) {
                
                await updateTask({
                  taskId: task.id,
                  body: { ...task, dueDate: task.dueDate instanceof Date ? task.dueDate.toISOString() : task.dueDate },
                }).unwrap();
              } else {
                
                const newTask: CreateTaskRequest = {
                    title: task.title,
                    description: task.description ?? "",
                    status: task.status,
                    user: userId!,
                    ...(task.dueDate ? { dueDate: new Date(task.dueDate).toISOString() } : {})
                  };
                  
                  await addTask(newTask).unwrap();
                  
                  
                  
              }
            } catch (err) {
              console.error("Error saving task:", err);
            }
          };
          

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (!tasks) {
        return <div>No tasks found</div>;
    }
    
    return (

        <div className="flex flex-col items-center bg-gray-100 dark:bg-gray-900 h-screen p-4">
            
            <div className="flex items-center justify-between w-full gap-2">
                <h1 className="text-md font-bold text-gray-800 dark:text-gray-200">Total Tasks : {data?.totalTasks}</h1>
                <button
                      onClick={() => {
                        setModalOpen(true);
                        setTaskToEdit(null);
                      }}
                    className="bg-white dark:bg-gray-700 text-green-900 dark:text-gray-200 px-4 h-8 rounded shadow-md"
                >
                    Add Task
                </button>
            </div>

       
            <div className="flex w-full gap-4 p-4 flex-col sm:overflow-y-hidden sm:flex-row overflow-x-auto sm:overflow-x-hidden">

                {statuses.map((status) => (
                    <div 
                        key={status} 
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => onDrop(status)}
                        className="flex-shrink-0 sm:flex-1 min-w-[100vw] sm:min-w-0 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">{status}</h2>
                        <div className="flex flex-row sm:flex-col gap-2  h-[25vh] sm:h-[80vh] overflow-x-auto sm:overflow-y-auto">
                            {tasks?.filter((task) => task.status === status)
                                .map((task) => (
                                    <div 
                                        key={task.id} 
                                        draggable
                                        onDragStart={() => onDragStart(task)}
                                        className="bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 p-3 rounded shadow cursor-move min-w-[300px] h-full sm:h-auto sm:w-full flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <span
                                                    className={`text-sm font-bold border-b-2 ${task.status === "Pending"
                                                            ? "border-indigo-600"
                                                            : task.status === "In Progress"
                                                                ? "border-orange-600"
                                                                : "border-green-600"
                                                        }`}
                                                >
                                                    {task.title}
                                                </span>
                                                <span className="text-xs text-gray-500">{task.dueDate?.toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-sm">{task.description}</p>
                                        </div>
                                        <div className="flex justify-end gap-2 mt-2">
                                            <button
                                                  onClick={() => {
                                                    setModalOpen(true);
                                                    setTaskToEdit(task);
                                                  }}
                                                className="text-blue-500 hover:underline text-sm"
                                            >
                                                update
                                            </button>
                                            <button
                                                  onClick={() => handleDelete(task.id)}
                                                className="text-red-500 hover:underline text-sm"
                                            >
                                                delete
                                            </button>
                                        </div>

                                    </div>
                                ))}
                            {tasks?.filter((task) => task.status === status).length === 0 && (
                                <div className="flex items-center justify-center w-full h-full text-gray-500 dark:text-gray-400">
                                    No tasks available
                                </div>
                            )}


                                        
                        </div>
                    </div>
                ))}
            </div>


     
            {(data?.totalPages ?? 0) > 1 && (
                <div className="flex justify-center items-center gap-2 my-4">
                    <button
                        onClick={() => setPage((prev) => prev - 1)}
                        
                        disabled={page === 1}>
                        <span className="material-symbols-outlined">
                            <ArrowCircleLeftIcon className="dark:text-white" fontSize="large"/>
                        </span>
                    </button>
                    <span className="text-lg font-bold dark:text-white">Page {page} of {data?.totalPages}</span>
                    <button onClick={() => setPage((prev) => prev + 1)} disabled={page === data?.totalPages}>
                        <span className="material-symbols-outlined">
                            <ArrowCircleRightIcon className="dark:text-white" fontSize="large"/>
                        </span>
                    </button>
                </div>
            )}

            
            {modalOpen && (
                <TaskModal
                    initialData={taskToEdit || null }
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onSave={handleSave}
                />  
            )}


        </div>
    )
}
