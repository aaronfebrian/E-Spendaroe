import { Link, Head } from "@inertiajs/react";
import Lanscape1 from "@/Assets/landscape1.jpg";
import Lanscape2 from "@/Assets/landscape2.jpg";
import Portrait1 from "@/Assets/portrait1.jpg";
import Frame from "@/Assets/Frame993.png";
import Rectangle from "@/Assets/Rectangle3.png";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <main
                    class="relative h-screen overflow-hidden bg-white dark:bg-white"
                    style={{ width: "100%" }}
                >
                    <header class="z-30 flex items-center w-full h-24 shadow-md mt-3" style={{boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"}}>
                        <div class="container flex items-center justify-between px-6 mx-auto">
                            <div class="text-3xl font-black text-gray-800 uppercase dark:text-white" >
                                <img
                                    src={Frame}
                                    alt="Logo"
                                    className="h-20 w-50 mt-3 ml-5"
                                    style={{ marginTop: "-10px" }}
                                />
                            </div>
                            <div class="flex items-center" >
                                <nav class="items-center hidden text-lg text-gray-800 uppercase font-sen dark:text-white lg:flex">
                                    <div
                                        class="mt-12 inline-flex rounded-md gap-5"
                                        style={{ marginTop: "-10px" }}
                                    >
                                        <button
                                            onClick={() =>
                                                (window.location.href =
                                                    route("login"))
                                            }
                                            class="flex text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 "
                                        >
                                            Log in
                                        </button>
                                        <button
                                            onClick={() =>
                                                (window.location.href =
                                                    route("register"))
                                            }
                                            class="flex text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:bg-green-700 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 transition ease-in-out duration-150 "
                                        >
                                            Register
                                        </button>
                                        {auth.user && (
                                            <button
                                                onClick={() =>
                                                    (window.location.href =
                                                        route("dashboard"))
                                                }
                                                class="py-2 px-4 bg-red-500 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                                            >
                                                Dashboard
                                            </button>
                                        )}
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </header>
                    <div
                        class="relative z-20 flex items-center overflow-hidden bg-white dark:bg-gray-800"
                        style={{
                            backgroundImage: `url(${Rectangle})`,
                            backgroundSize: "cover",
                        }}
                    >
                        <div class="container relative flex px-6 py-16 mx-auto">
                            <div
                                class="relative z-20 flex flex-col sm:w-2/3 lg:w-2/5 z-20"
                                style={{
                                    marginTop: "140px",
                                    marginLeft: "85px",
                                }}
                            >
                                <h1 class="text-2xl font-black leading-none text-white uppercase font-bebas-neue sm:text-3xl dark:text-white">
                                    Belajar Hal Baru
                                </h1>
                                <h1
                                    className="flex flex-col text-6xl mt-3 font-black leading-none text-gray-800 uppercase font-bebas-neue sm:text-5xl dark:text-white"
                                    style={{
                                        textShadow: "0 0 5px #00f",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    Dimana Saja, Kapan Saja
                                </h1>
                                <div class="flex mt-8">
                                    <button
                                        onClick={() =>
                                            (window.location.href =
                                                route("login"))
                                        }
                                        class="px-4 py-2 mr-4 text-white uppercase bg-blue-500 border-2 border-transparent rounded-lg text-md hover:bg-blue-800"
                                    >
                                        Learn Now
                                    </button>
                                    <button
                                        href="#"
                                        class="px-4 py-2 text-pink-500 uppercase bg-transparent border-2 border-blue-500 rounded-lg dark:text-white hover:bg-blue-800 hover:text-white text-md"
                                    >
                                        Read more
                                    </button>
                                </div>
                            </div>
                            <div class="relative hidden sm:block sm:w-1/3 lg:w-3/5 z-10">
                                <div
                                    class="flex items-center gap-8 p-8 lg:p-24"
                                    style={{
                                        marginTop: "-113px",
                                        marginLeft: "105px",
                                    }}
                                >
                                    <img
                                        src={Portrait1}
                                        alt="Event"
                                        style={{
                                            width: "270px",
                                            height: "300px",
                                            objectFit: "cover",
                                            borderRadius: "60px",
                                        }}
                                    />
                                    <div>
                                        <img
                                            src={Lanscape1}
                                            class="mb-8"
                                            alt="Event"
                                            style={{
                                                width: "230px",
                                                height: "230px",
                                                objectFit: "cover",
                                                borderRadius: "50px",
                                            }}
                                        />
                                        <img
                                            src={Lanscape2}
                                            alt="Event"
                                            style={{
                                                width: "230px",
                                                height: "230px",
                                                objectFit: "cover",
                                                borderRadius: "50px",
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
