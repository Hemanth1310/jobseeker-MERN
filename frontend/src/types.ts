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

export type JobPostings = {
    title: string;
    description: string;
    companyName: string;
    location: string;
    jobType: "Fulltime" | "Internship" | "Freelance";
    experience: "Experienced" | "Intermediate" | "Begginer";
    category: "Software" | "Design" | "Sales" | "Marketing" | "Finance";
    salary: number | null;
}