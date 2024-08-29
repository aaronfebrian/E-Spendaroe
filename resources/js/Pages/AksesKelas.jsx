import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faClipboardList,
    faClipboardCheck,
    faCirclePlus,
    faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import axios from "axios";

export default function AksesKelas({ auth, siswas, guru }) {
    const [daftarSiswa, setAksesKelas] = useState(siswas);

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
                    <p className="text-gray-600">
                        Daftar Siswa Kelas {guru.class}.
                    </p>
                </div>
            }
        >
            <Head title="Daftar Siswa" />
            <div
                style={{
                    marginLeft: "10px",
                    padding: "20px",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    marginTop: "-20px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
            >
                <div
                    class="container max-w-8xl px-4 mx-auto sm:px-8"
                    style={{ marginTop: "-50px" }}
                >
                    <div class="py-8">
                        <div className="flex justify-between">
                            <div>
                                <div
                                    style={{
                                        marginRight: "-7px",
                                        marginTop: "30px",
                                    }}
                                >
                                    <Link href={route("kelas-ajar.index")}>
                                        <button
                                            type="button"
                                            className="flex text-white bg-cyan-500 hover:bg-cyan-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-cyan-500 dark:hover:bg-cyan-600 focus:bg-cyan-600 active:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2 transition ease-in-out duration-150 "
                                        >
                                            <FontAwesomeIcon
                                                icon={faArrowLeftLong}
                                                className="mr-2 w-4 h-4"
                                                style={{
                                                    marginTop: "2px",
                                                    marginLeft: "-2px",
                                                }}
                                            />
                                            Kembali
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-end gap-5">
                                    <div
                                        style={{
                                            marginRight: "-7px",
                                            marginTop: "30px",
                                        }}
                                    >
                                        <Link href={route("materi.index")}>
                                            <button
                                                type="button"
                                                className="flex text-white bg-yellow-500 hover:bg-yellow-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-yellow-500 dark:hover:bg-yellow-600 focus:bg-yellow-700 active:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 transition ease-in-out duration-150 "
                                                style={{ marginRight: "-1px" }}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faClipboardList}
                                                    className="mr-2 w-4 h-4"
                                                    style={{
                                                        marginTop: "2px",
                                                        marginLeft: "-4px",
                                                    }}
                                                />
                                                Daftar Materi
                                            </button>
                                        </Link>
                                    </div>
                                    <div
                                        style={{
                                            marginRight: "-7px",
                                            marginTop: "30px",
                                        }}
                                    >
                                        <Link href={route("penugasan.index")}>
                                            <button
                                                type="button"
                                                className="flex text-white bg-yellow-500 hover:bg-yellow-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-yellow-500 dark:hover:bg-yellow-600 focus:bg-yellow-700 active:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 transition ease-in-out duration-150 "
                                                style={{ marginRight: "-1px" }}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faClipboardCheck}
                                                    className="mr-2 w-4 h-4"
                                                    style={{
                                                        marginTop: "2px",
                                                        marginLeft: "-4px",
                                                    }}
                                                />
                                                Lihat Penugasan
                                            </button>
                                        </Link>
                                    </div>
                                    <div
                                        style={{
                                            marginRight: "-7px",
                                            marginTop: "30px",
                                        }}
                                    >
                                        <Link href={route("materi.create")}>
                                            <button
                                                type="button"
                                                className="flex text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 "
                                                style={{ marginRight: "-1px" }}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faCirclePlus}
                                                    className="mr-2 w-4 h-4"
                                                    style={{
                                                        marginTop: "2px",
                                                        marginLeft: "-2px",
                                                    }}
                                                />
                                                Tambah Materi
                                            </button>
                                        </Link>
                                    </div>
                                    <div
                                        style={{
                                            marginRight: "-7px",
                                            marginTop: "30px",
                                        }}
                                    >
                                        <Link href={route("penugasan.create")}>
                                            <button
                                                type="button"
                                                className="flex text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 "
                                            >
                                                <FontAwesomeIcon
                                                    icon={faCirclePlus}
                                                    className="mr-2 w-4 h-4"
                                                    style={{
                                                        marginTop: "2px",
                                                        marginLeft: "-2px",
                                                    }}
                                                />
                                                Beri Penugasan
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                            <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
                                <table class="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-5 py-3 text-sm font-normal text-left text-white uppercase bg-blue-500 border-b border-gray-200"
                                            >
                                                Nama Siswa
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-5 py-3 text-sm font-normal text-left text-white uppercase bg-blue-500 border-b border-gray-200"
                                            >
                                                NIS
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-5 py-3 text-sm font-normal text-left text-white uppercase bg-blue-500 border-b border-gray-200"
                                            >
                                                Kelas
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-5 py-3 text-sm font-normal text-left text-white uppercase bg-blue-500 border-b border-gray-200"
                                            >
                                                Jenis Kelamin
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-5 py-3 text-sm font-normal text-left text-white uppercase bg-blue-500 border-b border-gray-200"
                                            >
                                                Kedudukan
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {daftarSiswa.map((siswa) => (
                                            <tr key={siswa.id}>
                                                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                    <p class="text-gray-900 whitespace-no-wrap">
                                                        {siswa.name}
                                                    </p>
                                                </td>
                                                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                    <p class="text-gray-900 whitespace-no-wrap">
                                                        {siswa.nis}
                                                    </p>
                                                </td>
                                                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                    <p class="text-gray-900 whitespace-no-wrap">
                                                        {siswa.class}
                                                    </p>
                                                </td>
                                                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                    <p class="text-gray-900 whitespace-no-wrap">
                                                        {siswa.jenis_kelamin}
                                                    </p>
                                                </td>
                                                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                    <p class="text-gray-900 whitespace-no-wrap">
                                                        {siswa.role}
                                                    </p>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
