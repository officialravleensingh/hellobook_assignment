import { useState, useMemo } from 'react';
import { Plus, Search, Eye, Send, Truck, ChevronUp, ChevronDown } from 'lucide-react';
import Pagination from '@/components/ui/Pagination';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { cn, formatCurrency, formatDate } from '@/lib/utils';
import { invoices } from '@/data/mockData';

const statusConfig = {
  paid: { label: 'Paid', variant: 'success' },
  pending: { label: 'Pending', variant: 'warning' },
  overdue: { label: 'Overdue', variant: 'destructive' },
  draft: { label: 'Draft', variant: 'secondary' },
};

const summaryStats = [
  { label: 'Total Invoiced', value: invoices.reduce((s, i) => s + i.amount, 0) },
  { label: 'Paid', value: invoices.filter((i) => i.status === 'paid').reduce((s, i) => s + i.amount, 0) },
  { label: 'Pending', value: invoices.filter((i) => i.status === 'pending').reduce((s, i) => s + i.amount, 0) },
  { label: 'Overdue', value: invoices.filter((i) => i.status === 'overdue').reduce((s, i) => s + i.amount, 0) },
];

const PAGE_SIZE = 10;

function SortIcon({ field, sortField, sortDir }) {
  if (sortField !== field) return <ChevronUp className="w-3 h-3 opacity-20" />;
  return sortDir === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />;
}

export default function Invoices() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('date');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const handleSort = (field) => {
    if (sortField === field) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortField(field); setSortDir('asc'); }
    setPage(1);
  };

  const filtered = useMemo(() => {
    let data = invoices.filter((inv) => {
      const matchSearch =
        inv.id.toLowerCase().includes(search.toLowerCase()) ||
        inv.client.toLowerCase().includes(search.toLowerCase()) ||
        inv.route.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || inv.status === statusFilter;
      return matchSearch && matchStatus;
    });

    data = [...data].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (sortField === 'amount') return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
      if (sortField === 'date' || sortField === 'dueDate') {
        return sortDir === 'asc'
          ? new Date(aVal) - new Date(bVal)
          : new Date(bVal) - new Date(aVal);
      }
      return sortDir === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

    return data;
  }, [search, statusFilter, sortField, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearchChange = (e) => { setSearch(e.target.value); setPage(1); };
  const handleStatusChange = (e) => { setStatusFilter(e.target.value); setPage(1); };

  const thClass = 'text-left px-4 py-3 text-xs font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors';

  return (
    <div className="p-6 space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {summaryStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-xl font-bold mt-1">{formatCurrency(stat.value)}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="text-base">
            All Invoices
            <span className="ml-2 text-xs font-normal text-muted-foreground">({filtered.length})</span>
          </CardTitle>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input className="pl-8 h-8 w-48 text-xs" placeholder="Search invoices..." value={search} onChange={handleSearchChange} />
            </div>
            <select
              className="h-8 rounded-md border border-input bg-background px-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={statusFilter}
              onChange={handleStatusChange}
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
              <option value="draft">Draft</option>
            </select>
            <Button size="sm" className="h-8 text-xs gap-1.5" onClick={() => setShowModal(true)}>
              <Plus className="w-3.5 h-3.5" /> New Invoice
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className={cn(thClass, 'pl-6')} onClick={() => handleSort('id')}>
                    <span className="flex items-center gap-1">Invoice <SortIcon field="id" sortField={sortField} sortDir={sortDir} /></span>
                  </th>
                  <th className={thClass} onClick={() => handleSort('client')}>
                    <span className="flex items-center gap-1">Client <SortIcon field="client" sortField={sortField} sortDir={sortDir} /></span>
                  </th>
                  <th className={cn(thClass, 'hidden md:table-cell')}>Route</th>
                  <th className={cn(thClass, 'hidden lg:table-cell')}>Shipment</th>
                  <th className={cn(thClass, 'text-right')} onClick={() => handleSort('amount')}>
                    <span className="flex items-center justify-end gap-1">Amount <SortIcon field="amount" sortField={sortField} sortDir={sortDir} /></span>
                  </th>
                  <th className={cn(thClass, 'hidden sm:table-cell')} onClick={() => handleSort('dueDate')}>
                    <span className="flex items-center gap-1">Due Date <SortIcon field="dueDate" sortField={sortField} sortDir={sortDir} /></span>
                  </th>
                  <th className={cn(thClass)} onClick={() => handleSort('status')}>
                    <span className="flex items-center gap-1">Status <SortIcon field="status" sortField={sortField} sortDir={sortDir} /></span>
                  </th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {paginated.map((inv) => (
                  <tr key={inv.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-xs">{inv.id}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(inv.date)}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-xs font-medium">{inv.client}</p>
                      <p className="text-xs text-muted-foreground">{inv.weight}</p>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Truck className="w-3 h-3" />
                        {inv.route}
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className="text-xs text-muted-foreground">{inv.shipmentId}</span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className="text-sm font-semibold">{formatCurrency(inv.amount)}</span>
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell">
                      <span className={cn('text-xs', inv.status === 'overdue' ? 'text-destructive font-medium' : 'text-muted-foreground')}>
                        {formatDate(inv.dueDate)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant={statusConfig[inv.status].variant}>{statusConfig[inv.status].label}</Badge>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Eye className="w-3.5 h-3.5" />
                        </Button>
                        {inv.status === 'pending' && (
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Send className="w-3.5 h-3.5" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {paginated.length === 0 && (
              <div className="text-center py-12 text-muted-foreground text-sm">No invoices found</div>
            )}
          </div>

          <Pagination page={page} totalPages={totalPages} total={filtered.length} pageSize={PAGE_SIZE} onPageChange={setPage} />
        </CardContent>
      </Card>

      {showModal && <NewInvoiceModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

function NewInvoiceModal({ onClose }) {
  const [form, setForm] = useState({ client: '', route: '', weight: '', amount: '', dueDate: '', shipmentId: '' });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-card rounded-xl shadow-xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-semibold">New Invoice</h2>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>✕</Button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Client Name</label>
              <Input name="client" value={form.client} onChange={handleChange} placeholder="e.g. Reliance Industries" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Route</label>
              <Input name="route" value={form.route} onChange={handleChange} placeholder="Mumbai → Delhi" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Shipment ID</label>
              <Input name="shipmentId" value={form.shipmentId} onChange={handleChange} placeholder="SHP-XXXX" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Amount (₹)</label>
              <Input name="amount" type="number" value={form.amount} onChange={handleChange} placeholder="0" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Weight</label>
              <Input name="weight" value={form.weight} onChange={handleChange} placeholder="e.g. 12.4 MT" />
            </div>
            <div className="col-span-2">
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Due Date</label>
              <Input name="dueDate" type="date" value={form.dueDate} onChange={handleChange} />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 p-6 pt-0">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>Create Invoice</Button>
        </div>
      </div>
    </div>
  );
}
