// ─── Revenue vs Expenses (last 6 months) ───────────────────────────────────
export const revenueData = [
  { month: 'Oct', revenue: 3800000, expenses: 2400000 },
  { month: 'Nov', revenue: 4100000, expenses: 2600000 },
  { month: 'Dec', revenue: 4600000, expenses: 2900000 },
  { month: 'Jan', revenue: 4200000, expenses: 2700000 },
  { month: 'Feb', revenue: 4500000, expenses: 2850000 },
  { month: 'Mar', revenue: 4820000, expenses: 2950000 },
];

// ─── Expense Breakdown (auto-computed from expenses array below) ────────────
const CATEGORY_COLORS = {
  Fuel: '#f59e0b',
  Maintenance: '#3b82f6',
  'Driver Wages': '#8b5cf6',
  'Tolls & Permits': '#10b981',
  Insurance: '#ef4444',
  Warehouse: '#6366f1',
};

// ─── AI Insights ────────────────────────────────────────────────────────────
export const aiInsights = [
  {
    id: 1,
    type: 'cost-saving',
    title: 'Fuel optimisation opportunity on Mumbai–Delhi route',
    description: 'Switching to CNG for 4 vehicles on this route could save ₹1.2L/month based on current fuel prices and trip frequency.',
    impact: 'Save ₹1.2L/mo',
    confidence: 87,
    action: 'View Analysis',
  },
  {
    id: 2,
    type: 'invoice',
    title: '3 invoices approaching overdue',
    description: 'INV-1042, INV-1038, INV-1031 are due within 5 days. Auto-reminders have been queued for clients.',
    impact: '₹4.8L at risk',
    confidence: 100,
    action: 'Review Invoices',
  },
  {
    id: 3,
    type: 'maintenance',
    title: 'MH-04-AB-1234 service overdue by 800 km',
    description: 'This vehicle has exceeded its scheduled service interval. Delaying further increases breakdown risk by 3×.',
    impact: 'High Risk',
    confidence: 95,
    action: 'Schedule Now',
  },
  {
    id: 4,
    type: 'revenue',
    title: 'Bangalore–Hyderabad route underutilised',
    description: 'Average load factor is 61% vs 84% fleet average. Adding 2 more clients on this corridor could yield ₹80K/month.',
    impact: '+₹80K/mo',
    confidence: 74,
    action: 'Explore Route',
  },
];

// ─── Recent Activity ────────────────────────────────────────────────────────
export const recentActivity = [
  { id: 1, type: 'invoice', text: 'Invoice INV-1045 created for Reliance Industries', amount: 185000, time: '10 min ago' },
  { id: 2, type: 'shipment', text: 'SHP-4424 departed Mumbai — en route to Chennai', amount: null, time: '32 min ago' },
  { id: 3, type: 'expense', text: 'Fuel expense logged for GJ-05-IJ-7890', amount: 12400, time: '1 hr ago' },
  { id: 4, type: 'alert', text: 'Low fuel alert: TN-22-GH-3456 at 18%', amount: null, time: '2 hr ago' },
  { id: 5, type: 'invoice', text: 'INV-1041 marked as paid by Tata Steel', amount: 220000, time: '3 hr ago' },
];

