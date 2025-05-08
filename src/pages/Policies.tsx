
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Plus, Filter } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const mockPolicies = [
  {
    id: "POL-001",
    client: "María García",
    type: "Auto",
    status: "active",
    startDate: "2023-01-15",
    endDate: "2024-01-15",
    premium: 1250.00,
  },
  {
    id: "POL-002",
    client: "Juan Pérez",
    type: "Vida",
    status: "active",
    startDate: "2023-03-10",
    endDate: "2024-03-10",
    premium: 850.00,
  },
  {
    id: "POL-003",
    client: "Ana Rodríguez",
    type: "Hogar",
    status: "active",
    startDate: "2023-05-22",
    endDate: "2024-05-22",
    premium: 720.00,
  },
  {
    id: "POL-004",
    client: "Carlos López",
    type: "Salud",
    status: "pending",
    startDate: "2023-06-30",
    endDate: "2024-06-30",
    premium: 1800.00,
  },
  {
    id: "POL-005",
    client: "Laura Martínez",
    type: "Viaje",
    status: "expired",
    startDate: "2022-12-15",
    endDate: "2023-03-15",
    premium: 350.00,
  },
];

const Policies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredPolicies = mockPolicies.filter(policy => {
    // Filter by search term
    const matchesSearch = policy.client.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          policy.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          policy.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by status
    const matchesStatus = filterStatus === "all" || policy.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 hover:bg-green-600">Activa</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pendiente</Badge>;
      case "expired":
        return <Badge className="bg-red-500 hover:bg-red-600">Vencida</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    }).format(date);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Pólizas</h1>
        <Button className="bg-hubseguros-primary hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Nueva Póliza
        </Button>
      </div>

      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="col-span-2 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por cliente, ID o tipo de póliza..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full">
                <Filter className="mr-2 h-4 w-4" />
                {filterStatus === "all" ? "Todos los estados" : 
                  filterStatus === "active" ? "Activas" : 
                  filterStatus === "pending" ? "Pendientes" : 
                  "Vencidas"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-full">
              <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                Todos los estados
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("active")}>
                Activas
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("pending")}>
                Pendientes
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("expired")}>
                Vencidas
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha inicio</TableHead>
                <TableHead>Fecha fin</TableHead>
                <TableHead className="text-right">Prima</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPolicies.length > 0 ? (
                filteredPolicies.map((policy) => (
                  <TableRow key={policy.id} className="hover:bg-muted/50 cursor-pointer">
                    <TableCell className="font-medium">{policy.id}</TableCell>
                    <TableCell>{policy.client}</TableCell>
                    <TableCell>{policy.type}</TableCell>
                    <TableCell>{getStatusBadge(policy.status)}</TableCell>
                    <TableCell>{formatDate(policy.startDate)}</TableCell>
                    <TableCell>{formatDate(policy.endDate)}</TableCell>
                    <TableCell className="text-right">${policy.premium.toFixed(2)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No se encontraron pólizas
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default Policies;
