export interface TodoPayload {
    title: string;
    status: string | null;
    dueDate: string; 
    description: string;
    assignedUser: number | null; 
    priority: string | null;
    tags: string[]; 
  }
  
  export interface User {
    id: string; 
    name: string;
    email: string;
  }