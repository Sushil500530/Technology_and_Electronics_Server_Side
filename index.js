const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true
  }));
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
        const technologyCollection = client.db('technologyDB').collection('technology');
        const userCollection = client.db('technologyDB').collection('users');
        const categoryCollection = client.db('technologyDB').collection('category')
        const cartCollection = client.db('technologyDB').collection('myCarts');
        const gpsCollection = client.db('technologyDB').collection('gps');
        const communicationCollection = client.db('technologyDB').collection('communications');

        app.get('/technology', async (req, res) => {
            const result = await technologyCollection.find().toArray();
            res.send(result)
        })

        app.get('/technology/:category', async (req, res) => {
            const category = req.params.category;
            const query = { category: category };
            const result = await categoryCollection.find(query).toArray();
            res.send(result);
        })
        // find one 
        app.get('/category/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await categoryCollection.find(query).toArray();
            res.send(result);
        })
        // find unique id 
        // app.get('/technology/:id', async (req, res) => {
        //     const id = req.params.id;
        //     console.log('delete id is', id);
        //     const query = { _id: new ObjectId(id) }
        //     const result = await cartCollection.deleteOne(query);
        //     res.send(result)
        // })

       
        // gps related api 
        app.get('/gps', async (req, res) => {
            const result = await gpsCollection.find().toArray()
            res.send(result)
        })
        app.get('/gps/:id', async(req,res)=> {
            const id = req.params.id;
            const filter = {_id: new ObjectId(id)};
            const result = await gpsCollection.findOne(filter);
            res.send(result);
        })
        // gps related api 
        app.get('/communications', async (req, res) => {
            const result = await communicationCollection.find().toArray()
            res.send(result)
        })
        app.get('/communication/:id', async(req,res)=> {
            const id = req.params.id;
            const filter = {_id: new ObjectId(id)};
            const result = await communicationCollection.findOne(filter);
            res.send(result);
        })
        //  my cart api 
        app.post('/carts', async (req, res) => {
            const addCart = req.body;
            console.log('add to', addCart);
            const result = await cartCollection.insertOne(addCart);
            res.send(result)
        })

        // get cart all data 
        app.get('/carts', async (req, res) => {
            const findCart = cartCollection.find();
            const result = await findCart.toArray();
            res.send(result)
        })
        app.get('/cart/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await cartCollection.find(query).toArray();
            res.send(result);
        })

        app.get('/user', async (req, res) => {
            const findCart = userCollection.find();
            const result = await findCart.toArray();
            res.send(result)
        })
        // updated cart 
        app.put('/updated-cart/:id', async (req, res) => {
            const updatedCart = req.body;
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const coffee = {
                $set: {
                    ...updatedCart
                }
            }
            const result = await cartCollection.updateOne(filter, coffee, options);
            res.send(result)
        })

        // delete cart 
        app.delete('/cart-delete/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await cartCollection.deleteOne(query);
            res.send(result)
        })
        // get unique id 
        app.get('/cart/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await cartCollection.findOne(query);
            res.send(result)
        })

        // updated cart 
        app.put('/updated/:id', async (req, res) => {
            const updatedProduct = req.body;
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const coffee = {
                $set: {
                    ...updatedProduct
                }
            }
            const result = await categoryCollection.updateOne(filter, coffee, options);
            res.send(result)
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