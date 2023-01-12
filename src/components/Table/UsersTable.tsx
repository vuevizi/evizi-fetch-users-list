import React, {memo} from 'react';
import {UserTableProps} from "../../interfaces/interfaces";
import {Avatar, Table, Tag} from "antd";

const UsersTable: React.FC<UserTableProps> = ({usersData,loading}) => {
    const dataSource = usersData?.map((user, index) => (
            {
                key: user.node_id,
                id: user.id,
                avatar: <Avatar src={user.avatar_url}/>,
                name: user.html_url.replace("https://github.com/", ""),
                admin: user.site_admin ? <Tag color="magenta">Admin</Tag> : <Tag color="red">Not Admin</Tag>
            }
        )
    )

    const columns = [
        {
            title: "id",
            dataIndex: "id",
            key: 'id'

        },
        {
            title: "Avatar",
            dataIndex: "avatar",
            key: "avatar"
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Admin',
            dataIndex: 'admin',
            key: 'admin',
        },
    ];


    return (
        <Table loading={loading} pagination={false} dataSource={dataSource} columns={columns}/>
    );
};

export default memo(UsersTable);