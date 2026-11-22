import {
  BookOpenIcon,
  HomeIcon,
  LayersIcon,
  SettingsIcon,
  SparklesIcon,
  TerminalIcon,
} from "lucide-react";
import { FloatingDock } from "@/components/animated/floating-dock";

export default function FloatingDockDemo() {
  return (
    <div className="flex h-56 w-full items-end justify-center">
      <FloatingDock
        items={[
          { title: "Home", icon: <HomeIcon />, href: "#" },
          { title: "Components", icon: <LayersIcon />, href: "#" },
          { title: "Animated", icon: <SparklesIcon />, href: "#" },
          { title: "Docs", icon: <BookOpenIcon />, href: "#" },
          { title: "CLI", icon: <TerminalIcon />, href: "#" },
          { title: "Settings", icon: <SettingsIcon />, href: "#" },
        ]}
      />
    </div>
  );
}
