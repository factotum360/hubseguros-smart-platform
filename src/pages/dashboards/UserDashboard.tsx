
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Home } from "lucide-react";

export default function UserDashboard() {
  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/usuario/dashboard">
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
        <h1 className="text-3xl font-bold tracking-tight">Panel de Usuario</h1>
        <p className="text-muted-foreground">
          Bienvenido a tu panel de control personalizado
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Mis Pólizas</CardTitle>
            <CardDescription>Gestiona tus pólizas activas</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Tienes 2 pólizas activas</p>
          </CardContent>
          <CardFooter>
            <a href="/usuario/dashboard/mis-polizas" className="text-sm text-blue-600 hover:underline">
              Ver detalles →
            </a>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Siniestros</CardTitle>
            <CardDescription>Estado de tus reclamaciones</CardDescription>
          </CardHeader>
          <CardContent>
            <p>No tienes siniestros pendientes</p>
          </CardContent>
          <CardFooter>
            <a href="/usuario/dashboard/siniestros" className="text-sm text-blue-600 hover:underline">
              Ver detalles →
            </a>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Pagos</CardTitle>
            <CardDescription>Gestión de pagos y facturas</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Próximo pago: 15/06/2025</p>
          </CardContent>
          <CardFooter>
            <a href="/usuario/dashboard/pagos" className="text-sm text-blue-600 hover:underline">
              Ver detalles →
            </a>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
