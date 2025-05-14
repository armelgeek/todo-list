'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Users,
  ShoppingCart,
  CreditCard,
  TrendingUp,
  AlertCircle,
  Info
} from 'lucide-react';
import { StatsCard } from '@/shared/components/molecules/dashboard/stats-card';
import { ChartCard } from '@/shared/components/molecules/dashboard/chart-card';
import { ActivityList, Activity } from '@/shared/components/molecules/dashboard/activity-list';

// Exemple de données - À remplacer par de vraies données de votre API
const salesData = [
  { name: 'Jan', value: 4000 },
  { name: 'Fév', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Avr', value: 2780 },
  { name: 'Mai', value: 1890 },
  { name: 'Juin', value: 2390 },
];

const recentActivities: Activity[] = [
  {
    id: '1',
    title: 'Nouvelle commande #1234',
    description: 'Client: John Doe - Total: 156.00€',
    timestamp: new Date(),
    icon: ShoppingCart,
    status: 'success',
    user: {
      name: 'John Doe',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
    }
  },
  {
    id: '2',
    title: 'Alerte stock faible',
    description: 'Produit XYZ en dessous du seuil minimum',
    timestamp: new Date(Date.now() - 3600000),
    icon: AlertCircle,
    status: 'warning'
  },
  {
    id: '3',
    title: 'Maintenance système',
    description: 'Mise à jour de la base de données terminée',
    timestamp: new Date(Date.now() - 7200000),
    icon: Info,
    status: 'info'
  }
];

export default function DashboardPage() {
  // Exemple de requête - À adapter selon votre API
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      // Simuler un appel API
      return {
        totalUsers: 1234,
        totalOrders: 567,
        revenue: 12345.67,
        growth: 23.4
      };
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="border-gray-900 border-b-2 rounded-full w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="font-bold text-3xl">Tableau de bord</h1>
        <p className="mt-2 text-gray-500">
          Bienvenue dans votre espace d'administration
        </p>
      </div>

      {/* Statistiques */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Utilisateurs"
          value={stats?.totalUsers}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
          description="Total des utilisateurs inscrits"
        />
        <StatsCard
          title="Commandes"
          value={stats?.totalOrders}
          icon={ShoppingCart}
          trend={{ value: 8, isPositive: true }}
          description="Commandes ce mois"
        />
        <StatsCard
          title="Revenu"
          value={`${stats?.revenue.toLocaleString()}€`}
          icon={CreditCard}
          trend={{ value: 23.4, isPositive: true }}
          description="Revenu ce mois"
        />
        <StatsCard
          title="Croissance"
          value={`${stats?.growth}%`}
          icon={TrendingUp}
          trend={{ value: stats?.growth || 0, isPositive: true }}
          description="Croissance mensuelle"
        />
      </div>

      {/* Graphiques */}
      <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
        <ChartCard
          title="Ventes mensuelles"
          subtitle="Évolution des ventes sur les 6 derniers mois"
          data={salesData}
          type="area"
          dataKey="value"
          color="#3b82f6"
        />
        <ChartCard
          title="Commandes par catégorie"
          subtitle="Répartition des commandes"
          data={[
            { name: 'Électronique', value: 400 },
            { name: 'Vêtements', value: 300 },
            { name: 'Alimentation', value: 300 },
            { name: 'Autres', value: 200 },
          ]}
          type="bar"
          dataKey="value"
          color="#10b981"
        />
      </div>

      {/* Activités récentes */}
      <div className="gap-6 grid grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartCard
            title="Tendances horaires"
            subtitle="Activité des dernières 24 heures"
            data={[
              { name: '00h', value: 100 },
              { name: '04h', value: 50 },
              { name: '08h', value: 200 },
              { name: '12h', value: 300 },
              { name: '16h', value: 250 },
              { name: '20h', value: 150 },
            ]}
            type="line"
            dataKey="value"
            color="#8b5cf6"
          />
        </div>
        <ActivityList activities={recentActivities} />
      </div>
    </div>
  );
}
