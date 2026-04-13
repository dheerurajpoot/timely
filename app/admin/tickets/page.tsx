'use client';

import { Card } from '@/components/ui/card';
import { AlertCircle, Clock, CheckCircle, Ticket } from 'lucide-react';

export default function TicketsPage() {
  const stats = [
    { label: 'Open', value: 12, icon: AlertCircle, color: 'text-red-500' },
    { label: 'In Progress', value: 5, icon: Clock, color: 'text-yellow-500' },
    { label: 'Closed', value: 48, icon: CheckCircle, color: 'text-green-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Support Tickets</h2>
        <p className="text-muted-foreground">Manage user support requests</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <Icon className={`${stat.color}`} size={32} />
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 text-center justify-center py-12">
          <Ticket size={48} className="text-muted-foreground" />
          <div>
            <h3 className="font-semibold mb-1">Support Tickets Management</h3>
            <p className="text-sm text-muted-foreground">
              Ticket management system coming soon
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
