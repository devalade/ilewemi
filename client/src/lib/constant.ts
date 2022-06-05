import { CalendarEvent, Cash, School, Users } from 'tabler-icons-react';

export const BASE_URL = 'http://localhost:4000';

export const LINKS = [
  { link: '/users', label: 'Gestion des utilisateurs', icon: Users },
  { link: '/student', label: 'Gestions des élèves', icon: School },
  { link: '/attandees', label: 'Scolarité', icon: Cash },
  { link: '/event', label: 'Évnènement', icon: CalendarEvent },
];
