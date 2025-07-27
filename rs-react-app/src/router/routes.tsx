
import App from '../App';
// import { appLoader } from './loaders';
import About from '../components/About';
import Layout from '../components/Layout';
import ErrorPage from '../components/404';

export const routes = [
    {
        path: '/',
        element: <Layout />,
        // loader: appLoader,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <App />
            },
            {
                path: 'about',
                element: <About />
            },
            {
                path: '*',
                element: <ErrorPage />
            }
        ]
    }
];
