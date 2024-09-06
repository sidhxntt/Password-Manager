import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Account } from "./Index"; // Import the Account interface
import { Card } from "./Cards";


export const HoverEffect = ({
  items,
  className,
  handleDelete,
  onEdit
}: {
  items: Account[];
  className?: string;
  handleDelete: (id: number) => void;
  onEdit: (id: number, password:string) => void;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card
            id={item.id}
            name={item.name}
            username={item.username}
            password={item.password}
            link={item.website_link}
            handleDelete={handleDelete}
            onEdit={onEdit}
          />
        </div>
      ))}
    </div>
  );
};
