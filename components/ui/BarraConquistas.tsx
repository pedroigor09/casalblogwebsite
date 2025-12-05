'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { getImagePath } from '@/lib/utils/paths';

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  parallaxClass: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: getImagePath('img7.jpg'),
    alt: 'Momento especial 1',
    caption: 'Nosso primeiro café juntos ☕',
    parallaxClass: 'slower',
  },
  {
    src: getImagePath('img8.jpg'),
    alt: 'Momento especial 2',
    caption: 'Aventura na praia 🏖️',
    parallaxClass: 'faster',
  },
  {
    src: getImagePath('img9.jpg'),
    alt: 'Momento especial 3',
    caption: 'Pôr do sol perfeito 🌅',
    parallaxClass: 'slower vertical',
  },
  {
    src: getImagePath('img10.jpg'),
    alt: 'Momento especial 4',
    caption: 'Jantar romântico 🍝',
    parallaxClass: 'slower slower-down',
  },
  {
    src: getImagePath('img11.jpg'),
    alt: 'Momento especial 5',
    caption: 'Nossa primeira viagem ✈️',
    parallaxClass: '',
  },
  {
    src: getImagePath('img12.jpg'),
    alt: 'Momento especial 6',
    caption: 'Dia de aventura 🎢',
    parallaxClass: 'slower',
  },
  {
    src: getImagePath('img13.jpg'),
    alt: 'Momento especial 7',
    caption: 'Momento fofo 💕',
    parallaxClass: 'faster1',
  },
  {
    src: getImagePath('img14.jpg'),
    alt: 'Momento especial 8',
    caption: 'Diversão garantida 🎉',
    parallaxClass: 'slower slower2',
  },
  {
    src: getImagePath('img15.jpg'),
    alt: 'Momento especial 9',
    caption: 'Sorriso sincero 😊',
    parallaxClass: '',
  },
  {
    src: getImagePath('img1.jpg'),
    alt: 'Momento especial 10',
    caption: 'Amor verdadeiro 💖',
    parallaxClass: 'slower',
  },
  {
    src: getImagePath('img2.jpg'),
    alt: 'Momento especial 11',
    caption: 'Juntos para sempre ∞',
    parallaxClass: 'slower last',
  },
];

export function BarraConquistas() {
  return (
    <section className="relative bg-linear-to-b from-orange-50 via-peach-50 to-pink-50 w-full">
      {/* Container externo */}
      <div className="external">
        <div className="horizontal-scroll-wrapper">
          {GALLERY_IMAGES.map((image, index) => (
            <div key={index} className={`img-wrapper ${image.parallaxClass}`}>
              <div className="gallery-card">
                <div className="image-container">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={600}
                    height={700}
                    className="gallery-image"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* Hide scrollbar */
        ::-webkit-scrollbar {
          width: 1px;
          height: 1px;
        }

        ::-webkit-scrollbar-button {
          width: 1px;
          height: 1px;
        }

        .external {
          overflow: hidden;
          height: 100vh;
          width: 100vw;
          position: relative;
        }

        .horizontal-scroll-wrapper {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100vh;
          transform: rotate(-90deg) translate3d(0, -100vh, 0);
          transform-origin: right top;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 0;
          padding-left: 5vh;
          height: 100vw;
          perspective: 1px;
          transform-style: preserve-3d;
          padding-bottom: 10rem;
          scroll-behavior: smooth;
        }

        .img-wrapper {
          transform: rotate(90deg);
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 40vh;
          transform-origin: 50% 50%;
          transform: rotate(90deg) translateZ(0.1px) scale(0.9) translateX(0px) translateY(-3vh);
          transition: 1s ease;
        }

        .img-wrapper:hover {
          min-height: 65vh;
        }

        /* Parallax variations */
        .slower {
          transform: rotate(90deg) translateZ(-0.2px) scale(1.1) translateX(0%) translateY(-10vh);
        }

        .slower1 {
          transform: rotate(90deg) translateZ(-0.25px) scale(1.05) translateX(0%) translateY(8vh);
        }

        .slower2 {
          transform: rotate(90deg) translateZ(-0.3px) scale(1.3) translateX(0%) translateY(2vh);
        }

        .slower-down {
          transform: rotate(90deg) translateZ(-0.2px) scale(1.1) translateX(0%) translateY(16vh);
        }

        .faster {
          transform: rotate(90deg) translateZ(0.15px) scale(0.8) translateX(0%) translateY(14vh);
        }

        .faster1 {
          transform: rotate(90deg) translateZ(0.05px) scale(0.8) translateX(0%) translateY(10vh);
        }

        .fastest {
          transform: rotate(90deg) translateZ(0.22px) scale(0.7) translateX(-10vh) translateY(-15vh);
        }

        .vertical {
          transform: rotate(90deg) translateZ(-0.15px) scale(1.15) translateX(0%) translateY(0%);
        }

        .last {
          transform: rotate(90deg) translateZ(-0.2px) scale(1.1) translateX(25vh) translateY(-8vh);
        }

        .gallery-card {
          overflow: hidden;
          display: block;
          padding: 1.5vh;
          background: #fff;
          box-shadow: 
            0 10px 50px rgba(255, 107, 0, 0.2),
            0 4px 20px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          transition: all 0.5s ease;
        }

        .img-wrapper:hover .gallery-card {
          box-shadow: 
            0 20px 60px rgba(255, 107, 0, 0.3),
            0 8px 30px rgba(0, 0, 0, 0.15);
          transform: translateY(-4px);
        }

        .image-container {
          position: relative;
          overflow: hidden;
          border-radius: 4px;
        }

        .gallery-image {
          max-width: 45vh;
          max-height: 50vh;
          width: 100%;
          height: auto;
          object-fit: cover;
          transition: all 0.5s ease;
          vertical-align: top;
          filter: saturate(80%) sepia(10%) hue-rotate(5deg);
        }

        .img-wrapper:hover .gallery-image {
          filter: none;
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .horizontal-scroll-wrapper {
            padding-bottom: 5rem;
          }

          .gallery-image {
            max-width: 35vh;
            max-height: 40vh;
          }

          .img-wrapper:hover {
            min-height: 50vh;
          }
        }
      `}</style>
    </section>
  );
}
