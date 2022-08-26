import { MongoClient } from 'mongodb';


async function handler(req,res) {
   if(req.method === 'POST'){
      try{
           const data = req.body;
     // const {title, address, description, image} = data;

      const client = await MongoClient.connect('mongodb+srv://first_user:hello_World@cluster0.2xflz.mongodb.net/meetups?retryWrites=true&w=majority')
      const db = client.db();

      const meetupsCollection = db.collection('meetups');

      const result = await meetupsCollection.insertOne(data);

      console.log(result);
      client.close();

      res.status(201).json({message: 'Meetup inserted'})
      }catch(err){
         err.message;
      }
     

   }
}

export default handler;