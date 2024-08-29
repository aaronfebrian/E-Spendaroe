import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import axios from "axios";

export default function DaftarSiswa({ auth, siswas }) {
    const { data, setData, post } = useForm({
        name: null,
        email: null,
        password: null,
        jenis_kelamin: null,
        nis: null,
        class: null,
        subject: null,
    });
    const submit = (e) => {
        e.preventDefault();
        post("/siswa");
    };

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
                        Tambah Siswa
                    </h2>
                </div>
            }
        >
            <Head title="Tambah Siswa" />

            <div
                style={{
                    marginLeft: "10px",
                    padding: "20px",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
            >
                <form
                    className="h-screen"
                    onSubmit={submit}
                    style={{ marginLeft: "25px", marginTop: "20px" }}
                >
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                        >
                            Nama Siswa
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-[1100px] p-2 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Masukkan nama siswa"
                            required
                            onChange={(e) => setData("name", e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-[1100px] p-2 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Masukkan email siswa"
                            required
                            onChange={(e) => setData("email", e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-[1100px] p-2 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Masukkan password 8 digit"
                            required
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="class"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            style={{width: '1100px'}}
                        >
                            Jenis Kelamin
                        </label>
                        <select
                            id="jenis_kelamin"
                            name="jenis_kelamin"
                            onChange={(e) =>
                                setData("jenis_kelamin", e.target.value)
                            }
                            className="mt-1 block w-full rounded-md border border-gray-300"
                            style={{width: '1100px'}}   
                        >
                            <option value="">Pilih</option>
                            <option value="Laki-Laki">Laki-Laki</option>
                            <option value="Perempuan">Perempuan</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="nis"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                        >
                            NIS
                        </label>
                        <input
                            type="text"
                            id="nis"
                            name="nis"
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-[1100px] p-2 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Masukkan nis siswa"
                            required
                            onChange={(e) => setData("nis", e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="class"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            style={{width: '1100px'}}
                        >
                            Kelas
                        </label>
                        <select
                            id="class"
                            name="class"
                            onChange={(e) => setData("class", e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300"
                            style={{width: '1100px'}}
                        >
                            <option value="">Pilih Kelas</option>
                            <option value="7A">Kelas 7A</option>
                            <option value="7B">Kelas 7B</option>
                            <option value="7C">Kelas 7C</option>
                            <option value="7D">Kelas 7D</option>
                            <option value="8A">Kelas 8A</option>
                            <option value="8B">Kelas 8B</option>
                            <option value="8C">Kelas 8C</option>
                            <option value="8D">Kelas 8D</option>
                            <option value="9A">Kelas 9A</option>
                            <option value="9B">Kelas 9B</option>
                            <option value="9C">Kelas 9C</option>
                            <option value="9D">Kelas 9D</option>
                        </select>
                    </div>
                    <div
                        className="flex justify-between"
                        style={{ marginTop: "100px" }}
                    >
                        <Link href={route("siswa.index")}>
                            <button
                                className="bg-white border border-blue-700 hover-bg-blue-800 hover-border-blue-800 focus-ring-4 focus-outline-gray-300 focus-ring-blue-300 font-medium rounded-md text-blue-700 hover-text-white text-sm w-64 sm:w-auto px-5 py-2.5 text-center dark-bg-blue-600 dark-hover-bg-blue-700 dark-focus-ring-blue-800 dark-border-blue-600 dark-hover-border-blue-700"
                                type="button"
                            >
                                Kembali
                            </button>
                        </Link>
                        <button
                            type="submit"
                            className="text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 "
                            style={{ marginRight: "20px" }}
                        >
                            Tambahkan
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
