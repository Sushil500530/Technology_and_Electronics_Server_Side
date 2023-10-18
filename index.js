const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

const data = [
    {
        id: 1, thumbnail: "https://i.ibb.co/WKXDWVx/zana-latif-gt-X5-DIIHGq-E-unsplash.jpg", category: 'apple',
    },
    { id: 2, thumbnail: "https://i.ibb.co/v4Lws0j/anh-nhat-yqclo-Mb3-Abw-unsplash.jpg", category: 'samsung' },
    { id: 3, thumbnail: "https://i.ibb.co/DgH1Nrx/alwin-thomas-Xzm-SEd-Wu-Ck-unsplash.jpg", category: 'sony' },
    { id: 4, thumbnail: "https://i.ibb.co/hF50CCv/pawel-czerwinski-fp-ZZEV0u-Qw-A-unsplash.jpg", category: 'google' },
    { id: 5, thumbnail: "https://i.ibb.co/bm9n34y/slejven-djurakovic-0u-Xzo-Ez-YZ4-I-unsplash.jpg", category: 'intel' }
]


const communication = [{
    id: 1, thumbnail: "https://i.ibb.co/vXQm7bY/Adobe-Stock-61917225945-Preview.jpg", name: "smart touch", description: "Communication is usually understood as the transmission of information. Its precise definition is disputed and there are disagreements about whether unintentional", category: "communication", price: 280,
}, {
    id: 2, thumbnail: "https://i.ibb.co/XpNwjVN/Adobe-Stock-629775658-Preview.jpg", name: "community", description: "community is usually understood as the transmission of information. Its precise definition is disputed and there are disagreements about whether unintentional", category: "communication", price: 320,
}, {
    id: 3, thumbnail: "https://i.ibb.co/mCmd3t0/Adobe-Stock-628395923-Preview-1.jpg", name: "research", description: "Communication is usually understood as the transmission of information. Its precise definition is disputed and there are disagreements about whether unintentional", category: "communication", price: 280,
}, {
    id: 4, thumbnail: "https://i.ibb.co/gtMyJ0v/Adobe-Stock-619172259-Preview-1.jpg", name: "instruction communication", description: "Communication is usually understood as the transmission of information. Its precise definition is disputed and there are disagreements about whether unintentional", category: "communication", price: 400,
}, {
    id: 5, thumbnail: "https://i.ibb.co/tcPJnB2/Adobe-Stock-610728942-Preview.jpg", name: "digital tech", description: "Communication is usually understood as the transmission of information. Its precise definition is disputed and there are disagreements about whether unintentional", category: "communication", price: 480,
}, {
    id: 6, thumbnail: "https://i.ibb.co/0JwHbng/Adobe-Stock-593424439-Preview.jpg", name: "community", description: "Communication is usually understood as the transmission of information. Its precise definition is disputed and there are disagreements about whether unintentional", category: "communication", price: 250,
}]

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ruakr2a.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        await client.connect();
        const technologyCollection = client.db('technologyDB').collection('technology')
        const userCollection = client.db('technologyDB').collection('users')


        app.get('/technology', (req, res) => {
            res.send(data)
        })

        app.get('/communication', (req, res) => {
            res.send(communication)
        })









        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send("CRUD is Running")
})
app.listen(port, () => {
    console.log(`CRUD is Running on port : ${port}`);
})