import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { getRepository } from "typeorm";
import { User } from "../entities/User.entity";
import envData from "../common/config";

export const validationMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    if (req.path == '/doc' || req.path == '/login' || req.path === "/" ) {
        next(); 
    } else {
        const authHeaders = req.headers.authorization
        if (authHeaders === undefined || !authHeaders.includes("Bearer")) {
            res.status(401).send({ error: "not authorized" }); 
        } else {
            const sessionToken = authHeaders.split(' ')[1];        
            if (!sessionToken) {
                res.status(401).send({ auth: false, message: "No token provided." });
            } else {
                jwt.verify(sessionToken, envData.JWT_SECRET_KEY as string, async (_err, decoded) => {    
                    console.log(decoded)          
                    if (decoded) {        
                        const userRepositary = getRepository(User)
                        const user = await userRepositary.findOne({ where: { id: decoded["id"] } })
                        if (user) {
                            req.body.login = user.name;
                            console.log(`user: ${user}`)
                            next()
                        } else {
                            res.status(401).send({ error: "not authorized" });
                        }
                    } else {
                        res.status(401).send({ error: "not authorized" })
                    }
                });
        }
        
        }
    }
}