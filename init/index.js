const mongoose = require("mongoose");
const initData = require("./data.js");
const listing = require("../models/listing.js");

main()
.then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/travora');
}

const initDb =  async () => {
    await listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "6aa67415a8fcd10520f396de" ,
         geometry: obj.geometry || {
        type:"Point",
        coordinates: [77.2090, 28.6139]
    }
    }));
    
   
    await listing.insertMany( initData.data);
    console.log("data was initialized");
}

initDb();