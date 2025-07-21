import React, { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);

    const getPasswords = async () => {
        let req = await fetch("https://keycrypt-we28.onrender.com");
        let passwords = await req.json();
        setPasswordArray(passwords);
    };

    useEffect(() => {
        getPasswords();
    }, []);

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
        });
        navigator.clipboard.writeText(text);
    };

    const showPassword = () => {
        passwordRef.current.type = "text";
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png";
            passwordRef.current.type = "password";
        } else {
            passwordRef.current.type = "text";
            ref.current.src = "icons/eyecross.png";
        }
    };

    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            await fetch("https://keycrypt-we28.onrender.com", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: form.id }),
            });

            const newPass = { ...form, id: uuidv4() };
            setPasswordArray([...passwordArray, newPass]);

            await fetch("https://keycrypt-we28.onrender.com", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPass),
            });

            setform({ site: "", username: "", password: "" });

            toast('Password saved!', {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
            });
        } else {
            toast.error('Error: Please fill all fields!', {
                theme: "dark",
            });
        }
    };

    const deletePassword = async (id) => {
        let confirmDelete = confirm("Do you really want to delete this password?");
        if (confirmDelete) {
            setPasswordArray(passwordArray.filter(item => item.id !== id));
            await fetch("https://keycrypt-we28.onrender.com", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            toast('Password deleted!', {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
            });
        }
    };

    const editPassword = (id) => {
        const current = passwordArray.find(item => item.id === id);
        setform(current);
        setPasswordArray(passwordArray.filter(item => item.id !== id));
    };

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <>
            <ToastContainer />
            <div className="min-h-screen bg-slate-900 text-gray-100 px-4 py-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-center mb-2">
                        <span className="text-green-600">&lt;</span>Key
                        <span className="text-green-600">Crypt/&gt;</span>
                    </h1>
                    <p className="text-center text-gray-400 mb-6">Your own Password Manager</p>

                    <div className="bg-slate-800 p-6 rounded-lg shadow-md">
                        <div className="flex flex-col gap-4 mb-6">
                            <input
                                value={form.site}
                                onChange={handleChange}
                                placeholder="Enter website URL"
                                name="site"
                                type="text"
                                className="bg-slate-700 border border-slate-600 text-white p-3 rounded"
                            />
                            <div className="flex flex-col md:flex-row gap-4">
                                <input
                                    value={form.username}
                                    onChange={handleChange}
                                    placeholder="Enter Username"
                                    name="username"
                                    type="text"
                                    className="bg-slate-700 border border-slate-600 text-white p-3 rounded w-full"
                                />
                                <div className="relative w-full">
                                    <input
                                        ref={passwordRef}
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="Enter Password"
                                        name="password"
                                        type="password"
                                        className="bg-slate-700 border border-slate-600 text-white p-3 rounded w-full"
                                    />
                                    <span
                                        className="absolute top-2 right-2 cursor-pointer"
                                        onClick={showPassword}
                                    >
                                        <img ref={ref} width={24} src="icons/eye.png" alt="eye" />
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={savePassword}
                                className="bg-green-600 hover:bg-green-500 transition-colors text-white py-2 px-6 rounded-full flex items-center gap-2 self-start"
                            >
                                <lord-icon
                                    src="https://cdn.lordicon.com/jgnvfzqg.json"
                                    trigger="hover"
                                />
                                Save
                            </button>
                        </div>

                        <div className="mt-8">
                            <h2 className="text-xl font-semibold mb-4">Your Passwords</h2>
                            {passwordArray.length === 0 ? (
                                <p className="text-gray-500">No passwords to show</p>
                            ) : (
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-700 text-gray-200">
                                        <tr>
                                            <th className="px-4 py-2">Site</th>
                                            <th className="px-4 py-2">Username</th>
                                            <th className="px-4 py-2">Password</th>
                                            <th className="px-4 py-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-slate-800 text-gray-300">
                                        {passwordArray.map((item, index) => (
                                            <tr key={index} className="border-b border-slate-700">
                                                <td className="px-4 py-2">
                                                    <div className="flex items-center gap-2">
                                                        <a href={item.site} target="_blank" className="text-green-400 hover:underline">{item.site}</a>
                                                        <div onClick={() => copyText(item.site)} className="cursor-pointer">
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                trigger="hover"
                                                                style={{ width: "20px", height: "20px" }}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2">
                                                    <div className="flex items-center gap-2">
                                                        {item.username}
                                                        <div onClick={() => copyText(item.username)} className="cursor-pointer">
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                trigger="hover"
                                                                style={{ width: "20px", height: "20px" }}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2">
                                                    <div className="flex items-center gap-2">
                                                        {"*".repeat(item.password.length)}
                                                        <div onClick={() => copyText(item.password)} className="cursor-pointer">
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                trigger="hover"
                                                                style={{ width: "20px", height: "20px" }}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2 flex gap-2">
                                                    <span onClick={() => editPassword(item.id)} className="cursor-pointer">
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/gwlusjdu.json"
                                                            trigger="hover"
                                                            style={{ width: "20px", height: "20px" }}
                                                        />
                                                    </span>
                                                    <span onClick={() => deletePassword(item.id)} className="cursor-pointer">
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/skkahier.json"
                                                            trigger="hover"
                                                            style={{ width: "20px", height: "20px" }}
                                                        />
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Manager;
