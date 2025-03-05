import { defineCollection, z } from 'astro:content';

// Définition du schéma pour la collection "projects"
const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    categories: z.array(z.string()),
    coverImage: z.string(),
    gallery: z.array(z.string()).optional(),
    youtubeVideo: z.string().optional(),
    externalLink: z.string().optional(),
    featured: z.boolean().default(false),
    p5jsCode: z.string().optional(),
  }),
});

// Définition du schéma pour la collection "soundtracks"
const soundtracksCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    type: z.enum(['track', 'dj-set', 'collaboration']),
    soundcloudUrl: z.string(),
    youtubeUrl: z.string().optional(),
    coverImage: z.string(),
    tags: z.array(z.string()).default(['electronic']),
    featured: z.boolean().default(false),
  }),
});

// Définition du schéma pour les paramètres
const settingsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    pageTitle: z.string().optional(),
    pageDescription: z.string().optional(),
    backgroundImage: z.string().optional(),
    tracksTitle: z.string().optional(),
    djSetsTitle: z.string().optional(),
    collaborationsTitle: z.string().optional(),
  }),
});

// Export des collections
export const collections = {
  'projects': projectsCollection,
  'soundtracks': soundtracksCollection,
  'settings': settingsCollection,
};