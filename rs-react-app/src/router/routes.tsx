// src/router/routes.tsx
import App from '../App';
// import { appLoader } from './loaders';
import { ErrorBoundary } from '../components/ErrorBoundary';

export const routes = [
    {
        path: '/',
        element: <App />,
        // loader: appLoader,
        // errorElement: <ErrorBoundary />,
        children: [
            // {
            //     index: true,
            //     element: <Home />
            // },
            // {
            //     path: 'about',
            //     element: <About />
            // }
        ]
    }
];
