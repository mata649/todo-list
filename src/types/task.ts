export interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  registeredDate: Date;
  completedDate: Date;
}

export interface CreateTaskDTO extends Pick<Task, "title" | "description"> {}
