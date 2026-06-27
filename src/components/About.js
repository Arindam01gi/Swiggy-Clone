import React, { useContext } from "react";
import UserContext from '../utils/UserContext';

const About = () => {
    const { loggedInUser } = useContext(UserContext);

    return (
        <div className="pt-24 pb-12 bg-white min-h-screen animate-fade-in-left">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100">
                    {/* Cover Photo */}
                    <div className="h-48 bg-gradient-to-r from-[#fc8019] to-[#ff5200]"></div>

                    {/* Profile Header */}
                    <div className="px-10 pb-10">
                        <div className="relative flex justify-between items-end -mt-16 mb-6">
                            <div className="p-1.5 bg-white rounded-full shadow-2xl">
                                <div className="w-32 h-32 bg-[#282c3f] rounded-full flex items-center justify-center text-4xl font-extrabold text-white border-4 border-white font-['Lexend']">
                                    {loggedInUser.charAt(0)}
                                </div>
                            </div>
                            <button className="bg-white border-2 border-[#fc8019] text-[#fc8019] px-8 py-2.5 rounded-xl font-extrabold hover:bg-[#fc8019] hover:text-white transition-all shadow-sm active:scale-95">
                                Edit Profile
                            </button>
                        </div>

                        <div className="mb-10">
                            <h1 className="text-[32px] font-extrabold text-[#282c3f] font-['Lexend'] tracking-tight">{loggedInUser}</h1>
                            <p className="text-[#686b78] font-bold text-[15px] opacity-70">Member since 2024 • Life Enthusiast</p>
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-orange-50 p-6 rounded-xl text-center border border-orange-100">
                                <span className="block text-2xl font-bold text-orange-600">12</span>
                                <span className="text-gray-600 text-sm font-semibold uppercase tracking-wider">Orders</span>
                            </div>
                            <div className="bg-orange-50 p-6 rounded-xl text-center border border-orange-100">
                                <span className="block text-2xl font-bold text-orange-600">4.8</span>
                                <span className="text-gray-600 text-sm font-semibold uppercase tracking-wider">Rating</span>
                            </div>
                            <div className="bg-orange-50 p-6 rounded-xl text-center border border-orange-100">
                                <span className="block text-2xl font-bold text-orange-600">₹1.2k</span>
                                <span className="text-gray-600 text-sm font-semibold uppercase tracking-wider">Spent</span>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Account Settings</h2>
                            <ul className="space-y-4 text-gray-700">
                                <li className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                                    <i className="fa-solid fa-location-dot text-orange-500 w-5"></i>
                                    <span className="flex-grow">Manage Addresses</span>
                                    <i className="fa-solid fa-chevron-right text-gray-400"></i>
                                </li>
                                <li className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                                    <i className="fa-solid fa-credit-card text-orange-500 w-5"></i>
                                    <span className="flex-grow">Payment Methods</span>
                                    <i className="fa-solid fa-chevron-right text-gray-400"></i>
                                </li>
                                <li className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                                    <i className="fa-solid fa-bell text-orange-500 w-5"></i>
                                    <span className="flex-grow">Notifications</span>
                                    <i className="fa-solid fa-chevron-right text-gray-400"></i>
                                </li>
                                <li className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                                    <i className="fa-solid fa-shield-halved text-orange-500 w-5"></i>
                                    <span className="flex-grow">Privacy & Security</span>
                                    <i className="fa-solid fa-chevron-right text-gray-400"></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
