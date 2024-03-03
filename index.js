const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

const brandName = [
    {
        "slider": [{
            "img1": "https://i.ibb.co/7QgTs1C/bagus-hernawan-v-Xml-V3fber-Q-unsplash.jpg",
            "img2": "https://i.ibb.co/wJs4qQR/zana-latif-gt-X5-DIIHGq-E-unsplash.jpg",
            "img3": "https://i.ibb.co/gzGBCt7/bagus-hernawan-v-Xml-V3fber-Q-unsplash.jpg"
        }],
        "thumbnail": "https://i.ibb.co/7QgTs1C/bagus-hernawan-v-Xml-V3fber-Q-unsplash.jpg",
        "title": "iphone 15",
        "description": "The iPhone 15 and iPhone 15 Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation iPhones",
        "category": "apple",
        "price": 20280
    },
    {

        "thumbnail": "https://i.ibb.co/wJs4qQR/zana-latif-gt-X5-DIIHGq-E-unsplash.jpg",
        "title": "iphone 16",
        "description": "The iPhone 16 and iPhone 15 Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation iPhones",
        "category": "apple",
        "price": 35800
    },
    {

        "thumbnail": "https://i.ibb.co/dJB2rCv/brandon-romanchuk-NOFy-Rm-SQf-UQ-unsplash.jpg",
        "title": "iphone 13",
        "description": "The iPhone 13 and iPhone 15 Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation iPhones",
        "category": "apple",
        "price": 22200
    },
    {

        "thumbnail": "https://i.ibb.co/y0L6VLP/thai-nguyen-X5-V7hb7-Cx-NY-unsplash.jpg",
        "title": "iphone 12",
        "description": "The iPhone 12 and iPhone 15 Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation iPhones",
        "category": "apple",
        "price": 12800
    },
    {

        "thumbnail": "https://i.ibb.co/HFvSKCb/theregisti-emz-Dj-EN-d-8-unsplash.jpg",
        "title": "iphone 15 pro",
        "description": "The iPhone 15 pro and iPhone 15 Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation iPhones",
        "category": "apple",
        "price": 40280
    },
    {
        "slider": [{
            "img1": "https://i.ibb.co/w07vQKx/zana-latif-5u-JMG9f-UAO0-unsplash.jpg",
            "img2": "https://i.ibb.co/gVGG3SL/anh-nhat-u-Cq-Ma-s-JDg-unsplash.jpg",
            "img3": "https://i.ibb.co/pjJnFkm/anh-nhat-yqclo-Mb3-Abw-unsplash.jpg"
        }],
        "thumbnail": "https://i.ibb.co/pjJnFkm/anh-nhat-yqclo-Mb3-Abw-unsplash.jpg",
        "title": "samsung s21+",
        "description": "The samsung and samsung Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation samsungs",
        "category": "samsung",
        "price": 20280
    },
    {

        "thumbnail": "https://i.ibb.co/gVGG3SL/anh-nhat-u-Cq-Ma-s-JDg-unsplash.jpg",
        "title": "samsung s22+",
        "description": "The samsung and samsung Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation samsungs",
        "category": "samsung",
        "price": 35800
    },
    {

        "thumbnail": "https://i.ibb.co/4TKkPNT/daniel-romero-f-Nq-ZZi5-M73-Y-unsplash.jpg",
        "title": "samsung A75",
        "description": "The samsung and samsung Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation samsungs",
        "category": "samsung",
        "price": 22200
    },
    {

        "thumbnail": "https://i.ibb.co/vkvqw7S/jonas-leupe-Ggw9-Tkdr-AA0-unsplash.jpg",
        "title": "samsung quete ss+",
        "description": "The samsung and samsung Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation samsungs",
        "category": "samsung",
        "price": 12800
    },
    {

        "thumbnail": "https://i.ibb.co/w07vQKx/zana-latif-5u-JMG9f-UAO0-unsplash.jpg",
        "title": "samsung s23+",
        "description": "The samsung and samsung Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation samsungs",
        "category": "samsung",
        "price": 40280
    },
    {
        "slider": [{
            "img1": "https://i.ibb.co/HFvSKCb/theregisti-emz-Dj-EN-d-8-unsplash.jpg",
            "img2": "https://i.ibb.co/7g7z8tL/alexander-london-9g-Iu-Cd8ia-Q-unsplash.jpg",
            "img3": "https://i.ibb.co/9YRJCwJ/alwin-thomas-Xzm-SEd-Wu-Ck-unsplash.jpg"
        }],
        "thumbnail": "https://i.ibb.co/HFvSKCb/theregisti-emz-Dj-EN-d-8-unsplash.jpg",
        "title": "digital camra",
        "description": "The digital camra and digital camra Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation digital camras",
        "category": "sony",
        "price": 20280
    },
    {

        "thumbnail": "https://i.ibb.co/qySZG5D/logan-moreno-gutierrez-9-BIdt62-W724-unsplash.jpg",
        "title": "sony headphone",
        "description": "The sony headphone and sony headphone Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation sony headphones",
        "category": "sony",
        "price": 35800
    },
    {

        "thumbnail": "https://i.ibb.co/7g7z8tL/alexander-london-9g-Iu-Cd8ia-Q-unsplash.jpg",
        "title": "Boosted sony",
        "description": "The Boosted sony and Boosted sony Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation Boosted sonys",
        "category": "sony",
        "price": 22200
    },
    {

        "thumbnail": "https://i.ibb.co/tqyKd8Z/alex-amva-h4x-Z7704-Bg-unsplash.jpg",
        "title": "sony xz",
        "description": "The sony xz and sony xz Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation sony xz ",
        "category": "sony",
        "price": 12800
    },
    {

        "thumbnail": "https://i.ibb.co/9YRJCwJ/alwin-thomas-Xzm-SEd-Wu-Ck-unsplash.jpg",
        "title": "portal camra",
        "description": "The portal camra and portal camra Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation portal camras",
        "category": "sony",
        "price": 40280
    },

    {
        "slider": [{
            "img1": "https://i.ibb.co/ZJvtHt7/franco-gancis-Js-V51nox-RCQ-unsplash.jpg",
            "img2": "https://i.ibb.co/zh8vWHS/mateo-abrahan-v-Vmfi-yh-Csc-unsplash.jpg",
            "img3": "https://i.ibb.co/qMrCWfJ/pawel-czerwinski-fp-ZZEV0u-Qw-A-unsplash.jpg"
        }],
        "thumbnail": "https://i.ibb.co/9tK9Jsf/franco-gancis-Js-V51nox-RCQ-unsplash.jpg",
        "title": "google pixel 7",
        "description": "The google pixel 7 and google pixel 7 Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation google pixel 7s",
        "category": "google",
        "price": 20280
    },
    {

        "thumbnail": "https://i.ibb.co/3sSBSVQ/juairia-islam-shefa-MKSh191933w-unsplash.jpg",
        "title": "google pixel 5",
        "description": "The google pixel 5 and google pixel 5 Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation google pixel 5 ",
        "category": "google",
        "price": 35800
    },
    {

        "thumbnail": "https://i.ibb.co/zh8vWHS/mateo-abrahan-v-Vmfi-yh-Csc-unsplash.jpg",
        "title": "smart watch",
        "description": "The smart watch and smart watch Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation smart watchs",
        "category": "google",
        "price": 22200
    },
    {

        "thumbnail": "https://i.ibb.co/gzR07dQ/pawel-czerwinski-fp-ZZEV0u-Qw-A-unsplash.jpg",
        "title": "google locator",
        "description": "The google locator and google locator Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation google locator ",
        "category": "google",
        "price": 12800
    },
    {

        "thumbnail": "https://i.ibb.co/ZJvtHt7/franco-gancis-Js-V51nox-RCQ-unsplash.jpg",
        "title": "google pixel 7",
        "description": "The google pixel 7 and google pixel 7 Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation google pixel 7s",
        "category": "google",
        "price": 40280
    },
    {
        "slider": [{
            "img1": "https://i.ibb.co/QCQ5n9J/slejven-djurakovic-0u-Xzo-Ez-YZ4-I-unsplash.jpg",
            "img2": "https://i.ibb.co/60Tz41R/christian-wiediger-Htfy7-Ta-DBgo-unsplash.jpg",
            "img3": "https://i.ibb.co/QCQ5n9J/slejven-djurakovic-0u-Xzo-Ez-YZ4-I-unsplash.jpg"
        }],
        "thumbnail": "https://i.ibb.co/zh8vWHS/mateo-abrahan-v-Vmfi-yh-Csc-unsplash.jpg",
        "title": "intel 2A196",
        "description": "The intel and intel Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation intels",
        "category": "intel",
        "price": 20280
    },
    {

        "thumbnail": "https://i.ibb.co/BCDmRZT/bermix-studio-t-Turh-Pw9bw-Q-unsplash.jpg",
        "title": "intel 8086",
        "description": "The intel and intel Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation intels",
        "category": "intel",
        "price": 35800
    },
    {

        "thumbnail": "https://i.ibb.co/60Tz41R/christian-wiediger-Htfy7-Ta-DBgo-unsplash.jpg",
        "title": "intel 8045",
        "description": "The intel and intel Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation intels",
        "category": "intel",
        "price": 22200
    },
    {

        "thumbnail": "https://i.ibb.co/QCQ5n9J/slejven-djurakovic-0u-Xzo-Ez-YZ4-I-unsplash.jpg",
        "title": "intel 80148",
        "description": "The intel and intel Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation intels",
        "category": "intel",
        "price": 12800
    },
    {

        "thumbnail": "https://i.ibb.co/QCQ5n9J/slejven-djurakovic-0u-Xzo-Ez-YZ4-I-unsplash.jpg",
        "title": "intel 80188",
        "description": "The intel and intel Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation intels",
        "category": "intel",
        "price": 40280
    }

]


