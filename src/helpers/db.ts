import { config } from "../common/ormconfig"
import { getConnection, createConnection } from "typeorm"

const connectToDB = async () => {
// let connection;
try {
    await createConnection(config)
    const connection = getConnection();
    if (!connection.isConnected) await connection.connect()
    console.log("Database connection established")
} catch (error) {
    console.error("getConnection failed", error)
}
// try {
//     if (connection) {
//         if (!connection.isConnected) await connection.connect()
//     } else {
//         await createConnection(config)
//     }
//     console.log("well done")
// } catch (error) {
//     console.error("connection failed", error)
// }

}

export const tryDBConnect = async (callback: () => void): Promise<void> => {
try {
    await connectToDB()
    callback()
} catch (error) {
    console.error("tryDBConnect failed",error)
}
}