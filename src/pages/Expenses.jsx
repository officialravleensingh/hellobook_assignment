import { useState, useMemo } from 'react';
import { Plus, Search, Fuel, Wrench, Users, FileCheck, Warehouse, ChevronUp, ChevronDown } from 'lucide-react';
import Pagination from '@/components/ui/Pagination';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { cn, formatCurrency, formatDate } from '@/lib/utils';
import { expenses, expenseBreakdown } from '@/data/mockData';

const categoryIcons = {
  Fuel,
  Maintenance: Wrench,
  'Driver Wages': Users,
  'Tolls & Permits': FileCheck,
  Insurance: FileCheck,
  Warehouse,
};

const statusConfig = {
  approved: { label: 'Approved', variant: 'success' },
  pending: { label: 'Pending', variant: 'warning' },
  rejected: { label: 'Rejected', variant: 'destructive' },
};

const PAGE_SIZE = 10;

function SortIcon({ field, sortField, sortDir }) {
  if (sortField !== field) return <ChevronUp className="w-3 h-3 opacity-20" />;
  return sortDir === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />;
}

export default function Expenses() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('date');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const categories = ['all', ...new Set(expenses.map((e) => e.category))];

  const handleSort = (field) => {
    if (sortField === field) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortField(field); setSortDir('asc'); }
    setPage(1);
  };

  const filtered = useMemo(() => {
    let data = expenses.filter((exp) => {
      const matchSearch =
        exp.description.toLowerCase().includes(search.toLowerCase()) ||
        exp.vendor.toLowerCase().includes(search.toLowerCase()) ||
        exp.id.toLowerCase().includes(search.toLowerCase());
      const matchCat = categoryFilter === 'all' || exp.category === categoryFilter;
      const matchStatus = statusFilter === 'all' || exp.status === statusFilter;
      return matchSearch && matchCat && matchStatus;
    });

    data = [...data].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (sortField === 'amount') return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
      if (sortField === 'date') return sortDir === 'asc' ? new Date(aVal) - new Date(bVal) : new Date(bVal) - new Date(aVal);
      return sortDir === 'asc' ? String(aVal).localeCompare(String(bVal)) : String(bVal).localeCompare(String(aVal));
    });

    return data;
  }, [search, categoryFilter, statusFilter, sortField, sortDir]);

  const totalExpenses = filtered.reduce((s, e) => s + e.amount, 0);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearchChange = (e) => { setSearch(e.target.value); setPage(1); };

  const thClass = 'text-left px-4 py-3 text-xs font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors';

  return (
    <div className="p-6 space-y-6">
      {/* Category breakdown cards — clickable filters */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
        {expenseBreakdown.map((item) => {
          const Icon = categoryIcons[item.name] || Fuel;
          const active = categoryFilter === item.name;
          return (
            <Card
              key={item.name}
              className={cn('cursor-pointer transition-colors', active ? 'ring-2 ring-primary border-primary/50' : 'hover:border-primary/40')}
              onClick={() => { setCategoryFilter(active ? 'all' : item.name); setPage(1); }}
            >
              <CardContent className="p-4">
                <div className="w-8 h-8 rounded-lg mb-2 flex items-center justify-center" style={{ background: `${item.color}20` }}>
                  <Icon className="w-4 h-4" style={{ color: item.color }} />
                </div>
                <p className="text-xs text-muted-foreground">{item.name}</p>
                <p className="text-sm font-bold mt-0.5">{formatCurrency(item.value)}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-base">
              Expense Records
              <span className="ml-2 text-xs font-normal text-muted-foreground">({filtered.length})</span>
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">Filtered total: {formatCurrency(totalExpenses)}</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input className="pl-8 h-8 w-44 text-xs" placeholder="Search..." value={search} onChange={handleSearchChange} />
            </div>
            <select
              className="h-8 rounded-md border border-input bg-background px-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={categoryFilter}
              onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>
              ))}
            </select>
            <select
              className="h-8 rounded-md border border-input bg-background px-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
            <Button size="sm" className="h-8 text-xs gap-1.5" onClick={() => setShowModal(true)}>
              <Plus className="w-3.5 h-3.5" /> Add Expense
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className={cn(thClass, 'pl-6')} onClick={() => handleSort('id')}>
                    <span className="flex items-center gap-1">ID <SortIcon field="id" sortField={sortField} sortDir={sortDir} /></span>
                  </th>
                  <th className={thClass} onClick={() => handleSort('description')}>
                    <span className="flex items-center gap-1">Description <SortIcon field="description" sortField={sortField} sortDir={sortDir} /></span>
                  </th>
                  <th className={thClass} onClick={() => handleSort('category')}>
                    <span className="flex items-center gap-1">Category <SortIcon field="category" sortField={sortField} sortDir={sortDir} /></span>
                  </th>
                  <th className={cn(thClass, 'hidden md:table-cell')}>Vehicle</th>
                  <th className={cn(thClass, 'hidden lg:table-cell')}>Vendor</th>
                  <th className={cn(thClass, 'text-right')} onClick={() => handleSort('amount')}>
                    <span className="flex items-center justify-end gap-1">Amount <SortIcon field="amount" sortField={sortField} sortDir={sortDir} /></span>
                  </th>
                  <th className={cn(thClass, 'hidden sm:table-cell')} onClick={() => handleSort('date')}>
                    <span className="flex items-center gap-1">Date <SortIcon field="date" sortField={sortField} sortDir={sortDir} /></span>
                  </th>
                  <th className={thClass} onClick={() => handleSort('status')}>
                    <span className="flex items-center gap-1">Status <SortIcon field="status" sortField={sortField} sortDir={sortDir} /></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((exp) => {
                  const Icon = categoryIcons[exp.category] || Fuel;
                  return (
                    <tr key={exp.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4 text-xs font-medium">{exp.id}</td>
                      <td className="px-4 py-4">
                        <p className="text-xs font-medium">{exp.description}</p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Icon className="w-3.5 h-3.5" />
                          {exp.category}
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell text-xs text-muted-foreground">{exp.vehicle}</td>
                      <td className="px-4 py-4 hidden lg:table-cell text-xs text-muted-foreground">{exp.vendor}</td>
                      <td className="px-4 py-4 text-right font-semibold text-sm">{formatCurrency(exp.amount)}</td>
                      <td className="px-4 py-4 hidden sm:table-cell text-xs text-muted-foreground">{formatDate(exp.date)}</td>
                      <td className="px-4 py-4">
                        <Badge variant={statusConfig[exp.status].variant}>{statusConfig[exp.status].label}</Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {paginated.length === 0 && (
              <div className="text-center py-12 text-muted-foreground text-sm">No expenses found</div>
            )}
          </div>

          <Pagination page={page} totalPages={totalPages} total={filtered.length} pageSize={PAGE_SIZE} onPageChange={setPage} />
        </CardContent>
      </Card>

      {showModal && <AddExpenseModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

function AddExpenseModal({ onClose }) {
  const [form, setForm] = useState({ category: 'Fuel', description: '', amount: '', vehicle: '', vendor: '', date: '' });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-card rounded-xl shadow-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-semibold">Add Expense</h2>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>✕</Button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Category</label>
            <select name="category" value={form.category} onChange={handleChange} className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {['Fuel', 'Maintenance', 'Driver Wages', 'Tolls & Permits', 'Insurance', 'Warehouse'].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Description</label>
            <Input name="description" value={form.description} onChange={handleChange} placeholder="Brief description" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Amount (₹)</label>
              <Input name="amount" type="number" value={form.amount} onChange={handleChange} placeholder="0" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Date</label>
              <Input name="date" type="date" value={form.date} onChange={handleChange} />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Vehicle</label>
            <Input name="vehicle" value={form.vehicle} onChange={handleChange} placeholder="Registration number" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Vendor</label>
            <Input name="vendor" value={form.vendor} onChange={handleChange} placeholder="Vendor name" />
          </div>
        </div>
        <div className="flex justify-end gap-3 p-6 pt-0">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>Save Expense</Button>
        </div>
      </div>
    </div>
  );
}
