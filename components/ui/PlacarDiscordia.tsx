'use client';

import { useState, useEffect } from 'react';
import { gsap } from 'gsap';

export function PlacarDiscordia() {
  const [mounted, setMounted] = useState(false);
  const [votes, setVotes] = useState({ person1: 0, person2: 0 });
  const [hasVoted, setHasVoted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Carregar votos do localStorage
    const savedVotes = localStorage.getItem('placar-votes');
    if (savedVotes) {
      setVotes(JSON.parse(savedVotes));
    }
    
    const userVoted = localStorage.getItem('user-voted');
    if (userVoted) {
      setHasVoted(true);
      setShowResults(true);
    }
  }, []);

  const handleVote = (person: 'person1' | 'person2') => {
    if (hasVoted) return;

    const newVotes = {
      ...votes,
      [person]: votes[person] + 1,
    };

    setVotes(newVotes);
    setHasVoted(true);
    setShowResults(true);
    
    localStorage.setItem('placar-votes', JSON.stringify(newVotes));
    localStorage.setItem('user-voted', 'true');

    // Animação de confete
    gsap.to('.placar-card', {
      scale: 1.05,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
    });
  };

  const totalVotes = votes.person1 + votes.person2;
  const percent1 = totalVotes > 0 ? (votes.person1 / totalVotes) * 100 : 50;
  const percent2 = totalVotes > 0 ? (votes.person2 / totalVotes) * 100 : 50;

  if (!mounted) return null;

  return (
    <div className="fixed top-24 right-6 z-[190] placar-card">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 w-80 border-2 border-orange-200">
        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            Placar da Discórdia 😤
          </h3>
          <p className="text-sm text-gray-600">Quem tem razão hoje?</p>
        </div>

        {!showResults ? (
          <div className="space-y-3">
            <button
              onClick={() => handleVote('person1')}
              disabled={hasVoted}
              className="w-full p-4 bg-linear-to-r from-orange-400 to-coral-400 rounded-xl font-bold text-white hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl">😠</span>
                <span>Ele é o Dramático</span>
              </div>
            </button>

            <button
              onClick={() => handleVote('person2')}
              disabled={hasVoted}
              className="w-full p-4 bg-linear-to-r from-pink-400 to-rose-400 rounded-xl font-bold text-white hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl">🙄</span>
                <span>Ele Fez Besteira</span>
              </div>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Person 1 */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-700 flex items-center gap-2">
                  <span className="text-xl">😠</span> Ele
                </span>
                <span className="font-bold text-orange-600">
                  {percent1.toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-linear-to-r from-orange-400 to-coral-400 h-full transition-all duration-1000 ease-out"
                  style={{ width: `${percent1}%` }}
                />
              </div>
            </div>

            {/* Person 2 */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-700 flex items-center gap-2">
                  <span className="text-xl">🙄</span> Ele
                </span>
                <span className="font-bold text-pink-600">
                  {percent2.toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-linear-to-r from-pink-400 to-rose-400 h-full transition-all duration-1000 ease-out"
                  style={{ width: `${percent2}%` }}
                />
              </div>
            </div>

            <div className="text-center text-xs text-gray-500 mt-3">
              {totalVotes} votos totais
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
