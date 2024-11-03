import { Button } from "@/shared/application/components/custom/Button";
import { PasswordInput } from "@/shared/application/components/custom/PasswordInput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/application/components/ui/form";
import { Input } from "@/shared/application/components/ui/input";
import { cn } from "@/shared/application/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { HTMLAttributes, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLogin } from "../hooks/useLogin";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {
  nonImplemented?: boolean;
}

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Por favor, ingresa tú email" })
    .email({ message: "Email Invalido" }),
  password: z
    .string()
    .min(1, {
      message: "Por favor, ingresa tú contraseña",
    })
    .min(7, {
      message: "La contraseña debe tener al menos 7 caracteres",
    }),
});

export function UserAuthForm({
  className,
  ...props
}: Readonly<UserAuthFormProps>) {
  const [isLoading, setIsLoading] = useState(false);
  const { mutate, status } = useLogin();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    setIsLoading(status === "pending");
  }, [status]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate(data);
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-2" loading={isLoading}>
              Login
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
