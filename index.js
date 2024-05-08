require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require('./model/Employee');
const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("Failed to connect to MongoDB", err));

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email })
    .then(user => {
        if (user) {
            if (user.password == password) {
                res.json("SUCCESS");
            } else {
                res.json("INCORRECT PASSWORD");
            }
        } else {
            res.json("NOT EXIST");
        }
    })
    .catch(err => res.json(err));
});

app.post('/register', (req, res) => {
     EmployeeModel.create(req.body)
     .then(employee => res.json(employee))
     .catch(err => res.json(err));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Service running on port ${PORT}`);
});
