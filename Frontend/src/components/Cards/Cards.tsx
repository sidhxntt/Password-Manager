import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Tooltip from "@mui/material/Tooltip";
import { LinkPreview } from "../LinkPreview/LinkPreview";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    name: string;
    username: string;
    password: string;
    website_link: string;
  }[];
  className?: string;
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
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
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
            name={item.name}
            username={item.username}
            password={item.password}
            link={item.website_link}
          />
        </div>
      ))}
    </div>
  );
};
const Card = ({
  name,
  username,
  password,
  link,
  className,
}: {
  name: string;
  username: string;
  password: string;
  link: string;
  className?: string;
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div
      className={cn(
        `rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20`,
        className
      )}
    >
      <div className="relative z-50">
        <div className="pl-4 ">
          <LinkPreview url={link}>
            <CardTitle>{name}</CardTitle>
          </LinkPreview>
          <CardDescription>
            <p className="text-sm font-bold">Username:</p> {username}
          </CardDescription>
          <CardDescription>
            <p className="text-sm font-bold">Password:</p>
            <input
              className="bg-transparent "
              type={showPassword ? "text" : "password"}
              value={password}
              disabled
            />
            <button
              type="button"
              className="relative right-[2cm] bottom-[22px]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <VisibilityOffOutlinedIcon fontSize="inherit" />
              ) : (
                <RemoveRedEyeOutlinedIcon fontSize="inherit" />
              )}
            </button>
          </CardDescription>
          <button className="absolute right-3 bottom-[0.35px] opacity-80">
            <Tooltip title="Delete">
              <DeleteIcon fontSize="small" />
            </Tooltip>
          </button>
          <button className="absolute right-10 bottom-0 opacity-80 ">
            <Tooltip title="Bookmark">
              <BookmarkIcon fontSize="small" />
            </Tooltip>
          </button>
        </div>
      </div>
    </div>
  );
};

const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn("text-zinc-100 font-medium tracking-wide mt-4 text-md", className)}
    >
      {children}
    </p>
  );
};

const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};

export { Card, CardTitle, CardDescription };
