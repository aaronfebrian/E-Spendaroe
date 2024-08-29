import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import Frame from "../Assets/Frame993.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChartColumn,
    faLayerGroup,
    faClipboard,
    faUser,
    faChevronDown,
    faArrowRightFromBracket,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";

export default function Authenticated({ user, header, children }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const renderSidebarBasedOnUserRole = () => {
        if (user.role === "admin") {
            return (
                // Tampilan sidebar untuk siswa
                <div>
                    <nav className="mt-10 px-6" style={{ marginLeft: "-25px" }}>
                        <NavLink
                            href={route("dashboard")}
                            className={`${
                                route().current("dashboard")
                                    ? "hover:text-white hover:bg-blue-500 bg-blue-500 text-white p-1 my-1 w-[240px]"
                                    : "hover:text-white hover:bg-blue-500 text-gray-600 dark:text-black p-1 my-1 w-[240px]"
                            } flex items-center justify-center transition-colors dark:hover:text-white rounded-lg`}
                        >
                            <FontAwesomeIcon
                                icon={faChartColumn}
                                className="w-5 h-5 ml-3"
                            />
                            <span className="mx-4 text-lg font-normal">
                                Dashboard
                            </span>
                            <span className="flex-grow text-right"></span>
                        </NavLink>
                        <NavLink
                            href={route("profile.edit")}
                            active={route().current("profile.edit")}
                            className={`${
                                route().current("profile.edit")
                                    ? "hover:text-white hover:bg-blue-500 bg-blue-500 text-white p-1 my-1 w-[240px]"
                                    : "hover:text-white hover:bg-blue-500 text-gray-600 dark:text-black p-1 my-1 w-[240px]"
                            } flex items-center justify-center transition-colors dark:hover:text-white rounded-lg`}
                        >
                            <FontAwesomeIcon
                                icon={faUser}
                                className="w-5 h-5 ml-3"
                            />
                            <span className="mx-4 text-lg font-normal">
                                Profile
                            </span>
                            <span className="flex-grow text-right"></span>
                        </NavLink>
                    </nav>
                    <hr
                        style={{
                            border: "1px solid #e5e7eb",
                            width: "100%",
                            marginTop: "315px",
                        }}
                    />
                    <div className="absolute flex items-center justify-between">
                        <a
                            className="text-gray-600 dark:text-gray-300 hover-text-gray-800 dark-hover-text-gray-100 transition-colors duration-200 flex items-center py-2 px-8"
                            href="#"
                        >
                            <div className="flex items-center">
                                <div
                                    className="flex items-center"
                                    style={{
                                        marginTop: "20px",
                                        marginBottom: "20px",
                                        marginLeft: "-20px",
                                    }}
                                >
                                    <div>
                                        <p
                                            className="cursor-pointer text-sm leading-5 text-black"
                                            style={{ fontSize: "17px" }}
                                        >
                                            {user.name}
                                        </p>
                                        <p
                                            className="cursor-pointer text-xs leading-3 text-black-100"
                                            style={{
                                                fontSize: "17px",
                                                marginTop: "7px",
                                            }}
                                        >
                                            {user.role}
                                        </p>
                                    </div>
                                    <div style={{ marginLeft: "65px" }}>
                                        <ResponsiveNavLink
                                            method="post"
                                            href={route("logout")}
                                        >
                                            <FontAwesomeIcon
                                                icon={faArrowRightFromBracket}
                                            />
                                        </ResponsiveNavLink>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            );
        } else if (user.role === "siswa") {
            return (
                // Tampilan sidebar untuk siswa
                <div>
                    <nav className="mt-10 px-6" style={{ marginLeft: "-25px" }}>
                        <NavLink
                            href={route("dashboard")}
                            className={`${
                                route().current("dashboard")
                                    ? "hover:text-white hover:bg-blue-500 bg-blue-500 text-white p-1 my-1 w-[240px]"
                                    : "hover:text-white hover:bg-blue-500 text-gray-600 dark:text-black p-1 my-1 w-[240px]"
                            } flex items-center justify-center transition-colors dark:hover:text-white rounded-lg`}
                        >
                            <FontAwesomeIcon
                                icon={faChartColumn}
                                className="w-5 h-5 ml-3"
                            />
                            <span className="mx-4 text-lg font-normal">
                                Dashboard
                            </span>
                            <span className="flex-grow text-right"></span>
                        </NavLink>
                        <div className="relative inline-block text-left w-[240px]">
                            <div
                                className={`p-1.5 mt-1 flex items-center rounded-lg px-4 duration-300 cursor-pointer ${
                                    isDropdownOpen
                                        ? "hover:text-white hover:bg-blue-500 bg-blue-500 text-white p-1 my-1 w-[240px]"
                                        : "hover:text-white hover:bg-blue-500 text-gray-600 dark:text-black p-1 my-1 w-[240px]"
                                } flex items-center justify-center transition-colors dark:hover:text-white rounded-lg`}
                                onClick={toggleDropdown}
                            >
                                <FontAwesomeIcon icon={faLayerGroup} />
                                <div className="flex justify-between w-full items-center">
                                    <span
                                        className={`mx-4 text-lg font-normal ml-4 ${
                                            isDropdownOpen
                                                ? "text-white"
                                                : "hover:text-white"
                                        }`}
                                    >
                                        Mata Pelajaran
                                    </span>
                                    <span
                                        className={`text-sm ${
                                            isDropdownOpen ? "rotate-180" : ""
                                        }`}
                                        id="arrow"
                                    >
                                        <FontAwesomeIcon icon={faChevronDown} />
                                    </span>
                                </div>
                            </div>
                            {isDropdownOpen && (
                                <div
                                    className="text-left text-md mt-2 w-4/5 mx-auto text-gray-400"
                                    id="submenu"
                                    style={{ marginLeft: "-1px" }}
                                >
                                    <NavLink
                                        href={route("bindo")}
                                        className={`${
                                            route().current("bindo")
                                                ? "hover:text-white hover:bg-blue-500 bg-blue-500 text-white p-1 my-1 w-[240px]"
                                                : "hover:text-white hover:bg-blue-500 text-gray-600 dark:text-black p-1 my-1 w-[240px]"
                                        } flex items-center justify-center transition-colors dark:hover:text-white rounded-lg`}
                                    >
                                        <span className="mx-4 text-md font-normal">
                                            Bahasa Indonesia
                                        </span>
                                        <span className="flex-grow text-right"></span>
                                    </NavLink>
                                    <NavLink
                                        href={route("pkn")}
                                        className={`${
                                            route().current("pkn")
                                                ? "hover:text-white hover:bg-blue-500 bg-blue-500 text-white p-1 my-1 w-[240px]"
                                                : "hover:text-white hover:bg-blue-500 text-gray-600 dark:text-black p-1 my-1 w-[240px]"
                                        } flex items-center justify-center transition-colors dark:hover:text-white rounded-lg`}
                                    >
                                        <span className="mx-4 text-md font-normal">
                                            Pendidikan Kewarganegaraan
                                        </span>
                                        <span className="flex-grow text-right"></span>
                                    </NavLink>
                                    <NavLink
                                        href={route("mtk")}
                                        className={`${
                                            route().current("mtk")
                                                ? "hover:text-white hover:bg-blue-500 bg-blue-500 text-white p-1 my-1 w-[240px]"
                                                : "hover:text-white hover:bg-blue-500 text-gray-600 dark:text-black p-1 my-1 w-[240px]"
                                        } flex items-center justify-center transition-colors dark:hover:text-white rounded-lg`}
                                    >
                                        <span className="mx-4 text-md font-normal">
                                            Matematika
                                        </span>
                                        <span className="flex-grow text-right"></span>
                                    </NavLink>
                                    <NavLink
                                        href={route("ipa")}
                                        className={`${
                                            route().current("ipa")
                                                ? "hover:text-white hover:bg-blue-500 bg-blue-500 text-white p-1 my-1 w-[240px]"
                                                : "hover:text-white hover:bg-blue-500 text-gray-600 dark:text-black p-1 my-1 w-[240px]"
                                        } flex items-center justify-center transition-colors dark:hover:text-white rounded-lg`}
                                    >
                                        <span className="mx-4 text-md font-normal">
                                            Ilmu Pengetahuan Alam
                                        </span>
                                        <span className="flex-grow text-right"></span>
                                    </NavLink>
                                    <NavLink
                                        href={route("ips")}
                                        className={`${
                                            route().current("ips")
                                                ? "hover:text-white hover:bg-blue-500 bg-blue-500 text-white p-1 my-1 w-[240px]"
                                                : "hover:text-white hover:bg-blue-500 text-gray-600 dark:text-black p-1 my-1 w-[240px]"
                                        } flex items-center justify-center transition-colors dark:hover:text-white rounded-lg`}
                                    >
                                        <span className="mx-4 text-md font-normal">
                                            Ilmu Pengetahuan Sosial
                                        </span>
                                        <span className="flex-grow text-right"></span>
                                    </NavLink>
                                    <NavLink
                                        href={route("agama")}
                                        className={`${
                                            route().current("agama")
                                                ? "hover:text-white hover:bg-blue-500 bg-blue-500 text-white p-1 my-1 w-[240px]"
                                                : "hover:text-white hover:bg-blue-500 text-gray-600 dark:text-black p-1 my-1 w-[240px]"
                                        } flex items-center justify-center transition-colors dark:hover:text-white rounded-lg`}
                                    >
                                        <span className="mx-4 text-md font-normal">
                                            Agama
                                        </span>
                                        <span className="flex-grow text-right"></span>
                                    </NavLink>
                                    <NavLink
                                        href={route("senbud")}
                                        className={`${
                                            route().current("senbud")
                                                ? "hover:text-white hover:bg-blue-500 bg-blue-500 text-white p-1 my-1 w-[240px]"
                                                : "hover:text-white hover:bg-blue-500 text-gray-600 dark:text-black p-1 my-1 w-[240px]"
                                        } flex items-center justify-center transition-colors dark:hover:text-white rounded-lg`}
                                    >
                                        <span className="mx-4 text-md font-normal">
                                            Seni Budaya
                                        </span>
                                        <span className="flex-grow text-right"></span>
                                    </NavLink>
                                    <NavLink
                                        href={route("prakarya")}
                                        className={`${
                                            route().current("prakarya")
                                                ? "hover:text-white hover:bg-blue-500 bg-blue-500 text-white p-1 my-1 w-[240px]"
                                                : "hover:text-white hover:bg-blue-500 text-gray-600 dark:text-black p-1 my-1 w-[240px]"
                                        } flex items-center justify-center transition-colors dark:hover:text-white rounded-lg`}
                                    >
                                        <span className="mx-4 text-md font-normal">
                                            Prakarya
                                        </span>
                                        <span className="flex-grow text-right"></span>
                                    </NavLink>
                                    <NavLink
                                        href={route("penjas")}
                                        className={`${
                                            route().current("penjas")
                                                ? "hover:text-white hover:bg-blue-500 bg-blue-500 text-white p-1 my-1 w-[240px]"
                                                : "hover:text-white hover:bg-blue-500 text-gray-600 dark:text-black p-1 my-1 w-[240px]"
                                        } flex items-center justify-center transition-colors dark:hover:text-white rounded-lg`}
                                    >
                                        <span className="mx-4 text-md font-normal">
                                            Pendidikan Jasmani
                                        </span>
                                        <span className="flex-grow text-right"></span>
                                    </NavLink>
                                </div>
                            )}
                        </div>
                        <NavLink
                            href={route("TugasSaya")}
                            className={`${
                                route().current("TugasSaya")
                                    ? "hover:text-white hover:bg-blue-500 bg-blue-500 text-white p-1 my-1 w-[240px]"
                                    : "hover:text-white hover:bg-blue-500 text-gray-600 dark:text-black p-1 my-1 w-[240px]"
                            } flex items-center justify-center transition-colors dark:hover:text-white rounded-lg`}
                        >
                            <FontAwesomeIcon
                                icon={faClipboard}
                                className="w-5 h-5 ml-3"
                            />
                            <span className="mx-4 text-lg font-normal">
                                Tugas Saya
                            </span>
                            <span className="flex-grow text-right"></span>
                        </NavLink>
                        <NavLink
                            href={route("profile.edit")}
                            active={route().current("profile.edit")}
                            className={`${
                                route().current("profile.edit")
                                    ? "hover:text-white hover:bg-blue-500 bg-blue-500 text-white p-1 my-1 w-[240px]"
                                    : "hover:text-white hover:bg-blue-500 text-gray-600 dark:text-black p-1 my-1 w-[240px]"
                            } flex items-center justify-center transition-colors dark:hover:text-white rounded-lg`}
                        >
                            <FontAwesomeIcon
                                icon={faUser}
                                className="w-5 h-5 ml-3"
                            />
                            <span className="mx-4 text-lg font-normal">
                                Profile
                            </span>
                            <span className="flex-grow text-right"></span>
                        </NavLink>
                    </nav>
                    <hr
                        style={{
                            border: "1px solid #e5e7eb",
                            width: "100%",
                            marginTop: "220px",
                        }}
                    />
                    <div className="absolute flex items-center justify-between">
                        <a
                            className="text-gray-600 dark:text-gray-300 hover-text-gray-800 dark-hover-text-gray-100 transition-colors duration-200 flex items-center py-2 px-8"
                            href="#"
                        >
                            <div className="flex items-center">
                                <div
                                    className="flex items-center"
                                    style={{
                                        marginTop: "20px",
                                        marginBottom: "20px",
                                        marginLeft: "-20px",
                                    }}
                                >
                                    <div>
                                        <p
                                            className="cursor-pointer text-sm leading-5 text-black"
                                            style={{ fontSize: "17px" }}
                                        >
                                            {user.name}
                                        </p>
                                        <p
                                            className="cursor-pointer text-xs leading-3 text-black-100"
                                            style={{
                                                fontSize: "17px",
                                                marginTop: "7px",
                                            }}
                                        >
                                            {user.role}
                                        </p>
                                    </div>
                                    <div style={{ marginLeft: "65px" }}>
                                        <ResponsiveNavLink
                                            method="post"
                                            href={route("logout")}
                                        >
                                            <FontAwesomeIcon
                                                icon={faArrowRightFromBracket}
                                            />
                                        </ResponsiveNavLink>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            );
        } else if (user.role === "guru") {
            return (
                // Tampilan sidebar untuk guru
                <div>
                    <nav className="mt-10 px-6" style={{ marginLeft: "-25px" }}>
                        <NavLink
                            href={route("dashboard")}
                            className={`${
                                route().current("dashboard")
                                    ? "hover:text-white hover:bg-blue-500 bg-blue-500 text-white p-1 my-1 w-[240px]"
                                    : "hover:text-white hover:bg-blue-500 text-gray-600 dark:text-black p-1 my-1 w-[240px]"
                            } flex items-center justify-center transition-colors dark:hover:text-white rounded-lg`}
                        >
                            <FontAwesomeIcon
                                icon={faChartColumn}
                                className="w-5 h-5 ml-3"
                            />
                            <span className="mx-4 text-lg font-normal">
                                Dashboard
                            </span>
                            <span className="flex-grow text-right"></span>
                        </NavLink>
                        <NavLink
                            href={route("kelas-ajar.index")}
                            className={`${
                                route().current("kelas-ajar.index")
                                    ? "hover:text-white hover:bg-blue-500 bg-blue-500 text-white p-1 my-1 w-[240px]"
                                    : "hover:text-white hover:bg-blue-500 text-gray-600 dark:text-black p-1 my-1 w-[240px]"
                            } flex items-center justify-center transition-colors dark:hover:text-white rounded-lg`}
                        >
                            <FontAwesomeIcon
                                icon={faLayerGroup}
                                className="w-5 h-5 ml-3"
                            />
                            <span className="mx-4 text-lg font-normal">
                                Kelas Ajar
                            </span>
                            <span className="flex-grow text-right"></span>
                        </NavLink>
                        {/* <NavLink
                            href={route("lihatmateri")}
                            className={`${
                                route().current("lihatmateri")
                                    ? "hover:text-white hover:bg-blue-500 bg-blue-500 text-white p-1 my-1 w-[240px]"
                                    : "hover:text-white hover:bg-blue-500 text-gray-600 dark:text-black p-1 my-1 w-[240px]"
                            } flex items-center justify-center transition-colors dark:hover:text-white rounded-lg`}
                        >
                            <FontAwesomeIcon
                                icon={faLayerGroup}
                                className="w-5 h-5 ml-3"
                            />
                            <span className="mx-4 text-lg font-normal">
                                Lihat Materi
                            </span>
                            <span className="flex-grow text-right"></span>
                        </NavLink>
                        <NavLink
                            href={route("unggahmateri")}
                            className={`${
                                route().current("unggahmateri")
                                    ? "hover:text-white hover:bg-blue-500 bg-blue-500 text-white p-1 my-1 w-[240px]"
                                    : "hover:text-white hover:bg-blue-500 text-gray-600 dark:text-black p-1 my-1 w-[240px]"
                            } flex items-center justify-center transition-colors dark:hover:text-white rounded-lg`}
                        >
                            <FontAwesomeIcon
                                icon={faLayerGroup}
                                className="w-5 h-5 ml-3"
                            />
                            <span className="mx-4 text-lg font-normal">
                                Unggah Materi
                            </span>
                            <span className="flex-grow text-right"></span>
                        </NavLink>
                        <NavLink
                            href={route("penugasan")}
                            className={`${
                                route().current("penugasan")
                                    ? "hover:text-white hover:bg-blue-500 bg-blue-500 text-white p-1 my-1 w-[240px]"
                                    : "hover:text-white hover:bg-blue-500 text-gray-600 dark:text-black p-1 my-1 w-[240px]"
                            } flex items-center justify-center transition-colors dark:hover:text-white rounded-lg`}
                        >
                            <FontAwesomeIcon
                                icon={faClipboard}
                                className="w-5 h-5 ml-3"
                            />
                            <span className="mx-4 text-lg font-normal">
                                Penugasan
                            </span>
                            <span className="flex-grow text-right"></span>
                        </NavLink> */}
                        <NavLink
                            href={route("profile.edit")}
                            active={route().current("profile.edit")}
                            className={`${
                                route().current("profile.edit")
                                    ? "hover:text-white hover:bg-blue-500 bg-blue-500 text-white p-1 my-1 w-[240px]"
                                    : "hover:text-white hover:bg-blue-500 text-gray-600 dark:text-black p-1 my-1 w-[240px]"
                            } flex items-center justify-center transition-colors dark:hover:text-white rounded-lg`}
                        >
                            <FontAwesomeIcon
                                icon={faUser}
                                className="w-5 h-5 ml-3"
                            />
                            <span className="mx-4 text-lg font-normal">
                                Profile
                            </span>
                            <span className="flex-grow text-right"></span>
                        </NavLink>
                    </nav>
                    <hr
                        style={{
                            border: "1px solid #e5e7eb",
                            width: "100%",
                            marginTop: "270px",
                        }}
                    />
                    <div className="absolute flex items-center justify-between">
                        <a
                            className="text-gray-600 dark:text-gray-300 hover-text-gray-800 dark-hover-text-gray-100 transition-colors duration-200 flex items-center py-2 px-8"
                            href="#"
                        >
                            <div className="flex items-center">
                                <div
                                    className="flex items-center"
                                    style={{
                                        marginTop: "20px",
                                        marginBottom: "20px",
                                        marginLeft: "-20px",
                                    }}
                                >
                                    <div>
                                        <p
                                            className="cursor-pointer text-sm leading-5 text-black"
                                            style={{ fontSize: "17px" }}
                                        >
                                            {user.name}
                                        </p>
                                        <p
                                            className="cursor-pointer text-xs leading-3 text-black-100"
                                            style={{
                                                fontSize: "17px",
                                                marginTop: "7px",
                                            }}
                                        >
                                            {user.role}
                                        </p>
                                    </div>
                                    <div style={{ marginLeft: "65px" }}>
                                        <ResponsiveNavLink
                                            method="post"
                                            href={route("logout")}
                                        >
                                            <FontAwesomeIcon
                                                icon={faArrowRightFromBracket}
                                            />
                                        </ResponsiveNavLink>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            );
        } else {
            // Tampilan default jika tidak ada role yang cocok
            return <div>{/* ... */}</div>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div
                className="fixed bg-white shadow h-screen overflow-y-auto"
                style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
            >
                <div className="flex flex-col sm:flex-row sm:justify-around">
                    <div className="w-72">
                        <div className="flex items-center justify-start mx-6 mt-10">
                            <img
                                src={Frame}
                                alt="Logo"
                                className="h-15 w-40 ml-7"
                            />
                        </div>
                        <div className="mt-10 px-6">
                            <span className="text-lg font-normal">Menu</span>
                        </div>
                        <nav className="mt-10 px-6">
                            {/* Menampilkan sidebar berdasarkan role user */}
                            {renderSidebarBasedOnUserRole()}
                        </nav>
                    </div>
                </div>
            </div>
            {/* End Sidebar */}

            {/* Main Content */}
            <main className="flex-1">
                {/* Header */}
                {header && (
                    <header
                        className="bg-white-500"
                        style={{ marginLeft: "290px" }}
                    >
                        <div className="max-w-7xl mx-auto py-6 px-4 sm-px-6 lg-px-8">
                            {header}
                        </div>
                    </header>
                )}
                {/* End Header */}
                {/* Main Content */}
                <div
                    className="bg-white-500 max-w-7xl mx-auto py-6 px-4 sm-px-6 lg-px-8"
                    style={{ marginLeft: "290px" }}
                >
                    {children}
                </div>
                {/* End Main Content */}
            </main>
            {/* End Main Content */}
        </div>
    );
}
