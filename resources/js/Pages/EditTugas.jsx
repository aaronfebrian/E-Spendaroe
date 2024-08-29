// resources/js/Pages/EditSiswa.js

import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, router } from "@inertiajs/react";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";

const EditTugas = ({ auth, tugas }) => {
    console.log(tugas);
    const { data, setData, post, processing, errors } = useForm({
        judul: tugas.judul,
        tanggal_tenggat: tugas.tanggal_tenggat,
        waktu_tenggat: tugas.waktu_tenggat,
        deskripsi: tugas.deskripsi,
        file_pendukung: null,
    });
    const [isSuccessMessageVisible, setIsSuccessMessageVisible] =
        useState(false);
    console.log(data);

    const submit = (e) => {
        e.preventDefault();
        router.post(`/penugasan/${tugas.id}`, {
            _method: "put",
            judul: data.judul,
            tanggal_tenggat: data.tanggal_tenggat,
            waktu_tenggat: data.waktu_tenggat,
            deskripsi: data.deskripsi,
            file_pendukung: data.file_pendukung,
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
                        Edit Tugas
                    </h2>
                </div>
            }
        >
            <Head title="Edit Tugas" />

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
                            value={data.judul}
                            onChange={(e) =>
                                setData({ ...data, judul: e.target.value })
                            }
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
                            id="tanggal_tenggat"
                            name="tanggal_tenggat"
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-[1100px] p-2 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={data.tanggal_tenggat}
                            onChange={(e) =>
                                setData("tanggal_tenggat", e.target.value)
                            }
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
                            value={data.waktu_tenggat}
                            onChange={(e) =>
                                setData("waktu_tenggat", e.target.value)
                            }
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
                            placeholder="Berikan deskripsi untuk tugas yang anda unggah..."
                            value={data.deskripsi}
                            onChange={(e) =>
                                setData({ ...data, deskripsi: e.target.value })
                            }
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
                            onChange={(e) =>
                                setData("file_pendukung", e.target.files[0])
                            }
                        />
                    </div>
                    <div
                        className="flex justify-between"
                        style={{ marginTop: "100px" }}
                    >
                        <Link href={route("penugasan.index")}>
                            <button
                                className="flex text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:bg-green-700 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 transition ease-in-out duration-150 "
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

export default EditTugas;
