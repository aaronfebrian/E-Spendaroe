import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeftLong,
    faTrashCan,
    faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import PDF from "../Assets/pdf.png";
import { IoMdDownload } from "react-icons/io";
import { IoEyeSharp } from "react-icons/io5";

export default function PenugasanGuruShow({
    auth,
    siswas,
    guru,
    tugas,
    studentassignment,
}) {
    const [daftarSiswa, setDaftarSiswa] = useState(siswas);

    useEffect(() => {
        setDaftarSiswa(siswas);
    }, [siswas]);

    const viewFile = (fileId) => {
        // Ganti URL sesuai dengan endpoint atau route di backend untuk mendapatkan file
        const fileUrl = `/penugasan/view/${fileId}`;
        window.open(fileUrl, "_blank");
    };

    const viewJawabanSiswa = (fileId) => {
        // Ganti URL sesuai dengan endpoint atau route di backend untuk mendapatkan file
        const fileUrl = `/penugasan/view/${fileId}`; // Sesuaikan dengan endpoint yang benar
        window.open(fileUrl, "_blank");
    };

    const hapusTugas = async (tugasId) => {
        if (window.confirm("Anda yakin ingin menghapus tugas ini?")) {
            try {
                await axios.delete(`/penugasan/${tugasId}`); // Sesuaikan dengan rute yang digunakan di backend
                setDaftarTugas((tugas) =>
                    tugas.filter((tugas) => tugas.id !== tugasId)
                );
                alert("Tugas berhasil dihapus"); // Tambahkan notifikasi atau pesan flash
            } catch (error) {
                console.error("Error:", error);
                alert("Gagal menghapus tugas"); // Tambahkan notifikasi atau pesan flash
            }
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
                    <Link href={route("penugasan.index")}>
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
                                style={{ width: "670px" }}
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
                                                        .substring(0, 50)}
                                                    {tugas.file_pendukung
                                                        .length > 50
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
                                {/* <div>
                                    <div
                                        style={{
                                            marginTop: "20px",
                                            marginLeft: "10px",
                                            flex: "none",
                                        }}
                                    >
                                        <button
                                            className="text-indigo-600 hover:text-indigo-900"
                                            onClick={() => hapusTugas(tugas.id)}
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
                                            href={`/penugasan/edit/${tugas.id}`}
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
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        marginLeft: "20px",
                        marginRight: "20px",
                        marginTop: "10px",
                        marginBottom: "10px",
                    }}
                >
                    <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                        <table className="min-w-full leading-normal">
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
                                        Waktu Pengumpulan
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 text-sm font-normal text-left text-white uppercase bg-blue-500 border-b border-gray-200"
                                    >
                                        Status Pengumpulan
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 text-sm font-normal text-left text-white uppercase bg-blue-500 border-b border-gray-200"
                                    >
                                        File Jawaban
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 text-sm font-normal text-left text-white uppercase bg-blue-500 border-b border-gray-200"
                                    ></th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentassignment.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {item.siswa.user.name}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {item.siswa.nis}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {item.siswa.class}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {new Intl.DateTimeFormat(
                                                    "id-ID",
                                                    {
                                                        year: "numeric",
                                                        month: "2-digit",
                                                        day: "2-digit",
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    }
                                                ).format(
                                                    new Date(item.updated_at)
                                                )}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {item.status_pengumpulan}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {item.file_pendukung && (
                                                    <span>
                                                        {item.file_pendukung
                                                            .replace(/^\d+/, "")
                                                            .substring(0, 30)}
                                                        {item.file_pendukung
                                                            .length > 30
                                                            ? "..."
                                                            : ""}
                                                    </span>
                                                )}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                            <div className="flex">
                                                <button
                                                    className="justify-center bg-yellow-500 hover:bg-yellow-600 rounded-lg text-sm dark:bg-yellow-500 dark:hover:bg-yellow-600 focus:bg-yellow-600 active:bg-yellow-600 transition ease-in-out duration-150"
                                                    onClick={() =>
                                                        viewJawabanSiswa(
                                                            item.id
                                                        )
                                                    }
                                                    style={{
                                                        padding: "5px",
                                                    }}
                                                >
                                                    <IoEyeSharp
                                                        className="w-5 h-5 text-gray-700"
                                                        style={{
                                                            color: "white",
                                                        }}
                                                    />
                                                </button>
                                                <button
                                                    className="justify-center bg-blue-500 hover:bg-blue-600 rounded-lg text-sm dark:bg-blue-500 dark:hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-600 transition ease-in-out duration-150"
                                                    style={{
                                                        padding: "5px",
                                                        marginLeft: "7px",
                                                    }}
                                                    onClick={() =>
                                                        window.open(
                                                            `/penugasan/download/${item.id}`,
                                                            "_blank"
                                                        )
                                                    }
                                                >
                                                    <IoMdDownload
                                                        className="w-5 h-5 text-gray-700"
                                                        style={{
                                                            color: "white",
                                                        }}
                                                    />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
