import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Featured from "../Assets/Featuredicon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeftLong,
    faArrowRightLong,
    faTrashCan,
    faPenToSquare,
    faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import PDF from "../Assets/pdf.png";
import { IoMdDownload } from "react-icons/io";
import { IoEyeSharp } from "react-icons/io5";

export default function LihatMateri({ auth, materis }) {
    const [teachers, setTeachers] = useState([]);
    const [daftarMateri, setDaftarMateri] = useState([]);
    const [previewUrl, setPreviewUrl] = useState(null);

    const getFileType = (fileName) => {
        const extension = fileName.split(".").pop();
        if (["jpg", "jpeg", "png", "gif"].includes(extension)) {
            return "image";
        } else if (["mp4", "webm"].includes(extension)) {
            return "video";
        } else {
            return "document";
        }
    };

    useEffect(() => {
        setDaftarMateri(materis);
    }, [materis]);

    const hapusMateri = async (materiId) => {
        if (window.confirm("Anda yakin ingin menghapus materi ini?")) {
            try {
                await axios.delete(`/materi/${materiId}`); // Sesuaikan dengan rute yang digunakan di backend
                setDaftarMateri((materis) =>
                    materis.filter((materi) => materi.id !== materiId)
                );
                alert("Materi berhasil dihapus"); // Tambahkan notifikasi atau pesan flash
            } catch (error) {
                console.error("Error:", error);
                alert("Gagal menghapus materi"); // Tambahkan notifikasi atau pesan flash
            }
        }
    };

    const viewFile = (fileId) => {
        // Ganti URL sesuai dengan endpoint atau route di backend untuk mendapatkan file
        const fileUrl = `/materi/view/${fileId}`;
        window.open(fileUrl, "_blank");
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
                        Materi Pembelajaran
                    </h2>
                    <p className="text-gray-600">{}</p>
                </div>
            }
        >
            <Head title="Lihat Materi" />
            <div
                className="container mx-auto"
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
                    className="flex justify-between"
                    style={{ marginTop: "30px", marginLeft: "20px" }}
                >
                    <Link href={route("akseskelas")}>
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
                <div
                    className="grid grid-cols-2 gap-4 "
                    style={{
                        marginLeft: "20px",
                        marginTop: "25px",
                        marginRight: "20px",
                        marginBottom: "25px",
                    }}
                >
                    {daftarMateri.length > 0 ? (
                        daftarMateri.map((materi) => (
                            <div
                                key={materi.id}
                                className="bg-white border border-gray-200 rounded-lg shadow hover-bg-gray-100 dark-bg-gray-800 dark-border-gray-700 dark-hover-bg-gray-700"
                            >
                                <div
                                    className="bg-blue-500 dark:bg-blue-500"
                                    style={{
                                        borderTopLeftRadius: "8px",
                                        borderTopRightRadius: "8px",
                                        height: "40px",
                                        paddingTop: "5px",
                                    }}
                                >
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-white dark-text-white text-center">
                                        {materi.subject.subject_name}
                                    </h5>
                                </div>
                                <div className="p-5">
                                    <a href="#">
                                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark-text-white">
                                            {materi.judul}
                                        </h5>
                                    </a>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                        {materi.deskripsi}
                                    </p>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                        Diupload pada :{" "}
                                        {new Intl.DateTimeFormat("id-ID", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                        }).format(
                                            new Date(materi.tanggal_upload)
                                        )}
                                    </p>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                        Oleh : {materi.guru.user.name}
                                    </p>
                                    <p
                                        className="mb-3 font-bold text-black dark:text-black"
                                        style={{ marginTop: "30px" }}
                                    >
                                        Lampiran :
                                    </p>

                                    <div
                                        className="flex justify-between"
                                        style={{ alignItems: "stretch" }}
                                    >
                                        <div
                                            className="flex border border-grey"
                                            style={{
                                                height: "60px",
                                                borderRadius: "5px",
                                                flex: 1,
                                                justifyContent: "space-between", // Tambahkan ini untuk menyusun item di sepanjang sumbu utama
                                                alignItems: "center", // Tambahkan ini untuk menyusun item di sepanjang sumbu lintang
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <img
                                                    src={PDF}
                                                    alt=""
                                                    style={{
                                                        width: "30px",
                                                        height: "30px",
                                                        marginLeft: "10px",
                                                    }}
                                                />
                                                <p
                                                    style={{
                                                        textAlign: "start",
                                                        marginLeft: "10px",
                                                    }}
                                                >
                                                    {materi.file_pendukung && (
                                                        <span>
                                                            {materi.file_pendukung
                                                                .replace(
                                                                    /^\d+/,
                                                                    ""
                                                                )
                                                                .substring(
                                                                    0,
                                                                    30
                                                                )}
                                                            {materi
                                                                .file_pendukung
                                                                .length > 30
                                                                ? "..."
                                                                : ""}
                                                        </span>
                                                    )}
                                                </p>
                                            </div>
                                            <div style={{ display: "flex" }}>
                                                <button
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                    onClick={() =>
                                                        viewFile(materi.id)
                                                    }
                                                    style={{
                                                        marginLeft: "20px",
                                                    }}
                                                >
                                                    <IoEyeSharp className="w-5 h-5 ml-2 text-gray-700" />
                                                </button>
                                                <button
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                    style={{
                                                        marginRight: "15px",
                                                        marginLeft: "5px",
                                                    }}
                                                    onClick={() =>
                                                        window.open(
                                                            `/materi/download/${materi.id}`,
                                                            "_blank"
                                                        )
                                                    }
                                                >
                                                    <IoMdDownload className="w-5 h-5 ml-2 text-gray-700" />
                                                </button>
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                marginTop: "20px",
                                                marginLeft: "10px",
                                                flex: "none",
                                            }}
                                        >
                                            <button
                                                className="text-indigo-600 hover:text-indigo-900"
                                                onClick={() =>
                                                    hapusMateri(materi.id)
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrashCan}
                                                    style={{
                                                        color: "#ff0000",
                                                        marginRight: "5px",
                                                    }}
                                                    className="w-5 h-5 ml-2"
                                                />
                                            </button>
                                            <a
                                                href={`/materi/edit/${materi.id}`}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faPenToSquare}
                                                    className="w-5 h-5 ml-3"
                                                    style={{
                                                        color: "#FF9209",
                                                    }}
                                                />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Belum ada materi yang diupload.</p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
