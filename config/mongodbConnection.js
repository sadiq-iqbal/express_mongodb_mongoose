const mongoose = require("mongoose");

const mongodbConnection = async (dbOrigin) => {
    try {

        return await mongoose.connect(dbOrigin);
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = mongodbConnection;