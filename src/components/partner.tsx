const Partners = () => {
    const logos = [
        {
            name: 'United Nations Development Programme (UNDP)',
            src: '/partners/undp.png',
            widthClass: 'w-[56%]'
        },
        {
            name: 'ONDI - Office for Nigerian Digital Innovation',
            src: '/partners/ondi.png',
            widthClass: 'w-[70%]'
        },
        {
            name: 'Ibom Innovation Network',
            src: '/partners/ibom.png',
            widthClass: 'w-[60%]'
        }
    ];

    return (
        <div className="mt-20 relative">
            <div className="absolute inset-0 bg-secondary blur-sm opacity-75"></div>
            <div className="relative py-10">
                <h3 className="text-3xl font-[800] text-center text-white mb-3">Partners & Supporters</h3>
                <p className="text-center text-white/90 mb-10 px-6">
                    organizations we have had the pleasure of innovating for impact with
                </p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                    {logos.map((logo) => (
                        <div key={logo.name} className="bg-white h-20 w-40 md:w-48 flex items-center justify-center rounded-lg shadow-md border border-primary/20 relative">
                            <img src={logo.src} alt={logo.name} className={`object-contain ${logo.widthClass}`} onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/partners/placeholder.svg'; }} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Partners;
