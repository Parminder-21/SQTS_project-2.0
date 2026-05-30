'use client';
import { motion } from 'framer-motion';
import {
  School,
  GraduationCap,
  Briefcase,
  Rocket,
  CreditCard,
  Handshake,
  Users,
  Trophy,
  MessageSquare,
  Video,
  Star,
  Target,
  Globe,
  Terminal,
  BarChart3,
  Palette,
  Megaphone,
  Atom,
  PenTool,
  Search,
  Smartphone,
  Lock,
  FolderKanban,
  FileText,
  Calendar,
  ShoppingCart,
  Bot,
  HelpCircle,
  Flame,
  Monitor,
  MapPin,
  Clock,
  Gift,
  Phone,
  Mail,
  Check,
  Code,
  Cpu,
  Sparkles,
  Shield,
  Award,
  Heart,
  Compass,
  Zap
} from 'lucide-react';

const ICON_MAP = {
  // Common paths & sections
  school: School,
  graduation: GraduationCap,
  briefcase: Briefcase,
  rocket: Rocket,
  card: CreditCard,
  handshake: Handshake,
  users: Users,
  mentor: Users,
  trophy: Trophy,
  message: MessageSquare,
  video: Video,
  star: Star,
  target: Target,
  help: HelpCircle,
  award: Award,
  heart: Heart,
  compass: Compass,
  zap: Zap,

  // Domains & Skills
  globe: Globe,
  terminal: Terminal,
  python: Code,
  code: Code,
  cpu: Cpu,
  chart: BarChart3,
  palette: Palette,
  design: Palette,
  megaphone: Megaphone,
  marketing: Megaphone,
  atom: Atom,
  react: Atom,
  pen: PenTool,
  search: Search,
  smartphone: Smartphone,
  mobile: Smartphone,
  lock: Lock,
  security: Shield,
  shield: Shield,
  ai: Sparkles,
  sparkles: Sparkles,

  // Features & Projects
  folder: FolderKanban,
  file: FileText,
  calendar: Calendar,
  cart: ShoppingCart,
  bot: Bot,

  // Demo section & other utilities
  flame: Flame,
  monitor: Monitor,
  map_pin: MapPin,
  clock: Clock,
  gift: Gift,

  // Contact page
  phone: Phone,
  mail: Mail,
  check: Check,
};

export default function Icon({ name, color = 'currentColor', size = 20, strokeWidth = 2, className, style, animate = true }) {
  const IconComponent = ICON_MAP[name] || HelpCircle;

  if (animate) {
    return (
      <motion.span
        style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          ...style 
        }}
        whileHover={{ 
          scale: 1.15, 
          rotate: 5,
          filter: `drop-shadow(0 0 6px ${color})`,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 15
        }}
        whileTap={{ scale: 0.92 }}
        className={className}
      >
        <IconComponent size={size} color={color} strokeWidth={strokeWidth} />
      </motion.span>
    );
  }

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', ...style }} className={className}>
      <IconComponent size={size} color={color} strokeWidth={strokeWidth} />
    </span>
  );
}