// ─── Invoices (25 rows) ──────────────────────────────────────────────────────
export const invoices = [
  { id: 'INV-1045', client: 'Reliance Industries',    route: 'Mumbai → Delhi',          shipmentId: 'SHP-4421', amount: 185000, weight: '12.4 MT', date: '2024-03-15', dueDate: '2024-04-14', status: 'pending' },
  { id: 'INV-1044', client: 'Tata Steel',             route: 'Jamshedpur → Mumbai',     shipmentId: 'SHP-4422', amount: 220000, weight: '18.2 MT', date: '2024-03-14', dueDate: '2024-04-13', status: 'pending' },
  { id: 'INV-1043', client: 'Amazon India',           route: 'Mumbai → Chennai',        shipmentId: 'SHP-4424', amount: 275000, weight: '20.5 MT', date: '2024-03-13', dueDate: '2024-03-28', status: 'overdue' },
  { id: 'INV-1042', client: 'DHL India',              route: 'Chennai → Delhi',         shipmentId: 'SHP-4420', amount: 198000, weight: '15.7 MT', date: '2024-03-12', dueDate: '2024-03-27', status: 'overdue' },
  { id: 'INV-1041', client: 'Tata Steel',             route: 'Jamshedpur → Pune',       shipmentId: 'SHP-4418', amount: 160000, weight: '14.0 MT', date: '2024-03-10', dueDate: '2024-04-09', status: 'paid' },
  { id: 'INV-1040', client: 'Infosys Logistics',      route: 'Bangalore → Pune',        shipmentId: 'SHP-4423', amount: 95000,  weight: '6.8 MT',  date: '2024-03-09', dueDate: '2024-04-08', status: 'paid' },
  { id: 'INV-1039', client: 'Flipkart Supply Chain',  route: 'Delhi → Kolkata',         shipmentId: 'SHP-4419', amount: 310000, weight: '22.0 MT', date: '2024-03-08', dueDate: '2024-04-07', status: 'draft' },
  { id: 'INV-1038', client: 'Amazon India',           route: 'Delhi → Bangalore',       shipmentId: 'SHP-4417', amount: 245000, weight: '19.1 MT', date: '2024-03-07', dueDate: '2024-03-22', status: 'overdue' },
  { id: 'INV-1037', client: 'Mahindra Logistics',     route: 'Pune → Hyderabad',        shipmentId: 'SHP-4416', amount: 132000, weight: '10.5 MT', date: '2024-03-06', dueDate: '2024-04-05', status: 'paid' },
  { id: 'INV-1036', client: 'Blue Dart Express',      route: 'Mumbai → Ahmedabad',      shipmentId: 'SHP-4415', amount: 88000,  weight: '7.2 MT',  date: '2024-03-05', dueDate: '2024-04-04', status: 'paid' },
  { id: 'INV-1035', client: 'Reliance Industries',    route: 'Delhi → Jaipur',          shipmentId: 'SHP-4414', amount: 72000,  weight: '5.8 MT',  date: '2024-03-04', dueDate: '2024-04-03', status: 'paid' },
  { id: 'INV-1034', client: 'GATI Ltd',               route: 'Kolkata → Bhubaneswar',   shipmentId: 'SHP-4413', amount: 64000,  weight: '5.1 MT',  date: '2024-03-03', dueDate: '2024-04-02', status: 'draft' },
  // 13 new rows below ↓
  { id: 'INV-1033', client: 'Wipro Infrastructure',   route: 'Hyderabad → Bangalore',   shipmentId: 'SHP-4412', amount: 118000, weight: '9.4 MT',  date: '2024-03-02', dueDate: '2024-04-01', status: 'paid' },
  { id: 'INV-1032', client: 'L&T Logistics',          route: 'Chennai → Coimbatore',    shipmentId: 'SHP-4411', amount: 76000,  weight: '6.1 MT',  date: '2024-03-01', dueDate: '2024-03-31', status: 'pending' },
  { id: 'INV-1031', client: 'Hindustan Unilever',     route: 'Mumbai → Nagpur',         shipmentId: 'SHP-4410', amount: 145000, weight: '11.8 MT', date: '2024-02-29', dueDate: '2024-03-30', status: 'overdue' },
  { id: 'INV-1030', client: 'Maruti Suzuki Parts',    route: 'Gurgaon → Pune',          shipmentId: 'SHP-4409', amount: 210000, weight: '17.3 MT', date: '2024-02-28', dueDate: '2024-03-29', status: 'paid' },
  { id: 'INV-1029', client: 'ITC Limited',            route: 'Kolkata → Delhi',         shipmentId: 'SHP-4408', amount: 285000, weight: '21.0 MT', date: '2024-02-27', dueDate: '2024-03-28', status: 'paid' },
  { id: 'INV-1028', client: 'GATI Ltd',               route: 'Delhi → Chandigarh',      shipmentId: 'SHP-4407', amount: 68000,  weight: '5.4 MT',  date: '2024-02-26', dueDate: '2024-03-27', status: 'draft' },
  { id: 'INV-1027', client: 'Mahindra Logistics',     route: 'Ahmedabad → Mumbai',      shipmentId: 'SHP-4406', amount: 97000,  weight: '7.8 MT',  date: '2024-02-25', dueDate: '2024-03-26', status: 'paid' },
  { id: 'INV-1026', client: 'Flipkart Supply Chain',  route: 'Bangalore → Hyderabad',   shipmentId: 'SHP-4405', amount: 155000, weight: '12.9 MT', date: '2024-02-24', dueDate: '2024-03-25', status: 'pending' },
  { id: 'INV-1025', client: 'Blue Dart Express',      route: 'Surat → Delhi',           shipmentId: 'SHP-4404', amount: 238000, weight: '18.6 MT', date: '2024-02-23', dueDate: '2024-03-24', status: 'overdue' },
  { id: 'INV-1024', client: 'DHL India',              route: 'Pune → Kolkata',          shipmentId: 'SHP-4403', amount: 295000, weight: '23.2 MT', date: '2024-02-22', dueDate: '2024-03-23', status: 'paid' },
  { id: 'INV-1023', client: 'Reliance Industries',    route: 'Jaipur → Ahmedabad',      shipmentId: 'SHP-4402', amount: 83000,  weight: '6.6 MT',  date: '2024-02-21', dueDate: '2024-03-22', status: 'paid' },
  { id: 'INV-1022', client: 'Amazon India',           route: 'Hyderabad → Chennai',     shipmentId: 'SHP-4401', amount: 174000, weight: '13.7 MT', date: '2024-02-20', dueDate: '2024-03-21', status: 'draft' },
  { id: 'INV-1021', client: 'L&T Logistics',          route: 'Delhi → Lucknow',         shipmentId: 'SHP-4400', amount: 112000, weight: '8.9 MT',  date: '2024-02-19', dueDate: '2024-03-20', status: 'pending' },
];

