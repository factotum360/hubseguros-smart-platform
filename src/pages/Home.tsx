import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-xl font-semibold">
              Hub<span className="text-hubseguros-primary">seguros</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
              <Link to="/clientes" className="text-gray-600 hover:text-gray-900">Clientes</Link>
              <Link to="/polizas" className="text-gray-600 hover:text-gray-900">Pólizas</Link>
              <Link to="/siniestros" className="text-gray-600 hover:text-gray-900">Siniestros</Link>
              <Link to="/mi-perfil" className="text-gray-600 hover:text-gray-900">Mi Perfil</Link>
              <Link to="/login">
                <Button variant="ghost" className="text-gray-600">
                  Iniciar sesión
                </Button>
              </Link>
              <Link to="/registro">
                <Button className="bg-[#0052CC] hover:bg-[#0747A6] text-white">
                  Solicitar demo
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              La plataforma que simplifica<br />
              tu trabajo como agente de seguros
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Gestiona clientes, pólizas y siniestros en un solo lugar.
              Ahorra tiempo y aumenta tu productividad.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/registro">
                <Button className="bg-[#0052CC] hover:bg-[#0747A6] text-white px-8 py-2 h-12">
                  Comenzar ahora
                </Button>
              </Link>
              <Button variant="outline" className="px-8 py-2 h-12">
                Solicitar una demo
              </Button>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-[#1E293B] rounded-t-lg p-2">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-gray-400 text-sm">Hubseguros - Panel de control</span>
              </div>
            </div>
            <div className="bg-white rounded-b-lg shadow-2xl border border-gray-200">
              <div className="grid grid-cols-12 gap-4 p-6">
                {/* Métricas */}
                <div className="col-span-4 bg-blue-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Pólizas activas</h3>
                  <p className="text-2xl font-bold text-blue-600">124</p>
                </div>
                <div className="col-span-4 bg-green-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Renovaciones este mes</h3>
                  <p className="text-2xl font-bold text-green-600">18</p>
                </div>
                <div className="col-span-4 bg-yellow-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Siniestros pendientes</h3>
                  <p className="text-2xl font-bold text-yellow-600">7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;