const express = require('express')
const cors = require('cors');
const { connectDB } = require('./utils/connectDB');
const app = express()
require('dotenv').config();
const port = process.env.PORT || 3000;
const userRouter = require('./routes/user.route');
const jobRouter = require('./routes/job.route');

app.use(express.json());
app.use(cors());

connectDB();

app.use('/user', userRouter)
app.use('/jobs', jobRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})


// MONGODB_URI=mongodb+srv://db:db@cluster0.dbyzuki.mongodb.net/JobPortal
// JWT_SECRET=9ca60ddd3dea30eb61567d2e591eafada3f83866823e9c12cb34c996fec088ea8d6029d706e0994b97ab58a3f5bd20386052e282d36015ef0d10c702c53c6af4