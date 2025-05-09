
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { CheckCircle2, BarChart3, Clock, Layers, HandCoins, Headphones } from "lucide-react";

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
      {/* Navbar */}
      <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm border-b z-50">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-hubseguros-primary">HubSeguros</Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link to="#caracteristicas" className="text-gray-600 hover:text-hubseguros-primary">Características</Link>
            <Link to="#beneficios" className="text-gray-600 hover:text-hubseguros-primary">Beneficios</Link>
            <Link to="#soluciones" className="text-gray-600 hover:text-hubseguros-primary">Soluciones</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/iniciar-sesion" className="text-hubseguros-primary hover:text-blue-700">Iniciar sesión</Link>
            <Button className="bg-hubseguros-primary hover:bg-blue-700">
              Solicitar demo
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section con imagen de dashboard */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-28 pb-16 md:pt-32 md:pb-24"
      >
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              La plataforma que simplifica tu trabajo como agente de seguros
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Gestiona clientes, pólizas y siniestros en un solo lugar. Ahorra tiempo y aumenta tu productividad.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="bg-hubseguros-primary hover:bg-blue-700 text-white px-6 py-2.5">
                Comenzar ahora
              </Button>
              <Button variant="outline" className="border-gray-300 hover:bg-gray-100">
                Solicitar una demo
              </Button>
            </div>
          </div>
          <div className="mt-8 md:mt-0 relative">
            <div className="shadow-2xl rounded-lg overflow-hidden border border-gray-200">
              <img 
                src="/lovable-uploads/ae7b92f4-1acf-430c-941e-cb16612b12bf.png" 
                alt="Dashboard de HubSeguros" 
                className="w-full"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Beneficios Section */}
      <section id="beneficios" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Beneficios de usar HubSeguros</h2>
            <p className="text-gray-600">
              Nuestra plataforma está diseñada específicamente para facilitar el trabajo diario de
              agentes, promotores y agencias de seguros.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Layers className="h-8 w-8 text-blue-500" />,
                title: "Organiza tu cartera",
                description: "Gestiona de forma eficiente tus clientes, pólizas y siniestros en una sola plataforma integrada."
              },
              {
                icon: <Clock className="h-8 w-8 text-blue-500" />,
                title: "Ahorra tiempo",
                description: "Automatiza tareas repetitivas y procesos administrativos para centrarte en lo que realmente importa."
              },
              {
                icon: <BarChart3 className="h-8 w-8 text-blue-500" />,
                title: "Impulsa tus ventas",
                description: "Identifica oportunidades de venta cruzada y seguimiento de renovaciones para aumentar tu cartera."
              },
              {
                icon: <Headphones className="h-8 w-8 text-blue-500" />,
                title: "Soporte humano",
                description: "Contamos con un equipo de especialistas que te ayudarán en todo momento con cualquier consulta."
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="p-6 rounded-lg bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Soluciones Section */}
      <section id="soluciones" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Soluciones adaptadas a tu rol</h2>
            <p className="text-gray-600">
              HubSeguros se adapta a tus necesidades específicas, ya sea que trabajes como agente
              independiente, promotor o administres una agencia completa.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Usuario",
                features: [
                  "Panel personalizado",
                  "Visualización de pólizas",
                  "Alertas de vencimiento",
                  "Reportes siniestros"
                ]
              },
              {
                title: "Agente",
                recommended: true,
                features: [
                  "Todo lo de Usuario",
                  "Gestión de clientes",
                  "Seguimiento de comisiones",
                  "Oportunidades de venta",
                  "Asistente IA"
                ]
              },
              {
                title: "Agencia",
                features: [
                  "Todo lo de Agente",
                  "Gestión de agentes",
                  "Dashboard financiero",
                  "Reportes avanzados"
                ]
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                {plan.recommended && (
                  <div className="bg-yellow-400 text-xs font-semibold text-white text-center py-1">
                    RECOMENDADO
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-blue-600 mb-6">{plan.title}</h3>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-hubseguros-primary hover:bg-blue-700">
                    Comenzar
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-hubseguros-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Comienza a utilizar HubSeguros hoy mismo
            </h2>
            <p className="text-xl mb-8">
              Simplifica tu trabajo, ahorra tiempo y aumenta tus ventas con nuestra plataforma.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="default" className="bg-white text-hubseguros-primary hover:bg-gray-100">
                Crear cuenta gratis
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">HubSeguros</h3>
              <p className="text-gray-400">
                La plataforma que simplifica la gestión de seguros para agentes, promotores y agencias.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Sobre nosotros</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contacto</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Empleo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Soporte</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Guías</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Políticas</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Términos</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacidad</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Cookies</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">GDPR</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
