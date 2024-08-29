// resources/js/Pages/EditSiswa.js

import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";

const EditGuru = ({ auth, guru }) => {
    const [data, setData] = useState({
        name: guru.name,
        email: guru.email,
        password: "",
        nip: guru.nip,
        class: guru.class,
        subject: guru.subject,
    });

    const [isSuccessMessageVisible, setIsSuccessMessageVisible] =
        useState(false);

    const submit = (e) => {
        e.preventDefault();
        axios
            .put(`/update-guru/${guru.id}`, data)
            .then((response) => {
                console.log("Guru berhasil diperbarui:", response.data);
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
                        Edit Guru
                    </h2>
                </div>
            }
        >
            <Head title="Edit Guru" />

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
                            Nama Guru
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-[1100px] p-2 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Masukkan nama guru"
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
                            placeholder="Masukkan email guru"
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
                                setData({ ...data, jenis_kelamin: e.target.value })
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
                            htmlFor="nip"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                        >
                            NIP
                        </label>
                        <input
                            id="nip"
                            name="nip"
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-[1100px] p-2 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Masukkan NIP guru"
                            value={data.nip}
                            required
                            onChange={(e) =>
                                setData({ ...data, nip: e.target.value })
                            }
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="subject"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                        >
                            Mata Pelajaran
                        </label>
                        <select
                            id="subject"
                            name="subject"
                            value={data.subject}
                            required
                            onChange={(e) =>
                                setData({ ...data, subject: e.target.value })
                            }
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-[1100px] p-2 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="">Pilih Mata Pelajaran</option>
                            <option value="Bahasa Indonesia">
                                Bahasa Indonesia
                            </option>
                            <option value="Pendidikan Kewarganegaraan">
                                Pendidikan Kewarganegaraan
                            </option>
                            <option value="Matematika">Matematika</option>
                            <option value="Ilmu Pengetahuan Alam">
                                Ilmu Pengetahuan Alam
                            </option>
                            <option value="Ilmu Pengetahuan Sosial">
                                Ilmu Pengetahuan Sosial
                            </option>
                            <option value="Agama">Agama</option>
                            <option value="Seni Budaya">Seni Budaya</option>
                            <option value="Prakarya">Prakarya</option>
                            <option value="Pendidikan Jasmani">
                                Pendidikan Jasmani
                            </option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="class"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                        >
                            Kelas Ajar
                        </label>
                        <select
                            id="class"
                            name="class"
                            value={data.class}
                            required
                            onChange={(e) =>
                                setData({ ...data, class: e.target.value })
                            }
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-[1100px] p-2 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                        <Link href={route("guru.index")}>
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

export default EditGuru;
