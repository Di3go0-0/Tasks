import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className="bg-zinc-800 max-w-md p-10 rounded-md">
                <h1 className="text-2xl font-bold">404 Not Found</h1>
                <p className="mt-4">The page you are looking for does not exist.</p>
                <Link to="/" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md">
                    Home
                </Link>
            </div>
        </div>
    );
}

export default NotFound;