"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Bell, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const slides = [
  {
    icon: Shield,
    title: "Monitorización Inteligente",
    description: "Supervisa la actividad digital de tus hijos de forma segura y respetuosa"
  },
  {
    icon: Lock,
    title: "Control de Contenido",
    description: "Bloquea sitios y aplicaciones inapropiadas con facilidad"
  },
  {
    icon: Bell,
    title: "Alertas en Tiempo Real",
    description: "Recibe notificaciones instantáneas sobre actividades sospechosas"
  },
  {
    icon: BookOpen,
    title: "Contenido Educativo",
    description: "Descubre recomendaciones personalizadas para el desarrollo de tus hijos"
  }
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const nextSlide = () => {
    if (currentSlide === slides.length - 1) {
      router.push('/auth/register');
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const skipOnboarding = () => {
    router.push('/auth/register');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="max-w-md w-full text-center"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            {React.createElement(slides[currentSlide].icon, {
              className: "w-16 h-16 mx-auto mb-6 text-blue-600"
            })}
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              {slides[currentSlide].title}
            </h2>
            <p className="text-gray-600 mb-8">
              {slides[currentSlide].description}
            </p>
            <div className="flex justify-center gap-2 mb-6">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "w-8 bg-blue-600"
                      : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Button
              onClick={nextSlide}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {currentSlide === slides.length - 1 ? "Comenzar" : "Siguiente"}
            </Button>
            {currentSlide < slides.length - 1 && (
              <Button
                variant="ghost"
                onClick={skipOnboarding}
                className="text-gray-600"
              >
                Omitir
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}