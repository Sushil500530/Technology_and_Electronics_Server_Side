const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

const brandName = [
    {
        id: 1, thumbnail: "https://i.ibb.co/WKXDWVx/zana-latif-gt-X5-DIIHGq-E-unsplash.jpg", category: 'apple',
        slider: [{
            img1: "https://i.ibb.co/Qb4N8zs/thai-nguyen-X5-V7hb7-Cx-NY-unsplash.jpg",
            img2: "https://i.ibb.co/ZThT2zM/miguel-tomas-f-PZy-N5-Eih5-E-unsplash.jpg",
            img3: "https://i.ibb.co/gzGBCt7/bagus-hernawan-v-Xml-V3fber-Q-unsplash.jpg"
        }],
        collection: [
            {
                id: 11,
                image: "https://i.ibb.co/Qb4N8zs/thai-nguyen-X5-V7hb7-Cx-NY-unsplash.jpg",
                title: "iphone 15",
                description: "The iPhone 15 and iPhone 15 Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation iPhones",
                category: "communication",
                price: 20280
            },
            {
                id: 12,
                image: "https://i.ibb.co/ZThT2zM/miguel-tomas-f-PZy-N5-Eih5-E-unsplash.jpg",
                title: "iphone 16",
                description: "The iPhone 16 and iPhone 15 Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation iPhones",
                category: "communication",
                price: 35800
            },
            {
                id: 13,
                image: "https://i.ibb.co/qmRKMBD/daniel-romero-Ie-ZZ2-Wc-XIw-unsplash.jpg",
                title: "iphone 13",
                description: "The iPhone 13 and iPhone 15 Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation iPhones",
                category: "communication",
                price: 22200
            },
            {
                id: 14,
                image: "https://i.ibb.co/Jx3PtM4/brandon-romanchuk-NOFy-Rm-SQf-UQ-unsplash.jpg",
                title: "iphone 12",
                description: "The iPhone 12 and iPhone 15 Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation iPhones",
                category: "communication",
                price: 12800
            },
            {
                id: 15,
                image: "https://i.ibb.co/gzGBCt7/bagus-hernawan-v-Xml-V3fber-Q-unsplash.jpg",
                title: "iphone 15 pro",
                description: "The iPhone 15 pro and iPhone 15 Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation iPhones",
                category: "communication",
                price: 40280
            }
        ]
    },
    {
        id: 2, thumbnail: "https://i.ibb.co/v4Lws0j/anh-nhat-yqclo-Mb3-Abw-unsplash.jpg", category: 'samsung',
        slider: [{
            img1: "https://i.ibb.co/w6wcqf7/anh-nhat-u-Cq-Ma-s-JDg-unsplash.jpg",
            img2: "https://i.ibb.co/V90M6vr/zana-latif-5u-JMG9f-UAO0-unsplash.jpg",
            img3: "https://i.ibb.co/9HwxrPf/daniel-romero-f-Nq-ZZi5-M73-Y-unsplash.jpg"
        }],
        collection: [
            {
                id: 11,
                image: "https://i.ibb.co/w6wcqf7/anh-nhat-u-Cq-Ma-s-JDg-unsplash.jpg",
                title: "samsung s21+",
                description: "The samsung and samsung Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation samsungs",
                category: "communication",
                price: 20280
            },
            {
                id: 12,
                image: "https://i.ibb.co/v4Lws0j/anh-nhat-yqclo-Mb3-Abw-unsplash.jpg",
                title: "samsung s22+",
                description: "The samsung and samsung Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation samsungs",
                category: "communication",
                price: 35800
            },
            {
                id: 13,
                image: "https://i.ibb.co/9HwxrPf/daniel-romero-f-Nq-ZZi5-M73-Y-unsplash.jpg",
                title: "samsung A75",
                description: "The samsung and samsung Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation samsungs",
                category: "communication",
                price: 22200
            },
            {
                id: 14,
                image: "https://i.ibb.co/brWhxxZ/jonas-leupe-Ggw9-Tkdr-AA0-unsplash.jpg",
                title: "samsung quete ss+",
                description: "The samsung and samsung Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation samsungs",
                category: "communication",
                price: 12800
            },
            {
                id: 15,
                image: "https://i.ibb.co/V90M6vr/zana-latif-5u-JMG9f-UAO0-unsplash.jpg",
                title: "samsung s23+",
                description: "The samsung and samsung Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation samsungs",
                category: "communication",
                price: 40280
            }
        ]
    },
    {
        id: 3, thumbnail: "https://i.ibb.co/DgH1Nrx/alwin-thomas-Xzm-SEd-Wu-Ck-unsplash.jpg", category: 'sony',
        slider: [{
            img1: "https://i.ibb.co/Y0Zr8PH/theregisti-emz-Dj-EN-d-8-unsplash.jpg",
            img2: "https://i.ibb.co/5LLLXsf/logan-moreno-gutierrez-9-BIdt62-W724-unsplash.jpg",
            img3: "https://i.ibb.co/F0B7NSD/alex-amva-h4x-Z7704-Bg-unsplash.jpg"
        }],
        collection: [
            {
                id: 11,
                image: "https://i.ibb.co/Y0Zr8PH/theregisti-emz-Dj-EN-d-8-unsplash.jpg",
                title: "digital camra",
                description: "The digital camra and digital camra Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation digital camras",
                category: "sony",
                price: 20280
            },
            {
                id: 12,
                image: "https://i.ibb.co/5LLLXsf/logan-moreno-gutierrez-9-BIdt62-W724-unsplash.jpg",
                title: "sony headphone",
                description: "The sony headphone and sony headphone Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation sony headphones",
                category: "sony",
                price: 35800
            },
            {
                id: 13,
                image: "https://i.ibb.co/tY1C0Bs/alexander-london-9g-Iu-Cd8ia-Q-unsplash.jpg",
                title: "Boosted sony",
                description: "The Boosted sony and Boosted sony Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation Boosted sonys",
                category: "sony",
                price: 22200
            },
            {
                id: 14,
                image: "https://i.ibb.co/F0B7NSD/alex-amva-h4x-Z7704-Bg-unsplash.jpg",
                title: "sony xz",
                description: "The sony xz and sony xz Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation sony xz ",
                category: "sony",
                price: 12800
            },
            {
                id: 15,
                image: "https://i.ibb.co/DgH1Nrx/alwin-thomas-Xzm-SEd-Wu-Ck-unsplash.jpg",
                title: "portal camra",
                description: "The portal camra and portal camra Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation portal camras",
                category: "sony",
                price: 40280
            }
        ]
    },
    {
        id: 4, thumbnail: "https://i.ibb.co/hF50CCv/pawel-czerwinski-fp-ZZEV0u-Qw-A-unsplash.jpg", category: 'google',
        slider: [{
            img1: "https://i.ibb.co/ZJvtHt7/franco-gancis-Js-V51nox-RCQ-unsplash.jpg",
            img2: "https://i.ibb.co/HKkpbsC/mateo-abrahan-v-Vmfi-yh-Csc-unsplash.jpg",
            img3: "https://i.ibb.co/qMrCWfJ/pawel-czerwinski-fp-ZZEV0u-Qw-A-unsplash.jpg"
        }],
        collection: [
            {
                id: 11,
                image: "https://i.ibb.co/ZJvtHt7/franco-gancis-Js-V51nox-RCQ-unsplash.jpg",
                title: "google pixel 7",
                description: "The google pixel 7 and google pixel 7 Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation google pixel 7s",
                category: "google",
                price: 20280
            },
            {
                id: 12,
                image: "https://i.ibb.co/wKS9VST/juairia-islam-shefa-MKSh191933w-unsplash.jpg",
                title: "google pixel 5",
                description: "The google pixel 5 and google pixel 5 Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation google pixel 5 ",
                category: "google",
                price: 35800
            },
            {
                id: 13,
                image: "https://i.ibb.co/HKkpbsC/mateo-abrahan-v-Vmfi-yh-Csc-unsplash.jpg",
                title: "smart watch",
                description: "The smart watch and smart watch Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation smart watchs",
                category: "google",
                price: 22200
            },
            {
                id: 14,
                image: "https://i.ibb.co/qMrCWfJ/pawel-czerwinski-fp-ZZEV0u-Qw-A-unsplash.jpg",
                title: "google locator",
                description: "The google locator and google locator Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation google locator ",
                category: "google",
                price: 12800
            },
            {
                id: 15,
                image: "https://i.ibb.co/ZJvtHt7/franco-gancis-Js-V51nox-RCQ-unsplash.jpg",
                title: "google pixel 7",
                description: "The google pixel 7 and google pixel 7 Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation google pixel 7s",
                category: "google",
                price: 40280
            }
        ]
    },
    {
        id: 5, thumbnail: "https://i.ibb.co/bm9n34y/slejven-djurakovic-0u-Xzo-Ez-YZ4-I-unsplash.jpg", category: 'intel',
        slider: [{
            img1: "https://i.ibb.co/WV4QT92/andrey-matveev-v-Wc2s-Ty-S6s-I-unsplash.jpg",
            img2: "https://i.ibb.co/pbp57M5/bermix-studio-t-Turh-Pw9bw-Q-unsplash.jpg",
            img3: "https://i.ibb.co/bm9n34y/slejven-djurakovic-0u-Xzo-Ez-YZ4-I-unsplash.jpg"
        }],
        collection: [
            {
                id: 11,
                image: "https://i.ibb.co/WV4QT92/andrey-matveev-v-Wc2s-Ty-S6s-I-unsplash.jpg",
                title: "intel 2A196",
                description: "The intel and intel Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation intels",
                category: "intel",
                price: 20280
            },
            {
                id: 12,
                image: "https://i.ibb.co/pbp57M5/bermix-studio-t-Turh-Pw9bw-Q-unsplash.jpg",
                title: "intel 8086",
                description: "The intel and intel Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation intels",
                category: "intel",
                price: 35800
            },
            {
                id: 13,
                image: "https://i.ibb.co/xh4XJq9/christian-wiediger-Htfy7-Ta-DBgo-unsplash.jpg",
                title: "intel 8045",
                description: "The intel and intel Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation intels",
                category: "intel",
                price: 22200
            },
            {
                id: 14,
                image: "https://i.ibb.co/4FtVcb2/gamercomp-Rl-Po-DAo6-WCI-unsplash.jpg",
                title: "intel 80148",
                description: "The intel and intel Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation intels",
                category: "intel",
                price: 12800
            },
            {
                id: 15,
                image: "https://i.ibb.co/bm9n34y/slejven-djurakovic-0u-Xzo-Ez-YZ4-I-unsplash.jpg",
                title: "intel 80188",
                description: "The intel and intel Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth-generation intels",
                category: "intel",
                price: 40280
            }
        ]
    }
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
const gps = [{
    id: 1, thumbnail: "https://i.ibb.co/ckPKPC4/The-test-routes-visualised-on-Google-Maps-using-GPS-data.png", name: "map", description: "The Global Positioning System , originally Navstar GPS, is a satellite-based radio navigation system owned by the United States government and operated by the United States Space Force", category: "gps", price: 280,
}, {
    id: 2, thumbnail: "https://i.ibb.co/2nYVLRT/side-view-woman-working-laptop.jpg", name: "device gps", description: "community is usually understood as the transmission of information. Its precise definition is disputed and there are disagreements about whether unintentional", category: "gps", price: 320,
}, {
    id: 3, thumbnail: "https://i.ibb.co/f1vnk3m/oskar-kadaksoo-MKh27b-PCPGc-unsplash.jpg", name: "article", description: "The Global Positioning System , originally Navstar GPS, is a satellite-based radio navigation system owned by the United States government and operated by the United States Space Force", category: "gps", price: 260,
}, {
    id: 4, thumbnail: "https://i.ibb.co/PwSD0nj/david-grandmougin-Am1io6-Kus-FM-unsplash.jpg", name: "phones gps gps", description: "The Global Positioning System , originally Navstar GPS, is a satellite-based radio navigation system owned by the United States government and operated by the United States Space Force", category: "gps", price: 400,
}, {
    id: 5, thumbnail: "https://i.ibb.co/4KChRQd/5151531-51520.jpg", name: "architecture", description: "The Global Positioning System , originally Navstar GPS, is a satellite-based radio navigation system owned by the United States government and operated by the United States Space Force", category: "gps", price: 480,
}, {
    id: 6, thumbnail: "https://i.ibb.co/27Dnp63/3d-view-map.jpg", name: "locator", description: "The Global Positioning System , originally Navstar GPS, is a satellite-based radio navigation system owned by the United States government and operated by the United States Space Force", category: "gps", price: 250,
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
        const cartCollection = client.db('technologyDB').collection('communication')

        app.get('/technology', (req, res) => {
            res.send(brandName)
        })
        // find unique id 
        // app.get('/technology/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: new ObjectId(id) }
        //     const result = await technologyCollection.findOne(query);
        //     res.send(result)
        // })

        app.get('/communication', (req, res) => {
            res.send(communication)
        })
        app.get('/gps', (req, res) => {
            res.send(gps)
        })

        // use get from browser
        app.post('/cart', async (req, res) => {
            const addCart = req.body;
            console.log('add to', addCart);
            const result = await cartCollection.insertOne(addCart);
            res.send(result)
        })

        // get cart all data 
        app.get('/cart', async (req, res) => {
            const findCart = cartCollection.find();
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
        app.put('/cart/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedProduct = req.body;
            const coffee = {
                $set: {
                    name: updatedProduct.name,
                    price: updatedProduct.price,
                    description: updatedProduct.description,
                    category: updatedProduct.category,
                    image: updatedProduct.image
                }
            }
            const result = await cartCollection.updateOne(filter, coffee, options);
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