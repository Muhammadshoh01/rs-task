import { useNavigate } from "react-router";

export default function About() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
            <div className="bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full space-y-6">
                <h2 className="text-3xl font-bold text-gray-800 text-center">About This Project</h2>

                <div className="text-gray-600 leading-relaxed text-lg">
                    <p>
                        This is a simple React project built for educational purposes. It demonstrates routing, component structure,
                        state handling, and clean UI using Tailwind CSS.
                    </p>
                    <p className="mt-4">
                        The source of the course content is available at:
                        <br />
                        <a
                            href="https://rs.school/courses/reactjs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            https://rs.school/courses/reactjs
                        </a>
                    </p>
                </div>

                <div className="border-t pt-4 text-sm text-gray-500">
                    <p>Created by:</p>
                    <p className="font-medium text-gray-700">Muhammadshoh Rajabov</p>
                    <p>Frontend Developer, React & Vue Enthusiast</p>
                    <p className="text-xs mt-1">2025</p>
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded transition"
                    >
                        ⬅ Back
                    </button>
                </div>
            </div>
        </div>
    );
}
