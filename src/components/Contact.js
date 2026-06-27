const Contact = () => {
    const faqs = [
        { q: "How do I track my order?", a: "You can track your order in real-time through the 'Orders' section in your profile." },
        { q: "What are the delivery charges?", a: "Delivery charges vary based on distance and order value. You can see the exact fee at checkout." },
        { q: "How can I cancel my order?", a: "Orders can be cancelled before the restaurant starts preparing your food for a full refund." },
    ];

    return (
        <main className="pt-32 pb-20 bg-white min-h-screen animate-fade-in-left">
            <div className="container mx-auto px-4 max-w-[900px]">
                <header className="text-center mb-16">
                    <h1 className="text-[36px] font-extrabold text-[#282c3f] tracking-tight font-['Lexend'] mb-4">Help & Support</h1>
                    <p className="text-[#686b78] text-lg font-medium">Let's take a step ahead and help you better.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="p-8 bg-white border border-gray-100 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all text-center group cursor-pointer">
                        <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <i className="fa-solid fa-envelope text-2xl text-[#fc8019]"></i>
                        </div>
                        <h3 className="font-bold text-[#282c3f] mb-2 font-['Lexend']">Email Us</h3>
                        <p className="text-sm text-gray-500 font-medium">support@swiggy.com</p>
                    </div>
                    <div className="p-8 bg-white border border-gray-100 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all text-center group cursor-pointer">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <i className="fa-solid fa-phone text-2xl text-blue-500"></i>
                        </div>
                        <h3 className="font-bold text-[#282c3f] mb-2 font-['Lexend']">Call Support</h3>
                        <p className="text-sm text-gray-500 font-medium">+91 1800-SWIGGY</p>
                    </div>
                    <div className="p-8 bg-white border border-gray-100 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all text-center group cursor-pointer">
                        <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <i className="fa-solid fa-comments text-2xl text-green-500"></i>
                        </div>
                        <h3 className="font-bold text-[#282c3f] mb-2 font-['Lexend']">Live Chat</h3>
                        <p className="text-sm text-gray-500 font-medium font-bold text-green-600">Online Now</p>
                    </div>
                </div>

                <section className="bg-gray-50 rounded-[2.5rem] p-10">
                    <h2 className="text-2xl font-extrabold text-[#282c3f] mb-8 font-['Lexend']">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h4 className="font-bold text-[#282c3f] mb-2 text-lg">{faq.q}</h4>
                                <p className="text-[#686b78] font-medium leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Contact;
