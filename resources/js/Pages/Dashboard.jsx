import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Group from "../Assets/Group1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleRight,
    faCircleUser,
    faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import Featured from "../Assets/Featuredicon.png";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard({ auth }) {
    const [jumlahSiswa, setJumlahSiswa] = useState(0);
    const [jumlahGuru, setJumlahGuru] = useState(0);
    const [jumlahAdmin, setJumlahAdmin] = useState(0);
    const [userList, setUserList] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [latestMateri, setLatestMateri] = useState([]);
    const [materiTerbaru, setMateriTerbaru] = useState([]);
    const [latestTugas, setLatestTugas] = useState([]);
    const [jumlahMateri, setJumlahMateri] = useState(0);
    const [jumlahTugas, setJumlahTugas] = useState(0);
    const [daftarMateri, setDaftarMateri] = useState([]);

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

    useEffect(() => {
        // Panggil API untuk mendapatkan materi terbaru
        axios
            .get("/get-latest-materi")
            .then((response) => {
                setLatestMateri(response.data);
            })
            .catch((error) => {
                console.error("Error fetching latest materi:", error);
            });
    }, []);

    useEffect(() => {
        // Panggil API untuk mendapatkan materi terbaru
        axios
            .get("/get-materi-terbaru")
            .then((response) => {
                setMateriTerbaru(response.data);
            })
            .catch((error) => {
                console.error("Error fetching latest materi:", error);
            });
    }, []);

    useEffect(() => {
        // Panggil API untuk mendapatkan materi terbaru
        axios
            .get("/get-latest-assignment")
            .then((response) => {
                setLatestAssignment(response.data);
            })
            .catch((error) => {
                console.error("Error fetching latest materi:", error);
            });
    }, []);

    useEffect(() => {
        // Panggil API untuk mendapatkan materi terbaru
        axios
            .get("/get-latest-tugas")
            .then((response) => {
                setLatestTugas(response.data);
            })
            .catch((error) => {
                console.error("Error fetching latest tugas:", error);
            });
        axios
            .get("/count-uploads")
            .then((response) => {
                setJumlahMateri(response.data.jumlahMateri);
                setJumlahTugas(response.data.jumlahTugas);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    useEffect(() => {
        fetch("/materi/countUploadedMateri")
            .then((response) => response.json())
            .then((data) => setJumlahMateri(data.jumlahMateri))
            .catch((error) => console.error("Error:", error));
        // Mengambil data dari backend
        axios
            .get("/jumlahsiswa")
            .then((response) => {
                setJumlahSiswa(response.data.jumlahSiswa);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        axios
            .get("/jumlahguru")
            .then((response) => {
                setJumlahGuru(response.data.jumlahGuru);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        axios
            .get("/jumlahadmin")
            .then((response) => {
                setJumlahAdmin(response.data.jumlahAdmin);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        axios
            .get("/api/users")
            .then((response) => {
                setUserList(response.data);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
        axios
            .get("/user/total")
            .then((response) => {
                setTotalUsers(response.data.totalUsers);
            })
            .catch((error) =>
                console.error("Error fetching total users:", error)
            );
    }, []);

    let dashboardContent;
    if (auth.user.role === "admin") {
        // Tampilan dashboard untuk siswa
        dashboardContent = (
            <div className="mb-5 mt-2">
                <div
                    className="container flex items-start justify-start mx-auto h-screen"
                    style={{ marginLeft: "-5px" }}
                >
                    <div
                        style={{
                            width: "1020px",
                            height: "650px",
                            marginRight: "5px",
                            marginLeft: "-105px",
                            marginTop: "-20px",
                        }}
                    >
                        <img
                            src={Group}
                            alt="E-SPENDAROE"
                            style={{
                                width: "100%",
                                height: "auto",
                                marginTop: "-85px",
                            }}
                        />
                    </div>

                    <ul
                        className="flex flex-col"
                        style={{ marginLeft: "-90px", marginTop: "15px" }}
                    >
                        <div className="flex items-center justify-between mb-7">
                            <span className="font-semibold text-xl text-gray-800 leading-tight">
                                User Terbaru
                            </span>
                            <button
                                type="button"
                                className="flex items-center space-x-1 w-15 h-15"
                                style={{
                                    marginTop: "2px",
                                    marginLeft: "260px",
                                    fontSize: "12px",
                                    position: "absolute",
                                }}
                            >
                                <span>View all</span>
                                <FontAwesomeIcon icon={faAngleRight} />
                            </button>
                        </div>

                        {userList.slice(0, 4).map((user) => (
                            <li
                                key={user.id}
                                className="flex flex-row mb-2 border-gray-400"
                            >
                                <div
                                    className="shadow border select-none cursor-pointer bg-white rounded-md flex flex-1 items-center p-4"
                                    style={{ width: "310px", height: "75px" }}
                                >
                                    <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
                                        <a href="#" className="relative block">
                                            <FontAwesomeIcon
                                                icon={faCircleUser}
                                                className="text-blue-500 w-7 h-7 ml-3 mt-1"
                                            />
                                        </a>
                                    </div>
                                    <div className="flex-1 pl-1 md:mr-16">
                                        <div
                                            className="font-medium dark:text-black"
                                            style={{ fontSize: "14px" }}
                                        >
                                            {user.name}
                                        </div>
                                        <div
                                            className="text-black-600 dark:text-black-200"
                                            style={{ fontSize: "12px" }}
                                        >
                                            {user.email}
                                        </div>
                                        <div
                                            className="text-black-600 dark:text-black-200"
                                            style={{ fontSize: "12px" }}
                                        >
                                            {user.role}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div
                    className="flex space-x-4"
                    style={{
                        marginLeft: "45px",
                        width: "700px",
                        marginTop: "-410px",
                    }}
                >
                    <a
                        href="#"
                        className="flex-1 p-4 bg-white border border-gray-200 rounded-lg shadow hover-bg-gray-100 dark-bg-gray-800 dark-border-gray-700 dark-hover-bg-gray-700"
                    >
                        <p
                            className="font-normal text-gray-700 dark-text-gray-400 overflow-ellipsis"
                            style={{
                                maxHeight: "3.6em",
                                textOverflow: "ellipsis",
                            }}
                        >
                            Jumlah Siswa
                        </p>
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark-text-white">
                            {jumlahSiswa}
                        </h5>
                    </a>

                    <a
                        href="#"
                        className="flex-1 p-4 bg-white border border-gray-200 rounded-lg shadow hover-bg-gray-100 dark-bg-gray-800 dark-border-gray-700 dark-hover-bg-gray-700"
                    >
                        <p
                            className="font-normal text-gray-700 dark-text-gray-400 overflow-ellipsis"
                            style={{
                                maxHeight: "3.6em",
                                textOverflow: "ellipsis",
                            }}
                        >
                            Jumlah Guru
                        </p>
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark-text-white">
                            {jumlahGuru}
                        </h5>
                    </a>

                    <a
                        href="#"
                        className="flex-1 p-4 bg-white border border-gray-200 rounded-lg shadow hover-bg-gray-100 dark-bg-gray-800 dark-border-gray-700 dark-hover-bg-gray-700"
                    >
                        <p
                            className="font-normal text-gray-700 dark-text-gray-400 overflow-ellipsis"
                            style={{
                                maxHeight: "3.6em",
                                textOverflow: "ellipsis",
                            }}
                        >
                            Total User
                        </p>
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark-text-white">
                            {totalUsers}
                        </h5>
                    </a>
                </div>

                <div
                    class="flex items-center justify-between"
                    style={{ marginTop: "40px", marginLeft: "27px" }}
                >
                    <span class="font-semibold text-xl text-gray-800 leading-tight">
                        Data User Aktif
                    </span>
                    <button
                        type="button"
                        className="flex items-center space-x-1 w-15 h-15"
                        style={{
                            marginTop: "9px",
                            marginRight: "10px",
                            fontSize: "12px",
                        }}
                    >
                        <span>View all</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                </div>

                <div
                    class="flex space-x-4"
                    style={{
                        marginTop: "30px",
                        marginLeft: "23px",
                        marginRight: "10px",
                    }}
                >
                    <div class="flex-1 max-w-sm bg-white border border-gray-200 rounded-lg shadow hover-bg-gray-100 dark-bg-gray-800 dark-border-gray-700 dark-hover-bg-gray-700">
                        <a href="#">
                            <img
                                class="rounded-t-lg"
                                src="/docs/images/blog/image-1.jpg"
                                alt=""
                            />
                        </a>
                        <div class="p-5">
                            <a href="#">
                                <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark-text-white">
                                    Daftar Siswa
                                </h5>
                            </a>
                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Siswa yang terdaftar : {jumlahSiswa} Siswa
                            </p>
                            <button
                                onClick={() =>
                                    (window.location.href =
                                        route("siswa.index"))
                                }
                                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 dark:hover:bg-blue-700 focus:bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-indigo-500 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                Cek Siswa
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

                    <div class=" flex-1 max-w-sm bg-white border border-gray-200 rounded-lg shadow hover-bg-gray-100 dark-bg-gray-800 dark-border-gray-700 dark-hover-bg-gray-700">
                        <a href="#">
                            <img
                                class="rounded-t-lg"
                                src="/docs/images/blog/image-1.jpg"
                                alt=""
                            />
                        </a>
                        <div class="p-5">
                            <a href="#">
                                <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark-text-white">
                                    Daftar Guru
                                </h5>
                            </a>
                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Guru yang terdaftar : {jumlahGuru} Guru
                            </p>
                            <button
                                onClick={() =>
                                    (window.location.href = route("guru.index"))
                                }
                                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 dark:hover:bg-blue-700 focus:bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-indigo-500 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                Cek Guru
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

                    <div class="flex-1 max-w-sm bg-white border border-gray-200 rounded-lg shadow hover-bg-gray-100 dark-bg-gray-800 dark-border-gray-700 dark-hover-bg-gray-700">
                        <a href="#">
                            <img
                                class="rounded-t-lg"
                                src="/docs/images/blog/image-1.jpg"
                                alt=""
                            />
                        </a>
                        <div class="p-5">
                            <a href="#">
                                <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark-text-white">
                                    Daftar Admin
                                </h5>
                            </a>
                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Admin yang terdaftar : {jumlahAdmin} Admin
                            </p>
                            <button
                                onClick={() =>
                                    (window.location.href =
                                        route("admin.index"))
                                }
                                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 dark:hover:bg-blue-700 focus:bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-indigo-500 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                Cek Admin
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
                </div>
            </div>
        );
    } else if (auth.user.role === "siswa") {
        // Tampilan dashboard untuk siswa
        dashboardContent = (
            <div className="mb-5 mt-2">
                <div className="container flex items-start justify-start mx-auto">
                    <div
                        style={{
                            width: "1000px",
                            height: "650px",
                            marginRight: "5px",
                            marginLeft: "-105px",
                            marginTop: "-20px",
                        }}
                    >
                        <img
                            src={Group}
                            alt="E-SPENDAROE"
                            style={{
                                width: "100%",
                                height: "auto",
                                marginTop: "-80px",
                            }}
                        />
                    </div>

                    <ul
                        className="flex flex-col"
                        style={{ marginLeft: "-90px", marginTop: "15px" }}
                    >
                        <div className="flex items-center justify-between mb-7">
                            <span className="font-semibold text-xl text-gray-800 leading-tight">
                                Tugas Baru
                            </span>
                            <button
                                onClick={() =>
                                    (window.location.href = route("TugasSaya"))
                                }
                                type="button"
                                className="flex items-center space-x-1 w-15 h-15"
                                style={{
                                    marginTop: "2px",
                                    marginLeft: "278px",
                                    fontSize: "12px",
                                    position: "absolute",
                                }}
                            >
                                <span>View all</span>
                                <FontAwesomeIcon icon={faAngleRight} />
                            </button>
                        </div>

                        {latestTugas.map((tugas) => (
                            <li
                                className="flex flex-row mb-2 border-gray-400"
                                style={{ marginTop: "-2px" }}
                            >
                                <a
                                    className="shadow border select-none bg-white rounded-md flex flex-1 items-center p-4"
                                    style={{ width: "330px", height: "85px" }}
                                    href={route("PenugasanShow", {
                                        id: tugas.id,
                                    })}
                                >
                                    <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
                                        <a href="#" className="relative block">
                                            <img
                                                alt="profil"
                                                src={Featured}
                                                className="mx-auto object-cover rounded-full h-8 w-8"
                                            />
                                        </a>
                                    </div>
                                    <div className="">
                                        <div className="text-xs font-bold dark:text-black">
                                            {tugas.judul}
                                        </div>
                                        <div className="text-xs text-black-600 dark:text-black-200">
                                            Batas pengumpulan :{" "}
                                            {new Intl.DateTimeFormat("id-ID", {
                                                year: "numeric",
                                                month: "2-digit",
                                                day: "2-digit",
                                            }).format(
                                                new Date(tugas.tanggal_tenggat)
                                            )}
                                        </div>
                                        <div className="text-xs text-black-600 dark:text-black-200">
                                            Pukul : {tugas.waktu_tenggat}
                                        </div>
                                    </div>
                                </a>
                            </li>
                        ))}
                        {/* Sisipkan daftar orang lain di sini dalam format yang sama */}
                    </ul>
                </div>

                <div
                    class="flex items-center justify-between"
                    style={{ marginTop: "-330px", marginLeft: "27px" }}
                >
                    <span class="font-semibold text-xl text-gray-800 leading-tight">
                        Materi Baru
                    </span>
                    <button
                        type="button"
                        onClick={() =>
                            (window.location.href = route("allmateri"))
                        }
                        className="flex items-center space-x-1 w-15 h-15"
                        style={{
                            marginTop: "9px",
                            marginRight: "10px",
                            fontSize: "12px",
                        }}
                    >
                        <span>View all</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                </div>

                <div
                    class="grid grid-cols-3 gap-4"
                    style={{
                        marginTop: "30px",
                        marginLeft: "23px",
                        marginRight: "10px",
                    }}
                >
                    {materiTerbaru.map((materi) => (
                        <div class="flex-1 max-w-sm bg-white border border-gray-200 rounded-lg shadow hover-bg-gray-100 dark-bg-gray-800 dark-border-gray-700 dark-hover-bg-gray-700 mb-4">
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
                            <div class="p-5">
                                <div>
                                    <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark-text-white">
                                        {materi.judul}
                                    </h5>
                                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                        Diupload pada :{" "}
                                        {new Intl.DateTimeFormat("id-ID", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                        }).format(
                                            new Date(materi.tanggal_upload)
                                        )}
                                    </p>
                                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                        Oleh : {materi.guru.user.name}
                                    </p>
                                    {/* <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    Oleh : {materi.file_pendukung}
                                </p> */}
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => viewFile(materi.id)}
                                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-500 dark:hover:bg-yellow-600 focus:bg-yellow-600 rounded-lg hover:bg-yellow-600 focus:ring-2 focus:outline-none focus:ring-yellow-600 dark:bg-yellow-500 dark:hover:bg-yellow-600 focus:ring-offset-2 transition ease-in-out duration-150"
                                        >
                                            Lihat Materi
                                        </button>
                                        <button
                                            onClick={() =>
                                                window.open(
                                                    `/materi/download/${materi.id}`,
                                                    "_blank"
                                                )
                                            }
                                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-cyan-500 dark:hover:bg-cyan-600 focus:bg-cyan-600 rounded-lg hover:bg-cyan-600 focus:ring-2 focus:outline-none focus:ring-cyan-600 dark:bg-cyan-500 dark:hover:bg-cyan-600 focus:ring-offset-2 transition ease-in-out duration-150"
                                        >
                                            Download Materi
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } else if (auth.user.role === "guru") {
        // Tampilan dashboard untuk guru
        dashboardContent = (
            <div className="mb-5 mt-2">
                <div className="container flex items-start justify-start mx-auto h-screen">
                    <div
                        style={{
                            width: "1000px",
                            height: "650px",
                            marginRight: "5px",
                            marginLeft: "-105px",
                            marginTop: "-20px",
                        }}
                    >
                        <img
                            src={Group}
                            alt="E-SPENDAROE"
                            style={{
                                width: "100%",
                                height: "auto",
                                marginTop: "-85px",
                            }}
                        />
                    </div>
                    <ul
                        className="flex flex-col"
                        style={{ marginLeft: "-90px", marginTop: "15px" }}
                    >
                        <div className="flex items-center justify-between mb-7">
                            <span className="font-semibold text-xl text-gray-800 leading-tight">
                                Tugas Baru
                            </span>
                            <button
                                onClick={() =>
                                    (window.location.href =
                                        route("penugasan.index"))
                                }
                                type="button"
                                className="flex items-center space-x-1 w-15 h-15"
                                style={{
                                    marginTop: "2px",
                                    marginLeft: "278px",
                                    fontSize: "12px",
                                    position: "absolute",
                                }}
                            >
                                <span>View all</span>
                                <FontAwesomeIcon icon={faAngleRight} />
                            </button>
                        </div>

                        {latestTugas.map((tugas) => (
                            <li
                                className="flex flex-row mb-2 border-gray-400"
                                style={{ marginTop: "-2px" }}
                            >
                                <div
                                    className="shadow border select-none bg-white rounded-md flex flex-1 items-center p-4"
                                    style={{ width: "330px", height: "76px" }}
                                >
                                    <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
                                        <div
                                            href="#"
                                            className="relative block"
                                        >
                                            <img
                                                alt="profil"
                                                src={Featured}
                                                className="mx-auto object-cover rounded-full h-8 w-8"
                                            />
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="text-xs font-bold dark:text-black">
                                            {tugas.judul}
                                        </div>
                                        <div className="text-xs text-black-600 dark:text-black-200">
                                            Batas pengumpulan :{" "}
                                            {new Intl.DateTimeFormat("id-ID", {
                                                year: "numeric",
                                                month: "2-digit",
                                                day: "2-digit",
                                            }).format(
                                                new Date(tugas.tanggal_tenggat)
                                            )}
                                        </div>
                                        <div className="text-xs text-black-600 dark:text-black-200">
                                            Pukul : {tugas.waktu_tenggat}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}

                        {/* Sisipkan daftar orang lain di sini dalam format yang sama */}
                    </ul>
                </div>

                <div
                    className="flex space-x-4"
                    style={{
                        marginLeft: "45px",
                        width: "700px",
                        marginTop: "-410px",
                    }}
                >
                    <div className="flex-1 p-4 bg-white border border-gray-200 rounded-lg shadow hover-bg-gray-100 dark-bg-gray-800 dark-border-gray-700 dark-hover-bg-gray-700">
                        <p
                            className="font-normal text-gray-700 dark-text-gray-400 overflow-ellipsis"
                            style={{
                                maxHeight: "3.6em",
                                textOverflow: "ellipsis",
                            }}
                        >
                            Tugas Yang Diupload
                        </p>
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark-text-white">
                            {jumlahTugas}
                        </h5>
                    </div>

                    <div className="flex-1 p-4 bg-white border border-gray-200 rounded-lg shadow hover-bg-gray-100 dark-bg-gray-800 dark-border-gray-700 dark-hover-bg-gray-700">
                        <p
                            className="font-normal text-gray-700 dark-text-gray-400 overflow-ellipsis"
                            style={{
                                maxHeight: "3.6em",
                                textOverflow: "ellipsis",
                            }}
                        >
                            Materi Yang Diupload
                        </p>
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark-text-white">
                            {jumlahMateri}
                        </h5>
                    </div>
                </div>

                <div
                    class="flex items-center justify-between"
                    style={{ marginTop: "40px", marginLeft: "27px" }}
                >
                    <span class="font-semibold text-xl text-gray-800 leading-tight">
                        Materi Baru
                    </span>
                    <button
                        onClick={() =>
                            (window.location.href = route("materi.index"))
                        }
                        type="button"
                        className="flex items-center space-x-1 w-15 h-15"
                        style={{
                            marginTop: "9px",
                            marginRight: "10px",
                            fontSize: "12px",
                        }}
                    >
                        <span>View all</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                </div>

                <div
                    class="flex space-x-4"
                    style={{
                        marginTop: "30px",
                        marginLeft: "23px",
                        marginRight: "10px",
                    }}
                >
                    {latestMateri.map((materi) => (
                        <div
                            key={materi.id}
                            className="flex-1 max-w-sm bg-white border border-gray-200 rounded-lg shadow hover-bg-gray-100 dark-bg-gray-800 dark-border-gray-700"
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
                                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark-text-white">
                                    {materi.judul}
                                </h5>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    Diupload pada :{" "}
                                    {new Intl.DateTimeFormat("id-ID", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                    }).format(new Date(materi.tanggal_upload))}
                                </p>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    Oleh : {materi.guru.user.name}
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => viewFile(materi.id)}
                                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-500 dark:hover:bg-yellow-600 focus:bg-yellow-600 rounded-lg hover:bg-yellow-600 focus:ring-2 focus:outline-none focus:ring-yellow-600 dark:bg-yellow-500 dark:hover:bg-yellow-600 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Lihat Materi
                                    </button>
                                    <button
                                        onClick={() => hapusMateri(materi.id)}
                                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 dark:hover:bg-red-700 focus:bg-red-700 rounded-lg hover:bg-red-700 focus:ring-2 focus:outline-none focus:ring-red-700 dark:bg-red-600 dark:hover:bg-red-700 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Hapus Materi
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

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
                        Selamat Datang Kembali, {auth.user.name}
                    </h2>
                    <p className="text-gray-600">
                        Dashboard dan aktivitas {auth.user.role} saat ini.
                    </p>
                </div>
            }
        >
            <Head title="Dashboard" />
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
                {dashboardContent}
            </div>
        </AuthenticatedLayout>
    );
}
