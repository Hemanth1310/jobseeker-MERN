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