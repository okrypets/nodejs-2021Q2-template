import {Request, Response, NextFunction} from 'express';
import express = require('express');
import userRepo from "../users/user.repository";
import { getHashPassword } from "../../helpers/hashHelpers";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import envData from "../../common/config";

const router = express.Router();

router.route('/').post(async (req: Request, res: Response, next: NextFunction) => {
  try {
        const { login, password } = req.body;
        const user = await userRepo.getByLogin(login);
        console.log(user)
        const bodyPasswordHash = await getHashPassword(password);
        if (user) {
            bcrypt.compare(password, bodyPasswordHash, (_err, matches) => {
                console.log(matches)
                if (matches) {
                    const token = jwt.sign({ id: user.id, login }, envData.JWT_SECRET_KEY as string, { expiresIn: 60 * 60 * 24 });
                    res.json({token: token
                    });
                } else {
                    res.status(502).send({ error: "Passwords do not match." })
                }
            });
        } else {
            res.status(404).send({ error: "No such User in DB." })
        }
    
  } catch (error) {
    next(error)
  }    
});

export default router