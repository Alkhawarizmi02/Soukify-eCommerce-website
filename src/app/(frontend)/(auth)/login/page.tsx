import Logo from "@/components/Logo"
import Image from 'next/image'
import Link from "next/link"

function Page() {
    return (
        <div className="w-full h-[calc(100vh-106px)] bg-white grid lg:grid-cols-2">
            <div className="flex flex-col items-center justify-start lg:justify-center py-12 px-4 sm:px-6 lg:px-8">

                <div className="w-full max-w-md flex flex-1 flex-col justify-center items-center gap-6">
                    <div className="text-center w-full">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Login to your account</h1>
                        <p className="text-sm text-gray-600">
                            Enter your email below to login to your account
                        </p>
                    </div>

                    <form className="w-full flex flex-col gap-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 sm:text-sm"
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                defaultValue="m@example.com"
                                required
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <Link
                                    href="#"
                                    className="text-sm font-medium text-zinc-900 hover:text-zinc-800 hover:underline"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 sm:text-sm"
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-zinc-900 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900"
                        >
                            Login
                        </button>
                    </form>

                    <p className="text-sm text-center text-gray-600">
                        Don&apos;t have an account?{' '}
                        <Link href="/register" className="font-medium text-zinc-900 hover:text-zinc-800 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>

            <div className="hidden lg:block w-full h-full relative">
                <Image
                    src="/assets/login-img.jpg"
                    alt="fashion image"
                    className="object-cover"
                    fill
                    priority
                />
            </div>
        </div>
    )
}

export default Page