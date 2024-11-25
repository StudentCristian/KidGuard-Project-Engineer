"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Chrome, Youtube, Instagram, TwitchIcon } from 'lucide-react';

const timelineData = [
  { time: '08:00', minutes: 15, app: 'YouTube Kids' },
  { time: '09:00', minutes: 30, app: 'Educational Game' },
  { time: '10:00', minutes: 20, app: 'Browser' },
  { time: '11:00', minutes: 45, app: 'Learning App' },
  { time: '12:00', minutes: 25, app: 'YouTube Kids' },
  { time: '13:00', minutes: 10, app: 'Browser' },
];

const appUsageData = [
  { name: 'YouTube Kids', value: 95, icon: Youtube, color: '#FF0000' },
  { name: 'Browser', value: 45, icon: Chrome, color: '#4285F4' },
  { name: 'Instagram Kids', value: 30, icon: Instagram, color: '#E1306C' },
  { name: 'Twitch', value: 20, icon: TwitchIcon, color: '#9146FF' },
];

const categories = [
  { name: 'Educational', percentage: 45 },
  { name: 'Entertainment', percentage: 30 },
  { name: 'Social', percentage: 15 },
  { name: 'Gaming', percentage: 10 },
];

export default function MonitoringPage() {
  const [activeTab, setActiveTab] = useState('today');

  return (
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-2xl font-bold">Monitorización de Actividad</h1>
          <p className="text-muted-foreground">
            Seguimiento detallado del uso de dispositivos y aplicaciones
          </p>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="today">Hoy</TabsTrigger>
            <TabsTrigger value="week">Esta Semana</TabsTrigger>
            <TabsTrigger value="month">Este Mes</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Tiempo Total</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">3h 45m</div>
                  <p className="text-muted-foreground">15% menos que ayer</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sesión Más Larga</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">45m</div>
                  <p className="text-muted-foreground">YouTube Kids - 10:30 AM</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Actividad Educativa</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">65%</div>
                  <p className="text-muted-foreground">Del tiempo total</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Línea de Tiempo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={timelineData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="minutes"
                        stroke="#3b82f6"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Uso por Aplicación</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={appUsageData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {appUsageData.map((entry, index) => (
                            <Cell key={index} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 space-y-2">
                    {appUsageData.map((app, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <app.icon className="h-4 w-4 mr-2" style={{ color: app.color }} />
                          <span>{app.name}</span>
                        </div>
                        <span>{app.value}m</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Categorías de Contenido</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categories.map((category, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span>{category.name}</span>
                          <span>{category.percentage}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-blue-600 rounded-full"
                            style={{ width: `${category.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}