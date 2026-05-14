import { cn } from "@/lib/utils";
import { User, Mail, Phone, MapPin } from "lucide-react";

interface Card02Props {
  name?: string;
  role?: string;
  email?: string;
  phone?: string;
  location?: string;
  avatar?: string;
}

export default function Card_04({
  name = "Sarah Anderson",
  role = "Product Designer",
  email = "sarah@example.com",
  phone = "+1 (555) 123-4567",
  location = "San Francisco, CA",
  avatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
}: Card02Props) {
  return (
    <div
      className={cn(
        "w-full max-w-sm mx-auto",
        "bg-white dark:bg-zinc-900",
        "border border-zinc-200/50 dark:border-zinc-800/50",
        "rounded-2xl shadow-sm",
        "overflow-hidden",
        "transition-all duration-300",
        "hover:shadow-md dark:hover:shadow-zinc-900/50",
        "hover:border-zinc-300/50 dark:hover:border-zinc-700/50",
      )}
    >
      <div className="h-24 bg-linear-to-r from-zinc-100 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900" />
      <div className="px-6 pb-6">
        <div className="flex justify-center -mt-12 mb-4">
          <img
            src={avatar}
            alt={name}
            className="w-24 h-24 rounded-full border-4 border-white dark:border-zinc-900 object-cover"
          />
        </div>
        <h3 className="text-center text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
          {name}
        </h3>
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mb-5">{role}</p>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
            <Mail className="w-4 h-4 text-zinc-400" />
            <span>{email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
            <Phone className="w-4 h-4 text-zinc-400" />
            <span>{phone}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
            <MapPin className="w-4 h-4 text-zinc-400" />
            <span>{location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
