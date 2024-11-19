import { RolesStore } from "@/features/roles/application/stores/RolesStore";
import { Button } from "@/shared/application/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/shared/application/components/ui/command";
import { Input } from "@/shared/application/components/ui/input";
import { Label } from "@/shared/application/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/application/components/ui/popover";
import { cn } from "@/shared/application/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { IUserBase } from "../../domain/entities/User";
import { useCreateUser } from "../hooks/useCreateUser";
import { useUpdateUser } from "../hooks/useUpdateUser";

const userSchemaCreate = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  lastName: z.string().min(1, "El apellido es obligatorio"),
  email: z.string().email("Dirección de correo inválida"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  roles: z.array(z.string().uuid()).min(1, "Debe seleccionar al menos un rol"),
});

const userSchemaEdit = userSchemaCreate.extend({
  name: z.string().min(1, "El nombre es obligatorio").optional(),
  lastName: z.string().min(1, "El apellido es obligatorio").optional(),
  email: z.string().email("Dirección de correo inválida").optional(),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .optional(),
  roles: z
    .array(z.string().uuid())
    .min(1, "Debe seleccionar al menos un rol")
    .optional(),
});

type UserFormData = z.infer<typeof userSchemaCreate>;

interface CreateUserProps {
  isEditMode?: boolean;
  userToEdit?: IUserBase | null;
  onClose?: () => void;
}

export const CreateUser: FC<CreateUserProps> = ({
  isEditMode,
  userToEdit,
  onClose,
}) => {
  const { allRoles } = RolesStore();
  const { mutate: createUser } = useCreateUser();
  const { mutate: updateUser } = useUpdateUser();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    getValues,
  } = useForm<UserFormData>({
    resolver: zodResolver(isEditMode ? userSchemaEdit : userSchemaCreate),
  });

  useEffect(() => {
    if (isEditMode && userToEdit) {
      const { name, lastName, email, roles } = userToEdit;
      const roleIds = roles
        .map((roleName) => allRoles?.find((role) => role.name === roleName)?.id)
        .filter((id): id is string => Boolean(id));
      setValue("name", name);
      setValue("lastName", lastName);
      setValue("email", email);
      setValue("roles", roleIds);
    }
  }, [isEditMode, userToEdit, setValue]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: UserFormData) => {
    setIsSubmitting(true);
    if (isEditMode && userToEdit?.id) {
      updateUser(
        { id: userToEdit.id, data },
        {
          onSuccess: () => {
            alert("Usuario actualizado exitosamente");
            if (onClose) onClose();
          },
        }
      );
    } else {
      createUser(data, {
        onSuccess: () => {
          alert("Usuario creado exitosamente");
          if (onClose) onClose();
        },
      });
    }
    setIsSubmitting(false);
  };
  const buttonText = isEditMode ? "Guardar Cambios" : "Crear Usuario";

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 w-full max-w-md mx-auto"
    >
      <div>
        <Label htmlFor="name">Nombre</Label>
        <Input id="name" {...register("name")} />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="lastName">Apellido</Label>
        <Input id="lastName" {...register("lastName")} autoComplete="off" />
        {errors.lastName && (
          <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Correo Electrónico</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          autoComplete="off"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {!isEditMode && (
        <div>
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            autoComplete="off"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
      )}

      <div>
        <Label>Roles</Label>
        <Controller
          name="roles"
          control={control}
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild className="w-full">
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={false}
                  className="w-full justify-between"
                >
                  {field.value?.length > 0
                    ? (() => {
                        const roleCount = field.value.length;
                        return `${roleCount} role${
                          roleCount > 1 ? "s" : ""
                        } seleccionados`;
                      })()
                    : "Seleccionar roles..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search roles..." />
                  <CommandEmpty>No se encontraron Roles</CommandEmpty>
                  <CommandGroup>
                    {(allRoles ?? []).map((role) => (
                      <CommandItem
                        key={role.id}
                        onSelect={() => {
                          const updatedValue = field.value?.includes(role.id)
                            ? field.value.filter((id: string) => id !== role.id)
                            : [...(field.value || []), role.id];
                          field.onChange(updatedValue);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-3 w-3",
                            field.value?.includes(role.id)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {role.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          )}
        />
        {errors.roles && (
          <p className="text-red-500 text-sm mt-1">{errors.roles.message}</p>
        )}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-6"
          onClick={() => {
            onSubmit(getValues());
          }}
        >
          {isSubmitting ? "Guardando..." : buttonText}
        </Button>
      </div>
    </form>
  );
};
