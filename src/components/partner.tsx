const Partners = () => {

    return (
        <div className="mt-20 relative">
            <div className="absolute inset-0 bg-secondary blur-sm opacity-75"></div>
            <div className="relative py-10">
                <h3 className="text-3xl font-[800] text-center text-white  mb-10">Partners & Supporters</h3>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                    {/* Ritman */}
                    <div className="bg-white h-20 w-32 md:w-40 flex items-center justify-center rounded-lg shadow-md border border-primary/20 relative hover:bottom-1 cursor-pointer">
                        <div className="text-primary font-bold">
                            <img src="./images.jpg" alt="" className='rounded-lg w-[40%] text-center mx-auto' />
                        </div>
                    </div>
                    {/* NITDA */}
                    <div className="bg-white h-20 w-32 md:w-40 flex items-center justify-center rounded-lg shadow-md border border-primary/20 relative hover:bottom-1 cursor-pointer">
                        <div className="text-primary font-bold">
                            <img src="./bg-news-370x240.png" alt="" className='rounded-lg w-[60%] text-center mx-auto' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Partners;
