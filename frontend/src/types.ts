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