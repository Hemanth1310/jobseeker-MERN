import z from 'zod';
export declare const registerSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    role: z.ZodEnum<{
        readonly CANDIDATE: "CANDIDATE";
        readonly EMPLOYER: "EMPLOYER";
    }>;
}, z.z.core.$strip>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.z.core.$strip>;
export declare const jobPostingSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    companyName: z.ZodString;
    location: z.ZodString;
    jobType: z.ZodEnum<{
        readonly Fulltime: "Fulltime";
        readonly Internship: "Internship";
        readonly Freelance: "Freelance";
    }>;
    experience: z.ZodEnum<{
        readonly Experienced: "Experienced";
        readonly Intermediate: "Intermediate";
        readonly Begginer: "Begginer";
    }>;
    category: z.ZodEnum<{
        readonly Software: "Software";
        readonly Design: "Design";
        readonly Sales: "Sales";
        readonly Marketing: "Marketing";
        readonly Finance: "Finance";
    }>;
    salary: z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodNumber>>>;
}, z.z.core.$strip>;
export declare const applicationSchema: z.ZodObject<{
    coverLetter: z.ZodString;
    countryOfResidence: z.ZodString;
    EarliestStartDate: z.z.ZodCoercedDate<unknown>;
    ValidWorkPermit: z.ZodPreprocess<z.ZodBoolean>;
}, z.z.core.$strip>;
//# sourceMappingURL=typechecker.d.ts.map