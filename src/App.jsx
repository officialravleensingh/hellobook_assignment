import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import Dashboard from '@/pages/Dashboard';
import Invoices from '@/pages/Invoices';
import Expenses from '@/pages/Expenses';
import Fleet from '@/pages/Fleet';
import Shipments from '@/pages/Shipments';
import Reports from '@/pages/Reports';
import Settings from '@/pages/Settings';

const pageTitles = {
  '/': 'Dashboard',
  '/invoices': 'Invoices',
  '/expenses': 'Expenses',
  '/fleet': 'Fleet Management',
  '/shipments': 'Shipments',
  '/reports': 'Reports & Analytics',
  '/settings': 'Settings',
};

function AppLayout({ isDark, onToggleTheme }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const pageTitle = pageTitles[location.pathname] || 'Dashboard';

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <div
        className="flex-1 flex flex-col overflow-hidden transition-all duration-300"
        style={{ marginLeft: collapsed ? '4rem' : '15rem' }}
      >
        <Topbar isDark={isDark} onToggleTheme={onToggleTheme} pageTitle={pageTitle} />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/fleet" element={<Fleet />} />
            <Route path="/shipments" element={<Shipments />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <BrowserRouter>
      <AppLayout isDark={isDark} onToggleTheme={() => setIsDark((d) => !d)} />
    </BrowserRouter>
  );
}
