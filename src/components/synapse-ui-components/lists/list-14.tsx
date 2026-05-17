"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface ListItem {
  id: string;
  name: string;
  price: number;
  change: number;
  marketCap: string;
  volume: string;
  symbol: string;
  color: string;
}

interface List14Props {
  items?: ListItem[];
  className?: string;
}

const ITEMS: ListItem[] = [
  {
    id: "1",
    name: "Bitcoin",
    symbol: "BTC",
    price: 43567.89,
    change: 2.34,
    marketCap: "$852B",
    volume: "$28B",
    color: "from-orange-400 to-orange-600",
  },
  {
    id: "2",
    name: "Ethereum",
    symbol: "ETH",
    price: 2345.67,
    change: -1.23,
    marketCap: "$281B",
    volume: "$12B",
    color: "from-indigo-400 to-indigo-600",
  },
  {
    id: "3",
    name: "Solana",
    symbol: "SOL",
    price: 98.45,
    change: 5.67,
    marketCap: "$42B",
    volume: "$3B",
    color: "from-purple-400 to-purple-600",
  },
];

export default function List14({ items = ITEMS, className }: List14Props) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "w-full max-w-2xl mx-auto rounded-2xl overflow-hidden",
        "bg-white dark:bg-zinc-900",
        "border border-zinc-200 dark:border-zinc-800",
        className,
      )}
    >
      <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-zinc-50 dark:bg-zinc-800/50 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
        <div className="col-span-4">Asset</div>
        <div className="col-span-2 text-right">Price</div>
        <div className="col-span-2 text-right">24h</div>
        <div className="col-span-2 text-right hidden sm:block">Market Cap</div>
        <div className="col-span-2 text-right hidden sm:block">Volume</div>
      </div>
      <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
        {items.map((item) => (
          <div
            key={item.id}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={cn(
              "grid grid-cols-12 gap-4 px-5 py-4 items-center",
              "hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer",
            )}
          >
            <div className="col-span-4 flex items-center gap-3">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm",
                  "bg-gradient-to-br",
                  item.color,
                )}
              >
                {item.symbol.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{item.name}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{item.symbol}</p>
              </div>
            </div>
            <div className="col-span-2 text-right font-semibold text-zinc-900 dark:text-zinc-100">
              ${item.price.toLocaleString()}
            </div>
            <div
              className={cn(
                "col-span-2 text-right font-medium",
                item.change >= 0
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-red-600 dark:text-red-400",
              )}
            >
              {item.change >= 0 ? "+" : ""}
              {item.change}%
            </div>
            <div className="col-span-2 text-right text-zinc-600 dark:text-zinc-400 hidden sm:block">
              {item.marketCap}
            </div>
            <div className="col-span-2 text-right text-zinc-600 dark:text-zinc-400 hidden sm:block">
              {item.volume}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
