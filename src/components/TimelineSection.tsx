import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { FaHeart } from 'react-icons/fa';

interface TimelineEvent {
  image: string;
  caption: string;
  date: string;
  description?: string;
}

const timelineData: TimelineEvent[] = [
  {
    image: 'https://source.unsplash.com/featured/?date,romance',
    caption: 'Our First Magical Meeting',
    date: '2023-02-14',
    description: 'The moment our eyes met, time stood still and our hearts knew.',
  },
  {
    image: 'https://source.unsplash.com/featured/?sunset,love',
    caption: 'A Sunset Kiss',
    date: '2023-03-10',
    description: 'As the sun painted the sky, our love painted our future.',
  },
  {
    image: 'https://source.unsplash.com/featured/?starlight,romance',
    caption: 'Under the Stars',
    date: '2023-04-05',
    description: 'Counting stars, making wishes, dreaming together.',
  },
];

const TimelineSection: React.FC = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 opacity-0">
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-dancing text-6xl md:text-7xl text-white drop-shadow-lg">
            Our Love Story
          </h2>
          <p className="mt-4 font-playfair text-white/90 italic">
            Every moment with you is a treasure...
          </p>
        </motion.div>

        <div className="relative">
          {timelineData.map((event, index) => (
            <TimelineEventCard key={index} {...event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TimelineEventCard: React.FC<TimelineEvent & { index: number }> = ({ image, caption, date, description, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className={`relative flex ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center mb-24`}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative z-10"
      >
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/50">
          <FaHeart className="text-white text-lg" />
        </div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 
                   ${isEven ? 'ml-8 md:ml-12' : 'mr-8 md:mr-12'} 
                   flex-1 max-w-xl shadow-xl`}
      >
        <div className="relative overflow-hidden rounded-xl mb-4 group">
          <img
            src={image}
            alt={caption}
            className="w-full h-72 object-cover transform transition-transform group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        <div className="space-y-3">
          <h3 className="font-dancing text-3xl text-white">{caption}</h3>
          <p className="font-playfair text-white/80 italic">{description}</p>
          <p className="text-sm text-white/90 font-semibold">
            {format(new Date(date), 'MMMM do, yyyy')}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};


export default TimelineSection;
