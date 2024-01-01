import { useEffect, useState } from "react";
import axiosClient from "../../axios";
import PageComponent from "../../components/PageComponent";
import User from "./User";

export default function People() {
    const [users , setUsers] = useState([]);
    const [loading , setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        // fetch all of the users
        axiosClient.get('/users')
        .then(({data}) => {
            setUsers(data.users);
            console.log(data);
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching the users ", error);
        });

    }, [])

    return (
        <PageComponent title="Find People" small="Find other people on the platform.">
            {
                !loading &&
                <div>
                    {
                        users &&
                            users.map((user, index) => (
                                <User key={index} user={user} />
                            ))
                    }
                </div>
            }

            {
                loading &&
                <div className="flex items-center justify-center">
                    Patience is the key to a good life....
                </div>
            }
        </PageComponent>
    )
}
