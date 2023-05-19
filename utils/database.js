import mongoose from "mongoose";

//this variable to track the connection
let isConnected = false;

export const connectionToDB = async () => {
    //creating a connection to db
    //first setting up the mongoose "strictQuery" to true
    // if we don't do this, we will get warnings in the console
    mongoose.set("strictQuery", true)

    //check if we're connected or not
    if (isConnected) {
        console.log("MongoDB already connected");
        //stop the function
        return;
    }
    //if we are not connected, we open up try-catch
    //to connect, it will need mongoDB uri and options object
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            userUnifiedTopology: true
        })
        //setting it true if we're connected 
        isConnected = true;
    }
    catch (error) {
        console.log(error);
    }
}
//https://cloud.mongodb.com/v2/6465d0094a3d6c0854dc0881#/clusters?fastPoll=true