import axiosClient from "./axiosClient";
import {FetchUsersParams, ListRespone,UsersData} from "../interfaces/interfaces";

const usersApi = {
        getUsers: ({since = 1,per_page=10}:FetchUsersParams):Promise<ListRespone<UsersData>> => {
            const url = '/users';
            return axiosClient.get(url, {
                params: {
                    ...(since && {
                        since,
                    }),
                    per_page: per_page
                }
            });
        }

    }
export default usersApi;