"use client";

import { cn } from "@/lib/utils";
import { Star, ShoppingCart } from "lucide-react";

interface ListItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
}

interface List18Props {
  items?: ListItem[];
  className?: string;
}

const ITEMS: ListItem[] = [
  {
    id: "1",
    name: "Wireless Noise-Canceling Headphones",
    price: 249,
    originalPrice: 349,
    rating: 4.8,
    reviews: 2847,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
    badge: "Best Seller",
  },
  {
    id: "2",
    name: "Mechanical Gaming Keyboard",
    price: 159,
    rating: 4.6,
    reviews: 1293,
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=200&h=200&fit=crop",
  },
  {
    id: "3",
    name: "Ultra-Wide Curved Monitor",
    price: 599,
    originalPrice: 749,
    rating: 4.9,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200&h=200&fit=crop",
    badge: "Sale",
  },
];

export default function List18({ items = ITEMS, className }: List18Props) {
  return (
    <div className={cn("w-full max-w-lg mx-auto space-y-4", className)}>
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(
            "group flex gap-4 p-4 rounded-2xl",
            "bg-white dark:bg-zinc-900",
            "border border-zinc-100 dark:border-zinc-800",
            "hover:shadow-xl transition-shadow duration-300",
          )}
        >
          <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-zinc-100 dark:bg-zinc-800">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            {item.badge && (
              <span
                className={cn(
                  "absolute top-2 left-2 px-2 py-0.5 rounded-md text-xs font-semibold text-white",
                  item.badge === "Sale" ? "bg-red-500" : "bg-emerald-500",
                )}
              >
                {item.badge}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0 flex flex-col">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-2 mb-1">
              {item.name}
            </h3>
            <div className="flex items-center gap-1.5 mb-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-3.5 h-3.5",
                      i < Math.floor(item.rating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-zinc-200 dark:text-zinc-700",
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                ({item.reviews.toLocaleString()})
              </span>
            </div>
            <div className="mt-auto flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  ${item.price}
                </span>
                {item.originalPrice && (
                  <span className="text-sm text-zinc-400 line-through">${item.originalPrice}</span>
                )}
              </div>
              <button className="p-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
                <ShoppingCart className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
