export type toggeler = "login"|"register"
export type Role = "CANDIDATE" | "EMPLOYER"



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