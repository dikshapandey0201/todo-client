import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the types for the task data
interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "Pending" | "In Progress" | "Completed";
  user: string;
  totalPages?: number;
  totalTasks?: number;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  dueDate?: string;
  status?: "Pending" | "In Progress" | "Completed";
  user?: string;
}

interface UpdateTaskRequest {
    title?: string;
    description?: string;
    dueDate?: string;
    status?: "Pending" | "In Progress" | "Completed";
}

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://todo-list-server-6rzb.onrender.com/api/tasks" }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getTasks: builder.query<{totalTasks:number,totalPages: number; tasks: Task[] 
        }, { userId: string; page?: number }>({
        query: (body) => ({
          url: `/get-tasks${body.page ? `?page=${body.page}` : ""}`,
          method: "POST",
          body,
        }),
        providesTags: ["Tasks"],
      }),
      
    
    addTask: builder.mutation<Task, CreateTaskRequest>({
      query: (body) => ({
        url: "/create-task",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tasks"],
    }),
    
    updateTask: builder.mutation<Task, { taskId: string; body: UpdateTaskRequest }>({
      query: ({ taskId, body }) => ({
        url: `/update-task/${taskId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Tasks"],
    }),
    
    deleteTask: builder.mutation<void, string>({
      query: (taskId) => ({
        url: `/delete-task/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
    useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;

export default tasksApi;