// ─── Expenses (25 rows) ──────────────────────────────────────────────────────
export const expenses = [
  { id: 'EXP-0201', category: 'Fuel',           description: 'Diesel fill-up at HP Petrol Pump, Thane',          vendor: 'HP Petroleum',          vehicle: 'MH-04-AB-1234', amount: 12400, date: '2024-03-15', status: 'approved' },
  { id: 'EXP-0200', category: 'Maintenance',    description: 'Engine oil change & filter replacement',           vendor: 'AutoCare Workshop',     vehicle: 'DL-01-CD-5678', amount: 8500,  date: '2024-03-14', status: 'approved' },
  { id: 'EXP-0199', category: 'Tolls & Permits',description: 'NH-48 toll charges — Mumbai to Pune',              vendor: 'NHAI',                  vehicle: 'GJ-05-IJ-7890', amount: 3200,  date: '2024-03-14', status: 'approved' },
  { id: 'EXP-0198', category: 'Driver Wages',   description: 'March salary advance — Mohan Das',                 vendor: 'Payroll',               vehicle: '—',             amount: 18000, date: '2024-03-13', status: 'approved' },
  { id: 'EXP-0197', category: 'Fuel',           description: 'Diesel fill-up at BPCL, Nagpur',                   vendor: 'BPCL',                  vehicle: 'UP-32-KL-2345', amount: 9800,  date: '2024-03-13', status: 'approved' },
  { id: 'EXP-0196', category: 'Insurance',      description: 'Annual commercial vehicle insurance renewal',       vendor: 'HDFC Ergo',             vehicle: 'TN-22-GH-3456', amount: 42000, date: '2024-03-12', status: 'pending' },
  { id: 'EXP-0195', category: 'Warehouse',      description: 'Monthly storage charges — Bhiwandi warehouse',     vendor: 'Bhiwandi Logistics Park',vehicle: '—',            amount: 35000, date: '2024-03-11', status: 'approved' },
  { id: 'EXP-0194', category: 'Maintenance',    description: 'Tyre replacement — 2 rear tyres',                  vendor: 'MRF Tyres Dealer',      vehicle: 'KA-09-EF-9012', amount: 22000, date: '2024-03-10', status: 'approved' },
  { id: 'EXP-0193', category: 'Fuel',           description: 'Diesel fill-up at IOC, Surat',                     vendor: 'Indian Oil',            vehicle: 'GJ-05-IJ-7890', amount: 11200, date: '2024-03-10', status: 'approved' },
  { id: 'EXP-0192', category: 'Tolls & Permits',description: 'State border permit — Maharashtra to Gujarat',     vendor: 'RTO Gujarat',           vehicle: 'MH-04-AB-1234', amount: 1800,  date: '2024-03-09', status: 'pending' },
  { id: 'EXP-0191', category: 'Driver Wages',   description: 'Overtime allowance — Vijay Patel',                 vendor: 'Payroll',               vehicle: '—',             amount: 4500,  date: '2024-03-08', status: 'approved' },
  { id: 'EXP-0190', category: 'Maintenance',    description: 'Brake pad replacement & wheel alignment',          vendor: 'AutoCare Workshop',     vehicle: 'UP-32-KL-2345', amount: 14500, date: '2024-03-07', status: 'rejected' },
  // 13 new rows below ↓
  { id: 'EXP-0189', category: 'Fuel',           description: 'Diesel fill-up at IOC pump, Gurgaon',              vendor: 'Indian Oil',            vehicle: 'DL-01-CD-5678', amount: 13600, date: '2024-03-06', status: 'approved' },
  { id: 'EXP-0188', category: 'Driver Wages',   description: 'Monthly salary — Anand Raj',                       vendor: 'Payroll',               vehicle: '—',             amount: 22000, date: '2024-03-05', status: 'approved' },
  { id: 'EXP-0187', category: 'Warehouse',      description: 'Handling charges — Chennai port warehouse',         vendor: 'Chennai Port Trust',    vehicle: '—',             amount: 28000, date: '2024-03-05', status: 'approved' },
  { id: 'EXP-0186', category: 'Tolls & Permits',description: 'Highway toll — NH-44 Hyderabad to Nagpur',         vendor: 'NHAI',                  vehicle: 'KA-09-EF-9012', amount: 2600,  date: '2024-03-04', status: 'approved' },
  { id: 'EXP-0185', category: 'Maintenance',    description: 'Full engine service & coolant flush',               vendor: 'Ashok Leyland Service', vehicle: 'RJ-14-MN-6789', amount: 38500, date: '2024-03-04', status: 'pending' },
  { id: 'EXP-0184', category: 'Insurance',      description: 'Commercial vehicle insurance renewal',              vendor: 'New India Assurance',   vehicle: 'HR-26-OP-0123', amount: 31000, date: '2024-03-03', status: 'approved' },
  { id: 'EXP-0183', category: 'Fuel',           description: 'Petrol fill-up at Shell, Pune',                    vendor: 'Shell India',           vehicle: 'KA-09-EF-9012', amount: 8900,  date: '2024-03-03', status: 'approved' },
  { id: 'EXP-0182', category: 'Driver Wages',   description: 'Salary advance — Ravi Sharma',                     vendor: 'Payroll',               vehicle: '—',             amount: 15000, date: '2024-03-02', status: 'approved' },
  { id: 'EXP-0181', category: 'Tolls & Permits',description: 'Rajasthan state entry permit',                     vendor: 'RTO Rajasthan',         vehicle: 'RJ-14-MN-6789', amount: 1200,  date: '2024-03-01', status: 'approved' },
  { id: 'EXP-0180', category: 'Warehouse',      description: 'Cold storage charges — Pune facility',             vendor: 'Pune Cold Chain Ltd',   vehicle: '—',             amount: 42000, date: '2024-02-29', status: 'approved' },
  { id: 'EXP-0179', category: 'Fuel',           description: 'Diesel fill-up at BPCL pump, Kolkata',             vendor: 'BPCL',                  vehicle: 'UP-32-KL-2345', amount: 10500, date: '2024-02-28', status: 'approved' },
  { id: 'EXP-0178', category: 'Maintenance',    description: 'Battery replacement & electrical check',           vendor: 'Exide Auto Centre',     vehicle: 'TN-22-GH-3456', amount: 9800,  date: '2024-02-27', status: 'approved' },
  { id: 'EXP-0177', category: 'Tolls & Permits',description: 'NH-19 toll — Delhi to Kolkata stretch',            vendor: 'NHAI',                  vehicle: 'UP-32-KL-2345', amount: 4200,  date: '2024-02-26', status: 'approved' },
];

