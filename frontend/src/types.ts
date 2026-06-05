export type toggeler = "login"|"register"
export type Role = "CANDIDATE" | "EMPLOYER"
export type JobType= "Fulltime" | "Internship" | "Freelance"
export type Experience="Experienced" | "Intermediate" | "Begginer"
export type Category= "Software" | "Design" | "Sales" | "Marketing" | "Finance"


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

export type Status = "PENDING" | "REVIEWING" | "ACCEPTED" | " REJECTED"

export type candidateApplications = {
    job: {
        id: string;
        createdAt: Date;
        title: string;
        description: string;
        companyName: string;
        location: string;
        jobType: JobType;
        experience: Experience;
        category: Category;
        isActive: boolean;
        salary: number | null;
        employerId: string;
    };
} & {
    id: string;
    jobId: string;
    candidateId: string;
    coverLetter: string;
    EarliestStartDate: Date;
    countryOfResidence: string;
    ValidWorkPermit: boolean;
    resumePath: string;
    status: Status;
    feedback: string;
    appliedAt: Date;
}