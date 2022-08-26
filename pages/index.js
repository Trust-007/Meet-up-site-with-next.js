import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import Head from 'next/head';
const HomePage = (props) => {
    return(
      <>
       <Head>
        <title> React Meetups</title>
        <meta name="description" content="Browse a huge list of meetups"/>
       </Head>
        <MeetupList meetups={props.meetups}/> 
      </>
         
    )
}

export async function getStaticProps() {
  // fetch data from an API
  
   const client = await MongoClient.connect('mongodb+srv://first_user:hello_World@cluster0.2xflz.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db();
  
   const meetupsCollection = db.collection('meetups');

    const meetUps = await meetupsCollection.find().toArray();
  
    client.close();
 
  return {
    props: {
      meetups: meetUps.map((meetUp) => ({
       title: meetUp.title,
       image: meetUp.image,
       address: meetUp.address,
       id: meetUp._id.toString(),
      })
     ),
    },
    revalidate: 10
  }
}

export default HomePage;