// ─── Shipments (25 rows) ─────────────────────────────────────────────────────
export const shipments = [
  { id: 'SHP-4424', client: 'Amazon India',          origin: 'Mumbai',     destination: 'Chennai',     status: 'in-transit', progress: 45,  driver: 'Mohan Das',     vehicle: 'GJ-05-IJ-7890', weight: '20.5 MT', eta: '2024-03-20', revenue: 275000 },
  { id: 'SHP-4423', client: 'Infosys Logistics',     origin: 'Bangalore',  destination: 'Pune',        status: 'in-transit', progress: 72,  driver: 'Vijay Patel',   vehicle: 'KA-09-EF-9012', weight: '6.8 MT',  eta: '2024-03-19', revenue: 95000  },
  { id: 'SHP-4422', client: 'Tata Steel',            origin: 'Jamshedpur', destination: 'Mumbai',      status: 'loading',    progress: 10,  driver: 'Ramesh Kumar',  vehicle: 'MH-04-AB-1234', weight: '18.2 MT', eta: '2024-03-22', revenue: 220000 },
  { id: 'SHP-4421', client: 'Reliance Industries',   origin: 'Mumbai',     destination: 'Delhi',       status: 'delivered',  progress: 100, driver: 'Suresh Singh',  vehicle: 'DL-01-CD-5678', weight: '12.4 MT', eta: '2024-03-15', revenue: 185000 },
  { id: 'SHP-4420', client: 'DHL India',             origin: 'Chennai',    destination: 'Delhi',       status: 'in-transit', progress: 58,  driver: 'Anand Raj',     vehicle: 'TN-22-GH-3456', weight: '15.7 MT', eta: '2024-03-21', revenue: 198000 },
  { id: 'SHP-4419', client: 'Flipkart Supply Chain', origin: 'Delhi',      destination: 'Kolkata',     status: 'delayed',    progress: 30,  driver: 'Ravi Sharma',   vehicle: 'UP-32-KL-2345', weight: '22.0 MT', eta: '2024-03-23', revenue: 310000 },
  // 19 new rows below ↓
  { id: 'SHP-4418', client: 'Tata Steel',            origin: 'Jamshedpur', destination: 'Pune',        status: 'delivered',  progress: 100, driver: 'Deepak Verma',  vehicle: 'RJ-14-MN-6789', weight: '14.0 MT', eta: '2024-03-10', revenue: 160000 },
  { id: 'SHP-4417', client: 'Amazon India',          origin: 'Delhi',      destination: 'Bangalore',   status: 'delivered',  progress: 100, driver: 'Suresh Singh',  vehicle: 'DL-01-CD-5678', weight: '19.1 MT', eta: '2024-03-07', revenue: 245000 },
  { id: 'SHP-4416', client: 'Mahindra Logistics',    origin: 'Pune',       destination: 'Hyderabad',   status: 'delivered',  progress: 100, driver: 'Anil Yadav',    vehicle: 'HR-26-OP-0123', weight: '10.5 MT', eta: '2024-03-06', revenue: 132000 },
  { id: 'SHP-4415', client: 'Blue Dart Express',     origin: 'Mumbai',     destination: 'Ahmedabad',   status: 'delivered',  progress: 100, driver: 'Vijay Patel',   vehicle: 'KA-09-EF-9012', weight: '7.2 MT',  eta: '2024-03-05', revenue: 88000  },
  { id: 'SHP-4414', client: 'Reliance Industries',   origin: 'Delhi',      destination: 'Jaipur',      status: 'delivered',  progress: 100, driver: 'Mohan Das',     vehicle: 'GJ-05-IJ-7890', weight: '5.8 MT',  eta: '2024-03-04', revenue: 72000  },
  { id: 'SHP-4413', client: 'GATI Ltd',              origin: 'Kolkata',    destination: 'Bhubaneswar', status: 'delivered',  progress: 100, driver: 'Ramesh Kumar',  vehicle: 'MH-04-AB-1234', weight: '5.1 MT',  eta: '2024-03-03', revenue: 64000  },
  { id: 'SHP-4412', client: 'Wipro Infrastructure',  origin: 'Hyderabad',  destination: 'Bangalore',   status: 'delivered',  progress: 100, driver: 'Anand Raj',     vehicle: 'TN-22-GH-3456', weight: '9.4 MT',  eta: '2024-03-02', revenue: 118000 },
  { id: 'SHP-4411', client: 'L&T Logistics',         origin: 'Chennai',    destination: 'Coimbatore',  status: 'delivered',  progress: 100, driver: 'Ravi Sharma',   vehicle: 'UP-32-KL-2345', weight: '6.1 MT',  eta: '2024-03-01', revenue: 76000  },
  { id: 'SHP-4410', client: 'Hindustan Unilever',    origin: 'Mumbai',     destination: 'Nagpur',      status: 'in-transit', progress: 65,  driver: 'Deepak Verma',  vehicle: 'RJ-14-MN-6789', weight: '11.8 MT', eta: '2024-03-24', revenue: 145000 },
  { id: 'SHP-4409', client: 'Maruti Suzuki Parts',   origin: 'Gurgaon',    destination: 'Pune',        status: 'in-transit', progress: 40,  driver: 'Anil Yadav',    vehicle: 'HR-26-OP-0123', weight: '17.3 MT', eta: '2024-03-25', revenue: 210000 },
  { id: 'SHP-4408', client: 'ITC Limited',           origin: 'Kolkata',    destination: 'Delhi',       status: 'delivered',  progress: 100, driver: 'Suresh Singh',  vehicle: 'DL-01-CD-5678', weight: '21.0 MT', eta: '2024-02-27', revenue: 285000 },
  { id: 'SHP-4407', client: 'GATI Ltd',              origin: 'Delhi',      destination: 'Chandigarh',  status: 'delivered',  progress: 100, driver: 'Vijay Patel',   vehicle: 'KA-09-EF-9012', weight: '5.4 MT',  eta: '2024-02-26', revenue: 68000  },
  { id: 'SHP-4406', client: 'Mahindra Logistics',    origin: 'Ahmedabad',  destination: 'Mumbai',      status: 'delivered',  progress: 100, driver: 'Mohan Das',     vehicle: 'GJ-05-IJ-7890', weight: '7.8 MT',  eta: '2024-02-25', revenue: 97000  },
  { id: 'SHP-4405', client: 'Flipkart Supply Chain', origin: 'Bangalore',  destination: 'Hyderabad',   status: 'delayed',    progress: 50,  driver: 'Ramesh Kumar',  vehicle: 'MH-04-AB-1234', weight: '12.9 MT', eta: '2024-03-26', revenue: 155000 },
  { id: 'SHP-4404', client: 'Blue Dart Express',     origin: 'Surat',      destination: 'Delhi',       status: 'in-transit', progress: 55,  driver: 'Anand Raj',     vehicle: 'TN-22-GH-3456', weight: '18.6 MT', eta: '2024-03-27', revenue: 238000 },
  { id: 'SHP-4403', client: 'DHL India',             origin: 'Pune',       destination: 'Kolkata',     status: 'delivered',  progress: 100, driver: 'Ravi Sharma',   vehicle: 'UP-32-KL-2345', weight: '23.2 MT', eta: '2024-02-22', revenue: 295000 },
  { id: 'SHP-4402', client: 'Reliance Industries',   origin: 'Jaipur',     destination: 'Ahmedabad',   status: 'loading',    progress: 8,   driver: 'Deepak Verma',  vehicle: 'RJ-14-MN-6789', weight: '6.6 MT',  eta: '2024-03-28', revenue: 83000  },
  { id: 'SHP-4401', client: 'Amazon India',          origin: 'Hyderabad',  destination: 'Chennai',     status: 'in-transit', progress: 35,  driver: 'Anil Yadav',    vehicle: 'HR-26-OP-0123', weight: '13.7 MT', eta: '2024-03-29', revenue: 174000 },
  { id: 'SHP-4400', client: 'L&T Logistics',         origin: 'Delhi',      destination: 'Lucknow',     status: 'in-transit', progress: 80,  driver: 'Suresh Singh',  vehicle: 'DL-01-CD-5678', weight: '8.9 MT',  eta: '2024-03-18', revenue: 112000 },
];

