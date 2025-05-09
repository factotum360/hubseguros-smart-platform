import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { CheckCircle2, BarChart3, Clock, Layers, Headphones } from "lucide-react";

const Home = () => {
  // Efecto para el scroll suave
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm border-b z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-hubseguros-primary">
              HubSeguros
            </span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#caracteristicas" className="text-gray-600 hover:text-hubseguros-primary transition-colors">
              Características
            </a>
            <a href="#beneficios" className="text-gray-600 hover:text-hubseguros-primary transition-colors">
              Beneficios
            </a>
            <a href="#soluciones" className="text-gray-600 hover:text-hubseguros-primary transition-colors">
              Soluciones
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/iniciar-sesion">
              <Button variant="outline">Iniciar sesión</Button>
            </Link>
            <Link to="/registro">
              <Button className="bg-hubseguros-primary hover:bg-blue-700 transition-colors">
                Solicitar demo
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight animate-fade-in">
                La plataforma que simplifica tu trabajo como agente de seguros
              </h1>
              <p className="text-xl text-gray-600 mb-8 animate-fade-in-delay">
                Gestiona clientes, pólizas y siniestros en un solo lugar. 
                Ahorra tiempo y aumenta tu productividad.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in-delay-2">
                <Link to="/registro">
                  <Button className="w-full sm:w-auto bg-hubseguros-primary hover:bg-blue-700 text-base px-8 py-6 transition-colors">
                    Comenzar ahora
                  </Button>
                </Link>
                <Button variant="outline" className="w-full sm:w-auto text-base px-8 py-6">
                  Solicitar una demo
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 animate-fade-in-delay-3">
              <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-200">
                <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-gray-400 text-xs">HubSeguros - Panel de control</div>
                </div>
                <div className="bg-white p-4">
                  <img 
                    src="/assets/dashboard-preview.png" 
                    alt="Preview del dashboard" 
                    className="w-full rounded-md shadow-inner"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resto de las secciones igual que antes... */}
    </div>
  );
};

export default Home;