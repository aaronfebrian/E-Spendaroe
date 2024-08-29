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

export default function PenugasanShow({ auth, tugas, studentassignment }) {
    const viewFile = (fileId) => {
        // Ganti URL sesuai dengan endpoint atau route di backend untuk mendapatkan file
        const fileUrl = `/penugasan/view/${fileId}`; // Sesuaikan dengan endpoint yang benar
        window.open(fileUrl, "_blank");
    };

    const viewJawabanSiswa = (fileId) => {
        // Ganti URL sesuai dengan endpoint atau route di backend untuk mendapatkan file
        const fileUrl = `/penugasan/view/${fileId}`; // Sesuaikan dengan endpoint yang benar
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
                        {tugas.subject.subject_name}
                    </h2>
                    <p className="text-gray-600">{}</p>
                </div>
            }
        >
            <Head title="Detail Tugas" />
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
                    <Link href={route("TugasSaya")}>
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
                    className="flex gap-5"
                    style={{
                        marginLeft: "20px",
                        marginTop: "25px",
                        marginRight: "20px",
                        marginBottom: "25px",
                    }}
                >
                    <div className="bg-white border border-gray-200 rounded-lg shadow hover-bg-gray-100 dark-bg-gray-800 dark-border-gray-700 dark-hover-bg-gray-700 w-full">
                        <div className="p-5">
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark-text-white">
                                {tugas.judul}
                            </h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                {tugas.deskripsi}
                            </p>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Batas Pengumpulan :{" "}
                                {new Intl.DateTimeFormat("id-ID", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                }).format(new Date(tugas.tanggal_tenggat))}
                            </p>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Pukul : {tugas.waktu_tenggat}
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
                                            {tugas.file_pendukung && (
                                                <span>
                                                    {tugas.file_pendukung
                                                        .replace(/^\d+/, "")
                                                        .substring(0, 30)}
                                                    {tugas.file_pendukung
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
                                            onClick={() => viewFile(tugas.id)}
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
                                                    `/penugasan/download/${tugas.id}`,
                                                    "_blank"
                                                )
                                            }
                                        >
                                            <IoMdDownload className="w-5 h-5 ml-2 text-gray-700" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg shadow hover-bg-gray-100 dark-bg-gray-800 dark-border-gray-700 dark-hover-bg-gray-700 w-full">
                        <div className="p-5">
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark-text-white">
                                Pengumpulan Tugas
                            </h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Catatan :{" "}
                                {studentassignment && studentassignment.catatan}
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
                                {studentassignment &&
                                studentassignment.file_pendukung ? (
                                    <div
                                        className="flex border border-grey"
                                        style={{
                                            height: "60px",
                                            borderRadius: "5px",
                                            flex: 1,
                                            justifyContent: "space-between",
                                            alignItems: "center",
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
                                                <span>
                                                    {studentassignment.file_pendukung
                                                        .replace(/^\d+/, "")
                                                        .substring(0, 30)}
                                                    {studentassignment
                                                        .file_pendukung.length >
                                                    30
                                                        ? "..."
                                                        : ""}
                                                </span>
                                            </p>
                                        </div>
                                        <div style={{ display: "flex" }}>
                                            <button
                                                className="text-indigo-600 hover:text-indigo-900"
                                                onClick={() =>
                                                    viewJawabanSiswa(
                                                        studentassignment.id
                                                    )
                                                }
                                                style={{ marginLeft: "20px" }}
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
                                                        `/penugasan/download/${studentassignment.id}`,
                                                        "_blank"
                                                    )
                                                }
                                            >
                                                <IoMdDownload className="w-5 h-5 ml-2 text-gray-700" />
                                            </button>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                            <div style={{ marginTop: "30px" }}>
                                {studentassignment &&
                                studentassignment.file_pendukung ? (
                                    // Jika sudah ada file pendukung, tampilkan button "Edit Jawaban"
                                    <Link
                                        href={route(
                                            "penugasan.showUpdateJawabanForm",
                                            { id: tugas.id }
                                        )}
                                    >
                                        <button
                                            type="button"
                                            className="justify-center flex text-white bg-yellow-500 hover:bg-yellow-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-yellow-500 dark:hover:bg-yellow-600 focus:bg-yellow-600 active:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 transition ease-in-out duration-150 w-full"
                                        >
                                            Edit Jawaban
                                        </button>
                                    </Link>
                                ) : (
                                    // Jika belum ada file pendukung, tampilkan button "Upload Jawaban"
                                    <Link
                                        href={route(
                                            "penugasan.showUploadForm",
                                            { id: tugas.id }
                                        )}
                                    >
                                        <button
                                            type="button"
                                            className="justify-center flex text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-500 dark:hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition ease-in-out duration-150 w-full"
                                        >
                                            Upload Jawaban
                                        </button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
