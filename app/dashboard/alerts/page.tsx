"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AlertTriangle,
  Clock,
  Shield,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const alerts = [
  {
    id: 1,
    type: 'warning',
    title: 'Contenido Inapropiado Detectado',
    description: 'Se detectó un intento de acceso a contenido inapropiado en YouTube',
    time: 'Hace 5 minutos',
    status: 'pending',
    icon: AlertTriangle,
  },
  {
    id: 2,
    type: 'danger',
    title: 'Tiempo Límite Excedido',
    description: 'El tiempo de uso de dispositivos ha superado el límite diario',
    time: 'Hace 30 minutos',
    status: 'pending',
    icon: Clock,
  },
  {
    id: 3,
    type: 'info',
    title: 'Nueva Aplicación Instalada',
    description: 'Se ha instalado "Math Learning Game" en el dispositivo',
    time: 'Hace 2 horas',
    status: 'resolved',
    icon: Shield,
  },
  {
    id: 4,
    type: 'warning',
    title: 'Actividad Sospechosa',
    description: 'Múltiples intentos de acceso a redes sociales bloqueadas',
    time: 'Hace 3 horas',
    status: 'resolved',
    icon: AlertCircle,
  },
];

const typeStyles = {
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  danger: 'bg-red-50 border-red-200 text-red-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
};

const statusBadges = {
  pending: { label: 'Pendiente', className: 'bg-yellow-100 text-yellow-800' },
  resolved: { label: 'Resuelto', className: 'bg-green-100 text-green-800' },
};

export default function AlertsPage() {
  const [activeAlerts, setActiveAlerts] = useState(alerts);

  const handleResolve = (id: number) => {
    setActiveAlerts(
      activeAlerts.map((alert) =>
        alert.id === id ? { ...alert, status: 'resolved' } : alert
      )
    );
  };

  const pendingAlerts = activeAlerts.filter((alert) => alert.status === 'pending');
  const resolvedAlerts = activeAlerts.filter((alert) => alert.status === 'resolved');

  return (
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Centro de Alertas</h1>
            <p className="text-muted-foreground">
              Gestiona y responde a las alertas de actividad
            </p>
          </div>
          <Badge variant="secondary" className="text-lg">
            {pendingAlerts.length} Pendientes
          </Badge>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                Alertas Pendientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingAlerts.map((alert) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={cn(
                      'p-4 border rounded-lg flex items-start justify-between',
                      typeStyles[alert.type as keyof typeof typeStyles]
                    )}
                  >
                    <div className="flex items-start space-x-4">
                      <alert.icon className="h-5 w-5 mt-1" />
                      <div>
                        <h3 className="font-semibold">{alert.title}</h3>
                        <p className="text-sm mt-1">{alert.description}</p>
                        <p className="text-sm mt-2 opacity-75">{alert.time}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleResolve(alert.id)}
                      className="ml-4"
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Resolver
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                Alertas Resueltas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resolvedAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="p-4 bg-gray-50 border border-gray-200 rounded-lg flex items-start justify-between opacity-75"
                  >
                    <div className="flex items-start space-x-4">
                      <alert.icon className="h-5 w-5 mt-1" />
                      <div>
                        <h3 className="font-semibold">{alert.title}</h3>
                        <p className="text-sm mt-1">{alert.description}</p>
                        <p className="text-sm mt-2 opacity-75">{alert.time}</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Resuelto</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}