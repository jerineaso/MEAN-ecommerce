const mongoose = require('mongoose')
const productModel = require('../models/product.model')
const dbConnet = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log('MongoDb Connected')
    }catch{
        console.log('MongoDb Disconnected')
        process.exit(1)
    }
}

// async function migrate() {
//   try {
//     const result = await productModel.updateMany(
//       { }, // match all documents
//       { 
//         $set: { 
//           discount: 0,
//         }
//       }
//     );

//     console.log(`✅ Migration complete. Modified ${result.modifiedCount} documents.`);
//   } catch (err) {
//     console.error("❌ Migration failed:", err);
//   } finally {
//     mongoose.disconnect();
//   }
// }

module.exports = {
    dbConnet, 
    // migrate
}