export interface Todo {
  _id: string;
  userId: string;
  title: string;
  description: string;
  status: TodoStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type TodoStatus = "pending" | "in-progress" | "completed";
