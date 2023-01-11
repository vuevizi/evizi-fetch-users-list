import React, {useEffect,useState} from 'react';
import usersApi from "./api/usersApi";
import {FetchUsersParams} from "./interfaces/interfaces";
import {useFetchUsers} from "./customhooks/fetchUserHook";

const App: React.FC = () => {
    const [fetchUsersParams,setFetchUsersParams] = useState<FetchUsersParams>({
        since: 1,
        per_page: 10
    })
    const {data,loading,error} = useFetchUsers(fetchUsersParams)
    return (
        <div>
            {data?.map(item => (
                <h1>{item.id}</h1>
            ))}
        </div>
    );
};

export default App;