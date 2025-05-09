import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/hooks/useAuth';

const AdminDashboard = () => {
  const { section } = useParams();
  const [activeTab, setActiveTab] = useState(section || 'overview');
  const { user } = useAuth();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Panel de Administración</h1>
        <p className="text-gray-500">
          Bienvenido, {user?.name}. Gestiona todos los aspectos de la plataforma.
        </p>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Vista General</TabsTrigger>
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="agencies">Agencias</TabsTrigger>
          <TabsTrigger value="agents">Agentes</TabsTrigger>
          <TabsTrigger value="settings">Configuración</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
                <CardDescription>+2.5% del mes pasado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,248</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Agentes</CardTitle>
                <CardDescription>+15% del mes pasado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">324</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Agencias</CardTitle>
                <CardDescription>+7% del mes pasado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pólizas</CardTitle>
                <CardDescription>+12% del mes pasado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,642</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
                <CardDescription>
                  Últimas actividades registradas en la plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { user: "Carlos Méndez", action: "agregó una nueva póliza", time: "hace 5 minutos" },
                    { user: "Agencia ABC", action: "registró un nuevo agente", time: "hace 15 minutos" },
                    { user: "María García", action: "actualizó su perfil", time: "hace 45 minutos" },
                    { user: "Juan López", action: "reportó un siniestro", time: "hace 1 hora" }
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center">
                      <div className="mr-4 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-600">
                          {activity.user.substring(0, 1)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          <span className="font-semibold">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Estado del Sistema</CardTitle>
                <CardDescription>Rendimiento y métricas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Base de datos", status: "Operativa", indicator: "bg-green-500" },
                    { name: "Autenticación", status: "Operativa", indicator: "bg-green-500" },
                    { name: "Almacenamiento", status: "Operativa", indicator: "bg-green-500" },
                    { name: "API", status: "Operativa", indicator: "bg-green-500" }
                  ].map((service, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`h-2 w-2 rounded-full ${service.indicator} mr-2`} />
                        <span className="text-sm font-medium">{service.name}</span>
                      </div>
                      <span className="text-xs text-green-600 font-medium">{service.status}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Other tabs content would be implemented here */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Usuarios</CardTitle>
              <CardDescription>
                Administra todos los usuarios registrados en la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Esta sección te permite ver, editar y gestionar todos los usuarios.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agencies">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Agencias</CardTitle>
              <CardDescription>
                Administra todas las agencias registradas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Esta sección te permite ver, editar y gestionar todas las agencias.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agents">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Agentes</CardTitle>
              <CardDescription>
                Administra todos los agentes registrados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Esta sección te permite ver, editar y gestionar todos los agentes.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Configuración del Sistema</CardTitle>
              <CardDescription>
                Administra la configuración global de la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Esta sección te permite configurar los parámetros globales del sistema.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
