import { Loader2 } from "lucide-react";
export const ChargePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Cargando...
        </h1>
        <p className="text-gray-600">
          Por favor, espere mientras se carga el contenido.
        </p>
      </div>
    </div>
  );
};
