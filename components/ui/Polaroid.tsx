'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils/cn';
import { PolaroidImage } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface PolaroidProps {
  image: PolaroidImage;
  index: number;
  className?: string;
}

export function Polaroid({ image, index, className }: PolaroidProps) {
  const polaroidRef = useScrollAnimation<HTMLDivElement>((element) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 100,
        rotation: image.rotation || 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Hover animation
    element.addEventListener('mouseenter', () => {
      gsap.to(element, {
        scale: 1.05,
        rotation: 0,
        zIndex: 10,
        duration: 0.3,
        ease: 'power2.out',
      });
    });

    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        scale: 1,
        rotation: image.rotation || 0,
        zIndex: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
  }, []);

  return (
    <div
      ref={polaroidRef}
      className={cn(
        'relative bg-white p-3 pb-12 shadow-2xl cursor-pointer',
        'hover:shadow-3xl transition-shadow duration-300',
        className
      )}
      style={{
        transform: `rotate(${image.rotation || 0}deg)`,
      }}
    >
      <div className="relative w-full aspect-square bg-gray-100">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
        />
      </div>
      {image.caption && (
        <p className="absolute bottom-3 left-3 right-3 text-center text-sm font-handwriting text-gray-700">
          {image.caption}
        </p>
      )}
    </div>
  );
}
