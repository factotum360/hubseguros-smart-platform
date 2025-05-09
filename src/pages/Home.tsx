import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  // ... (todo el código anterior igual hasta las rutas que necesitan cambios)

  // En el header
  <div className="flex items-center space-x-4">
    <Link to="/iniciar-sesion">
      <Button variant="outline">Iniciar sesión</Button>
    </Link>
    <Link to="/registro">
      <Button className="bg-hubseguros-primary hover:bg-blue-700">Solicitar demo</Button>
    </Link>
  </div>

  // En la sección Hero
  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
    <Link to="/registro">
      <Button className="w-full sm:w-auto bg-hubseguros-primary hover:bg-blue-700 text-base px-8 py-6">
        Comenzar ahora
      </Button>
    </Link>
    <Button variant="outline" className="w-full sm:w-auto text-base px-8 py-6">
      Solicitar una demo
    </Button>
  </div>

  // En la sección de soluciones (las tres cards)
  <Link to="/registro">
    <Button className="w-full bg-hubseguros-primary hover:bg-blue-700">
      Comenzar
    </Button>
  </Link>

  // En la sección CTA
  <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
    <Link to="/registro">
      <Button className="w-full sm:w-auto bg-white text-hubseguros-primary hover:bg-gray-100 text-base px-8 py-6">
        Crear cuenta gratis
      </Button>
    </Link>
    <Link to="/iniciar-sesion">
      <Button variant="outline" className="w-full sm:w-auto text-white border-white hover:bg-blue-700 text-base px-8 py-6">
        Iniciar sesión
      </Button>
    </Link>
  </div>

  // ... (resto del código igual)