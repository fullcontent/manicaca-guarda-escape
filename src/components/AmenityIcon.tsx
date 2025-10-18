import { 
  WifiIcon, TvIcon, SunIcon, HomeIcon,
  SparklesIcon, FireIcon, UserGroupIcon, BeakerIcon,
  CubeIcon, GlobeAltIcon, HeartIcon, StarIcon
} from "@heroicons/react/24/outline";

interface AmenityIconProps {
  iconName: string;
  className?: string;
}

const AmenityIcon = ({ iconName, className = "w-6 h-6" }: AmenityIconProps) => {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    WifiIcon,
    TvIcon,
    SunIcon,
    HomeIcon,
    SparklesIcon,
    FireIcon,
    UserGroupIcon,
    BeakerIcon,
    CubeIcon,
    GlobeAltIcon,
    HeartIcon,
    StarIcon,
  };

  const IconComponent = iconMap[iconName] || WifiIcon;

  return <IconComponent className={className} />;
};

export default AmenityIcon;
