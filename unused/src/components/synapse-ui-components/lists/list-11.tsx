"use client";

import { cn } from "@/lib/utils";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { useState } from "react";

interface ListItem {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover: string;
  playing?: boolean;
}

interface List11Props {
  items?: ListItem[];
  className?: string;
}

const ITEMS: ListItem[] = [
  {
    id: "1",
    title: "Midnight City",
    artist: "M83",
    duration: "4:03",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop",
    playing: true,
  },
  {
    id: "2",
    title: "Electric Feel",
    artist: "MGMT",
    duration: "3:49",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop",
  },
  {
    id: "3",
    title: "Do I Wanna Know?",
    artist: "Arctic Monkeys",
    duration: "4:32",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&h=100&fit=crop",
  },
];

export default function List11({ items = ITEMS, className }: List11Props) {
  const [tracks, setTracks] = useState(items);
  const currentTrack = tracks.find((t) => t.playing);

  const togglePlay = (id: string) => {
    setTracks((prev) =>
      prev.map((item) => ({
        ...item,
        playing: item.id === id ? !item.playing : false,
      })),
    );
  };

  return (
    <div
      className={cn(
        "w-full max-w-md mx-auto rounded-3xl overflow-hidden",
        "bg-zinc-950",
        className,
      )}
    >
      {currentTrack && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={currentTrack.cover}
            alt={currentTrack.title}
            className="w-full h-full object-cover blur-xl scale-110 opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-end gap-4">
            <img
              src={currentTrack.cover}
              alt={currentTrack.title}
              className="w-16 h-16 rounded-xl shadow-2xl"
            />
            <div className="flex-1">
              <h3 className="text-white font-semibold truncate">{currentTrack.title}</h3>
              <p className="text-zinc-400 text-sm">{currentTrack.artist}</p>
            </div>
          </div>
        </div>
      )}
      <div className="p-4 flex items-center justify-center gap-6 border-b border-zinc-800">
        <button className="text-zinc-400 hover:text-white transition-colors">
          <SkipBack className="w-5 h-5" />
        </button>
        <button
          onClick={() => currentTrack && togglePlay(currentTrack.id)}
          className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform"
        >
          {currentTrack?.playing ? (
            <Pause className="w-5 h-5 text-zinc-900" />
          ) : (
            <Play className="w-5 h-5 text-zinc-900 ml-0.5" />
          )}
        </button>
        <button className="text-zinc-400 hover:text-white transition-colors">
          <SkipForward className="w-5 h-5" />
        </button>
      </div>
      <div className="divide-y divide-zinc-800/50">
        {tracks.map((item, index) => (
          <button
            key={item.id}
            onClick={() => togglePlay(item.id)}
            className={cn(
              "w-full flex items-center gap-3 p-4 text-left",
              "hover:bg-zinc-900 transition-colors",
              item.playing && "bg-zinc-900",
            )}
          >
            <span className="w-6 text-center text-sm text-zinc-500">
              {item.playing ? <Volume2 className="w-4 h-4 text-emerald-500 mx-auto" /> : index + 1}
            </span>
            <img src={item.cover} alt={item.title} className="w-10 h-10 rounded-lg" />
            <div className="flex-1 min-w-0">
              <h4
                className={cn(
                  "font-medium truncate",
                  item.playing ? "text-emerald-500" : "text-white",
                )}
              >
                {item.title}
              </h4>
              <p className="text-sm text-zinc-500 truncate">{item.artist}</p>
            </div>
            <span className="text-sm text-zinc-500">{item.duration}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
