//localHost3000/new-meet-up
import {useRouter} from 'next/router'
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import Head from 'next/head';




const NewMeetUp = () => {
    const router = useRouter() 
   
    const addMeetupsHandler = async (meetupData) => {
        const response = await fetch('/api/new-meetup',{
            method: 'POST',
            body: JSON.stringify(meetupData),
            headers : {  
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log(data)
        router.push('/')
    }

    return(
        <>
          <Head>
           <title> Add meetup</title>
           <meta name="description" content="Add your own meetup"/>
          </Head>
          <NewMeetupForm onAddMeetup={addMeetupsHandler}/>
        </>
    )
        
}

export default NewMeetUp;