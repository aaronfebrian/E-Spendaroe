import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";

export default function UnggahMateri({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        judul: null,
        tanggal_upload: null,
        deskripsi: null,
        file_pendukung: null,
    });

    console.log(data)
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("judul", data.judul);
        formData.append("tanggal_upload", data.tanggal_upload);
        formData.append("deskripsi", data.deskripsi);
        formData.append("file_pendukung", data.file_pendukung);

        post(route("materi.store"), formData, {
            onSuccess: () => {
                setData({
                    judul: null,
                    tanggal_upload: null,
                    deskripsi: null,
                    file_pendukung: null,
                });
            },
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
                        Unggah Materi
                    </h2>
                </div>
            }
        >
            <Head title="Unggah Materi" />

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
                            Judul Materi
                        </label>
                        <input
                            type="text"
                            id="judul"
                            name="judul"
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-[1100px] p-2 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Masukkan judul materi"
                            required
                            onChange={(e) => setData("judul", e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="tanggal_upload"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                        >
                            Tanggal Upload
                        </label>
                        <input
                            type="date"
                            id="tanggal_upload"
                            name="tanggal_upload"
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-[1100px] p-2 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                            onChange={(e) => setData("tanggal_upload", e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="deskripsi"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                        >
                            Deskripsi Materi
                        </label>
                        <textarea
                            name="deskripsi"
                            id="deskripsi"
                            rows="4"
                            className="block p-2.5 w-[1100px] text-sm text-gray-900 bg-white rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Berikan deskripsi untuk materi yang anda unggah..."
                            onChange={(e) => setData("deskripsi", e.target.value)}
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
                            onChange={(e) => setData("file_pendukung", e.target.files[0])}
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
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 "
                            style={{ marginRight: "20px" }}
                        >
                            Unggah
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
