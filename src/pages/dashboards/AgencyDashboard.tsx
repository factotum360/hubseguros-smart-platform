
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Home } from "lucide-react";

export default function AgencyDashboard() {
  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/agencia/dashboard">
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
        <h1 className="text-3xl font-bold tracking-tight">Panel Ejecutivo</h1>
        <p className="text-muted-foreground">
          Administración de agencia y rendimiento general
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Ventas Totales</CardTitle>
            <CardDescription>Todos los canales</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$245,340</p>
            <p className="text-xs text-green-600">+12% vs mes anterior</p>
          </CardContent>
          <CardFooter>
            <a href="/agencia/dashboard/estadisticas" className="text-sm text-blue-600 hover:underline">
              Ver análisis →
            </a>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Agentes</CardTitle>
            <CardDescription>Equipo comercial</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">12</p>
            <p className="text-xs text-muted-foreground">Agentes activos</p>
          </CardContent>
          <CardFooter>
            <a href="/agencia/dashboard/agentes" className="text-sm text-blue-600 hover:underline">
              Administrar →
            </a>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Clientes</CardTitle>
            <CardDescription>Base total</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">342</p>
            <p className="text-xs text-green-600">+8 nuevos este mes</p>
          </CardContent>
          <CardFooter>
            <a href="/agencia/dashboard/clientes" className="text-sm text-blue-600 hover:underline">
              Ver detalles →
            </a>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Pólizas</CardTitle>
            <CardDescription>Total vigentes</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">524</p>
            <p className="text-xs text-muted-foreground">Valor: $1.2M</p>
          </CardContent>
          <CardFooter>
            <a href="/agencia/dashboard/polizas" className="text-sm text-blue-600 hover:underline">
              Ver cartera →
            </a>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
