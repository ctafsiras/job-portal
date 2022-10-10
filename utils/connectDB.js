const mongoose = require('mongoose');

exports.connectDB = () => {
    main().then(() => console.log("MongoDB Connected")).catch(err => console.log(err));
    async function main() {
        await mongoose.connect(process.env.MONGODB_URI);

    }

}
