"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Bell,
  Shield,
  Mail,
  Smartphone,
  Moon,
  Globe,
  Key,
  UserCog,
  Save,
} from 'lucide-react';
import { toast } from "sonner";

const defaultSettings = {
  notifications: {
    email: true,
    push: true,
    alerts: true,
    reports: true,
  },
  privacy: {
    activityTracking: true,
    locationTracking: false,
    dataCollection: true,
  },
  security: {
    twoFactor: false,
    biometric: true,
    passwordChange: false,
  },
};

export default function SettingsPage() {
  const [settings, setSettings] = useState(defaultSettings);
  const [email, setEmail] = useState('padre@ejemplo.com');
  const [phone, setPhone] = useState('+34 600 000 000');
  const [language, setLanguage] = useState('es');

  const handleNotificationChange = (key: keyof typeof settings.notifications) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key],
      },
    });
  };

  const handlePrivacyChange = (key: keyof typeof settings.privacy) => {
    setSettings({
      ...settings,
      privacy: {
        ...settings.privacy,
        [key]: !settings.privacy[key],
      },
    });
  };

  const handleSecurityChange = (key: keyof typeof settings.security) => {
    setSettings({
      ...settings,
      security: {
        ...settings.security,
        [key]: !settings.security[key],
      },
    });
  };

  const handleSave = () => {
    toast.success("Configuración guardada correctamente");
  };

  return (
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Configuración</h1>
            <p className="text-muted-foreground">
              Gestiona las preferencias de la aplicación
            </p>
          </div>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Guardar cambios
          </Button>
        </div>

        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList>
            <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
            <TabsTrigger value="privacy">Privacidad</TabsTrigger>
            <TabsTrigger value="security">Seguridad</TabsTrigger>
            <TabsTrigger value="account">Cuenta</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 text-blue-500 mr-2" />
                  Preferencias de Notificaciones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {[
                    {
                      key: 'email',
                      label: 'Notificaciones por email',
                      description: 'Recibe actualizaciones importantes por correo',
                    },
                    {
                      key: 'push',
                      label: 'Notificaciones push',
                      description: 'Alertas instantáneas en tu dispositivo',
                    },
                    {
                      key: 'alerts',
                      label: 'Alertas de actividad',
                      description: 'Notificaciones sobre la actividad del menor',
                    },
                    {
                      key: 'reports',
                      label: 'Informes semanales',
                      description: 'Resumen semanal de actividad',
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between"
                    >
                      <div className="space-y-1">
                        <Label>{item.label}</Label>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <Switch
                        checked={
                          settings.notifications[
                            item.key as keyof typeof settings.notifications
                          ]
                        }
                        onCheckedChange={() =>
                          handleNotificationChange(
                            item.key as keyof typeof settings.notifications
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 text-blue-500 mr-2" />
                  Configuración de Privacidad
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {[
                    {
                      key: 'activityTracking',
                      label: 'Seguimiento de actividad',
                      description: 'Monitoriza la actividad del dispositivo',
                    },
                    {
                      key: 'locationTracking',
                      label: 'Seguimiento de ubicación',
                      description: 'Rastrea la ubicación del dispositivo',
                    },
                    {
                      key: 'dataCollection',
                      label: 'Recopilación de datos',
                      description: 'Recopila datos para mejorar el servicio',
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between"
                    >
                      <div className="space-y-1">
                        <Label>{item.label}</Label>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <Switch
                        checked={
                          settings.privacy[
                            item.key as keyof typeof settings.privacy
                          ]
                        }
                        onCheckedChange={() =>
                          handlePrivacyChange(
                            item.key as keyof typeof settings.privacy
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="h-5 w-5 text-blue-500 mr-2" />
                  Seguridad
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {[
                    {
                      key: 'twoFactor',
                      label: 'Autenticación de dos factores',
                      description: 'Añade una capa extra de seguridad',
                    },
                    {
                      key: 'biometric',
                      label: 'Autenticación biométrica',
                      description: 'Usa tu huella digital o Face ID',
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between"
                    >
                      <div className="space-y-1">
                        <Label>{item.label}</Label>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <Switch
                        checked={
                          settings.security[
                            item.key as keyof typeof settings.security
                          ]
                        }
                        onCheckedChange={() =>
                          handleSecurityChange(
                            item.key as keyof typeof settings.security
                          )
                        }
                      />
                    </div>
                  ))}
                  <div className="pt-4">
                    <Button variant="outline" className="w-full">
                      Cambiar contraseña
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserCog className="h-5 w-5 text-blue-500 mr-2" />
                  Información de la Cuenta
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Idioma</Label>
                    <select
                      id="language"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                    >
                      <option value="es">Español</option>
                      <option value="en">English</option>
                      <option value="fr">Français</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}