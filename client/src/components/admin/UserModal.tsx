import { TAdminUserList } from "types";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import { Switch } from "../ui/switch";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/trpc";

type FormValues = {
  username: string;
  email: string;
  role: boolean;
};
type UserModalProps = {
  user: TAdminUserList | null;
  setOpen: (value: boolean) => void;
};
export default function UserModal({ user, setOpen }: UserModalProps) {
  const { userData } = useAuth();

  const [role, setRole] = useState(false);

  const { register, handleSubmit, setValue } = useForm<FormValues>();

  const utils = trpc.useContext();
  const { mutate } = trpc.user.updateUser.useMutation({
    onSuccess: () => {
      setOpen(false);
      utils.invalidate();
    },
  });

  useEffect(() => {
    if (user) {
      setValue("username", user.username);
      setValue("email", user.email);
      setRole(user.role === "ADMIN");
    }
  }, [user, setValue]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const userRole = role ? "ADMIN" : "USER";
    if (user) {
      mutate({
        id: user.id,
        username: data.username,
        email: data.email,
        role: userRole,
      });
    }
  };

  return (
    <>
      <DialogContent className="bg-secondary sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                {...register("username")}
                id="username"
                defaultValue={user?.username}
                className="col-span-3 bg-background/40"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                {...register("email")}
                id="email"
                defaultValue={user?.email}
                className="col-span-3 bg-background/40"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Is Admin
              </Label>
              <Switch
                id="role"
                checked={role}
                onClick={() => setRole(!role)}
                disabled={user?.id === userData?.id}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </>
  );
}
