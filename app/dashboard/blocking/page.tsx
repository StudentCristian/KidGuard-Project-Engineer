"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Globe,
  Smartphone,
  Clock,
  ShieldAlert,
  Plus,
  X,
  Youtube,
  Chrome,
  Instagram,
  TwitchIcon,
} from 'lucide-react';

const defaultApps = [
  { id: 1, name: 'YouTube Kids', icon: Youtube, blocked: true },
  { id: 2, name: 'Chrome', icon: Chrome, blocked: false },
  { id: 3, name: 'Instagram', icon: Instagram, blocked: true },
  { id: 4, name: 'Twitch', icon: TwitchIcon, blocked: false },
];

const defaultWebsites = [
  { id: 1, url: 'facebook.com', blocked: true },
  { id: 2, url: 'tiktok.com', blocked: true },
  { id: 3, url: 'twitter.com', blocked: true },
];

const defaultSchedule = [
  { id: 1, day: 'Lunes a Viernes', start: '15:00', end: '18:00', active: true },
  { id: 2, day: 'Fin de Semana', start: '10:00', end: '20:00', active: true },
];

export default function BlockingPage() {
  const [apps, setApps] = useState(defaultApps);
  const [websites, setWebsites] = useState(defaultWebsites);
  const [schedule, setSchedule] = useState(defaultSchedule);
  const [newWebsite, setNewWebsite] = useState('');

  const toggleAppBlock = (id: number) => {
    setApps(apps.map(app => 
      app.id === id ? { ...app, blocked: !app.blocked } : app
    ));
  };

  const toggleWebsiteBlock = (id: number) => {
    setWebsites(websites.map(site => 
      site.id === id ? { ...site, blocked: !site.blocked } : site
    ));
  };

  const addWebsite = () => {
    if (newWebsite && !websites.find(site => site.url === newWebsite)) {
      setWebsites([
        ...websites,
        { id: websites.length + 1, url: newWebsite, blocked: true }
      ]);
      setNewWebsite('');
    }
  };

  const removeWebsite = (id: number) => {
    setWebsites(websites.filter(site => site.id !== id));
  };

  const toggleSchedule = (id: number) => {
    setSchedule(schedule.map(item => 
      item.id === id ? { ...item, active: !item.active } : item
    ));
  };

  return (
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-2xl font-bold">Control de Acceso</h1>
          <p className="text-muted-foreground">
            Gestiona el acceso a aplicaciones y contenido
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Smartphone className="h-5 w-5 text-blue-500 mr-2" />
                Control de Aplicaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apps.map((app) => (
                  <div key={app.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <app.icon className="h-5 w-5 text-gray-500" />
                      <span>{app.name}</span>
                    </div>
                    <Switch
                      checked={app.blocked}
                      onCheckedChange={() => toggleAppBlock(app.id)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 text-blue-500 mr-2" />
                Control de Sitios Web
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ingresa un sitio web"
                    value={newWebsite}
                    onChange={(e) => setNewWebsite(e.target.value)}
                  />
                  <Button onClick={addWebsite}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {websites.map((site) => (
                  <div key={site.id} className="flex items-center justify-between">
                    <span>{site.url}</span>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={site.blocked}
                        onCheckedChange={() => toggleWebsiteBlock(site.id)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeWebsite(site.id)}
                      >
                        <X className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 text-blue-500 mr-2" />
              Horarios de Uso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {schedule.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.day}</p>
                    <p className="text-sm text-gray-500">
                      {item.start} - {item.end}
                    </p>
                  </div>
                  <Switch
                    checked={item.active}
                    onCheckedChange={() => toggleSchedule(item.id)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShieldAlert className="h-5 w-5 text-blue-500 mr-2" />
              Filtros de Contenido
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: 'Contenido para adultos', enabled: true },
                { label: 'Violencia', enabled: true },
                { label: 'Lenguaje inapropiado', enabled: true },
                { label: 'Juegos de azar', enabled: true },
              ].map((filter, index) => (
                <div key={index} className="flex items-center justify-between">
                  <Label htmlFor={`filter-${index}`}>{filter.label}</Label>
                  <Switch
                    id={`filter-${index}`}
                    defaultChecked={filter.enabled}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}