type Role = "CANDIDATE" | "EMPLOYER";
export type decodedTokenPayload = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
    createdAt: Date;
};
export {};
//# sourceMappingURL=types.d.ts.map