import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import React, { useState, useEffect } from "react";

export default function Penugasan({ auth }) {
    const [uploadStatus, setUploadStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            await Inertia.post(route("penugasan.store"), formData);
            setTimeout(() => {
                setUploadStatus(null);
            }, 2000);
            setUploadStatus("success");
        } catch (error) {
            // Handle errors, display a message, etc.
        }
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
                        Penugasan
                    </h2>
                </div>
            }
        >
            <Head title="Penugasan" />

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
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="h-screen"
                    style={{ marginLeft: "25px", marginTop: "20px" }}
                >
                    <div className="mb-4">
                        <label
                            htmlFor="judul"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                        >
                            Judul Tugas
                        </label>
                        <input
                            type="text"
                            id="judul"
                            name="judul"
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-[1100px] p-2 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Masukkan judul tugas"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="tanggal_tenggat"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                        >
                            Tanggal Tenggat
                        </label>
                        <input
                            type="date"
                            id="tangga_tenggat"
                            name="tanggal_tenggat"
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-[1100px] p-2 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="waktu_tenggat"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                        >
                            Waktu Tenggat
                        </label>
                        <input
                            type="time"
                            id="waktu_tenggat"
                            name="waktu_tenggat"
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-[1100px] p-2 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="deskripsi"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                        >
                            Deskripsi Tugas
                        </label>
                        <textarea
                            name="deskripsi"
                            id="deskripsi"
                            rows="4"
                            className="block p-2.5 w-[1100px] text-sm text-gray-900 bg-white rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Berikan deskripsi untuk tugas yang Anda unggah..."
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            htmlFor="file_pendukung"
                        >
                            File Pendukung
                        </label>
                        <input
                            className="block w-[1100px] p-2 text-sm text-black border border-gray-300 rounded-md cursor-pointer bg-white dark:text-gray-600 focus:outline-none dark:bg-white dark:border-gray-300 dark:placeholder-gray-300"
                            name="file_pendukung"
                            id="file_pendukung"
                            type="file"
                        />
                    </div>
                    <div
                        className="flex justify-between"
                        style={{ marginTop: "100px" }}
                    >
                        <Link href={route("akseskelas")}>
                            <button
                                className="flex text-white bg-cyan-600 hover:bg-cyan-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-cyan-600 dark:hover:bg-cyan-700 focus:bg-cyan-700 active:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2 transition ease-in-out duration-150 "
                                type="button"
                            >
                                Kembali
                            </button>
                        </Link>
                        <div className="flex items-center gap-5">
                            {uploadStatus === "success" && (
                                <p className="text-sm text-green-600">
                                    Tugas berhasil diupload!
                                </p>
                            )}

                            {uploadStatus === "error" && (
                                <p className="text-sm text-red-600">
                                    Terjadi kesalahan saat mengupload tugas.
                                </p>
                            )}
                            <button
                                type="submit"
                                className="flex text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 "
                                style={{ marginRight: "20px" }}
                            >
                                Unggah
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
