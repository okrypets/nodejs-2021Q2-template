import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { getRepository } from "typeorm";
import { User } from "../entities/User.entity";

// export type VerifyErrors =
//     | JsonWebTokenError
//     | NotBeforeError
//     | TokenExpiredError;

export const validationMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    if (req.path == '/doc' || req.path == '/auth' ) {
        next();   // allowing options as a method for request
    } else {
        const authHeaders = req.headers.authorization
        if (authHeaders === undefined || !authHeaders.includes("Baurer")) {
            res.status(403).send({ error: "not authorized" }); 
        } else {
            const sessionToken = authHeaders.split(' ')[1];        
            if (!sessionToken) {
                res.status(403).send({ auth: false, message: "No token provided." });
            } else {
                jwt.verify(sessionToken, 'lets_play_sum_games_man', async (_err, decoded) => {              
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
                        res.status(400).send({ error: "not authorized" })
                    }
                });
        }
        
        }
    }
}