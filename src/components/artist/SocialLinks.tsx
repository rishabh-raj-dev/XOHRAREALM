'use client';

import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/lib/motion/variants';

interface SocialLinksProps {
  spotify_url?: string;
  soundcloud_url?: string;
  youtube_url?: string;
  apple_music_url?: string;
  instagram_url?: string;
  twitter_url?: string;
  tiktok_url?: string;
  website_url?: string;
}

const platformConfig: Record<string, { label: string }> = {
  spotify: { label: 'spotify' },
  soundcloud: { label: 'soundcloud' },
  youtube: { label: 'youtube' },
  apple_music: { label: 'apple music' },
  instagram: { label: 'instagram' },
  twitter: { label: 'x / twitter' },
  tiktok: { label: 'tiktok' },
  website: { label: 'website' },
};

interface LinkItem {
  name: string;
  url: string;
}

export default function SocialLinks(props: SocialLinksProps) {
  const links: LinkItem[] = [];

  if (props.spotify_url) links.push({ name: 'spotify', url: props.spotify_url });
  if (props.soundcloud_url) links.push({ name: 'soundcloud', url: props.soundcloud_url });
  if (props.youtube_url) links.push({ name: 'youtube', url: props.youtube_url });
  if (props.apple_music_url) links.push({ name: 'apple_music', url: props.apple_music_url });
  if (props.instagram_url) links.push({ name: 'instagram', url: props.instagram_url });
  if (props.twitter_url) links.push({ name: 'twitter', url: props.twitter_url });
  if (props.tiktok_url) links.push({ name: 'tiktok', url: props.tiktok_url });
  if (props.website_url) links.push({ name: 'website', url: props.website_url });

  if (links.length === 0) return null;

  return (
    <motion.div
      className="flex flex-wrap gap-3 justify-center"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {links.map((link) => (
        <motion.a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          variants={fadeInUp}
          className="relative px-4 py-2 border border-border-rough/20 bg-bg-secondary/20 backdrop-blur-sm text-[10px] font-body tracking-[0.2em] uppercase text-text-secondary hover:text-accent-amber hover:border-accent-amber/30 transition-all duration-300 group overflow-hidden"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="absolute inset-0 bg-accent-amber/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          <span className="relative z-10 group-hover:text-glow-amber transition-all duration-300">
            {platformConfig[link.name]?.label || link.name}
          </span>
        </motion.a>
      ))}
    </motion.div>
  );
}