// ─── Fleet (25 rows) ─────────────────────────────────────────────────────────
export const fleet = [
  { id: 'V001', registration: 'MH-04-AB-1234', type: 'Heavy Truck (32T)',  driver: 'Ramesh Kumar',   status: 'on-route',    route: 'Jamshedpur → Mumbai',   fuelLevel: 62, mileage: 184200, lastService: '2024-01-15', nextService: '2024-04-15', monthlyRevenue: 220000 },
  { id: 'V002', registration: 'DL-01-CD-5678', type: 'Medium Truck (16T)', driver: 'Suresh Singh',   status: 'available',   route: null,                    fuelLevel: 88, mileage: 97400,  lastService: '2024-02-20', nextService: '2024-05-20', monthlyRevenue: 0      },
  { id: 'V003', registration: 'GJ-05-IJ-7890', type: 'Heavy Truck (32T)',  driver: 'Mohan Das',      status: 'on-route',    route: 'Mumbai → Chennai',      fuelLevel: 41, mileage: 231500, lastService: '2023-12-10', nextService: '2024-03-10', monthlyRevenue: 275000 },
  { id: 'V004', registration: 'KA-09-EF-9012', type: 'Light Truck (8T)',   driver: 'Vijay Patel',    status: 'on-route',    route: 'Bangalore → Pune',      fuelLevel: 75, mileage: 68900,  lastService: '2024-02-28', nextService: '2024-05-28', monthlyRevenue: 95000  },
  { id: 'V005', registration: 'TN-22-GH-3456', type: 'Medium Truck (16T)', driver: 'Anand Raj',      status: 'on-route',    route: 'Chennai → Delhi',       fuelLevel: 18, mileage: 156700, lastService: '2024-01-05', nextService: '2024-04-05', monthlyRevenue: 198000 },
  { id: 'V006', registration: 'UP-32-KL-2345', type: 'Heavy Truck (32T)',  driver: 'Ravi Sharma',    status: 'on-route',    route: 'Delhi → Kolkata',       fuelLevel: 55, mileage: 203100, lastService: '2024-02-01', nextService: '2024-05-01', monthlyRevenue: 310000 },
  { id: 'V007', registration: 'RJ-14-MN-6789', type: 'Light Truck (8T)',   driver: 'Deepak Verma',   status: 'maintenance', route: null,                    fuelLevel: 30, mileage: 112300, lastService: '2024-03-01', nextService: '2024-06-01', monthlyRevenue: 0      },
  { id: 'V008', registration: 'HR-26-OP-0123', type: 'Medium Truck (16T)', driver: 'Anil Yadav',     status: 'available',   route: null,                    fuelLevel: 92, mileage: 45600,  lastService: '2024-03-10', nextService: '2024-06-10', monthlyRevenue: 0      },
  // 17 new rows below ↓
  { id: 'V009', registration: 'PB-10-QR-4567', type: 'Heavy Truck (32T)',  driver: 'Harpreet Singh', status: 'on-route',    route: 'Delhi → Amritsar',      fuelLevel: 70, mileage: 162400, lastService: '2024-01-20', nextService: '2024-04-20', monthlyRevenue: 195000 },
  { id: 'V010', registration: 'MP-09-ST-8901', type: 'Medium Truck (16T)', driver: 'Sanjay Tiwari',  status: 'available',   route: null,                    fuelLevel: 55, mileage: 88700,  lastService: '2024-02-15', nextService: '2024-05-15', monthlyRevenue: 0      },
  { id: 'V011', registration: 'AP-28-UV-2345', type: 'Light Truck (8T)',   driver: 'Krishna Rao',    status: 'on-route',    route: 'Hyderabad → Bangalore', fuelLevel: 48, mileage: 54300,  lastService: '2024-02-10', nextService: '2024-05-10', monthlyRevenue: 118000 },
  { id: 'V012', registration: 'WB-02-WX-6789', type: 'Heavy Truck (32T)',  driver: 'Subhash Ghosh',  status: 'on-route',    route: 'Kolkata → Delhi',       fuelLevel: 38, mileage: 215800, lastService: '2024-01-25', nextService: '2024-04-25', monthlyRevenue: 285000 },
  { id: 'V013', registration: 'OR-02-YZ-0123', type: 'Medium Truck (16T)', driver: 'Prasanta Nayak', status: 'maintenance', route: null,                    fuelLevel: 20, mileage: 134600, lastService: '2024-03-05', nextService: '2024-06-05', monthlyRevenue: 0      },
  { id: 'V014', registration: 'CG-04-AB-3456', type: 'Light Truck (8T)',   driver: 'Bharat Sahu',    status: 'available',   route: null,                    fuelLevel: 82, mileage: 41200,  lastService: '2024-03-08', nextService: '2024-06-08', monthlyRevenue: 0      },
  { id: 'V015', registration: 'TN-09-CD-7890', type: 'Heavy Truck (32T)',  driver: 'Murugan Selvan', status: 'on-route',    route: 'Chennai → Coimbatore',  fuelLevel: 61, mileage: 177300, lastService: '2024-01-30', nextService: '2024-04-30', monthlyRevenue: 145000 },
  { id: 'V016', registration: 'KL-07-EF-1234', type: 'Medium Truck (16T)', driver: 'Sunil Nair',     status: 'on-route',    route: 'Kochi → Bangalore',     fuelLevel: 44, mileage: 72100,  lastService: '2024-02-22', nextService: '2024-05-22', monthlyRevenue: 132000 },
  { id: 'V017', registration: 'GJ-18-GH-5678', type: 'Light Truck (8T)',   driver: 'Jayesh Shah',    status: 'available',   route: null,                    fuelLevel: 95, mileage: 29800,  lastService: '2024-03-12', nextService: '2024-06-12', monthlyRevenue: 0      },
  { id: 'V018', registration: 'RJ-06-IJ-9012', type: 'Heavy Truck (32T)',  driver: 'Vikram Chauhan', status: 'on-route',    route: 'Jaipur → Mumbai',       fuelLevel: 33, mileage: 198500, lastService: '2024-01-10', nextService: '2024-04-10', monthlyRevenue: 230000 },
  { id: 'V019', registration: 'HR-55-KL-3456', type: 'Medium Truck (16T)', driver: 'Naresh Hooda',   status: 'maintenance', route: null,                    fuelLevel: 15, mileage: 143900, lastService: '2024-03-03', nextService: '2024-06-03', monthlyRevenue: 0      },
  { id: 'V020', registration: 'UP-65-MN-7890', type: 'Heavy Truck (32T)',  driver: 'Ram Kishor',     status: 'on-route',    route: 'Lucknow → Delhi',       fuelLevel: 57, mileage: 221700, lastService: '2024-02-05', nextService: '2024-05-05', monthlyRevenue: 175000 },
  { id: 'V021', registration: 'MH-43-OP-2345', type: 'Light Truck (8T)',   driver: 'Ganesh Patil',   status: 'available',   route: null,                    fuelLevel: 78, mileage: 62500,  lastService: '2024-03-01', nextService: '2024-06-01', monthlyRevenue: 0      },
  { id: 'V022', registration: 'DL-14-QR-6789', type: 'Medium Truck (16T)', driver: 'Irfan Khan',     status: 'on-route',    route: 'Delhi → Chandigarh',    fuelLevel: 50, mileage: 109200, lastService: '2024-02-18', nextService: '2024-05-18', monthlyRevenue: 148000 },
  { id: 'V023', registration: 'KA-53-ST-0123', type: 'Heavy Truck (32T)',  driver: 'Manjunath Bhat', status: 'on-route',    route: 'Bangalore → Hyderabad', fuelLevel: 66, mileage: 187600, lastService: '2024-01-28', nextService: '2024-04-28', monthlyRevenue: 265000 },
  { id: 'V024', registration: 'MH-12-UV-4567', type: 'Light Truck (8T)',   driver: 'Santosh More',   status: 'maintenance', route: null,                    fuelLevel: 22, mileage: 76300,  lastService: '2024-03-07', nextService: '2024-06-07', monthlyRevenue: 0      },
  { id: 'V025', registration: 'GJ-01-WX-8901', type: 'Medium Truck (16T)', driver: 'Ashwin Mehta',   status: 'available',   route: null,                    fuelLevel: 85, mileage: 53100,  lastService: '2024-03-14', nextService: '2024-06-14', monthlyRevenue: 0      },
];

