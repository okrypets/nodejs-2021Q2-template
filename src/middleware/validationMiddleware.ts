import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { getRepository } from "typeorm";
import { User } from "../entities/User.entity";
import envData from "../common/config";

export const validationMiddleware = (req: Request, res: Response): boolean => {
    if (req.path == '/doc' || req.path == '/login' || req.path === "/" ) {
        return true; 
    } else {
        const authHeaders = req.headers.authorization
        if (authHeaders === undefined || !authHeaders.includes("Bearer")) {
            res.status(401).send({ error: "not authorized" }); 
            return false;
        } else {
            const sessionToken = authHeaders.split(' ')[1];        
            if (!sessionToken) {
                res.status(401).send({ auth: false, message: "No token provided." });
                return false;
            } else {
                jwt.verify(sessionToken, envData.JWT_SECRET_KEY as string, async (_err, decoded) => {            
                    if (decoded) {        
                        const userRepositary = getRepository(User)
                        const user = await userRepositary.findOne({ where: { id: decoded["id"] } })
                        if (user) {
                            return true
                        } else {
                            res.status(401).send({ error: "not authorized" });
                            return false;
                        }
                    } else {
                        res.status(401).send({ error: "not authorized" })
                        return false;
                    }
                });
        }
        
        }
        return false
    }
}