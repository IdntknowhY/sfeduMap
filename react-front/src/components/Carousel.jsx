import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

export const Carousel = ({ images, descriptions, buttons }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const minSwipeDistance = 50;

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        
        if (isLeftSwipe) nextSlide();
        if (isRightSwipe) prevSlide();
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 10000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    // Функция для безопасного доступа к данным кнопки
    const getButtonData = (index) => {
        if (!buttons || buttons.length <= index) return null;
        return buttons[index];
    };

    return (
        <div 
            className="relative w-full h-150 my-2 overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            {/* Текущий активный слайд */}
            <div className="relative w-full h-full">
                <img
                    src={images[currentIndex]}
                    className="w-full h-full object-cover"
                    alt={`Slide ${currentIndex + 1}`}
                />
                
                {/* Описание и кнопка для текущего слайда */}
                {descriptions[currentIndex] && (
                    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-black/70 text-white p-4 rounded-lg max-w-md w-4/5">
                        <p className="text-center mb-3">{descriptions[currentIndex]}</p>
                        {getButtonData(currentIndex) && (
                            <a 
                                href={getButtonData(currentIndex).url} 
                                className="block text-center bg-black text-white border border-white py-2 px-4 rounded hover:bg-white hover:text-black hover:border-black transition-colors"
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.location.href = getButtonData(currentIndex).url;
                                }}
                            >
                                {getButtonData(currentIndex).text}
                            </a>
                        )}
                    </div>
                )}
            </div>
            
            {/* Стрелки навигации */}
            <button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black/70 transition-colors"
                aria-label="Previous slide"
            >
                &lt;
            </button>
            <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black/70 transition-colors"
                aria-label="Next slide"
            >
                &gt;
            </button>
            
            {/* Индикаторы слайдов */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-400'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

Carousel.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    descriptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        })
    )
};