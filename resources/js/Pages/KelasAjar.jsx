import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Featured from "../Assets/Featuredicon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function KelasAjar({ auth, userGuru }) {
    const guru = userGuru.guru;
    // console.log(userGuru);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div
                    style={{
                        marginLeft: "10px",
                        padding: "20px",
                        backgroundColor: "white",
                        borderRadius: "10px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Kelas Ajar
                    </h2>
                </div>
            }
        >
            <Head title="Kelas Ajar" />
            <div
                className="container mx-auto h-screen"
                style={{
                    marginLeft: "10px",
                    padding: "20px",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    width: "1185px",
                }}
            >
                <div
                    className="flex space-x-4"
                    style={{
                        marginLeft: "20px",
                        marginRight: "20px",
                        marginTop: "30px",
                    }}
                >
                    <div className="flex-1 max-w-sm bg-white border border-gray-200 rounded-lg shadow hover-bg-gray-100 dark-bg-gray-800 dark-border-gray-700 dark-hover-bg-gray-700">
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark-text-white">
                                    Kelas {guru.class}
                                </h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                {guru.subject}
                            </p>    
                            <button
                                onClick={() =>
                                    (window.location.href = route("akseskelas"))
                                }
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 dark:hover:bg-blue-700 focus:bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-indigo-500 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                Akses Kelas
                                <FontAwesomeIcon
                                    icon={faArrowRightLong}
                                    className="w-4 h-4"
                                    style={{
                                        marginTop: "2px",
                                        marginLeft: "9px",
                                    }}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
