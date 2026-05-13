import z from 'zod'

export const jobType= ["Fulltime" , "Internship" , "Freelance"] as const
export const experience=[ "Experienced" , "Intermediate" , "Begginer"] as const
export const category= ["Software" , "Design" , "Sales" , "Marketing" , "Finance"] as const

export const ROLE_VALUES = ['CANDIDATE', 'EMPLOYER'] as const
export const roleSchema = z.enum(ROLE_VALUES)
const jobTypeSchema = z.enum(jobType, {
    message: "Please select at least one option"
});

const experienceSchema = z.enum(experience, {
    message: "Please select at least one option"
});

const categorySchema = z.enum(category, {
    message: "Please select at least one option"
});
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
    salary:  z.preprocess(
            (value) => {
                if (value === '' || value === null || value === undefined) {
                    return null
                }
                return Number(value)
            },
            z.number().int().nonnegative().nullable()
        ).default(null),
})

export type jobDataType = z.infer<typeof jobPostingSchema>