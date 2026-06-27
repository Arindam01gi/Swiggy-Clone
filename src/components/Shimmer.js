const Shimmer = () => {
    return (
        <div className="pt-24 pb-12 bg-white">
            <div className="container mx-auto px-4 max-w-[1200px]">
                {/* Shimmer Hero Section */}
                <div className="h-40 bg-gray-100 rounded-2xl w-full mb-12 animate-pulse"></div>

                {/* Shimmer Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {Array(8).fill("").map((_, index) => (
                        <div key={index} className="flex flex-col gap-4">
                            <div className="h-[180px] bg-gray-100 rounded-2xl w-full animate-pulse"></div>
                            <div className="h-6 bg-gray-100 rounded-md w-3/4 animate-pulse"></div>
                            <div className="h-4 bg-gray-100 rounded-md w-1/2 animate-pulse"></div>
                            <div className="h-4 bg-gray-100 rounded-md w-1/4 animate-pulse"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Shimmer;
