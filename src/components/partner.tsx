const Partners = () => {
    const logos = [
        {
            name: 'United Nations Development Programme (UNDP)',
            // Publicly hosted UNDP logo (commonly available asset)
            src: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/UNDP_logo.svg',
            widthClass: 'w-[56%]'
        },
        {
            name: 'ONDI - Office for Nigerian Digital Innovation',
            src: 'https://nitda.gov.ng/wp-content/uploads/2022/05/ONDI-logo-1.png',
            widthClass: 'w-[70%]'
        },
        {
            name: 'Ibom Innovation Network',
            src: 'https://ibominovationnetwork.org/wp-content/uploads/2022/02/Ibom-logo.png',
            widthClass: 'w-[75%]'
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
                        <div key={logo.name} className="bg-white h-20 w-36 md:w-44 flex items-center justify-center rounded-lg shadow-md border border-primary/20 relative hover:bottom-1">
                            <img src={logo.src} alt={logo.name} className={`object-contain ${logo.widthClass}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Partners;
