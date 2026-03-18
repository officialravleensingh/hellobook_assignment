import { useState, useMemo } from 'react';
import { Truck, MapPin, Wrench, CheckCircle2, Plus, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { cn, formatCurrency, formatDate } from '@/lib/utils';
import { fleet } from '@/data/mockData';

const statusConfig = {
  'on-route': { label: 'On Route', variant: 'success', icon: Truck },
  available: { label: 'Available', variant: 'default', icon: CheckCircle2 },
  maintenance: { label: 'Maintenance', variant: 'warning', icon: Wrench },
};

const STATUS_TABS = ['all', 'on-route', 'available', 'maintenance'];

export default function Fleet() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = useMemo(() =>
    fleet.filter((v) => {
      const matchSearch =
        v.registration.toLowerCase().includes(search.toLowerCase()) ||
        v.driver.toLowerCase().includes(search.toLowerCase()) ||
        (v.route && v.route.toLowerCase().includes(search.toLowerCase()));
      const matchStatus = statusFilter === 'all' || v.status === statusFilter;
      return matchSearch && matchStatus;
    }),
    [search, statusFilter]
  );

  const counts = {
    'on-route': fleet.filter((v) => v.status === 'on-route').length,
    available: fleet.filter((v) => v.status === 'available').length,
    maintenance: fleet.filter((v) => v.status === 'maintenance').length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { key: 'on-route', label: 'On Route', icon: Truck, color: 'success' },
          { key: 'available', label: 'Available', icon: CheckCircle2, color: 'primary' },
          { key: 'maintenance', label: 'Maintenance', icon: Wrench, color: 'warning' },
        ].map(({ key, label, icon: Icon, color }) => (
          <Card key={key}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg bg-${color}/10 flex items-center justify-center`}>
                <Icon className={`w-4 h-4 text-${color}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-xl font-bold">{counts[key]}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search + Status filter tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            className="pl-8 h-8 w-56 text-xs"
            placeholder="Search vehicle, driver, route..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={cn(
                'px-3 py-1 rounded-md text-xs font-medium transition-colors capitalize',
                statusFilter === tab
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {tab === 'all' ? `All (${fleet.length})` : `${tab.replace('-', ' ')} (${counts[tab]})`}
            </button>
          ))}
        </div>
      </div>

      {/* Fleet grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((vehicle) => {
          const { label, variant, icon: StatusIcon } = statusConfig[vehicle.status];
          const fuelColor = vehicle.fuelLevel > 60 ? 'bg-success' : vehicle.fuelLevel > 30 ? 'bg-warning' : 'bg-destructive';
          const serviceAlert =
            vehicle.status !== 'maintenance' &&
            new Date(vehicle.nextService) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

          return (
            <Card
              key={vehicle.id}
              className={cn('cursor-pointer transition-all hover:shadow-md', selected === vehicle.id && 'ring-2 ring-primary')}
              onClick={() => setSelected(selected === vehicle.id ? null : vehicle.id)}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-semibold text-sm">{vehicle.registration}</p>
                    <p className="text-xs text-muted-foreground">{vehicle.type}</p>
                  </div>
                  <Badge variant={variant}>{label}</Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs font-medium">{vehicle.driver.charAt(0)}</span>
                    </div>
                    {vehicle.driver}
                  </div>

                  {vehicle.route && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5" />
                      {vehicle.route}
                    </div>
                  )}

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Fuel Level</span>
                      <span className="font-medium">{vehicle.fuelLevel}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full">
                      <div className={cn('h-full rounded-full transition-all', fuelColor)} style={{ width: `${vehicle.fuelLevel}%` }} />
                    </div>
                  </div>

                  {selected === vehicle.id && (
                    <div className="pt-3 border-t border-border space-y-2 animate-fade-in">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <p className="text-muted-foreground">Mileage</p>
                          <p className="font-medium">{vehicle.mileage.toLocaleString()} km</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Monthly Revenue</p>
                          <p className="font-medium">{vehicle.monthlyRevenue > 0 ? formatCurrency(vehicle.monthlyRevenue) : '—'}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Last Service</p>
                          <p className="font-medium">{formatDate(vehicle.lastService)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Next Service</p>
                          <p className={cn('font-medium', serviceAlert && 'text-warning')}>
                            {formatDate(vehicle.nextService)}
                            {serviceAlert && ' ⚠'}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-1">
                        <Button size="sm" variant="outline" className="flex-1 h-7 text-xs">Log Expense</Button>
                        <Button size="sm" className="flex-1 h-7 text-xs">Assign Trip</Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filtered.length === 0 && (
          <div className="col-span-full text-center py-16 text-muted-foreground text-sm">
            No vehicles match your search
          </div>
        )}

        {/* Add vehicle card — only show when not filtering */}
        {statusFilter === 'all' && !search && (
          <Card className="border-dashed cursor-pointer hover:border-primary/50 hover:bg-accent/30 transition-colors">
            <CardContent className="p-5 flex flex-col items-center justify-center h-full min-h-[180px] gap-2 text-muted-foreground">
              <div className="w-10 h-10 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                <Plus className="w-5 h-5" />
              </div>
              <p className="text-sm">Add Vehicle</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
