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