
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Home } from "lucide-react";

export default function AgentDashboard() {
  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/agente/dashboard">
              <Home className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Panel de Agente</h1>
        <p className="text-muted-foreground">
          Gestión de clientes, pólizas y ventas
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Clientes</CardTitle>
            <CardDescription>Gestión de cartera de clientes</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">24</p>
            <p className="text-xs text-muted-foreground">Clientes activos</p>
          </CardContent>
          <CardFooter>
            <a href="/agente/dashboard/clientes" className="text-sm text-blue-600 hover:underline">
              Ver detalles →
            </a>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Pólizas</CardTitle>
            <CardDescription>Contratos vigentes</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">36</p>
            <p className="text-xs text-muted-foreground">Pólizas activas</p>
          </CardContent>
          <CardFooter>
            <a href="/agente/dashboard/polizas" className="text-sm text-blue-600 hover:underline">
              Ver detalles →
            </a>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Ventas</CardTitle>
            <CardDescription>Rendimiento comercial</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$12,500</p>
            <p className="text-xs text-muted-foreground">Ventas este mes</p>
          </CardContent>
          <CardFooter>
            <a href="/agente/dashboard/ventas" className="text-sm text-blue-600 hover:underline">
              Ver detalles →
            </a>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Renovaciones</CardTitle>
            <CardDescription>Próximas a vencer</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">5</p>
            <p className="text-xs text-muted-foreground">En los próximos 30 días</p>
          </CardContent>
          <CardFooter>
            <a href="/agente/dashboard/renovaciones" className="text-sm text-blue-600 hover:underline">
              Ver detalles →
            </a>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
