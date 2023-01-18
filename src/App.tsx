import React, {useEffect, useState} from 'react';
import {
    FetchUsersParams,
    ListRespone,
    UsersData,
} from './interfaces/interfaces';
import './App.css';
import {Button, Space, Spin} from 'antd';
import {useAppDispatch, useAppSelector} from './app/hooks';
import {
    fetchUser,
    getUsersState,
    resetUsersTable,
} from './features/FetchUsers/FetchUsers.slice';
import {UsersTable} from './components';

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const {error, loading, usersData, lastId} = useAppSelector(getUsersState);

    const handleLoadUsers = () => {
        dispatch(fetchUser({since: lastId, per_page: 10}));
    };
    const handleResetUsers = () => {
        dispatch(resetUsersTable());
    };
    return (
        <div className="App">
            <Space direction="vertical">
                <Space
                    direction="horizontal"
                    align="center"
                    size="small"
                >
                    <Button
                        loading={loading}
                        style={{width: '200px'}}
                        onClick={() => handleLoadUsers()}
                    >
                        {usersData?.length === 0 ? 'Load user' : `Load more`}
                    </Button>
                    {usersData?.length !== 0 && (
                        <Button onClick={() => handleResetUsers()}>
                            Reset Users Table
                        </Button>
                    )}
                </Space>

                <UsersTable
                    loading={loading}
                    usersData={usersData}
                />
            </Space>
        </div>
    );
};

export default App;
