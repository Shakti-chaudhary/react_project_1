// Task Type Definitions
export interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
  createdAt: string;
  updatedAt: string;
}

export interface TaskState {
  tasks: Task[];
}
