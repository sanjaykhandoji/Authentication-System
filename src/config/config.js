import dotenv from "dotenv";

dotenv.config();

if(!process.env.MONGO_URI){
    throw new Error("MONGO_URI is not defined in the environmental variable");
}

if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET is not defined in the environmental variable")
}


const config = {
    MONGO_URI : process.env.MONGO_URI
}

export default config;