export interface Metric {
  title: string;
  value: string;
  description: string;
  variation: number;
}

export const metrics: Metric[] = [
  {
    title: "Clientes",
    value: "1.248",
    description: "Em relação ao mês passado",
    variation: 12,
  },
  {
    title: "Produtos",
    value: "356",
    description: "Em relação ao mês passado",
    variation: 8,
  },
  {
    title: "Vendas",
    value: "R$ 24.580",
    description: "Em relação ao mês passado",
    variation: 18,
  },
];

export interface SaleData {
  month: string;
  sales: number;
}

export const salesData: SaleData[] = [
  { month: "Jan", sales: 12000 },
  { month: "Fev", sales: 15000 },
  { month: "Mar", sales: 13500 },
  { month: "Abr", sales: 18000 },
  { month: "Mai", sales: 21000 },
  { month: "Jun", sales: 24580 },
];

export interface Activity {
  id: number;
  description: string;
  date: string;
  type: "sale" | "customer" | "product";
}

export const activities: Activity[] = [
  {
    id: 1,
    description: "Nova venda realizada",
    date: "Hoje, 10:32",
    type: "sale",
  },
  {
    id: 2,
    description: "Novo cliente cadastrado",
    date: "Hoje, 09:15",
    type: "customer",
  },
  {
    id: 3,
    description: "Produto adicionado ao estoque",
    date: "Ontem, 16:40",
    type: "product",
  },
  {
    id: 4,
    description: "Nova venda realizada",
    date: "Ontem, 14:22",
    type: "sale",
  },
];