const communication = [{
    "thumbnail": "https://i.ibb.co/wdZM1dc/Adobe-Stock-593424439-Preview.jpg", "title": "smart touch", "description": "Communication is usually understood as the transmission of information. Its precise definition is disputed and there are disagreements about whether unintentional", "category": "communication", "price": 280,
},
{
    "thumbnail": "https://i.ibb.co/yX8j4Sf/Adobe-Stock-610728942-Preview.jpg", "title": "community", "description": "community is usually understood as the transmission of information. Its precise definition is disputed and there are disagreements about whether unintentional", "category": "communication", "price": 320,
},
{
    "thumbnail": "https://i.ibb.co/cJfpZpR/Adobe-Stock-619172259-Preview-1.jpg", "title": "research", "description": "Communication is usually understood as the transmission of information. Its precise definition is disputed and there are disagreements about whether unintentional", "category": "communication", "price": 280,
},
{
    "thumbnail": "https://i.ibb.co/QkngdqV/Adobe-Stock-628395923-Preview-1.jpg", "title": "instruction communication", "description": "Communication is usually understood as the transmission of information. Its precise definition is disputed and there are disagreements about whether unintentional", "category": "communication", "price": 400,
},
{
    "thumbnail": "https://i.ibb.co/WVdHRk1/Adobe-Stock-629775658-Preview.jpg", "title": "digital tech", "description": "Communication is usually understood as the transmission of information. Its precise definition is disputed and there are disagreements about whether unintentional", "category": "communication", "price": 480,
},
{
    "thumbnail": "https://i.ibb.co/WVTLwPd/Adobe-Stock-61917225945-Preview.jpg", "title": "community", "description": "Communication is usually understood as the transmission of information. Its precise definition is disputed and there are disagreements about whether unintentional", "category": "communication", "price": 250,
}];
const gps = [{
    "thumbnail": "https://i.ibb.co/H7ZV9YS/3d-view-map.jpg", "title": "map", "description": "The Global Positioning System , originally Navstar GPS, is a satellite-based radio navigation system owned by the United States government and operated by the United States Space Force", "category": "gps", "price": 280,
},
{
    "thumbnail": "https://i.ibb.co/s9dd1XD/5151531-51520.jpg", "title": "device gps", "description": "community is usually understood as the transmission of information. Its precise definition is disputed and there are disagreements about whether unintentional", "category": "gps", "price": 320,
},
{
    "thumbnail": "https://i.ibb.co/9VsdnHW/oskar-kadaksoo-MKh27b-PCPGc-unsplash.jpg", "title": "article", "description": "The Global Positioning System , originally Navstar GPS, is a satellite-based radio navigation system owned by the United States government and operated by the United States Space Force", "category": "gps", "price": 260,
},
{
    "thumbnail": "https://i.ibb.co/c61wXjz/david-grandmougin-Am1io6-Kus-FM-unsplash.jpg", "title": "phones gps gps", "description": "The Global Positioning System , originally Navstar GPS, is a satellite-based radio navigation system owned by the United States government and operated by the United States Space Force", "category": "gps", "price": 400,
},
{
    "thumbnail": "https://i.ibb.co/b6JSbMj/side-view-woman-working-laptop.jpg", "title": "architecture", "description": "The Global Positioning System , originally Navstar GPS, is a satellite-based radio navigation system owned by the United States government and operated by the United States Space Force", "category": "gps", "price": 480,
},
{
    "thumbnail": "https://i.ibb.co/9HWjF4q/The-test-routes-visualised-on-Google-Maps-using-GPS-data.png", "title": "locator", "description": "The Global Positioning System , originally Navstar GPS, is a satellite-based radio navigation system owned by the United States government and operated by the United States Space Force", "category": "gps", "price": 250,
}];

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
        const technologyCollection = client.db('technologyDB').collection('technology');
        const userCollection = client.db('technologyDB').collection('users');
        const categoryCollection = client.db('technologyDB').collection('category')
        const cartCollection = client.db('technologyDB').collection('myCarts');

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

        app.get('/communication', (req, res) => {
            res.send(communication)
        })
        app.get('/gps', (req, res) => {
            res.send(gps)
        })
        //  my cart api 
        // use get from browser
        app.post('/cart', async (req, res) => {
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
        app.get('/user', async (req, res) => {
            const findCart = userCollection.find();
            const result = await findCart.toArray();
            res.send(result)
        })
        // delete cart 
        app.delete('/cart/:id', async (req, res) => {
            const id = req.params.id;
            console.log('delete id is', id);
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