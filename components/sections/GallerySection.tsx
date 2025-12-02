'use client';

import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Polaroid } from '@/components/ui/Polaroid';
import { GALLERY_IMAGES } from '@/lib/constants/content';

gsap.registerPlugin(ScrollTrigger);

export function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useScrollAnimation<HTMLElement>((element) => {
    if (!titleRef.current) return;

    // Animate title with perspective
    gsap.fromTo(
      titleRef.current,
      {
        opacity: 0,
        rotateX: -90,
        transformOrigin: 'center top',
      },
      {
        opacity: 1,
        rotateX: 0,
        duration: 1.5,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-4 bg-gradient-to-b from-peach-50 via-orange-50 to-coral-50 overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-9xl text-orange-200/40 font-script rotate-12">
          Love
        </div>
        <div className="absolute bottom-40 right-20 text-9xl text-coral-200/40 font-script -rotate-12">
          Forever
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20" style={{ perspective: '1000px' }}>
          <h2
            ref={titleRef}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-4"
          >
            Momentos Inesquecíveis
          </h2>
          <p className="text-xl text-gray-600">
            Cada foto conta uma história
          </p>
        </div>

        {/* Polaroid Grid with staggered layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {GALLERY_IMAGES.map((image, index) => (
            <div
              key={image.id}
              className={`${
                index % 3 === 1 ? 'md:mt-20' : ''
              } ${
                index % 3 === 2 ? 'md:mt-40' : ''
              }`}
            >
              <Polaroid
                image={image}
                index={index}
              />
            </div>
          ))}
        </div>

        {/* Add more photos section */}
        <div className="text-center mt-20">
          <div className="inline-block bg-white p-8 rounded-2xl shadow-xl">
            <p className="text-gray-600 text-lg mb-4">
              E muitas outras histórias por vir...
            </p>
            <div className="flex justify-center gap-2">
              <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse" />
              <div className="w-3 h-3 bg-coral-400 rounded-full animate-pulse delay-75" />
              <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse delay-150" />
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox modal (opcional) */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              className="absolute -top-12 right-0 text-white text-4xl hover:text-pink-400 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <div className="bg-white p-6 pb-16">
              <div className="relative w-full h-[70vh]">
                {/* Image would go here */}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
