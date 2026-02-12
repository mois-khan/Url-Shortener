const express = require("express");
const mongoose = require("mongoose");
const router = require("Router");
const urlModel = require("./model/urlSchema");
const shortid = require('shortid');
const cors = require('cors');

mongoose.connect("mongodb://127.0.0.1:27017/url-Shortener")
.then(() => console.log("MongoDb connected"));

const app = express();
const PORT= 8001;

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json())

app.get("/", async (req, res) => {
    const urlData = await urlModel.find()
    res.send(urlData)
})

app.post("/short-url", async(req, res) => {
    const inp = req.body;
    inp.shortId = shortid.generate();
    
    const newUrl = new urlModel(inp);

    const saveUrlData = await newUrl.save()
    res.status(201).json(saveUrlData)

})

app.get("/:id", async(req, res) => {
    const id = req.params.id;
    const document = await urlModel.find({shortId: id})
    const redirectUrl = document[0].redirectUrl
    res.redirect(`https://${redirectUrl}`)
    console.log(document[0].redirectUrl)
})


app.listen(PORT, ()=> console.log(`Server started at PORT: ${PORT}`))
