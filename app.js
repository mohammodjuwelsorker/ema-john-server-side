const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const cors = require('cors');

//
const port = process.env.PORT || 5000;
const app = express()

// middleware 
app.use(express.json())
app.use(cors())

app.get('/', async (req, res) => {
   res.send('ema-john server side running')
})


const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.icw22xj.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
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
      //
      const ema_johnCollections = client.db('Ema-john').collection('services')

      // ema john services api related 
      app.get('/services', async(req, res) => {
         const cursor = await ema_johnCollections.find().toArray()
         // console.log(cursor)
         res.send(cursor)
      })


   

      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
   }finally {
    // Ensures that the client will close when you finish/error
   //  await client.close();
  }
}
run().catch(console.dir);



app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})