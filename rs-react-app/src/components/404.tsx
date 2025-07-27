import { useRouteError, useNavigate } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError() as any;
    const navigate = useNavigate();

    console.error(error);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md w-full">
                <h1 className="text-5xl font-bold text-red-500 mb-4">Oops!</h1>
                <p className="text-lg text-gray-700 mb-2">Sorry, an unexpected error has occurred.</p>

                {error?.statusText || error?.message ? (
                    <p className="text-sm text-gray-500 italic mb-6">
                        {error.statusText || error.message}
                    </p>
                ) : null}

                <button
                    onClick={() => navigate("/")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded font-medium transition"
                >
                    ⬅ Go to Homepage
                </button>
            </div>
        </div>
    );
}
