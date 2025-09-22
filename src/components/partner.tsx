const Partners = () => {
    return (
        <div className="py-20 bg-muted/20">
            <div className="container mx-auto px-4">
                <h3 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4 font-roboto">Partners & Supporters</h3>
                <div className="w-20 h-1 bg-secondary mx-auto mb-12"></div>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                    {/* Ritman */}
                    <div className="bg-white h-24 w-40 md:w-48 flex items-center justify-center rounded-2xl shadow-lg border border-primary/10 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                        <div className="text-primary font-bold">
                            <img src="./images.jpg" alt="Ritman Partner" className='rounded-lg w-[40%] text-center mx-auto' />
                        </div>
                    </div>
                    {/* NITDA */}
                    <div className="bg-white h-24 w-40 md:w-48 flex items-center justify-center rounded-2xl shadow-lg border border-primary/10 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                        <div className="text-primary font-bold">
                            <img src="./bg-news-370x240.png" alt="NITDA Partner" className='rounded-lg w-[60%] text-center mx-auto' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Partners;
