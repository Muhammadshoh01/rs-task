
import App from '../App';
import About from '../components/About';
import Layout from '../components/Layout';
import ErrorPage from '../components/404';

export const routes = [
    {
        path: '/',
        element: <Layout />,
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
