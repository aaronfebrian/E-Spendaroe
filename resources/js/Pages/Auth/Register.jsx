import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import Frame from "@/Assets/Frame993.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faEnvelope,
    faLock,
    faLockOpen,
} from "@fortawesome/free-solid-svg-icons";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg dark:bg-white sm:px-6 md:px-8 lg:px-10">
                <div
                    className="self-center mb-6 text-xl font-light text-black sm:text-2xl dark:text-black"
                    style={{ marginLeft: "-40px", marginTop: "-20px" }}
                >
                    <img
                        src={Frame}
                        alt="Logo"
                        className="h-15 w-40 mt-3 ml-5"
                    />
                </div>

                <form onSubmit={submit}>
                    <div
                        className="flex flex-col mb-2"
                        style={{ marginTop: "15px" }}
                    >
                        <div className="flex relative">
                            <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
                                <FontAwesomeIcon
                                    icon={faUser}
                                    className="w-4 h-4"
                                />
                            </span>
                            <input
                                type="text"
                                id="name"
                                className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none  focus:border-transparent"
                                placeholder="Your name"
                                value={data.name}
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />
                        </div>
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="flex flex-col mb-2">
                        <div className="flex relative">
                            <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className="w-4 h-4"
                                />
                            </span>
                            <input
                                type="email"
                                id="email"
                                className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none  focus:border-transparent"
                                placeholder="Your email"
                                value={data.email}
                                autoComplete="username"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                            />
                        </div>
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="flex flex-col mb-2">
                        <div className="flex relative">
                            <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
                                <FontAwesomeIcon
                                    icon={faLock}
                                    className="w-4 h-4"
                                />
                            </span>
                            <input
                                type="password"
                                id="password"
                                className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none  focus:border-transparent"
                                placeholder="Your Password"
                                value={data.password}
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                required
                            />
                        </div>
                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex flex-col mb-6">
                        <div className="flex relative">
                            <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
                                <FontAwesomeIcon
                                    icon={faLockOpen}
                                    className="w-4 h-4"
                                />
                            </span>
                            <input
                                type="password"
                                id="password_confirmation"
                                name="password"
                                className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none  focus:border-transparent"
                                placeholder="Confirm Password"
                                value={data.password_confirmation}
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                required
                            />
                        </div>
                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>

                    <div
                        className="mt-4"
                        style={{ marginTop: "-10px", marginBottom: "20px" }}
                    >
                        <InputLabel htmlFor="role" value="Role" />
                        <div className="mt-1 flex space-x-4">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="guru"
                                    name="role"
                                    value="guru"
                                    checked={data.role === "guru"}
                                    onChange={(e) =>
                                        setData("role", e.target.value)
                                    }
                                />
                                <label htmlFor="guru" className="ml-2">
                                    Guru
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="siswa"
                                    name="role"
                                    value="siswa"
                                    checked={data.role === "siswa"}
                                    onChange={(e) =>
                                        setData("role", e.target.value)
                                    }
                                />
                                <label htmlFor="siswa" className="ml-2">
                                    Siswa
                                </label>
                            </div>
                        </div>
                        <InputError message={errors.role} className="mt-2" />
                    </div>

                    <div className="flex w-full">
                        <PrimaryButton
                            type="submit"
                            className="py-2 px-4 bg-blue-600 justify-center hover:bg-blue-700 focus:ring-blue-700 text-white w-full text-center text-base font-semibold shadow-md focus:bg-blue-700 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 rounded-lg"
                            disabled={processing}
                        >
                            Register
                        </PrimaryButton>
                    </div>
                </form>
            </div>

            <div className="flex items-center justify-center mt-6">
                <Link
                    href={route("login")}
                    target="_blank"
                    className="inline-flex items-center text-xs font-thin text-center text-black hover:text-gray-500  dark:hover:text-gray"
                >
                    <span className="ml-2" style={{ marginBottom: "20px" }}>
                        Already registered?
                    </span>
                </Link>
            </div>
        </GuestLayout>
    );
}
