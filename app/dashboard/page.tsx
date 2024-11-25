"use client";

import { motion } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  Clock,
  Shield,
  Smartphone,
  Youtube,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '@/lib/utils';

const activityData = [
  { name: 'Lun', tiempo: 2.5 },
  { name: 'Mar', tiempo: 3.8 },
  { name: 'Mie', tiempo: 3.2 },
  { name: 'Jue', tiempo: 4.1 },
  { name: 'Vie', tiempo: 3.5 },
  { name: 'Sab', tiempo: 5.2 },
  { name: 'Dom', tiempo: 4.8 },
];

const stats = [
  {
    title: 'Tiempo de Pantalla Hoy',
    value: '3h 45m',
    icon: Clock,
    description: '15% menos que ayer',
    color: 'text-blue-600',
  },
  {
    title: 'Alertas Pendientes',
    value: '2',
    icon: AlertTriangle,
    description: 'Contenido inapropiado detectado',
    color: 'text-red-600',
  },
  {
    title: 'Apps Más Usadas',
    value: 'YouTube Kids',
    icon: Youtube,
    description: '1h 20m hoy',
    color: 'text-purple-600',
  },
  {
    title: 'Dispositivos Activos',
    value: '2',
    icon: Smartphone,
    description: 'Tablet, Smartphone',
    color: 'text-green-600',
  },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Bienvenido de nuevo
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Aquí tienes un resumen de la actividad de Cristian
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={cn("h-4 w-4", stat.color)} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Tiempo de Uso Semanal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="tiempo"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "YouTube Kids",
                  time: "Hace 30 minutos",
                  description: "Viendo contenido educativo",
                  icon: Youtube,
                },
                {
                  title: "Juego Educativo",
                  time: "Hace 2 horas",
                  description: "Completó un nivel de matemáticas",
                  icon: Activity,
                },
                {
                  title: "Bloqueo de Contenido",
                  time: "Hace 3 horas",
                  description: "Intento de acceso a sitio bloqueado",
                  icon: Shield,
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4"
                >
                  <div className="rounded-full bg-blue-100 p-2">
                    <activity.icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}