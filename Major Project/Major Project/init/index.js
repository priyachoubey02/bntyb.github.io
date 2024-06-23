const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const mongo_URL = "mongodb://127.0.0.1:27017/majorproject";

main()
.then(() =>{
    console.log("connection successful");
})
.catch((err) =>{
    console.log(err);
});
async function main(){
    await mongoose.connect(mongo_URL);
}

const initDB = async() =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "659bdad4cb5e0d6d81fda0e9"}));
    await Listing.insertMany(initData.data);
    console.log("Data was initalized successfully");
};
initDB();