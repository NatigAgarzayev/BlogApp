import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Main from './components/main/Main';


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Main />
            }
        ]
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <RouterProvider router={router} />
    </>
);