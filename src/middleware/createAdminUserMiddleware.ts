import { Request, Response, NextFunction } from 'express';
import { v4 } from "uuid";
import userRepo from "../resources/users/user.repository";

export const createAdminUserMiddleware = async (_req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const adminUser = await userRepo.getByLogin("admin");
    if (!adminUser) {
        await userRepo.create({id: v4(), name: "admin", login: "admin", password: "admin"});
    }
    next()
}