import { v4 } from "uuid";
import { getRepository } from "typeorm"
import { getHashPassword } from "../helpers/hashHelpers";
import { User } from "../entities/User.entity"

export const createAdminUserMiddleware = async (): Promise<void> => {
    const userRepositary = getRepository(User);
    const adminUser = await userRepositary.findOne({where: { login: "admin" }})
    if (!adminUser) {
        const hashPassword = await getHashPassword("admin");
        const newUser = userRepositary.create({id: v4(), name: "admin", login: "admin", password: hashPassword});
        await userRepositary.save(newUser);
    }
}