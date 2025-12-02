'use client';

export function Footer() {
  return (
    <footer className="relative bg-linear-to-br from-gray-900 via-gray-800 to-black text-white py-32 px-4 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-orange-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-pink-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Beautiful Quote */}
        <div className="text-center">
          <p className="text-5xl md:text-7xl font-black mb-8 bg-linear-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent leading-tight">
            "O amor é a jornada mais bonita que existe"
          </p>
          <p className="text-2xl md:text-3xl text-gray-300 font-medium">- Nosso lema ❤️</p>
        </div>
      </div>
    </footer>
  );
}
