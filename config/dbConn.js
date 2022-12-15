import mongoose from "mongoose";
mongoose.set('strictQuery', false);

const connectDB = () => {
    try {
        mongoose.connect(process.env.DATABASE_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;