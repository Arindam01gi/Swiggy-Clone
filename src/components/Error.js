import { useRouteError, Link } from "react-router-dom";

const Error = () => {
    const err = useRouteError();
    console.error(err);

    return (
        <main className="min-h-screen bg-white flex flex-col items-center justify-center p-4 font-['Inter']">
            <div className="max-w-[500px] w-full text-center space-y-8 animate-fade-in">
                <div className="relative">
                    <img
                        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_800,h_800/2xempty_cart_ybi7jt"
                        className="w-full h-auto opacity-50 grayscale"
                        alt="Error"
                    />
                    <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] font-black text-[#282c3f] opacity-10 tracking-tighter">404</h1>
                </div>

                <div className="space-y-3">
                    <h2 className="text-3xl font-extrabold text-[#282c3f] font-['Lexend'] tracking-tight">Oops! Page not found</h2>
                    <p className="text-gray-400 font-medium leading-relaxed">
                        We can't seem to find the page you're looking for. <br />
                        {err?.statusText || err?.message}
                    </p>
                </div>

                <Link
                    to="/"
                    className="inline-block bg-[#fc8019] text-white px-10 py-4 rounded-xl font-black text-[15px] uppercase tracking-widest shadow-lg shadow-orange-100 transition-all hover:-translate-y-1 hover:shadow-xl active:scale-95"
                >
                    Go Back Home
                </Link>
            </div>
        </main>
    );
};

export default Error;
