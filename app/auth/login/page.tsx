"use client";

import { motion } from 'framer-motion';
import { LoginForm } from '@/components/auth/login-form';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Iniciar sesión
        </h2>
        <LoginForm />
        <div className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{' '}
          <Link href="/auth/register" className="text-blue-600 hover:underline">
            Registrarse
          </Link>
        </div>
      </div>
    </motion.div>
  );
}