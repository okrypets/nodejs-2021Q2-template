import config from "../ormconfig"
import { getConnection, createConnection } from "typeorm";

const connectToDB = async () => {

try {
    await createConnection(config)
    const connection = getConnection();
    if (!connection.isConnected) await connection.connect();
    console.log("Database connection established")
} catch (error) {
    console.error("getConnection failed", error)
}

}

export const tryDBConnect = async (callback: () => void): Promise<void> => {
try {
    await connectToDB()
    callback()
} catch (error) {
    console.error("tryDBConnect failed",error)
}
}