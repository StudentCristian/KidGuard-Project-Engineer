"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  User,
  Calendar,
  Smartphone,
  BookOpen,
  Heart,
  AlertTriangle,
  Camera,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const defaultProfile = {
  name: 'Cristian',
  age: 10,
  devices: ['iPad (2023)', 'iPhone 13'],
  interests: ['Matemáticas', 'Ciencias', 'Videojuegos educativos'],
  restrictions: ['YouTube sin supervisión', 'Redes sociales'],
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cristian',
};

export default function ChildProfilePage() {
  const [profile, setProfile] = useState(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(defaultProfile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const addInterest = () => {
    const interest = prompt('Agregar nuevo interés:');
    if (interest) {
      setEditedProfile({
        ...editedProfile,
        interests: [...editedProfile.interests, interest],
      });
    }
  };

  const removeInterest = (index: number) => {
    setEditedProfile({
      ...editedProfile,
      interests: editedProfile.interests.filter((_, i) => i !== index),
    });
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
            <h1 className="text-2xl font-bold">Perfil del Menor</h1>
            <p className="text-muted-foreground">
              Gestiona la información y preferencias
            </p>
          </div>
          <Button onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
            {isEditing ? 'Guardar Cambios' : 'Editar Perfil'}
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 text-blue-500 mr-2" />
                Información Personal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback>
                    {profile.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {isEditing ? (
                  <div className="space-y-4 w-full">
                    <div>
                      <Label htmlFor="name">Nombre</Label>
                      <Input
                        id="name"
                        value={editedProfile.name}
                        onChange={(e) =>
                          setEditedProfile({ ...editedProfile, name: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="age">Edad</Label>
                      <Input
                        id="age"
                        type="number"
                        value={editedProfile.age}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            age: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <h3 className="text-xl font-semibold">{profile.name}</h3>
                    <p className="text-gray-500">{profile.age} años</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Smartphone className="h-5 w-5 text-blue-500 mr-2" />
                Dispositivos Vinculados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profile.devices.map((device, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span>{device}</span>
                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setEditedProfile({
                            ...editedProfile,
                            devices: editedProfile.devices.filter((_, i) => i !== index),
                          })
                        }
                      >
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="h-5 w-5 text-blue-500 mr-2" />
              Intereses y Actividades
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isEditing ? (
                <>
                  <div className="flex flex-wrap gap-2">
                    {editedProfile.interests.map((interest, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                      >
                        <span>{interest}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeInterest(index)}
                          className="ml-2 h-4 w-4 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button onClick={addInterest} variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Interés
                  </Button>
                </>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-blue-500 mr-2" />
              Restricciones Especiales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isEditing ? (
                <Textarea
                  value={editedProfile.restrictions.join('\n')}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      restrictions: e.target.value.split('\n'),
                    })
                  }
                  rows={4}
                />
              ) : (
                <ul className="list-disc list-inside space-y-2">
                  {profile.restrictions.map((restriction, index) => (
                    <li key={index}>{restriction}</li>
                  ))}
                </ul>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}