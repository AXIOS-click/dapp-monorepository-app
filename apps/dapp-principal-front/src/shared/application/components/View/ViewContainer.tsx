/**
 * Este componente es el contenedor de las vistas de la aplicación.
 * Aqui vamos a manejar las vistas y menus por roles del usuaria usando el hook de autenticación y su authority level
 */
export const ViewContainer = () => {
  const userAuthority = {
    roles: ["admin"],
  };
  return <div>ViewContainer</div>;
};
