import mongoose from "mongoose";

export const connectDb = () => {
    mongoose.connect("mongodb://localhost:27017/UrlShortner").then(() => console.log("mongodb connected"));
}