import { useState } from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { LinkPreview } from "../LinkPreview/LinkPreview";
import AlertDialogDemo from "../Modal/Modal";
import { cn } from "@/utils/cn";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import EditOffOutlinedIcon from "@mui/icons-material/EditOffOutlined";
import Tooltip from "@mui/material/Tooltip";
import CardTitle from "./CardTitle";
import CardDescription from "./CardDescription";
import { useForm } from "react-hook-form";

const Card = ({
  id,
  name,
  username,
  password,
  link,
  handleDelete,
  onEdit,
  className,
}: {
  id: number;
  name: string;
  username: string;
  password: string;
  link: string;
  handleDelete: (id: number) => void;
  onEdit: (id: number, password: string) => void;
  className?: string;
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(true);
  const [onChange, setOnChange] = useState<boolean>(false);
  const { register, handleSubmit, watch } = useForm();

  const onSubmit = (data: any) => {
    onEdit(id, data.password);
    setDisable(true);
    setOnChange(false);
  };

  const watchedPassword = watch("password", password);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className={cn(
          `rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20`,
          className
        )}
      >
        <div className="relative z-50">
          <div className="pl-4">
            <LinkPreview url={link}>
              <CardTitle>{name}</CardTitle>
            </LinkPreview>
            <CardDescription>
              <p className="text-sm font-bold">Username:</p> {username}
            </CardDescription>
            <CardDescription>
              <p className="text-sm font-bold">Password:</p>
              {disable ? (
                <input
                  className="bg-transparent"
                  type={showPassword ? "text" : "password"}
                  value={watchedPassword}
                  disabled
                />
              ) : (
                <input
                  {...register("password")}
                  onChange={() => {
                    setOnChange(true);
                  }}
                  className="bg-transparent"
                  type={showPassword ? "text" : "password"}
                  defaultValue={watchedPassword}
                />
              )}
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

            {onChange ? (
              <button
                type="submit"
                className="absolute right-3 bottom-[0.35px] opacity-80"
              >
                <Tooltip title={"Save Changes"}>
                  <SaveAltOutlinedIcon fontSize="small" />
                </Tooltip>
              </button>
            ) : (
              <AlertDialogDemo id={id} handleDelete={() => handleDelete(id)} />
            )}

            {disable ? (
              <button
                type="button"
                onClick={() => {
                  setDisable(false);
                }}
                className="absolute right-10 bottom-[0.35px] opacity-80"
              >
                <Tooltip title={"Edit"}>
                  <ModeEditOutlinedIcon fontSize="small" />
                </Tooltip>
              </button>
            ) : (
              <button
                type="button"
                className="absolute right-10 bottom-[0.35px] opacity-80"
                onClick={() => {
                  setDisable(true);
                  setOnChange(false);
                }}
              >
                <Tooltip title={"Undo"}>
                  <EditOffOutlinedIcon fontSize="small" />
                </Tooltip>
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export { Card };