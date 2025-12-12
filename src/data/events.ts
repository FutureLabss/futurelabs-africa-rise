export interface EventData {
  id: string;
  title: string;
  date: string;
  time: string;
  endTime?: string;
  location: string;
  type: 'Conference' | 'Workshop' | 'Hackathon' | 'Meetup' | 'Bootcamp';
  description: string;
  longDescription?: string;
  image?: string;
  attendees?: number;
  maxAttendees?: number;
  featured?: boolean;
  isPast?: boolean;
  learnings?: string[];
  host?: string;
}

export const upcomingEvents: EventData[] = [
  {
    id: 'tech-innovation-summit-2025',
    title: 'African Tech Innovation Summit 2025',
    date: 'March 15, 2025',
    time: '9:00 AM',
    endTime: '6:00 PM',
    location: 'Lagos, Nigeria',
    type: 'Conference',
    description: 'Join industry leaders, investors, and innovators for a day of networking and learning about the future of African tech.',
    longDescription: 'The African Tech Innovation Summit brings together the continent\'s brightest minds to discuss the latest trends, challenges, and opportunities in technology. This premier event features keynote speakers, panel discussions, workshops, and networking opportunities.',
    image: '/bg-news-370x240.png',
    attendees: 127,
    maxAttendees: 500,
    featured: true,
    host: 'FutureLabs Africa',
    learnings: [
      'Latest trends in African tech ecosystem',
      'Investment opportunities and funding strategies',
      'Building scalable tech solutions',
      'Networking with industry leaders'
    ]
  },
  {
    id: 'ai-workshop-2025',
    title: 'AI for Social Good Workshop',
    date: 'April 5, 2025',
    time: '10:00 AM',
    endTime: '4:00 PM',
    location: 'Abuja, Nigeria',
    type: 'Workshop',
    description: 'Hands-on training on building AI solutions for public health and agriculture.',
    image: '/blog-1.jpg',
    attendees: 42,
    maxAttendees: 100,
    host: 'FutureLabs Africa',
    learnings: [
      'Fundamentals of AI and machine learning',
      'Practical applications in healthcare',
      'Agricultural tech solutions',
      'Building ethical AI systems'
    ]
  }
];

export const pastEvents: EventData[] = [
  {
    id: 'ai-social-good-2024',
    title: 'AI for Social Good Workshop',
    date: 'July 10, 2024',
    time: '10:00 AM',
    location: 'Abuja, Nigeria',
    type: 'Workshop',
    description: 'Hands-on training on building AI solutions for public health and agriculture.',
    isPast: true
  },
  {
    id: 'deep-tech-meetup-2024',
    title: 'Deep Tech Founders Meetup',
    date: 'November 22, 2024',
    time: '2:00 PM',
    location: 'Nairobi, Kenya',
    type: 'Meetup',
    description: 'Founders across Africa shared lessons on scaling research-driven startups.',
    isPast: true
  },
  {
    id: 'future-work-bootcamp-2024',
    title: 'Future of Work Bootcamp',
    date: 'May 3, 2024',
    time: '9:00 AM',
    location: 'Uyo, Nigeria',
    type: 'Bootcamp',
    description: 'Upskilling program focused on cloud, data, and product careers.',
    isPast: true
  }
];

export const getEventById = (id: string): EventData | undefined => {
  return [...upcomingEvents, ...pastEvents].find(event => event.id === id);
};
