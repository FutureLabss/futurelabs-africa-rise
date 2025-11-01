import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { useIsMobile } from "@/hooks/use-mobile";
import Autoplay from "embla-carousel-autoplay"

const Partners = () => {
    const logos = [
        { name: 'afrilabs', src: '/partners/afrilabs.png' },
        { name: 'AKS', src: '/partners/AKS.jpg' },
        { name: 'AStw', src: '/partners/AStw.png' },
        { name: 'ritman', src: '/partners/ritman.png' },
        { name: 'digitspot', src: '/partners/digitspot.jpg' },
        { name: 'hotelsNG', src: '/partners/hotelsNG.png' },
        { name: 'ibom', src: '/partners/ibom.png' },
        { name: 'leapAfrica', src: '/partners/leapAfrica.jpeg' },
        { name: 'nitda-1', src: '/partners/nitda-1.webp' },
        { name: 'ondi', src: '/partners/ondi.png' },
        { name: 'pind', src: '/partners/pind.png' }
    ];

    const isMobile = useIsMobile();

    return (
        <div className="mt-20 relative">
            <div className="absolute inset-0 bg-secondary blur-sm opacity-75"></div>
            <div className="relative py-10">
                <h3 className="text-3xl font-[800] text-center text-white mb-3">Partners & Supporters</h3>
                <p className="text-center text-white/90 mb-10 px-6">
                    organizations we have had the pleasure of innovating for impact with
                </p>
                {isMobile ? (
                    <Carousel
                        plugins={[
                            Autoplay({
                                delay: 2000,
                            }),
                        ]}
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full max-w-sm mx-auto"
                    >
                        <CarouselContent>
                            {logos.map((logo, index) => (
                                <CarouselItem key={index} className="basis-1/2 sm:basis-1/3">
                                    <div className="p-1">
                                        <div className="bg-white h-20 w-full flex items-center justify-center rounded-lg shadow-md border border-primary/20 relative p-2">
                                            <img src={logo.src} alt={logo.name} className="object-contain h-full w-full" onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/partners/placeholder.svg'; }} />
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                ) : (
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                        {logos.map((logo) => (
                            <div key={logo.name} className="bg-white h-20 w-40 md:w-48 flex items-center justify-center rounded-lg shadow-md border border-primary/20 relative p-2">
                                <img src={logo.src} alt={logo.name} className="object-contain h-full w-full" onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/partners/placeholder.svg'; }} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Partners;
