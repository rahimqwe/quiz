import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StarRating } from "./star-rating";

interface Testimonial {
  quote: string;
  attribution: string;
  rating: number;
  initials: string;
  bgColor: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const scrollPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const scrollNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const canScrollPrev = testimonials.length > 1;
  const canScrollNext = testimonials.length > 1;

  const currentTestimonial = testimonials[currentIndex];

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 40; // px

    if (diffX > threshold && canScrollPrev) {
      scrollPrev(); // swipe right → previous
    } else if (diffX < -threshold && canScrollNext) {
      scrollNext(); // swipe left → next
    }

    touchStartX.current = null;
  };

  return (
    <div className="w-full">
      <div className="relative flex items-center justify-center">
        {/* Navigation Buttons (desktop) */}
        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="absolute max-[830px]:hidden left-0 top-1/2 -translate-y-1/2 -translate-x-16 sm:-translate-x-12 p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all z-10"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={20} className="text-gray-700" />
        </button>

        {/* Testimonial Card (attach touch handlers here) */}
        <div
          className="w-full max-w-2xl"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm">
                  {currentTestimonial.attribution}
                </p>
              </div>
            </div>

            <blockquote className="text-gray-700 leading-relaxed mb-6 flex-1 italic text-sm">
              "{currentTestimonial.quote}"
            </blockquote>

            <div className="pt-4 border-t border-gray-100">
              <StarRating rating={currentTestimonial.rating} />
            </div>
          </div>
        </div>

        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="absolute max-[830px]:hidden right-0 top-1/2 -translate-y-1/2 translate-x-16 sm:translate-x-12 p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all z-10"
          aria-label="Next testimonial"
        >
          <ChevronRight size={20} className="text-gray-700" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-gray-600" : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
