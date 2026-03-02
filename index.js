const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const { use } = require('react');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mongo-simple-crud.tzwys72.mongodb.net/?appName=Mongo-simple-crud`;


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        const db = client.db("Blog-Project")
        const usersConnections = db.collection("users")
        const blogsCollections = db.collection("blogs")
        const categoriesCollections = db.collection("categories")

        app.post("/users", async (req, res) => {
            const user = req.body;
            user.role = "user";
            user.createdAt = new Date();

            const result = await usersConnections.insertOne(user);
            res.send(result);
        });
        app.get("/users",async(req,res)=>{
            const result = await usersConnections.find().toArray()
            res.send(result)
        })
        app.patch("/users/:id",async(req,res)=>{
            const {id} = req.params
            const {role} = req.body

            const result = await usersConnections.updateOne(
                { _id : new ObjectId(id)},
                { $set : {role}}
            );
            res.send(result)
        })
        app.delete("/users/:id",async(req,res)=>{
            const id = req.params.id

            const result = await usersConnections.deleteOne({
                _id : new ObjectId(id)
            });
            res.send(result)
        })



        //Blogs data Function
        app.post("/blogs",async(req,res)=>{
            const newBlog = req.body

            const result = await blogsCollections.insertOne(newBlog)
            res.send(result)
        })
        app.get("/blogs",async(req,res)=>{
            const cursor = blogsCollections.find()
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get("/blogs/:id",async(req,res)=>{
            const id = req.params.id
            const query = {_id:new ObjectId(id)}
            const result = await blogsCollections.findOne(query)
            res.send(result)
        })
        app.patch("/blogs/:id",async(req,res)=>{
            try{
                const id = req.params.id
                const body = {...req.body}
                delete body._id

                const filter = {_id:new ObjectId(id)}
                const updateBlog = {$set:body}

                const result = await blogsCollections.updateOne(filter,updateBlog)
                res.send(result)
            } catch(err){
                console.error(err)
            }
        })
        app.delete("/blogs/:id",async(req,res)=>{
            const id = req.params.id

            const result = await blogsCollections.deleteOne({
                _id:new ObjectId(id)
            });
            res.send(result)
        })




        //Category Data Function
        app.post('/categories', async (req, res) => {
            const newFood = req.body;
            const result = await categoriesCollections.insertOne(newFood);
            res.send(result)
        });

        app.get('/categories', async (req, res) => {
            const cursor = categoriesCollections.find()
            const result = await cursor.toArray()
            res.send(result)
        });
        app.delete("/categories/:id", async (req, res) => {
            const id = req.params.id;

            const result = await categoriesCollections.deleteOne({
                _id: new ObjectId(id),
            });

            res.send(result);
        });




        app.get('/', (req, res) => {
            res.send('Blog Project is running!')
        })

        app.listen(port, () => {
            console.log(`MongoDB Connected  ${port}`)
        })
    } catch(error) {
        // Ensures that the client will close when you finish/error
        console.error("MongoDB Connection error : ",error)
    }
}
run().catch(console.dir);
