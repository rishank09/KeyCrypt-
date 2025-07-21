import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-slate-900 text-gray-100 border-b border-slate-700 shadow-md">
            <div className="mycontainer flex justify-between items-center px-4 py-4 h-16">
                <div className="logo font-bold text-2xl flex items-center">
                    <span className="text-green-600">&lt;</span>
                    <span>Key</span>
                    <span className="text-green-600">Crypt/&gt;</span>
                </div>

                
            </div>
        </nav>
    );
};

export default Navbar;
