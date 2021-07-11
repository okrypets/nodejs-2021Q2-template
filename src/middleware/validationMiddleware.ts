import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import envData from "../common/config";

export const validationMiddleware = (req: Request, res: Response): boolean => {
    if (req.path == '/doc' || req.path == '/login' || req.path === "/" ) {
        return true; 
    } else {
        const authHeaders = req.headers.authorization
        if (authHeaders) {
            const sessionToken = authHeaders.split(' ')[1];
            if (!sessionToken) {
                res.status(401).send({ error: "not authorized" }); 
                return false
            };
            jwt.verify(sessionToken, String(envData.JWT_SECRET_KEY));
            return true;
        }
        res.status(401).send({ error: "not authorized" })
        return false
    }
}