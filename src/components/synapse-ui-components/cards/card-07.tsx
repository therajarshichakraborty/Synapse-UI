import { cn } from "@/lib/utils";
import { Package, Tag, ShoppingCart } from "lucide-react";

interface Card05Props {
  name?: string;
  category?: string;
  price?: string;
  image?: string;
  inStock?: boolean;
}

export default function Card_07({
  name = "Premium Wireless Headphones",
  category = "Electronics",
  price = "$199.99",
  image = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
  inStock = true,
}: Card05Props) {
  return (
    <div
      className={cn(
        "w-full max-w-sm overflow-hidden",
        "bg-white dark:bg-zinc-900",
        "border border-zinc-200/50 dark:border-zinc-800/50",
        "rounded-xl shadow-sm",
        "transition-all duration-300",
        "hover:shadow-md dark:hover:shadow-zinc-900/50",
        "hover:border-zinc-300/50 dark:hover:border-zinc-700/50",
      )}
    >
      <div className="relative h-48 bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {inStock && (
          <div className="absolute top-3 right-3 bg-white dark:bg-zinc-900 px-3 py-1 rounded-full text-xs font-medium text-zinc-900 dark:text-zinc-100">
            In Stock
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">{category}</p>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{name}</h3>
          </div>
          <Package className="w-4 h-4 text-zinc-400" />
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-zinc-200/50 dark:border-zinc-800/50">
          <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{price}</p>
          <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
            <ShoppingCart className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
