export type toggeler = "login"|"register"
export type Role = "CANDIDATE" | "EMPLOYER"

export type User= {
    email: string;
    id: string;
    firstName: string;
    lastName: string;
    role: Role;
    createdAt: Date;
}

export type JobPosts = {
    title: string;
    description: string;
    companyName: string;
    location: string;
    jobType: "Fulltime" | "Internship" | "Freelance";
    experience: "Experienced" | "Intermediate" | "Begginer";
    category: "Software" | "Design" | "Sales" | "Marketing" | "Finance";
    salary: number | null;
    isActive: boolean,
    id:string
}

export interface JobFormState {
  title: string;
  description: string;
  companyName: string;
  location: string;
  jobType: string;      
  experience: string;   
  category: string;     
  salary: string;       
}

export interface JobFormErrors extends JobFormState{
    apiResponse:string;
}