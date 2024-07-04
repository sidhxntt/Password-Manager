import prisma from "./prisma/prisma.js";

const connectToDatabase = async () => {
    try {
        await prisma.$connect();
        console.log("Connected to database");
    } catch (error) {
        console.error(error.message);
    }
}

export default connectToDatabase;
