import {useEffect, useState} from "react";
import usersApi from "../api/usersApi";
import {FetchUsersParams, ListRespone, UsersData} from "../interfaces/interfaces";

export const useFetchUsers = ({since,per_page}:FetchUsersParams) => {
    const [data, setData] = useState<ListRespone<UsersData>>()
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        usersApi.getUsers({since,per_page}).then((response) => {
            setData(response);
            setLoading(false);
        }).catch((error) => {
            setError(error)
        })
    }, [])
    return {data, error, loading};
}