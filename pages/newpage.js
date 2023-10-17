import axios from "axios";
import { useState, useEffect } from "react";
export default function NewPage({membership}) {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem('token');
            const headers = {
                'authorization': token
            };
            try {
                const response = await axios.post('http://localhost:3000/api/chat/getchat', {
                    roomId: "552f12b7-c534-43df-a053-c15f178a9743"
                }, { headers: headers })
                setData(response.data);
            }
            catch (error) {
                console.log("Error while fetching info!", error.message);
            }
        }
        fetchData();
    }, [])

    return (
        <>
            Hello from new page
            {/* {JSON.stringify(data)} */}
            {JSON.stringify(membership)}
            
        </>
    )
}

export async function getServerSideProps(context) {
    const token = context.req.cookies.token || null;
    const headers = {
        'authorization': token
    };
    console.log(token,);
    const res = await axios.post('http://localhost:3000/api/room/getmembership',{
        userId:"86621119-8fc7-4695-b270-3d999d670821"
    }, {headers:headers})
    const membership = res.data
    
    return {
        props: {
            membership
        }
    }
}