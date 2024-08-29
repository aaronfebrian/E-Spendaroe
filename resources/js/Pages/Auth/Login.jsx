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
    faEnvelope, faLock,
} from "@fortawesome/free-solid-svg-icons";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

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
                    <div className="flex flex-col mb-2" style={{marginTop: '15px'}}>
                        <div className="flex relative">
                            <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
                            <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
                            </span>
                            <input
                                type="text"
                                id="sign-in-email"
                                className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none  focus:border-transparent"
                                placeholder="Your email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                        </div>
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="flex flex-col mb-6">
                        <div className="flex relative">
                            <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
                            <FontAwesomeIcon icon={faLock} className="w-4 h-4" />
                            </span>
                            <input
                                type="password"
                                id="sign-in-password"
                                className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none  focus:border-transparent"
                                placeholder="Your password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                        </div>
                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex items-center mb-6 -mt-4">
                        <div className="flex ml-auto" style={{marginTop: '10px'}}>
                            <Link
                                href={route("password.request")}
                                className="inline-flex text-xs font-thin text-black sm:text-sm dark:text-black-100 hover:text-gray-500 dark:hover:text-gray"
                            >
                                Forgot Your Password?
                            </Link>
                        </div>
                    </div>

                    <div className="flex w-full">
                        <PrimaryButton
                            type="submit"
                            className="py-2 px-4 bg-blue-600 justify-center hover:bg-blue-700 focus:ring-blue-700 text-white w-full text-center text-base font-semibold shadow-md focus:bg-blue-700 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 rounded-lg"
                            disabled={processing}
                        >
                            Login
                        </PrimaryButton>
                    </div>
                </form>
            </div>

            <div className="flex items-center justify-center mt-6">
                <Link
                    href={route('register')}
                    target="_blank"
                    className="inline-flex items-center text-xs font-thin text-center text-black hover:text-gray-500  dark:hover:text-gray"
                >
                    <span className="ml-2" style={{marginBottom: '20px'}}>You don't have an account?</span>
                </Link>
            </div>
        </GuestLayout>
    );
}
