import { useState } from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { LinkPreview } from "../LinkPreview/LinkPreview";
import AlertDialogDemo from "../Modal/Modal";
import { cn } from "@/utils/cn";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import Tooltip from "@mui/material/Tooltip";
import { useRecoilValue } from "recoil";
import { onEditSelector } from "@/Global/selector";

const Card = ({
  id,
  name,
  username,
  password,
  link,
  // handleDelete,
  // onEdit,
  className,
}: {
  id: number;
  name: string;
  username: string;
  password: string;
  link: string;
  // handleDelete: (id: number) => void;
  // onEdit: (id: number) => void;
  className?: string;
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const onEdit = useRecoilValue(onEditSelector);

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
          <AlertDialogDemo/>
            <button 
              onClick={()=>{onEdit(id)}}
            className="absolute right-10 bottom-[0.35px] opacity-80">
              <Tooltip title={"edit"}>
                 <ModeEditOutlinedIcon fontSize="small" />
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
      className={cn(
        "text-zinc-100 font-medium tracking-wide mt-4 text-md",
        className
      )}
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
