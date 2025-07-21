import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-gray-300 border-t border-slate-700 w-full py-6 flex flex-col items-center">
            <div className="logo font-bold text-2xl flex items-center space-x-1">
                <span className="text-green-700">&lt;</span>
                <span>Key</span>
                <span className="text-green-700">Crypt/&gt;</span>
            </div>
            <p className="mt-2 text-sm text-slate-400">© {new Date().getFullYear()} KeyCrypt. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
