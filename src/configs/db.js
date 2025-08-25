const mongoose = require("mongoose");

async function dbConnect(){
    try {
        const URL = "mongodb+srv://wakodikarprashant:Test123@cluster0.swgomhv.mongodb.net/TestDB"
        await mongoose.connect(URL);
        console.log('✅ MongoDB connected');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
}

module.exports = {
    dbConnect
}