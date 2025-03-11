import mongoose from "mongoose";

const connectDB = async () => {
    try {

        const connectedDB = await mongoose.connect(process.env.MONGO_CLOUD_URL as string);

        if (connectedDB) {
            console.log('connected to mongo cloud database');
        }

    } catch (error) {
        console.log("error connecting the database", error)
        await mongoose.connection.close();
        process.exit(1);
    }
}


export default connectDB;