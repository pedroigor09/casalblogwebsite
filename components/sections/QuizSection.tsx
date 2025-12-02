'use client';

import { QuizCard } from '@/components/ui/QuizCard';
import { QUIZ_QUESTIONS } from '@/lib/constants/features';

export function QuizSection() {
  return (
    <section className="relative py-32 px-4 bg-gradient-to-b from-purple-50 via-pink-50 to-rose-50 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Quiz do Casal 🎯
          </h2>
          <p className="text-xl text-gray-600">
            Quanto você sabe sobre nós? Teste seus conhecimentos!
          </p>
        </div>

        <div className="space-y-8">
          {QUIZ_QUESTIONS.map((question, index) => (
            <QuizCard key={question.id} question={question} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
