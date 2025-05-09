import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

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
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-hubseguros-primary"
            >
              HubSeguros
            </motion.span>
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
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-b from-gray-50 to-white pt-32 pb-20"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
              >
                La plataforma que simplifica tu trabajo como agente de seguros
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-600 mb-8"
              >
                Gestiona clientes, pólizas y siniestros en un solo lugar. 
                Ahorra tiempo y aumenta tu productividad.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              >
                <Link to="/registro">
                  <Button className="w-full sm:w-auto bg-hubseguros-primary hover:bg-blue-700 text-base px-8 py-6 transition-colors">
                    Comenzar ahora
                  </Button>
                </Link>
                <Button variant="outline" className="w-full sm:w-auto text-base px-8 py-6">
                  Solicitar una demo
                </Button>
              </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="md:w-1/2"
            >
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
                  {/* Aquí puedes agregar una imagen o preview del dashboard */}
                  <img 
                    src="/assets/dashboard-preview.png" 
                    alt="Preview del dashboard" 
                    className="w-full rounded-md shadow-inner"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;