import { useRouteError, useNavigate } from 'react-router-dom';

type RouteError = {
  statusText?: string;
  message?: string;
};

export default function ErrorPage() {
  const rawError = useRouteError();
  const navigate = useNavigate();

  console.error(rawError);

  let errorMessage = 'Unknown error';

  if (rawError instanceof Error) {
    errorMessage = rawError.message;
  } else if (
    typeof rawError === 'object' &&
    rawError !== null &&
    'statusText' in rawError
  ) {
    errorMessage =
      (rawError as RouteError).statusText ||
      (rawError as RouteError).message ||
      errorMessage;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md w-full">
        <h1 className="text-5xl font-bold text-red-500 mb-4">Oops!</h1>
        <p className="text-lg text-gray-700 mb-2">
          Sorry, an unexpected error has occurred.
        </p>
        <p className="text-sm text-gray-500 italic mb-6">{errorMessage}</p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded font-medium transition"
        >
          ⬅ Go to Homepage
        </button>
      </div>
    </div>
  );
}
