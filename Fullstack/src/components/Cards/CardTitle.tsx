import { cn } from "@/utils/cn";

const CardTitle = ({
    className,
    children,
  }: {
    className?: string;
    children: React.ReactNode;
  }) => {
    return (
      <p
        className={cn(
          "text-zinc-100 font-medium tracking-wide mt-4 text-md",
          className
        )}
      >
        {children}
      </p>
    );
  };
  
export default CardTitle