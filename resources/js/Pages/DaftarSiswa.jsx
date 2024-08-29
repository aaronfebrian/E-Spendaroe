import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrashCan,
    faPenToSquare,
    faCirclePlus,
    faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function DaftarSiswa({ auth, siswas }) {
    const [daftarSiswa, setDaftarSiswa] = useState(siswas);
    const [searchInput, setSearchInput] = useState("");
    const [jumlahSiswa, setJumlahSiswa] = useState(0);

    const filterSiswas = (siswa) => {
        return siswa.name.toLowerCase().includes(searchInput.toLowerCase());
    };
    const filteredSiswas = searchInput ? siswas.filter(filterSiswas) : siswas;

    // console.log(searchInput);
    // console.log(filteredSiswas);

    const hapusSiswa = async (userId) => {
        if (window.confirm("Anda yakin ingin menghapus pengguna ini?")) {
            try {
                await axios.delete(`/hapussiswa/${userId}`);
                // Perbarui daftar siswa di sisi client tanpa me-refresh halaman
                setDaftarSiswa((daftarSiswa) =>
                    daftarSiswa.filter((siswa) => siswa.id !== userId)
                );
                alert("Siswa berhasil dihapus");
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };

    useEffect(() => {
        // Mengambil data dari backend
        axios
            .get("/jumlahsiswa")
            .then((response) => {
                setJumlahSiswa(response.data.jumlahSiswa);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

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
                        Daftar Siswa
                    </h2>
                    <p className="text-gray-600">
                        Siswa yang terdaftar saat ini.
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
                                    <Link href={route("dashboard")}>
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
                                        <input
                                            type="text"
                                            id='"form-subscribe-Filter'
                                            class=" rounded-lg border-transparent flex-1 appearance-none border w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                            placeholder="Cari siswa..."
                                            style={{
                                                height: "39px",
                                                borderColor: "gray",
                                            }}
                                            onChange={(e) =>
                                                setSearchInput(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div
                                        style={{
                                            marginRight: "-7px",
                                            marginTop: "30px",
                                        }}
                                    >
                                        <Link href={route("siswa.create")}>
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
                                                Tambah Siswa
                                            </button>
                                        </Link>
                                    </div>
                                    <div
                                        style={{
                                            marginRight: "-7px",
                                            marginTop: "30px",
                                        }}
                                    >
                                        <div
                                            className="flex text-white bg-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-yellow-500"
                                            style={{ cursor: "default" }}
                                        >
                                            Jumlah Siswa : {jumlahSiswa}
                                        </div>
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
                                                Email
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
                                                NIS
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
                                            ></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredSiswas.map((siswa) => (
                                            <tr key={siswa.id}>
                                                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                    <p class="text-gray-900 whitespace-no-wrap">
                                                        {siswa.name}
                                                    </p>
                                                </td>
                                                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                    <p class="text-gray-900 whitespace-no-wrap">
                                                        {siswa.email}
                                                    </p>
                                                </td>
                                                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                    <p class="text-gray-900 whitespace-no-wrap">
                                                        {siswa.class}
                                                    </p>
                                                </td>
                                                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                    <p class="text-gray-900 whitespace-no-wrap">
                                                        {siswa.nis}
                                                    </p>
                                                </td>
                                                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                    <p class="text-gray-900 whitespace-no-wrap">
                                                        {siswa.jenis_kelamin}
                                                    </p>
                                                </td>
                                                <td class="flex justify-between px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                    <a
                                                        href="#"
                                                        class="text-indigo-600 hover:text-indigo-900"
                                                        style={{
                                                            marginRight:
                                                                "-20px",
                                                        }}
                                                        onClick={() =>
                                                            hapusSiswa(siswa.id)
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faTrashCan}
                                                            style={{
                                                                color: "#ff0000",
                                                            }}
                                                            className="w-5 h-5 ml-2"
                                                        />
                                                    </a>
                                                    <Link
                                                        href={route(
                                                            "siswa.edit",
                                                            { id: siswa.id }
                                                        )}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faPenToSquare}
                                                            className="w-5 h-5 ml-3"
                                                            style={{
                                                                color: "#FF9209",
                                                            }}
                                                        />
                                                    </Link>
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
