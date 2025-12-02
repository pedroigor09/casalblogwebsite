'use client';

import { useState } from 'react';
import confetti from 'canvas-confetti';
import { QuizQuestion } from '@/types/features';

interface QuizCardProps {
  question: QuizQuestion;
  index: number;
}

export function QuizCard({ question, index }: QuizCardProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    if (revealed) return;

    setSelected(answerIndex);
    setRevealed(true);

    if (answerIndex === question.correctAnswer) {
      // Trigger confetti!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF9966', '#FF8B6A', '#FFB5C2', '#FF6B9D'],
      });
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="text-2xl font-bold text-gray-900 mb-6">
        {index + 1}. {question.question}
      </div>

      <div className="space-y-4">
        {question.options.map((option, optionIndex) => {
          const isCorrect = optionIndex === question.correctAnswer;
          const isSelected = optionIndex === selected;
          
          let buttonClass = 'w-full p-4 rounded-xl text-left font-medium transition-all duration-300 border-2 ';
          
          if (!revealed) {
            buttonClass += 'border-gray-200 hover:border-orange-400 hover:bg-orange-50';
          } else if (isCorrect) {
            buttonClass += 'border-green-500 bg-green-50 text-green-700';
          } else if (isSelected && !isCorrect) {
            buttonClass += 'border-red-500 bg-red-50 text-red-700';
          } else {
            buttonClass += 'border-gray-200 bg-gray-50 opacity-50';
          }

          return (
            <button
              key={optionIndex}
              onClick={() => handleAnswer(optionIndex)}
              disabled={revealed}
              className={buttonClass}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {revealed && isCorrect && <span className="text-2xl">✅</span>}
                {revealed && isSelected && !isCorrect && <span className="text-2xl">❌</span>}
              </div>
            </button>
          );
        })}
      </div>

      {revealed && question.funFact && (
        <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl border-2 border-orange-200">
          <p className="text-sm text-gray-700 italic">
            💡 {question.funFact}
          </p>
        </div>
      )}
    </div>
  );
}
