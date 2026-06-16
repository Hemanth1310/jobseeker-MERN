import type { Request, Response, NextFunction } from "express";
import type { decodedTokenPayload } from "../types.js";
declare global {
    namespace Express {
        interface Request {
            userData?: decodedTokenPayload;
        }
    }
}
declare const authenticationToken: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default authenticationToken;
//# sourceMappingURL=authMiddleware.d.ts.map