import {
  TrendingUp,
  TrendingDown,
  IndianRupee,
  Truck,
  FileText,
  Fuel,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ReceiptText,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn, formatCurrency, formatNumber } from '@/lib/utils';
import {
  dashboardStats,
  revenueData,
  expenseBreakdown,
  aiInsights,
  recentActivity,
  invoices,
} from '@/data/mockData';

function StatCard({ title, value, change, icon: Icon, prefix = '', isCurrency = true }) {
  const isPositive = change >= 0;
  return (
    <Card className="animate-fade-in">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">
              {isCurrency ? formatCurrency(value) : `${prefix}${value}`}
            </p>
            <div className={cn('flex items-center gap-1 mt-2 text-xs font-medium', isPositive ? 'text-success' : 'text-destructive')}>
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span>{Math.abs(change)}% vs last month</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const insightIcons = {
  'cost-saving': { icon: TrendingDown, color: 'text-success', bg: 'bg-success/10' },
  'invoice': { icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/10' },
  'maintenance': { icon: AlertTriangle, color: 'text-destructive', bg: 'bg-destructive/10' },
  'revenue': { icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/10' },
};

const activityIcons = {
  invoice: { icon: FileText, color: 'text-primary' },
  shipment: { icon: Truck, color: 'text-success' },
  expense: { icon: IndianRupee, color: 'text-warning' },
  alert: { icon: AlertTriangle, color: 'text-destructive' },
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-lg text-xs">
      <p className="font-medium mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: {formatCurrency(p.value)}
        </p>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const pendingInvoices = invoices.filter((i) => i.status === 'pending' || i.status === 'overdue');

  return (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Revenue" value={dashboardStats.totalRevenue} change={dashboardStats.revenueChange} icon={IndianRupee} />
        <StatCard title="Total Expenses" value={dashboardStats.totalExpenses} change={-dashboardStats.expensesChange} icon={ReceiptText} />
        <StatCard title="Net Profit" value={dashboardStats.netProfit} change={dashboardStats.profitChange} icon={TrendingUp} />
        <StatCard title="Fuel Costs" value={dashboardStats.fuelCost} change={dashboardStats.fuelChange} icon={Fuel} />
      </div>

      {/* Secondary stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Truck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Shipments</p>
              <p className="text-2xl font-bold">{dashboardStats.activeShipments}</p>
              <p className="text-xs text-success flex items-center gap-1 mt-0.5">
                <TrendingUp className="w-3 h-3" /> +{dashboardStats.shipmentsChange}%
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending Invoices</p>
              <p className="text-2xl font-bold">{dashboardStats.pendingCount}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{formatCurrency(dashboardStats.pendingInvoices)} outstanding</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Fleet Utilization</p>
              <p className="text-2xl font-bold">{dashboardStats.fleetUtilization}%</p>
              <div className="w-24 h-1.5 bg-muted rounded-full mt-1.5">
                <div className="h-full bg-success rounded-full" style={{ width: `${dashboardStats.fleetUtilization}%` }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Revenue vs Expenses</CardTitle>
            <CardDescription>Last 6 months overview</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(221,83%,53%)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(221,83%,53%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(0,84%,60%)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="hsl(0,84%,60%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${formatNumber(v)}`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="hsl(221,83%,53%)" fill="url(#revGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="expenses" name="Expenses" stroke="hsl(0,84%,60%)" fill="url(#expGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Expense Breakdown</CardTitle>
            <CardDescription>Current month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={expenseBreakdown} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                  {expenseBreakdown.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => formatCurrency(v)} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-1 mt-2">
              {expenseBreakdown.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5 text-xs">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
                  <span className="text-muted-foreground truncate">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights + Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                AI Insights
              </CardTitle>
              <CardDescription>Smart recommendations for your business</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {aiInsights.map((insight) => {
              const { icon: Icon, color, bg } = insightIcons[insight.type];
              return (
                <div key={insight.id} className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                  <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0', bg)}>
                    <Icon className={cn('w-4 h-4', color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium">{insight.title}</p>
                      <Badge variant={insight.type === 'invoice' ? 'warning' : insight.type === 'maintenance' ? 'destructive' : 'success'} className="flex-shrink-0 text-xs">
                        {insight.impact}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{insight.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-muted-foreground">{insight.confidence}% confidence</span>
                      <Button variant="ghost" size="sm" className="h-6 text-xs px-2 text-primary">
                        {insight.action} <ArrowRight className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((item) => {
              const { icon: Icon, color } = activityIcons[item.type];
              return (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className={cn('w-3.5 h-3.5', color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs leading-snug">{item.text}</p>
                    {item.amount && <p className="text-xs font-medium text-primary mt-0.5">{formatCurrency(item.amount)}</p>}
                    <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


