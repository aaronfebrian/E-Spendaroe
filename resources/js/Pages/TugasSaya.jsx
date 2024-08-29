import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Featured from "../Assets/Featuredicon.png";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { Link } from "@inertiajs/react";

export default function TugasSaya({ auth, tugasTerbaru }) {
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
                        Tugas Saya
                    </h2>
                </div>
            }
        >
            <Head title="Tugas Saya" />
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
                {tugasTerbaru.length > 0 ? (
                    <ul className="flex flex-col" style={{ marginTop: "30px" }}>
                        {tugasTerbaru.map((tugas) => (
                            <li
                                key={tugas.id}
                                className="flex flex-row mb-2 border-gray-400"
                                style={{ width: "1100px", marginLeft: "25px" }}
                            >
                                <div className="shadow border select-none bg-white rounded-md flex flex-1 items-center p-4">
                                    <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
                                        <div className="relative block">
                                            <img
                                                alt="profil"
                                                src={Featured}
                                                className="mx-auto object-cover rounded-full h-10 w-10"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1 pl-1">
                                        <div className="text-md text-black-600 dark:text-black-200 font-bold">
                                            {tugas.judul}
                                        </div>
                                        <div className="flex items-center text-sm text-black-600 dark:text-black-200">
                                            <span className="mr-2">
                                                Batas pengumpulan:{" "}
                                                {new Intl.DateTimeFormat(
                                                    "id-ID",
                                                    {
                                                        year: "numeric",
                                                        month: "2-digit",
                                                        day: "2-digit",
                                                    }
                                                ).format(
                                                    new Date(
                                                        tugas.tanggal_tenggat
                                                    )
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-sm text-black-600 dark:text-black-200">
                                            <span>
                                                Pukul : {tugas.waktu_tenggat}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => {
                                                window.location.href = route(
                                                    "PenugasanShow",
                                                    {
                                                        id: tugas.id,
                                                    }
                                                );
                                            }}
                                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 dark:hover:bg-blue-700 focus:bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-indigo-500 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-offset-2 transition ease-in-out duration-150"
                                        >
                                            Detail Tugas
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
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="mt-8 text-gray-500 ml-6">
                        Belum ada tugas yang harus diselesaikan.
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
