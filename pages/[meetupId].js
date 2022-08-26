import { MongoClient, ObjectId } from "mongodb"

import MeetUpDetails from "../components/meetups/MeetupDetails"
const MeetupDetails = (props) => {
    return(
      <MeetUpDetails 
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
      />
    )
}

export async function getStaticPaths() {
   const client = await MongoClient.connect('mongodb+srv://first_user:hello_World@cluster0.2xflz.mongodb.net/meetups?retryWrites=true&w=majority')
   const db = client.db();
  
   const meetupsCollection = db.collection('meetups');
   const meetups = await meetupsCollection.find({},{_id:1}).toArray();

   client.close()
 return {
    fallback: false,
  paths: meetups.map(meetup => ({ params : {
    meetupId: meetup._id.toString()
  }}))
 }
  
}

export async function  getStaticProps(current) {

   const meetupId = current.params.meetupId;

   const client = await MongoClient.connect('mongodb+srv://first_user:hello_World@cluster0.2xflz.mongodb.net/meetups?retryWrites=true&w=majority')
   const db = client.db();
  
   const meetupsCollection = db.collection('meetups');
   const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId) })
  return {
    props : {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description
      }
    }
  }
}

export default MeetupDetails