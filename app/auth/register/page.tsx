"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { RegisterForm } from '@/components/auth/register-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleNextStep = () => {
    if (step === 2) {
      router.push('/dashboard');
    } else {
      setStep(step + 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {step === 1 ? 'Crear cuenta' : 'Configuración inicial'}
        </h2>
        <RegisterForm step={step} onComplete={handleNextStep} />
        {step === 1 && (
          <div className="mt-6 text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/auth/login" className="text-blue-600 hover:underline">
              Iniciar sesión
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}