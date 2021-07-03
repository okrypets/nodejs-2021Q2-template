import config from "../ormconfig"
import { 
    getConnection, 
    createConnection } from "typeorm";

export const tryDBConnect = async (): Promise<void> => {
try {
    await createConnection(config)
    const connection = getConnection();
    if (!connection.isConnected) await connection.connect();
    console.log("Database connection established")
} catch (error) {
    console.error("tryDBConnect failed",error)
}
}