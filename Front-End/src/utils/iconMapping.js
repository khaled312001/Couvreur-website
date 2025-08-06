import {
  Sparkles,
  Droplets,
  Wrench,
  Cloud,
  Home,
  Square,
  Users,
  DollarSign,
  Shield,
  Star,
  BarChart3,
  Calendar,
  Phone,
  Mail,
  Clock,
  Search,
  FileText,
  Trophy,
  Timer,
  Settings,
  Zap,
  Clipboard,
  Building2,
  Ruler,
  Smile,
  CheckCircle,
  Target,
  Award,
  Hammer,
  HardHat
} from 'lucide-react';

// Mapping of emojis to Lucide React icons
export const emojiToIcon = {
  '🧹': Sparkles,      // Cleaning
  '💧': Droplets,      // Water/Drops
  '🔧': Wrench,        // Tools/Repair
  '🌧️': Cloud,     // Rain
  '🏠': Home,          // House
  '🪟': Square,        // Window
  '👥': Users,         // Team/Users
  '💰': DollarSign,    // Money/Price
  '🛡️': Shield,       // Protection/Warranty
  '⭐': Star,          // Star/Rating
  '📊': BarChart3,     // Statistics/Charts
  '📅': Calendar,      // Calendar
  '📞': Phone,         // Phone
  '✉️': Mail,         // Email
  '🕐': Clock,         // Time
  '🕒': Clock,         // Time (alternative)
  '🔍': Search,        // Search
  '📋': FileText,      // Document/Quote
  '🔒': Shield,        // Security/Lock
  '📝': FileText,      // Document/Note
  '🏆': Trophy,        // Trophy/Award
  '⏰': Timer,         // Timer
  '🛠️': Settings,     // Settings/Tools
  '⚡': Zap,           // Lightning/Speed
  '📏': Ruler,         // Ruler/Measurement
  '😊': Smile,         // Smile/Satisfaction
  '✅': CheckCircle,    // Check/Success
  '🎯': Target,        // Target/Goal
  '🏅': Award,         // Award
  '🔨': Hammer,        // Hammer
  '🛠': Settings,          // Tool
  '👷': HardHat,       // Construction worker
  '🏗️': Building2,     // Building
  '☑️': CheckCircle    // Checkbox
};

// Helper function to get icon component from emoji
export const getIconFromEmoji = (emoji) => {
  return emojiToIcon[emoji] || Star; // Default to Star if emoji not found
};

// Helper function to get icon component (for use in React components)
export const getIconComponent = (emoji) => {
  return emojiToIcon[emoji] || Star;
}; 