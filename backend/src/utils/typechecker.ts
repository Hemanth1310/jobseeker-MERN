import z from 'zod'
import { Role,JobType,Experience,Category  } from '../../generated/prisma/enums.js';


const roleSchema = z.enum(Role)
const jobTypeSchema = z.enum(JobType,{
    message: "Please select at least one option"
})
const experienceSchema = z.enum(Experience,{
    message: "Please select at least one option"
})
const categorySchema = z.enum(Category,{
    message: "Please select at least one option"
})

const emailRules = z.string().email("Invalid email format").trim().toLowerCase()

// Define password rules ONCE so they are identical everywhere
const passwordRules = z.string()
    .min(8, "Please enter at least 8 characters")
    .regex(/[!@#$%^&*]/, "Please enter atleast one special charecter e.g. !@#$%^&*");


export const registerSchema = z.object({
    email: emailRules,
    password: passwordRules,
    firstName: z.string().min(1,'Firstname cannot be empty'),
    lastName: z.string().min(1,'Lastname cannot be empty'),
    role: roleSchema
})

export const loginSchema = z.object({
    email: emailRules,
    password: passwordRules
})

export const jobPostingSchema = z.object({
    title: z.string().min(1,'Title cannot be empty'),
    description: z.string().min(1,'Description cannot be empty'),
    companyName: z.string().min(1,'CompanyName cannot be empty'),
    location: z.string().min(1,'Location cannot be empty'),
    jobType: jobTypeSchema,
    experience: experienceSchema,
    category: categorySchema,
    salary: z.number().int().nonnegative().nullable().optional().default(null),
})
