import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Main from './components/main/Main';

import { store } from './app/store'
import { Provider } from 'react-redux'
import AddPost from './components/addpost/AddPost';
import PostPage from './components/postpage/PostPage';
import UpdatePost from './components/updatePost/UpdatePost';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Main />
            },
            {
                path: "/newpost",
                element: <AddPost />
            },
            {
                path: "/:id",
                element: <PostPage />
            },
            {
                path: "/update/:id",
                element: <UpdatePost />
            },
        ]
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);