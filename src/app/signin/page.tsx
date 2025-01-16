'use client'
import { signIn } from "next-auth/react";
import Image from "next/image";
const SignIn = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6 flex flex-col items-center gap-6">
                <Image src={'/logo.svg'} alt="logo" width={200} height={200} />
                <button
                    onClick={() => signIn('google')}
                    className="w-full flex items-center justify-center bg-white text-gray-600 border border-gray-300 rounded-lg shadow-sm px-4 py-2 hover:bg-gray-100 transition"
                >
                    <Image src={'/google.svg'} height={40} width={40} alt="Google-Icon" className="w-5 h-5 mr-2" />
                    Sign in with Google
                </button>
            </div>
        </div>

    );
}

export default SignIn;