// ─── Derived: expenseBreakdown (always matches expenses rows) ───────────────
export const expenseBreakdown = Object.entries(
  expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {})
).map(([name, value]) => ({ name, value, color: CATEGORY_COLORS[name] || '#94a3b8' }));

// ─── Derived: dashboardStats (always matches actual data) ────────────────────
export const dashboardStats = {
  totalRevenue: revenueData[revenueData.length - 1].revenue,
  revenueChange: 12.4,
  totalExpenses: expenses.reduce((s, e) => s + e.amount, 0),
  expensesChange: 4.2,
  netProfit: revenueData[revenueData.length - 1].revenue - expenses.reduce((s, e) => s + e.amount, 0),
  profitChange: 18.6,
  fuelCost: expenses.filter((e) => e.category === 'Fuel').reduce((s, e) => s + e.amount, 0),
  fuelChange: -3.1,
  activeShipments: shipments.filter((s) => s.status === 'in-transit' || s.status === 'loading').length,
  shipmentsChange: 8,
  pendingCount: invoices.filter((i) => i.status === 'pending' || i.status === 'overdue').length,
  pendingInvoices: invoices.filter((i) => i.status === 'pending' || i.status === 'overdue').reduce((s, i) => s + i.amount, 0),
  fleetUtilization: Math.round((fleet.filter((v) => v.status === 'on-route').length / fleet.length) * 100),
};

// ─── Shipment Routes ────────────────────────────────────────────────────────
export const shipmentRoutes = [
  { route: 'Mumbai → Delhi',      trips: 18, revenue: 1480000 },
  { route: 'Chennai → Delhi',     trips: 14, revenue: 1120000 },
  { route: 'Jamshedpur → Mumbai', trips: 12, revenue: 980000  },
  { route: 'Delhi → Kolkata',     trips: 10, revenue: 860000  },
  { route: 'Bangalore → Pune',    trips: 16, revenue: 720000  },
];