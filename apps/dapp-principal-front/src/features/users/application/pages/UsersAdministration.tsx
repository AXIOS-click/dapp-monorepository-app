import PageContainer from "@/shared/application/components/custom/PageContainer";
import {
  Button,
  buttonVariants,
} from "@/shared/application/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/application/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/application/components/ui/dropdown-menu";
import { Heading } from "@/shared/application/components/ui/heading";
import { Separator } from "@/shared/application/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/application/components/ui/table";
import { cn } from "@/shared/application/lib/utils";
import { MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { IUserBase } from "../../domain/entities/User";
import { CreateUser } from "../components/CreateUser";
import { useDeleteUser } from "../hooks/useDelteUser";
import { useGetUsers } from "../hooks/useGetUsers";
import { UsersStore } from "../stores/UsersStore";

const UsersAdministration = () => {
  useGetUsers();

  const { allUsers: filteredUsers } = UsersStore();
  const [isEditMode, setIsEditMode] = useState(false);
  const [userToEdit, setUserToEdit] = useState<IUserBase | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const { mutate: deleteUser } = useDeleteUser();

  const handleDelete = (_id: string) => {
    deleteUser({ id: _id });

    setDeleteDialogOpen(false);
    alert("Usuario eliminado correctamente");
  };

  const openCreateDialog = () => {
    setUserToEdit(null);
    setIsEditMode(false);
    setUserDialogOpen(true);
  };

  const openEditDialog = (id: string) => {
    const user = filteredUsers?.find((user) => user.id === id);
    if (user) setUserToEdit(user);
    setIsEditMode(true);
    setUserDialogOpen(true);
  };

  const handleCloseModal = () => {
    setUserDialogOpen(false);
    setUserToEdit(null); // Limpiar `userToEdit` al cerrar
  };

  const handleOpenDeleteDialog = (id: string) => {
    setSelectedUserId(id);
    setDeleteDialogOpen(true);
  };

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading title="Usuarios" description=" Administración de usuarios" />
          <Button
            onClick={openCreateDialog}
            className={cn(buttonVariants(), "text-xs md:text-sm")}
          >
            <Plus className="mr-2 h-4 w-4" /> Agregar Nuevo Usario
          </Button>
        </div>
        <Separator />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Apellido</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Roles</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {(filteredUsers ?? []).map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.roles.join(", ")}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menú</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem
                        onSelect={(event) => {
                          event.preventDefault();
                          openEditDialog(user.id);
                        }}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onSelect={(event) => {
                          event.preventDefault();
                          handleOpenDeleteDialog(user.id);
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Borrar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={userDialogOpen} onOpenChange={setUserDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {isEditMode ? "Editar Usuario" : "Crear Usuario"}
              </DialogTitle>
              <DialogDescription>
                Realiza cambios en el usuario aquí. Haz clic en guardar cuando
                termines.
              </DialogDescription>
            </DialogHeader>
            <div>
              <CreateUser
                isEditMode={isEditMode}
                userToEdit={userToEdit}
                onClose={handleCloseModal}
              />
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>¿Estás seguro?</DialogTitle>
              <DialogDescription>
                Esta acción no se puede deshacer. Esto eliminará permanentemente
                la cuenta del usuario.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={() => selectedUserId && handleDelete(selectedUserId)}
              >
                Borrar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageContainer>
  );
};

export default UsersAdministration;
