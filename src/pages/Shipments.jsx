import { useState, useMemo } from 'react';
import { Package, Truck, MapPin, CheckCircle2, AlertCircle, Search } from 'lucide-react';
import Pagination from '@/components/ui/Pagination';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { cn, formatCurrency } from '@/lib/utils';
import { shipments, shipmentRoutes } from '@/data/mockData';

const statusConfig = {
  'in-transit': { label: 'In Transit', variant: 'default', icon: Truck },
  loading: { label: 'Loading', variant: 'warning', icon: Package },
  delivered: { label: 'Delivered', variant: 'success', icon: CheckCircle2 },
  delayed: { label: 'Delayed', variant: 'destructive', icon: AlertCircle },
};

const STATUS_TABS = ['all', 'in-transit', 'loading', 'delivered', 'delayed'];
const PAGE_SIZE = 10;

export default function Shipments() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const counts = STATUS_TABS.reduce((acc, s) => {
    acc[s] = s === 'all' ? shipments.length : shipments.filter((sh) => sh.status === s).length;
    return acc;
  }, {});

  const filtered = useMemo(() => {
    return shipments.filter((s) => {
      const matchStatus = statusFilter === 'all' || s.status === statusFilter;
      const matchSearch =
        s.id.toLowerCase().includes(search.toLowerCase()) ||
        s.client.toLowerCase().includes(search.toLowerCase()) ||
        s.origin.toLowerCase().includes(search.toLowerCase()) ||
        s.destination.toLowerCase().includes(search.toLowerCase()) ||
        s.driver.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [statusFilter, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleStatusChange = (tab) => { setStatusFilter(tab); setPage(1); };
  const handleSearchChange = (e) => { setSearch(e.target.value); setPage(1); };

  return (
    <div className="p-6 space-y-6">
      {/* Summary counts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { key: 'in-transit', label: 'In Transit', icon: Truck, color: 'primary' },
          { key: 'loading', label: 'Loading', icon: Package, color: 'warning' },
          { key: 'delivered', label: 'Delivered', icon: CheckCircle2, color: 'success' },
          { key: 'delayed', label: 'Delayed', icon: AlertCircle, color: 'destructive' },
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

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            className="pl-8 h-8 w-56 text-xs"
            placeholder="Search shipment, client, route..."
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1 flex-wrap">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => handleStatusChange(tab)}
              className={cn(
                'px-3 py-1 rounded-md text-xs font-medium transition-colors capitalize',
                statusFilter === tab
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {tab === 'all' ? `All (${counts.all})` : `${tab.replace('-', ' ')} (${counts[tab]})`}
            </button>
          ))}
        </div>
      </div>

      {/* Shipment list */}
      <div className="space-y-3">
        {paginated.map((shipment) => {
          const { label, variant, icon: StatusIcon } = statusConfig[shipment.status];
          return (
            <Card key={shipment.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      <StatusIcon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-sm">{shipment.id}</p>
                        <Badge variant={variant}>{label}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{shipment.client} · {shipment.weight}</p>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                        <MapPin className="w-3 h-3" />
                        {shipment.origin} → {shipment.destination}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-xs flex-wrap">
                    <div>
                      <p className="text-muted-foreground">Driver</p>
                      <p className="font-medium">{shipment.driver}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Vehicle</p>
                      <p className="font-medium">{shipment.vehicle}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">ETA</p>
                      <p className={cn('font-medium', shipment.status === 'delayed' && 'text-destructive')}>{shipment.eta}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Revenue</p>
                      <p className="font-medium text-primary">{formatCurrency(shipment.revenue)}</p>
                    </div>
                  </div>
                </div>

                {shipment.status !== 'delivered' && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{shipment.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full">
                      <div
                        className={cn('h-full rounded-full transition-all', shipment.status === 'delayed' ? 'bg-destructive' : 'bg-primary')}
                        style={{ width: `${shipment.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}

        {paginated.length === 0 && (
          <div className="text-center py-16 text-muted-foreground text-sm">No shipments found</div>
        )}
      </div>

      <Pagination page={page} totalPages={totalPages} total={filtered.length} pageSize={PAGE_SIZE} onPageChange={setPage} />

      {/* Top routes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Top Revenue Routes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {shipmentRoutes.map((route, i) => (
            <div key={route.route} className="flex items-center gap-4">
              <span className="text-xs font-bold text-muted-foreground w-4">{i + 1}</span>
              <div className="flex-1">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium">{route.route}</span>
                  <span className="text-muted-foreground">{route.trips} trips · {formatCurrency(route.revenue)}</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(route.revenue / shipmentRoutes[0].revenue) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
