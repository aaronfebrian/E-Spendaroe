import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    // Inisialisasi nilai awal berdasarkan data pengguna yang sudah ada
    const initialValues = {
        name: user.name,
        email: user.email,
        class: user.class || "", // Nilai awal kelas
        nis: user.nis || "", // Nilai awal NIS
        nip: user.nip || "", // Nilai awal NIP
        subject: user.subject || "", // Nilai awal pelajaran yang diampu
        telepon: user.telepon || "",
        jenis_kelamin: user.jenis_kelamin || "",
    };

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm(initialValues);

    const isTeacher = user.role === "guru"; // Menentukan apakah pengguna adalah guru

    console.log(data);

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    return (
        <div
            className={className}
            style={{
                marginLeft: "10px",
                padding: "20px",
                backgroundColor: "white",
                borderRadius: "10px",
            }}
        >
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Informasi Akun
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Perbarui informasi akun dan email Anda.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Nama" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="jenis_kelamin" value="Jenis Kelamin" />

                    <select
                        id="jenis_kelamin"
                        name="jenis_kelamin"
                        value={data.jenis_kelamin}
                        onChange={(e) => setData("jenis_kelamin", e.target.value)}
                        className="mt-1 block w-full rounded-md border border-gray-300"
                    >
                        <option value="">Pilih</option>
                        <option value="Laki-Laki">Laki-Laki</option>
                        <option value="Perempuan">Perempuan</option>
                    </select>
                </div>

                {/* Tampilkan kolom NIS hanya jika peran adalah 'siswa' */}
                {user.role === "siswa" && (
                    <div>
                        <InputLabel htmlFor="nis" value="NIS" />

                        <TextInput
                            id="nis"
                            className="mt-1 block w-full"
                            value={data.nis}
                            onChange={(e) => setData("nis", e.target.value)}
                            required
                            isFocused
                            autoComplete="nis"
                        />

                        <InputError className="mt-2" message={errors.nis} />
                    </div>
                )}

                {
                    /* Tampilkan kolom NIP hanya jika peran adalah 'guru' */
                    isTeacher && (
                        <div>
                            <InputLabel htmlFor="nip" value="NIP" />

                            <TextInput
                                id="nip"
                                className="mt-1 block w-full"
                                value={data.nip}
                                onChange={(e) => setData("nip", e.target.value)}
                                required
                                isFocused
                                autoComplete="nip"
                            />

                            <InputError className="mt-2" message={errors.nip} />
                        </div>
                    )
                }

                {isTeacher && (
                    <div>
                        <InputLabel htmlFor="class" value="Kelas Ajar" />

                        <select
                            id="class"
                            name="class"
                            value={data.class}
                            onChange={(e) => setData("class", e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300"
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
                )}

                {/* Tampilkan kolom NIS hanya jika peran adalah 'siswa' */}
                {user.role === "siswa" && (
                    <div>
                        <InputLabel htmlFor="class" value="Kelas" />

                        <select
                            id="class"
                            name="class"
                            value={data.class}
                            onChange={(e) => setData("class", e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300"
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
                )}

                {user.role === "admin" && (
                    <div>
                        <InputLabel htmlFor="telepon" value="Telepon" />
                        <TextInput
                            id="telepon"
                            type="tel"
                            className="mt-1 block w-full"
                            value={data.telepon}
                            onChange={(e) => setData("telepon", e.target.value)}
                            required
                            autoComplete="telepon"
                        />
                        <InputError className="mt-2" message={errors.telepon} />
                    </div>
                )}

                {
                    /* Tambahkan kolom input khusus untuk guru */
                    isTeacher && (
                        <div>
                            <InputLabel
                                htmlFor="subject"
                                value="Pelajaran Yang Diampu"
                            />

                            <select
                                id="subject"
                                name="subject"
                                value={data.subject}
                                onChange={(e) =>
                                    setData("subject", e.target.value)
                                }
                                className="mt-1 block w-full rounded-md border border-gray-300"
                            >
                                <option value="">Pilih Subject</option>
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
                                {/* Tambahkan opsi pelajaran lainnya sesuai kebutuhan guru */}
                            </select>
                        </div>
                    )
                }

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Email tidak terverifikasi.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Klik di sini untuk mengirim ulang email Anda.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                Link verifikasi baru telah dikirim ke alamat
                                email Anda.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>
                        Simpan Perubahan
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-green-600">
                            Berhasil Disimpan
                        </p>
                    </Transition>
                </div>
            </form>
        </div>
    );
}
