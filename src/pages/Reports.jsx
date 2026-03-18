import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Download } from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { revenueData, shipmentRoutes, expenseBreakdown } from '@/data/mockData';

const profitData = revenueData.map((d) => ({
  ...d,
  profit: d.revenue - d.expenses,
  margin: Math.round(((d.revenue - d.expenses) / d.revenue) * 100),
}));

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-lg text-xs">
      <p className="font-medium mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: {p.name === 'Margin' ? `${p.value}%` : formatCurrency(p.value)}
        </p>
      ))}
    </div>
  );
};

export default function Reports() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Financial overview for the last 6 months</p>
        <Button variant="outline" size="sm" className="gap-1.5 text-xs">
          <Download className="w-3.5 h-3.5" /> Export PDF
        </Button>
      </div>

      {/* KPI summary */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: revenueData.reduce((s, d) => s + d.revenue, 0) },
          { label: 'Total Expenses', value: revenueData.reduce((s, d) => s + d.expenses, 0) },
          { label: 'Net Profit', value: revenueData.reduce((s, d) => s + d.revenue - d.expenses, 0) },
          { label: 'Avg Margin', value: null, custom: `${Math.round(profitData.reduce((s, d) => s + d.margin, 0) / profitData.length)}%` },
        ].map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
              <p className="text-xl font-bold mt-1">{kpi.custom ?? formatCurrency(kpi.value)}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Revenue vs Expenses bar */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Monthly Revenue vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={revenueData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${formatNumber(v)}`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="revenue" name="Revenue" fill="hsl(221,83%,53%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" name="Expenses" fill="hsl(0,84%,60%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Profit margin line */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Profit & Margin Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={profitData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${formatNumber(v)}`} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line yAxisId="left" type="monotone" dataKey="profit" name="Profit" stroke="hsl(142,71%,45%)" strokeWidth={2} dot={{ r: 4 }} />
                <Line yAxisId="right" type="monotone" dataKey="margin" name="Margin" stroke="hsl(38,92%,50%)" strokeWidth={2} dot={{ r: 4 }} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Route performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Route Performance</CardTitle>
          <CardDescription>Revenue and trip count by route</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={shipmentRoutes} layout="vertical" margin={{ top: 0, right: 60, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${formatNumber(v)}`} />
              <YAxis type="category" dataKey="route" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} width={160} />
              <Tooltip formatter={(v) => formatCurrency(v)} />
              <Bar dataKey="revenue" name="Revenue" fill="hsl(221,83%,53%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Expense breakdown table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Expense Category Analysis</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground">Category</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Amount</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">% of Total</th>
                <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Share</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                const total = expenseBreakdown.reduce((s, e) => s + e.value, 0);
                return expenseBreakdown.map((item) => {
                const pct = Math.round((item.value / total) * 100);
                return (
                  <tr key={item.name} className="border-b border-border last:border-0">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                        <span className="text-xs font-medium">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-xs font-semibold">{formatCurrency(item.value)}</td>
                    <td className="px-4 py-3 text-right text-xs text-muted-foreground">{pct}%</td>
                    <td className="px-6 py-3">
                      <div className="h-1.5 bg-muted rounded-full w-32">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: item.color }} />
                      </div>
                    </td>
                  </tr>
                );
                });
              })()}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
