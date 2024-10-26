// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Verificar si el usuario administrador ya existe
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'administrador@dapp-project.com' },
  });

  if (existingAdmin) {
    console.log('Datos iniciales ya existen. Seed no es necesario.');
    return;
  }

  // Crear módulos
  const dashboardModule = await prisma.module.create({
    data: { name: 'DASHBOARD' },
  });

  const reporteriaModule = await prisma.module.create({
    data: { name: 'REPORTERÍA' },
  });

  const usuariosModule = await prisma.module.create({
    data: { name: 'USUARIOS' },
  });

  // Crear rol y asociar módulos
  const adminRole = await prisma.role.create({
    data: {
      name: 'ADMINISTRADOR',
      modules: {
        connect: [
          { id: dashboardModule.id },
          { id: reporteriaModule.id },
          { id: usuariosModule.id },
        ],
      },
    },
  });

  // Hashear la contraseña
  const hashedPassword = await bcrypt.hash('adminPass-secure-55', 10);

  // Crear usuario y asociar rol
  await prisma.user.create({
    data: {
      name: 'Administrador',
      lastName: 'Del Sistema',
      email: 'administrador@dapp-project.com',
      password: hashedPassword,
      roles: {
        connect: { id: adminRole.id },
      },
    },
  });

  console.log('Datos iniciales creados exitosamente.');
}

main()
  .catch((e) => {
    console.error('Error al crear los datos iniciales:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
