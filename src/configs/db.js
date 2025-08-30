const mongoose = require("mongoose");

async function dbConnect(){
    try {
        const db_connection_url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/TestDB`;
        // console.log("db_connection_url",db_connection_url);
        await mongoose.connect(db_connection_url);
        console.log('✅ MongoDB connected');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
}

module.exports = {
    dbConnect
}