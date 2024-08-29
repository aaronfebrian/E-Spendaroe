// resources/js/Pages/EditSiswa.js

import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";

const EditAdmin = ({ auth, admin }) => {
    const [data, setData] = useState({
        name: admin.name,
        email: admin.email,
        password: "",
        telepon: admin.telepon,
    });

    const [isSuccessMessageVisible, setIsSuccessMessageVisible] =
        useState(false);

    const submit = (e) => {
        e.preventDefault();
        axios
            .put(`/update-admin/${admin.id}`, data)
            .then((response) => {
                console.log("Admin berhasil diperbarui:", response.data);
                setIsSuccessMessageVisible(true);
                // Tandai bahwa notifikasi flash telah diterima
                Inertia.reload({ only: ["flash"] });
            })
            .catch((error) => {
                console.error("Error saat memperbarui guru:", error);
                setIsSuccessMessageVisible(true);
                setTimeout(() => {
                    setIsSuccessMessageVisible(false);
                }, 2000);
            });
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
                        Edit Admin
                    </h2>
                </div>
            }
        >
            <Head title="Edit Admin" />

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
                            Nama Admin
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-[1100px] p-2 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Masukkan nama admin"
                            value={data.name}
                            required
                            onChange={(e) =>
                                setData({ ...data, name: e.target.value })
                            }
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
                            placeholder="Masukkan email admin"
                            value={data.email}
                            required
                            onChange={(e) =>
                                setData({ ...data, email: e.target.value })
                            }
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
                            value={data.password}
                            required
                            onChange={(e) =>
                                setData({ ...data, password: e.target.value })
                            }
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="jenis_kelamin"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                        >
                            Jenis Kelamin
                        </label>
                        <select
                            id="jenis_kelamin"
                            name="jenis_kelamin"
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    jenis_kelamin: e.target.value,
                                })
                            }
                            className="mt-1 block w-full rounded-md border border-gray-300"
                            style={{ width: "1100px" }}
                        >
                            <option value="">Pilih</option>
                            <option value="Laki-Laki">Laki-Laki</option>
                            <option value="Perempuan">Perempuan</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="telepon"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                        >
                            Telepon
                        </label>
                        <input
                            type="telepon"
                            id="telepon"
                            name="telepon"
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-[1100px] p-2 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Masukkan password 8 digit"
                            value={data.telepon}
                            required
                            onChange={(e) =>
                                setData({ ...data, telepon: e.target.value })
                            }
                        />
                    </div>
                    <div
                        className="flex justify-between"
                        style={{ marginTop: "100px" }}
                    >
                        <Link href={route("admin.index")}>
                            <button
                                className="bg-white border border-blue-700 hover-bg-blue-800 hover-border-blue-800 focus-ring-4 focus-outline-gray-300 focus-ring-blue-300 font-medium rounded-md text-blue-700 hover-text-white text-sm w-64 sm:w-auto px-5 py-2.5 text-center dark-bg-blue-600 dark-hover-bg-blue-700 dark-focus-ring-blue-800 dark-border-blue-600 dark-hover-border-blue-700"
                                type="button"
                            >
                                Kembali
                            </button>
                        </Link>
                        <div className="flex items-center gap-5">
                            {isSuccessMessageVisible && (
                                <p className="text-sm text-green-600">
                                    Perubahan berhasil disimpan
                                </p>
                            )}
                            <button
                                type="submit"
                                className="text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 dark:hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 "
                                style={{ marginRight: "20px" }}
                            >
                                Simpan Perubahan
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default EditAdmin;
