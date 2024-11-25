"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icons';

const registerSchema = z.object({
  name: z.string().min(2, 'El nombre es demasiado corto'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

const childSchema = z.object({
  childName: z.string().min(2, 'El nombre es demasiado corto'),
  childAge: z.string().regex(/^\d+$/, 'Debe ser un número'),
});

interface RegisterFormProps {
  step: number;
  onComplete: () => void;
}

export function RegisterForm({ step, onComplete }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step === 1 ? registerSchema : childSchema),
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    // Simular proceso de registro
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    onComplete();
  };

  if (step === 1) {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre completo</Label>
          <Input
            id="name"
            {...register('name')}
            placeholder="Juan Pérez"
            disabled={isLoading}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message?.toString()}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            {...register('email')}
            placeholder="ejemplo@correo.com"
            type="email"
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message?.toString()}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            {...register('password')}
            type="password"
            disabled={isLoading}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message?.toString()}</p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Continuar
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">
              O continúa con
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" disabled={isLoading}>
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>
          <Button variant="outline" disabled={isLoading}>
            <Icons.apple className="mr-2 h-4 w-4" />
            Apple
          </Button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="childName">Nombre del niño/a</Label>
        <Input
          id="childName"
          {...register('childName')}
          placeholder="Ana"
          disabled={isLoading}
        />
        {errors.childName && (
          <p className="text-sm text-red-500">{errors.childName.message?.toString()}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="childAge">Edad</Label>
        <Input
          id="childAge"
          {...register('childAge')}
          type="number"
          placeholder="8"
          disabled={isLoading}
        />
        {errors.childAge && (
          <p className="text-sm text-red-500">{errors.childAge.message?.toString()}</p>
        )}
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading && (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        )}
        Finalizar
      </Button>
    </form>
  );
}