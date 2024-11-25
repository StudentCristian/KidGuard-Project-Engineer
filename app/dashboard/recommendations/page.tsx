"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  Star,
  Award,
  Gamepad2,
  Brain,
  PlayCircle,
  ExternalLink,
  ThumbsUp,
  BookMarked,
} from 'lucide-react';

const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'education', label: 'Educación' },
  { id: 'games', label: 'Juegos' },
  { id: 'videos', label: 'Videos' },
  { id: 'apps', label: 'Aplicaciones' },
];

const recommendations = [
  {
    id: 1,
    title: 'Duolingo Kids',
    category: 'education',
    description: 'Aprende idiomas de forma divertida',
    rating: 4.8,
    age: '6-12',
    icon: BookOpen,
    tags: ['Idiomas', 'Educativo'],
    link: 'https://schools.duolingo.com/',
  },
  {
    id: 2,
    title: 'Math Kids',
    category: 'games',
    description: 'Juegos matemáticos interactivos',
    rating: 4.5,
    age: '5-10',
    icon: Brain,
    tags: ['Matemáticas', 'Juegos'],
    link: '#',
  },
  {
    id: 3,
    title: 'Science Kids TV',
    category: 'videos',
    description: 'Videos educativos sobre ciencia',
    rating: 4.7,
    age: '7-12',
    icon: PlayCircle,
    tags: ['Ciencia', 'Videos'],
    link: '#',
  },
  {
    id: 4,
    title: 'Coding for Kids',
    category: 'apps',
    description: 'Aprende programación básica',
    rating: 4.6,
    age: '8-12',
    icon: Gamepad2,
    tags: ['Programación', 'Educativo'],
    link: '#',
  },
];

export default function RecommendationsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [savedItems, setSavedItems] = useState<number[]>([]);

  const filteredRecommendations = recommendations.filter(
    (item) => selectedCategory === 'all' || item.category === selectedCategory
  );

  const toggleSave = (id: number) => {
    setSavedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-2xl font-bold">Recomendaciones</h1>
          <p className="text-muted-foreground">
            Contenido educativo y entretenimiento seguro
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="rounded-full"
            >
              {category.label}
            </Button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {filteredRecommendations.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <item.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="flex items-center">
                          {item.title}
                          <Badge variant="secondary" className="ml-2">
                            {item.age} años
                          </Badge>
                        </CardTitle>
                        <div className="flex items-center mt-1 text-sm text-muted-foreground">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          {item.rating}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleSave(item.id)}
                    >
                      <BookMarked
                        className={`h-5 w-5 ${
                          savedItems.includes(item.id)
                            ? "fill-current text-blue-600"
                            : "text-gray-400"
                        }`}
                      />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.open(item.link, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Abrir recurso
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 text-blue-500 mr-2" />
              Recomendaciones Personalizadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Basado en los intereses y la actividad reciente de Cristian, aquí hay algunas sugerencias:
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  {
                    title: 'Curso de Matemáticas',
                    description: 'Perfecto para su nivel actual',
                    icon: Brain,
                  },
                  {
                    title: 'Videos de Ciencia',
                    description: 'Experimentos seguros y divertidos',
                    icon: PlayCircle,
                  },
                ].map((suggestion, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg"
                  >
                    <suggestion.icon className="h-5 w-5 text-blue-500 mt-1" />
                    <div>
                      <h4 className="font-medium">{suggestion.title}</h4>
                      <p className="text-sm text-gray-600">
                        {suggestion.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}