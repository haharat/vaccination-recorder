require('dotenv').config()

const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const connectDB = require('./config/db')
const path = require('path')
const userRouter = require('./routes/user')
const recordRouter = require('./routes/record')

const app = express()

connectDB()

app.use(cors())

app.use(express.json())

app.use("/api/users", userRouter) 
app.use("/api/records", recordRouter)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

app.use(fileUpload());
// Upload Endpoint
app.post('/upload', (req, res) => {
    if (req.files === null) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
  
    const file = req.files.file;
  
    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
  
      res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    });
  });

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in port ${PORT}`))
