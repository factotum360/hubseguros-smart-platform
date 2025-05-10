import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  // Efecto para el scroll suave
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        element?.scrollIntoView({ behavior: "smooth" });
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", handleAnchorClick);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener("click", handleAnchorClick);
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed w-full bg-white backdrop-blur-sm shadow-md border-b z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-hubseguros-primary">
              HubSeguros
            </span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#caracteristicas" className="text-gray-700 hover:text-hubseguros-primary transition">
              Características
            </a>
            <a href="#beneficios" className="text-gray-700 hover:text-hubseguros-primary transition">
              Beneficios
            </a>
            <a href="#soluciones" className="text-gray-700 hover:text-hubseguros-primary transition">
              Soluciones
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/iniciar-sesion">
              <Button variant="outline">Iniciar sesión</Button>
            </Link>
            <Link to="/registro">
              <Button className="bg-hubseguros-primary hover:bg-blue-600 transition-colors">
                Solicitar demo
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white pt-32 pb-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-800">
              Simplifica tu trabajo como agente de seguros
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Gestiona clientes, pólizas y siniestros en un solo lugar. Ahorra tiempo y aumenta tu productividad.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/registro">
                <Button className="bg-hubseguros-primary hover:bg-blue-600 text-base px-6 py-4">
                  Comenzar ahora
                </Button>
              </Link>
              <Button variant="outline" className="text-base px-6 py-4">
                Solicitar una demo
              </Button>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="relative max-w-lg w-full bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
              <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-gray-300 text-xs">HubSeguros - Panel de control</span>
              </div>
              <div className="p-4">
                <img 
                  src="/assets/dashboard-preview.png" 
                  alt="Preview del dashboard" 
                  className="w-full rounded-md border border-gray-100"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
