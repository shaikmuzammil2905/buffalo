import React, { useState, useEffect } from 'react';
import * as mockData from './mockData';

export default function App() {
  // --- Persistent Local Database State ---
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('buf_users');
    return saved ? JSON.parse(saved) : mockData.initialUsers;
  });

  const [activeUser, setActiveUser] = useState(() => {
    // Default session is Owner
    const savedId = localStorage.getItem('buf_active_user_id') || 'owner-1';
    const found = users.find(u => u.id === savedId);
    return found || users[0];
  });

  const [buffalos, setBuffalos] = useState(() => {
    const saved = localStorage.getItem('buf_buffalos');
    return saved ? JSON.parse(saved) : mockData.initialBuffalos;
  });

  const [outlets, setOutlets] = useState(() => {
    const saved = localStorage.getItem('buf_outlets');
    return saved ? JSON.parse(saved) : mockData.initialOutlets;
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('buf_products');
    return saved ? JSON.parse(saved) : mockData.initialProducts;
  });

  const [milkProduction, setMilkProduction] = useState(() => {
    const saved = localStorage.getItem('buf_milk_production');
    return saved ? JSON.parse(saved) : mockData.initialMilkProduction;
  });

  const [milkDistribution, setMilkDistribution] = useState(() => {
    const saved = localStorage.getItem('buf_milk_distribution');
    return saved ? JSON.parse(saved) : mockData.initialMilkDistribution;
  });

  const [driverPayments, setDriverPayments] = useState(() => {
    const saved = localStorage.getItem('buf_driver_payments');
    return saved ? JSON.parse(saved) : mockData.initialDriverPayments;
  });

  const [driverSettlements, setDriverSettlements] = useState(() => {
    const saved = localStorage.getItem('buf_driver_settlements');
    return saved ? JSON.parse(saved) : mockData.initialDriverSettlements;
  });

  const [shopSales, setShopSales] = useState(() => {
    const saved = localStorage.getItem('buf_shop_sales');
    return saved ? JSON.parse(saved) : mockData.initialShopSales;
  });

  const [shopPurchases, setShopPurchases] = useState(() => {
    const saved = localStorage.getItem('buf_shop_purchases');
    return saved ? JSON.parse(saved) : mockData.initialShopPurchases;
  });

  const [workers, setWorkers] = useState(() => {
    const saved = localStorage.getItem('buf_workers');
    return saved ? JSON.parse(saved) : mockData.initialWorkers;
  });

  const [farmExpenses, setFarmExpenses] = useState(() => {
    const saved = localStorage.getItem('buf_farm_expenses');
    return saved ? JSON.parse(saved) : mockData.initialFarmExpenses;
  });

  // --- Active Module Selection ---
  const [currentTab, setCurrentTab] = useState('dashboard'); // dashboard, animals, production, distribution, shop, workers, finance, permissions

  // --- UI Control States ---
  const [isDevDeckCollapsed, setIsDevDeckCollapsed] = useState(false);
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);
  
  // Modals state
  const [activeModal, setActiveModal] = useState(null); // 'add-buffalo', 'view-buffalo', 'log-production', 'log-distribution', 'add-sale', 'add-purchase', 'add-expense', 'add-outlet', 'add-payment'
  const [selectedBuffalo, setSelectedBuffalo] = useState(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('buf_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('buf_active_user_id', activeUser.id);
  }, [activeUser]);

  useEffect(() => {
    localStorage.setItem('buf_buffalos', JSON.stringify(buffalos));
  }, [buffalos]);

  useEffect(() => {
    localStorage.setItem('buf_outlets', JSON.stringify(outlets));
  }, [outlets]);

  useEffect(() => {
    localStorage.setItem('buf_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('buf_milk_production', JSON.stringify(milkProduction));
  }, [milkProduction]);

  useEffect(() => {
    localStorage.setItem('buf_milk_distribution', JSON.stringify(milkDistribution));
  }, [milkDistribution]);

  useEffect(() => {
    localStorage.setItem('buf_driver_payments', JSON.stringify(driverPayments));
  }, [driverPayments]);

  useEffect(() => {
    localStorage.setItem('buf_driver_settlements', JSON.stringify(driverSettlements));
  }, [driverSettlements]);

  useEffect(() => {
    localStorage.setItem('buf_shop_sales', JSON.stringify(shopSales));
  }, [shopSales]);

  useEffect(() => {
    localStorage.setItem('buf_shop_purchases', JSON.stringify(shopPurchases));
  }, [shopPurchases]);

  useEffect(() => {
    localStorage.setItem('buf_workers', JSON.stringify(workers));
  }, [workers]);

  useEffect(() => {
    localStorage.setItem('buf_farm_expenses', JSON.stringify(farmExpenses));
  }, [farmExpenses]);

  // --- Quick User Switcher ---
  const handleUserChange = (userId) => {
    const found = users.find(u => u.id === userId);
    if (found) {
      setActiveUser(found);
      // Auto routing based on role permissions
      if (found.role === 'Owner') setCurrentTab('dashboard');
      else if (found.role === 'Farm Manager') setCurrentTab('animals');
      else if (found.role === 'Shop Keeper') setCurrentTab('shop');
      else if (found.role === 'Driver') setCurrentTab('distribution');
      else if (found.role === 'Worker') setCurrentTab('workers');
    }
  };

  // --- Granular Permissions Toggle for Active User Session ---
  const toggleActivePermission = (permKey) => {
    setUsers(prev => prev.map(u => {
      if (u.id === activeUser.id) {
        const updatedPerms = { ...u.permissions, [permKey]: !u.permissions[permKey] };
        const updatedUser = { ...u, permissions: updatedPerms };
        // Sync activeUser context state as well
        if (activeUser.id === u.id) {
          setActiveUser(updatedUser);
        }
        return updatedUser;
      }
      return u;
    }));
  };

  // --- Notifications Generator ---
  const notifications = [];

  // Low Shop Stock Alert
  products.forEach(p => {
    if (p.currentStock <= p.minimumStock) {
      notifications.push({
        id: `noti-stock-${p.id}`,
        title: "Low Stock Alert",
        type: "warning",
        message: `Product ${p.name} is running low (${p.currentStock} ${p.unit} remaining, Min: ${p.minimumStock})`,
        time: "Just Now"
      });
    }
  });

  // Buffalo Vaccination Alert (Pregnancy/Vet visit)
  buffalos.forEach(b => {
    if (b.status === 'Sick') {
      notifications.push({
        id: `noti-sick-${b.tagNumber}`,
        title: "Animal Health Alert",
        type: "error",
        message: `Buffalo ${b.tagNumber} is marked Sick. Require immediate Vet check.`,
        time: "1h ago"
      });
    }
    b.pregnancies.forEach(p => {
      if (p.status === 'Confirmed') {
        notifications.push({
          id: `noti-preg-${b.tagNumber}`,
          title: "Breeding Alert",
          type: "warning",
          message: `Buffalo ${b.tagNumber} expected calving on ${p.expectedCalving}`,
          time: "Daily"
        });
      }
    });
  });

  // Driver Settlement approvals
  driverSettlements.forEach(ds => {
    if (ds.status === 'Pending') {
      notifications.push({
        id: `noti-settle-${ds.id}`,
        title: "Settlement Approval",
        type: "info",
        message: `Driver ${ds.driverName} submitted Daily Settlement for approval.`,
        time: "End of Session"
      });
    }
  });

  // Outstanding Customer Payments Alerts
  outlets.forEach(o => {
    if (o.balance > o.creditLimit * 0.8) {
      notifications.push({
        id: `noti-credit-${o.id}`,
        title: "Credit Limit Warning",
        type: "warning",
        message: `Outlet ${o.name} has outstanding ₹${o.balance} (Limit: ₹${o.creditLimit})`,
        time: "2h ago"
      });
    }
  });

  // --- Permission Checking Helper ---
  const hasPermission = (permName) => {
    return activeUser.permissions[permName] === true;
  };

  // --- Add/Edit/Delete Implementations ---
  const addBuffalo = (newBuf) => {
    if (!hasPermission('add')) return alert("Permission Denied: Add record");
    setBuffalos(prev => [newBuf, ...prev]);
    setActiveModal(null);
  };

  const addProductionLog = (newLog) => {
    if (!hasPermission('add')) return alert("Permission Denied: Add production entry");
    setMilkProduction(prev => [newLog, ...prev]);
    setActiveModal(null);
  };

  const addDistributionLog = (newDist) => {
    if (!hasPermission('add')) return alert("Permission Denied: Record distribution");
    
    // Deduct stock for Shop if Own Shop is in distribution
    const shopDeliv = newDist.distributed.find(d => d.destination === 'Own Milk Shop');
    if (shopDeliv) {
      setProducts(prev => prev.map(p => {
        if (p.id === 'prod-1') { // Fresh Milk
          return { ...p, currentStock: p.currentStock + parseFloat(shopDeliv.qty) };
        }
        return p;
      }));
    }

    // Add to distribution list
    setMilkDistribution(prev => [newDist, ...prev]);

    // Automatically create Driver Payments expectation records
    newDist.distributed.forEach(d => {
      if (d.destination !== 'Own Milk Shop') {
        const outlet = outlets.find(o => o.name === d.destination);
        if (outlet) {
          const rate = outlet.sellingPrice;
          const due = d.qty * rate;
          
          // Create driver payment task
          const newPay = {
            id: `pay-${Date.now()}-${Math.floor(Math.random()*1000)}`,
            date: newDist.date,
            outletId: outlet.id,
            outletName: outlet.name,
            amountDue: due,
            amountCollected: 0,
            paymentMethod: 'Credit',
            remarks: 'Pending collection',
            driverName: newDist.driverName
          };
          setDriverPayments(prev => [newPay, ...prev]);
          
          // Update outlet outstanding balance
          setOutlets(prevOut => prevOut.map(o => {
            if (o.id === outlet.id) {
              return { ...o, balance: o.balance + due };
            }
            return o;
          }));
        }
      }
    });

    setActiveModal(null);
  };

  const recordDriverPayment = (payId, amountCollected, method, remarks) => {
    setDriverPayments(prev => prev.map(p => {
      if (p.id === payId) {
        const collectedNum = parseFloat(amountCollected);
        const outstandingChange = collectedNum;
        
        // Update outlet balance in system
        setOutlets(prevOut => prevOut.map(o => {
          if (o.id === p.outletId) {
            return { ...o, balance: Math.max(0, o.balance - outstandingChange) };
          }
          return o;
        }));

        return {
          ...p,
          amountCollected: collectedNum,
          paymentMethod: method,
          remarks: remarks
        };
      }
      return p;
    }));
  };

  const addShopSale = (newSale) => {
    if (!hasPermission('add')) return alert("Permission Denied: Sales Entry");
    
    // Check product inventory
    const product = products.find(p => p.name === newSale.product);
    if (!product || product.currentStock < newSale.qty) {
      return alert("Error: Insufficient stock of " + newSale.product);
    }

    // Deduct stock
    setProducts(prev => prev.map(p => {
      if (p.name === newSale.product) {
        return { ...p, currentStock: p.currentStock - newSale.qty };
      }
      return p;
    }));

    setShopSales(prev => [newSale, ...prev]);
    setActiveModal(null);
  };

  const addShopPurchase = (newPur) => {
    if (!hasPermission('add')) return alert("Permission Denied: Purchase Entry");
    
    // Add stock
    setProducts(prev => prev.map(p => {
      if (p.name === newPur.product) {
        return { ...p, currentStock: p.currentStock + newPur.qty };
      }
      return p;
    }));

    setShopPurchases(prev => [newPur, ...prev]);
    setActiveModal(null);
  };

  const addFarmExpense = (newExp) => {
    if (!hasPermission('add')) return alert("Permission Denied: Record Expense");
    setFarmExpenses(prev => [newExp, ...prev]);
    setActiveModal(null);
  };

  const editOutletPrice = (outletId, newPrice) => {
    if (!hasPermission('edit')) return alert("Permission Denied: Edit Pricing");
    setOutlets(prev => prev.map(o => {
      if (o.id === outletId) {
        return { ...o, sellingPrice: parseFloat(newPrice) };
      }
      return o;
    }));
  };

  const submitDriverSettlement = (newSettle) => {
    setDriverSettlements(prev => [newSettle, ...prev]);
  };

  const approveSettlement = (settleId) => {
    if (!hasPermission('edit')) return alert("Permission Denied: Approve settlements");
    setDriverSettlements(prev => prev.map(s => {
      if (s.id === settleId) {
        return { ...s, status: 'Approved' };
      }
      return s;
    }));
  };

  // --- Mock Exports ---
  const triggerExport = (reportName) => {
    if (!hasPermission('export')) return alert("Permission Denied: Export Reports");
    
    // Generate dummy printable/CSV output text
    let content = `BUFFALO DAIRY FARM - ${reportName.toUpperCase()} REPORT\n`;
    content += `Generated on: ${new Date().toISOString()}\n`;
    content += `User Session: ${activeUser.name} (${activeUser.role})\n`;
    content += `==============================================\n\n`;

    if (reportName === 'milk-production') {
      content += "Date | Session | Total Yield (Litres)\n";
      milkProduction.forEach(m => {
        content += `${m.date} | ${m.session} | ${m.quantity}\n`;
      });
    } else if (reportName === 'shop-sales') {
      content += "Date | Product | Quantity | Total (INR) | Mode\n";
      shopSales.forEach(s => {
        content += `${s.date} | ${s.product} | ${s.qty} | ${s.total} | ${s.paymentMethod}\n`;
      });
    } else if (reportName === 'finance') {
      content += "Category | Amount (INR)\n";
      content += `Total Shop Income | ${shopSales.reduce((a,b)=>a+b.total, 0)}\n`;
      content += `Total Outlet Income expectation | ${driverPayments.reduce((a,b)=>a+b.amountCollected, 0)}\n`;
      content += `Farm Total Expenses | ${farmExpenses.reduce((a,b)=>a+b.amount, 0)}\n`;
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${reportName}_report.txt`;
    link.click();
  };

  // --- Inline UI Custom SVG Icons ---
  const icons = {
    dashboard: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>,
    animal: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12A10 10 0 0 1 12 2z"/><path d="M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z"/></svg>,
    milk: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-13-7-13S5 10.7 5 15a7 7 0 0 0 7 7z"/></svg>,
    truck: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
    shop: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    worker: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    finance: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    key: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5l-3-3"/></svg>,
    bell: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    plus: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    search: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    export: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    check: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
  };

  // --- Tab Filters based on User Role ---
  const isOwner = activeUser.role === 'Owner';
  const isManager = activeUser.role === 'Farm Manager';
  const isShopKeeper = activeUser.role === 'Shop Keeper';
  const isDriver = activeUser.role === 'Driver';
  const isWorker = activeUser.role === 'Worker';

  return (
    <div className="app-container">
      
      {/* 1. SIDEBAR NAVIGATION */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-icon">🐄</span>
          <div className="brand-name">Buffalo Dairy</div>
        </div>

        <div className="user-badge">
          <span className="user-badge-avatar">{activeUser.avatar}</span>
          <div className="user-badge-info">
            <h4>{activeUser.name}</h4>
            <p>{activeUser.role}</p>
          </div>
        </div>

        <ul className="nav-menu">
          {/* Owner has access to everything */}
          {isOwner && (
            <>
              <li className={`nav-item ${currentTab === 'dashboard' ? 'active' : ''}`} onClick={() => setCurrentTab('dashboard')}>
                {icons.dashboard} Owner Dashboard
              </li>
              <li className={`nav-item ${currentTab === 'animals' ? 'active' : ''}`} onClick={() => setCurrentTab('animals')}>
                {icons.animal} Buffalo Profiles
              </li>
              <li className={`nav-item ${currentTab === 'production' ? 'active' : ''}`} onClick={() => setCurrentTab('production')}>
                {icons.milk} Milk Production
              </li>
              <li className={`nav-item ${currentTab === 'distribution' ? 'active' : ''}`} onClick={() => setCurrentTab('distribution')}>
                {icons.truck} Drivers & Collections
              </li>
              <li className={`nav-item ${currentTab === 'shop' ? 'active' : ''}`} onClick={() => setCurrentTab('shop')}>
                {icons.shop} Milk Shop
              </li>
              <li className={`nav-item ${currentTab === 'workers' ? 'active' : ''}`} onClick={() => setCurrentTab('workers')}>
                {icons.worker} Worker Attendance
              </li>
              <li className={`nav-item ${currentTab === 'finance' ? 'active' : ''}`} onClick={() => setCurrentTab('finance')}>
                {icons.finance} Finance & Expense
              </li>
              <li className={`nav-item ${currentTab === 'permissions' ? 'active' : ''}`} onClick={() => setCurrentTab('permissions')}>
                {icons.key} Configure Permissions
              </li>
            </>
          )}

          {/* Farm Manager Tabs */}
          {isManager && (
            <>
              <li className={`nav-item ${currentTab === 'animals' ? 'active' : ''}`} onClick={() => setCurrentTab('animals')}>
                {icons.animal} Buffalo Profiles
              </li>
              <li className={`nav-item ${currentTab === 'production' ? 'active' : ''}`} onClick={() => setCurrentTab('production')}>
                {icons.milk} Milk Production
              </li>
              <li className={`nav-item ${currentTab === 'workers' ? 'active' : ''}`} onClick={() => setCurrentTab('workers')}>
                {icons.worker} Worker Attendance
              </li>
              <li className={`nav-item ${currentTab === 'finance' ? 'active' : ''}`} onClick={() => setCurrentTab('finance')}>
                {icons.finance} Farm Expenses
              </li>
            </>
          )}

          {/* Shop Keeper Tabs */}
          {isShopKeeper && (
            <>
              <li className={`nav-item ${currentTab === 'shop' ? 'active' : ''}`} onClick={() => setCurrentTab('shop')}>
                {icons.shop} Shop Dashboard & Log
              </li>
            </>
          )}

          {/* Driver Tabs */}
          {isDriver && (
            <>
              <li className={`nav-item ${currentTab === 'distribution' ? 'active' : ''}`} onClick={() => setCurrentTab('distribution')}>
                {icons.truck} Milk Collection Log
              </li>
            </>
          )}

          {/* Worker Tabs */}
          {isWorker && (
            <>
              <li className={`nav-item ${currentTab === 'workers' ? 'active' : ''}`} onClick={() => setCurrentTab('workers')}>
                {icons.worker} My Attendance & Work
              </li>
            </>
          )}
        </ul>

        <div className="nav-footer" style={{fontSize: '11px', color: 'var(--text-muted)', padding: '12px'}}>
          Version 1.0 (Phase 1)
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE VIEWPORT */}
      <main className="main-viewport">
        
        {/* TOP BAR / NOTIFICATIONS HEADER */}
        <header className="top-header">
          <div>
            <h2>
              {currentTab === 'dashboard' && 'Owner Overview'}
              {currentTab === 'animals' && 'Animal Profile Directory'}
              {currentTab === 'production' && 'Farm Milk Production Ledger'}
              {currentTab === 'distribution' && 'Collection & Distribution Module'}
              {currentTab === 'shop' && 'Milk Shop Management'}
              {currentTab === 'workers' && 'Worker Operations & Attendance'}
              {currentTab === 'finance' && 'Consolidated Finance & P&L'}
              {currentTab === 'permissions' && 'User Access Permissions Grid'}
            </h2>
            <p style={{fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px'}}>Session Date: Friday, 24 July 2026</p>
          </div>
          
          <div className="top-header-actions">
            {/* Bell notification triggers */}
            <div className="notification-bell" onClick={() => setShowNotificationCenter(!showNotificationCenter)}>
              {icons.bell}
              {notifications.length > 0 && <span className="notification-count">{notifications.length}</span>}
            </div>

            {/* Notification drop panel */}
            {showNotificationCenter && (
              <div className="notification-panel">
                <div className="notification-header">
                  <h3>Alert Reminders ({notifications.length})</h3>
                  <button className="btn btn-secondary" style={{padding: '4px 8px', fontSize: '11px'}} onClick={() => setShowNotificationCenter(false)}>Close</button>
                </div>
                <div className="notification-list">
                  {notifications.length === 0 ? (
                    <div style={{padding: '20px', textAlign: 'center', color: 'var(--text-muted)'}}>No active alerts!</div>
                  ) : (
                    notifications.map(n => (
                      <div key={n.id} className="notification-item unread">
                        <span className="notification-item-icon">{n.type === 'warning' ? '⚠️' : n.type === 'error' ? '🚨' : 'ℹ️'}</span>
                        <div className="notification-item-content">
                          <p style={{fontWeight: '600', color: '#fff'}}>{n.title}</p>
                          <p style={{color: 'var(--text-body)', fontSize: '12px'}}>{n.message}</p>
                          <span>{n.time}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </header>

        {/* ACCESS VERIFICATION ENFORCER */}
        {!hasPermission('view') ? (
          <div className="glass-card warning" style={{padding: '40px', textAlign: 'center'}}>
            <span style={{fontSize: '48px'}}>🔒</span>
            <h2 style={{marginTop: '16px', color: 'var(--accent-warning)'}}>Role Access Denied</h2>
            <p style={{marginTop: '8px', color: 'var(--text-muted)'}}>You do not have permission to view content in this module. Contact Owner to update permissions.</p>
          </div>
        ) : (
          <>
            {/* TAB VIEWS */}
            
            {/* ========================================================
                TAB 1: OWNER OVERVIEW
                ======================================================== */}
            {currentTab === 'dashboard' && isOwner && (
              <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                {/* Visual Cards Row */}
                <div className="metrics-grid">
                  <div className="glass-card farm">
                    <div className="metric-card">
                      <span className="metric-label">Total Milk Today</span>
                      <span className="metric-value">
                        {milkProduction.filter(m => m.date === '2026-07-24').reduce((a,b)=>a+b.quantity, 0).toFixed(1)} Litres
                      </span>
                      <span className="metric-footer">Morning + Evening sessions</span>
                    </div>
                  </div>
                  <div className="glass-card shop">
                    <div className="metric-card">
                      <span className="metric-label">Today Sales (Shop)</span>
                      <span className="metric-value">
                        ₹{shopSales.filter(s => s.date === '2026-07-24').reduce((a,b)=>a+b.total, 0)}
                      </span>
                      <span className="metric-footer">{shopSales.filter(s => s.date === '2026-07-24').length} sales entries</span>
                    </div>
                  </div>
                  <div className="glass-card shop">
                    <div className="metric-card">
                      <span className="metric-label">Inventory Value</span>
                      <span className="metric-value">
                        {hasPermission('viewInventoryValue') ? `₹${products.reduce((a,b)=>a+(b.currentStock*b.purchasePrice), 0)}` : '₹ *****'}
                      </span>
                      <span className="metric-footer">Total value at cost</span>
                    </div>
                  </div>
                  <div className="glass-card finance">
                    <div className="metric-card">
                      <span className="metric-label">Profitability (Total)</span>
                      <span className="metric-value">
                        {hasPermission('viewFinancials') 
                          ? `₹${(shopSales.reduce((a,b)=>a+b.total,0) + driverPayments.reduce((a,b)=>a+b.amountCollected, 0) - farmExpenses.reduce((a,b)=>a+b.amount, 0)).toLocaleString()}`
                          : '₹ *****'
                        }
                      </span>
                      <span className="metric-footer">Total Revenue - Cost</span>
                    </div>
                  </div>
                </div>

                <div className="dash-row">
                  {/* Left Column: Milk Flow distribution */}
                  <div className="glass-card">
                    <h3 style={{marginBottom: '16px', display: 'flex', justifyContent: 'space-between'}}>
                      <span>Milk Production & Distribution Breakdown</span>
                      <button className="btn btn-secondary" style={{padding: '4px 8px', fontSize: '11px'}} onClick={() => triggerExport('milk-production')}>Export Data</button>
                    </h3>
                    
                    <div className="table-container">
                      <table className="custom-table">
                        <thead>
                          <tr>
                            <th>Destination</th>
                            <th>Litre Quantity</th>
                            <th>Revenue (Est)</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Own Milk Shop</td>
                            <td>180 Litres</td>
                            <td>— (Stocked)</td>
                            <td><span className="badge milking">Delivered</span></td>
                          </tr>
                          {outlets.map(o => {
                            const deliveredQty = milkDistribution.reduce((acc, curr) => {
                              const dest = curr.distributed.find(d => d.destination === o.name);
                              return acc + (dest ? dest.qty : 0);
                            }, 0);
                            return (
                              <tr key={o.id}>
                                <td>{o.name}</td>
                                <td>{deliveredQty} L</td>
                                <td>₹{(deliveredQty * o.sellingPrice).toLocaleString()}</td>
                                <td>
                                  <span className={`badge ${deliveredQty > 0 ? 'active' : 'dry'}`}>
                                    {deliveredQty > 0 ? 'Distributed' : 'Idle'}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Right Column: Key Alerts */}
                  <div className="glass-card warning">
                    <h3 style={{marginBottom: '16px'}}>Pending Tasks & Verification Issues</h3>
                    
                    <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                      {/* Driver Approval */}
                      {driverSettlements.filter(s => s.status === 'Pending').length > 0 ? (
                        driverSettlements.filter(s => s.status === 'Pending').map(s => (
                          <div key={s.id} style={{padding: '12px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid var(--accent-warning)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <div>
                              <p style={{fontWeight: '600', color: '#fff'}}>Driver Settlement Approval Required</p>
                              <p style={{fontSize: '12px', color: 'var(--text-muted)'}}>{s.driverName} - Expected: ₹{s.expectedCollection} | Collected: ₹{s.amountCollected}</p>
                            </div>
                            <button className="btn btn-success" style={{padding: '6px 12px', fontSize: '12px'}} onClick={() => approveSettlement(s.id)}>Approve</button>
                          </div>
                        ))
                      ) : (
                        <div style={{padding: '12px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '8px', color: 'var(--text-muted)', fontSize: '13px', textAlign: 'center'}}>
                          No pending driver settlements.
                        </div>
                      )}

                      {/* Animals Alert */}
                      <div style={{padding: '12px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid var(--accent-error)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <div>
                          <p style={{fontWeight: '600', color: '#fff'}}>Veterinary Deworming Schedule</p>
                          <p style={{fontSize: '12px', color: 'var(--text-muted)'}}>3 Animals (BUF-001, BUF-003, BUF-005) vaccines due this week.</p>
                        </div>
                        <button className="btn btn-secondary" style={{padding: '6px 12px', fontSize: '12px'}} onClick={() => setCurrentTab('animals')}>Roster</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================
                TAB 2: BUFFALO PROFILES
                ======================================================== */}
            {currentTab === 'animals' && (
              <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                <div className="flex-between">
                  <div style={{position: 'relative', width: '320px'}}>
                    <span style={{position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)'}}>{icons.search}</span>
                    <input className="form-input" style={{paddingLeft: '36px'}} placeholder="Search ear tag or breed..." />
                  </div>
                  {hasPermission('add') && (
                    <button className="btn btn-primary" onClick={() => setActiveModal('add-buffalo')}>
                      {icons.plus} Register Buffalo
                    </button>
                  )}
                </div>

                <div className="table-container">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Ear Tag</th>
                        <th>Breed</th>
                        <th>Age</th>
                        <th>Purchase Cost</th>
                        <th>Current Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {buffalos.map(b => (
                        <tr key={b.id}>
                          <td style={{fontWeight: '700', color: '#fff'}}>
                            <span style={{marginRight: '8px'}}>{b.image}</span> {b.tagNumber}
                          </td>
                          <td>{b.breed}</td>
                          <td>{new Date().getFullYear() - new Date(b.dob).getFullYear()} Years</td>
                          <td>
                            {hasPermission('viewPurchasePrices') ? `₹${b.purchaseCost.toLocaleString()}` : '₹ *****'}
                          </td>
                          <td>
                            <span className={`badge ${b.status.toLowerCase()}`}>{b.status}</span>
                          </td>
                          <td>
                            <button className="btn btn-secondary" style={{padding: '6px 12px', fontSize: '12px'}} onClick={() => { setSelectedBuffalo(b); setActiveModal('view-buffalo'); }}>
                              Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ========================================================
                TAB 3: MILK PRODUCTION
                ======================================================== */}
            {currentTab === 'production' && (
              <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                <div className="flex-between">
                  <h3>Yield Registry</h3>
                  {hasPermission('add') && (
                    <button className="btn btn-primary" onClick={() => setActiveModal('log-production')}>
                      {icons.plus} Record Milking Session
                    </button>
                  )}
                </div>

                {/* Animated visual representation of milk yield history */}
                <div className="glass-card">
                  <h4>Recent Daily Production Log</h4>
                  <div className="bar-chart-container">
                    {milkProduction.slice(0, 10).map((log, idx) => (
                      <div key={log.id || idx} className="bar-col">
                        <div 
                          className={`bar-fill ${log.session.toLowerCase()}`}
                          style={{height: `${(log.quantity / 300) * 100}%`}}
                          title={`${log.date} ${log.session}: ${log.quantity}L`}
                        />
                        <span className="bar-label">{log.date.substring(5)}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{display: 'flex', gap: '16px', marginTop: '12px', fontSize: '12px', justifyContent: 'center'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                      <div style={{width: '12px', height: '12px', background: 'var(--accent-farm)', borderRadius: '2px'}}/>
                      Morning yield
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                      <div style={{width: '12px', height: '12px', background: 'var(--accent-shop)', borderRadius: '2px'}}/>
                      Evening yield
                    </div>
                  </div>
                </div>

                <div className="table-container">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Session</th>
                        <th>Yield (Litres)</th>
                        <th>Logged Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {milkProduction.map(m => (
                        <tr key={m.id}>
                          <td style={{fontWeight: '600', color: '#fff'}}>{m.date}</td>
                          <td>
                            <span className={`badge ${m.session === 'Morning' ? 'milking' : 'dry'}`}>{m.session}</span>
                          </td>
                          <td style={{fontWeight: '700'}}>{m.quantity} L</td>
                          <td style={{color: 'var(--text-muted)'}}>{m.note || 'Regular extraction'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ========================================================
                TAB 4: DRIVERS & COLLECTIONS
                ======================================================== */}
            {currentTab === 'distribution' && (
              <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                
                {/* IF ACTIVE USER IS DRIVER, SHOW DRIVER DESK */}
                {isDriver && (
                  <div className="glass-card" style={{border: '1px solid var(--accent-shop)'}}>
                    <h3 style={{color: 'var(--accent-shop)', marginBottom: '16px'}}>Driver Duty Board</h3>
                    <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
                      <button className="btn btn-primary" onClick={() => setActiveModal('log-distribution')}>
                        🚚 Record Delivery & Distribution
                      </button>
                      <button className="btn btn-success" onClick={() => setActiveModal('add-payment')}>
                        ₹ Log Outlet Payment Collection
                      </button>
                      
                      {/* Driver Submit Settlement */}
                      <button className="btn btn-secondary" onClick={() => {
                        const totalColl = milkDistribution.filter(d=>d.date==='2026-07-24').reduce((a,b)=>a+b.collected, 0);
                        const expectedAmt = driverPayments.filter(p=>p.date==='2026-07-24').reduce((a,b)=>a+b.amountDue, 0);
                        const actualColl = driverPayments.filter(p=>p.date==='2026-07-24').reduce((a,b)=>a+b.amountCollected, 0);
                        const cashTotal = driverPayments.filter(p=>p.date==='2026-07-24' && p.paymentMethod==='Cash').reduce((a,b)=>a+b.amountCollected, 0);
                        const upiTotal = driverPayments.filter(p=>p.date==='2026-07-24' && p.paymentMethod==='UPI').reduce((a,b)=>a+b.amountCollected, 0);

                        submitDriverSettlement({
                          id: `settle-${Date.now()}`,
                          date: "2026-07-24",
                          driverName: activeUser.name,
                          totalCollected: totalColl,
                          totalDelivered: totalColl,
                          expectedCollection: expectedAmt,
                          amountCollected: actualColl,
                          cashAmount: cashTotal,
                          upiAmount: upiTotal,
                          creditAmount: expectedAmt - actualColl,
                          status: "Pending"
                        });
                        alert("Settlement report submitted to Owner for Approval!");
                      }}>
                        ✅ Submit Daily Settlement to Owner
                      </button>
                    </div>
                  </div>
                )}

                <div className="dash-row">
                  {/* Outlet Prices and Credit Manager */}
                  <div className="glass-card">
                    <h3 style={{marginBottom: '16px'}}>Delivery Outlets & Price Sheets</h3>
                    <div className="table-container">
                      <table className="custom-table">
                        <thead>
                          <tr>
                            <th>Outlet</th>
                            <th>Litre Rate</th>
                            <th>Credit Balance</th>
                            <th>Limit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {outlets.map(o => (
                            <tr key={o.id}>
                              <td style={{fontWeight: '600', color: '#fff'}}>{o.name}</td>
                              <td>
                                {isOwner ? (
                                  <input 
                                    type="number" 
                                    className="form-input" 
                                    style={{width: '70px', padding: '4px 8px'}} 
                                    value={o.sellingPrice} 
                                    onChange={(e) => editOutletPrice(o.id, e.target.value)}
                                  />
                                ) : (
                                  `₹${o.sellingPrice}/L`
                                )}
                              </td>
                              <td style={{color: o.balance > o.creditLimit * 0.8 ? 'var(--accent-warning)' : 'var(--text-body)'}}>
                                ₹{o.balance.toLocaleString()}
                              </td>
                              <td>₹{o.creditLimit.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Driver Log History */}
                  <div className="glass-card">
                    <h3 style={{marginBottom: '16px'}}>Collection Logs</h3>
                    <div className="table-container">
                      <table className="custom-table">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Driver</th>
                            <th>Liters Collected</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {milkDistribution.map(d => (
                            <tr key={d.id}>
                              <td>{d.date} ({d.session})</td>
                              <td>{d.driverName}</td>
                              <td style={{fontWeight: '700'}}>{d.collected} L</td>
                              <td>
                                <span className={`badge ${d.isSettled ? 'approved' : 'pending'}`}>
                                  {d.isSettled ? 'Approved' : 'Pending Approval'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Driver Daily Settlement Sheet History */}
                <div className="glass-card">
                  <h3 style={{marginBottom: '16px'}}>Daily Settlement Reports</h3>
                  <div className="table-container">
                    <table className="custom-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Driver</th>
                          <th>Milk Collected</th>
                          <th>Amt Expected</th>
                          <th>Amt Collected</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {driverSettlements.map(ds => (
                          <tr key={ds.id}>
                            <td style={{fontWeight: '600'}}>{ds.date}</td>
                            <td>{ds.driverName}</td>
                            <td>{ds.totalCollected} L</td>
                            <td>₹{ds.expectedCollection}</td>
                            <td style={{color: 'var(--accent-farm)', fontWeight: '700'}}>₹{ds.amountCollected}</td>
                            <td>
                              <span className={`badge ${ds.status.toLowerCase()}`}>{ds.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* ========================================================
                TAB 5: MILK SHOP
                ======================================================== */}
            {currentTab === 'shop' && (
              <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                
                {/* Shopkeeper Dashboard Metrics */}
                <div className="metrics-grid">
                  <div className="glass-card shop">
                    <div className="metric-card">
                      <span className="metric-label">Sales Logged Today</span>
                      <span className="metric-value">₹{shopSales.filter(s=>s.date==='2026-07-24').reduce((a,b)=>a+b.total, 0)}</span>
                      <span className="metric-footer">{shopSales.filter(s=>s.date==='2026-07-24').length} sales entries</span>
                    </div>
                  </div>
                  <div className="glass-card warning">
                    <div className="metric-card">
                      <span className="metric-label">Low Stock Alerts</span>
                      <span className="metric-value" style={{color: 'var(--accent-warning)'}}>
                        {products.filter(p => p.currentStock <= p.minimumStock).length} Items
                      </span>
                      <span className="metric-footer">Needs immediate purchase</span>
                    </div>
                  </div>
                  <div className="glass-card finance">
                    <div className="metric-card">
                      <span className="metric-label">Purchases Processed Today</span>
                      <span className="metric-value">₹{shopPurchases.filter(p=>p.date==='2026-07-24').reduce((a,b)=>a+b.total, 0)}</span>
                      <span className="metric-footer">Inventory stock increased</span>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                {hasPermission('add') && (
                  <div style={{display: 'flex', gap: '12px'}}>
                    <button className="btn btn-primary" onClick={() => setActiveModal('add-sale')}>
                      🛍️ New Retail Sale Entry
                    </button>
                    <button className="btn btn-secondary" onClick={() => setActiveModal('add-purchase')}>
                      📦 Log Product Purchase Invoice
                    </button>
                    <button className="btn btn-success" onClick={() => {
                      // Generate closing report
                      alert(`Shop Daily Closing Report:
Opening Milk: 200L
Sold: ${shopSales.reduce((a,b)=>a+(b.product==='Fresh Buffalo Milk'?b.qty:0), 0)}L
Purchased Ghee/Paneer: ${shopPurchases.reduce((a,b)=>a+b.qty, 0)} Units
Cash Collections: ₹${shopSales.filter(s=>s.paymentMethod==='Cash').reduce((a,b)=>a+b.total,0)}
UPI Collections: ₹${shopSales.filter(s=>s.paymentMethod==='UPI').reduce((a,b)=>a+b.total,0)}
Closing Report recorded and sent to Owner!`);
                    }}>
                      📝 Generate Shop Daily Closing
                    </button>
                  </div>
                )}

                {/* Product Inventory Table */}
                <div className="glass-card">
                  <h3 style={{marginBottom: '16px'}}>Product Inventory Status</h3>
                  <div className="table-container">
                    <table className="custom-table">
                      <thead>
                        <tr>
                          <th>Product Name</th>
                          <th>Category</th>
                          <th>Sell Rate</th>
                          <th>Stock Remaining</th>
                          <th>Min Trigger</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map(p => (
                          <tr key={p.id}>
                            <td style={{fontWeight: '700', color: '#fff'}}>{p.name}</td>
                            <td>{p.category}</td>
                            <td>₹{p.sellingPrice} / {p.unit}</td>
                            <td style={{fontWeight: '700', color: p.currentStock <= p.minimumStock ? 'var(--accent-error)' : 'var(--text-body)'}}>
                              {p.currentStock} {p.unit}
                            </td>
                            <td>{p.minimumStock} {p.unit}</td>
                            <td>
                              <span className={`badge ${p.currentStock <= p.minimumStock ? 'sick' : 'active'}`}>
                                {p.currentStock <= p.minimumStock ? 'Low Stock' : 'Good Stock'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Sales Ledger */}
                <div className="glass-card">
                  <h3 style={{marginBottom: '16px', display: 'flex', justifyContent: 'space-between'}}>
                    <span>Recent Sales Logs</span>
                    <button className="btn btn-secondary" style={{padding: '4px 8px', fontSize: '11px'}} onClick={() => triggerExport('shop-sales')}>Export Sales File</button>
                  </h3>
                  <div className="table-container">
                    <table className="custom-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Customer</th>
                          <th>Product</th>
                          <th>Qty</th>
                          <th>Amount</th>
                          <th>Payment Method</th>
                        </tr>
                      </thead>
                      <tbody>
                        {shopSales.map(s => (
                          <tr key={s.id}>
                            <td>{s.date}</td>
                            <td>{s.customer}</td>
                            <td style={{fontWeight: '600', color: '#fff'}}>{s.product}</td>
                            <td>{s.qty}</td>
                            <td style={{fontWeight: '700'}}>₹{s.total}</td>
                            <td><span className="badge dry">{s.paymentMethod}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* ========================================================
                TAB 6: WORKER OPERATIONS
                ======================================================== */}
            {currentTab === 'workers' && (
              <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                
                {/* Worker check-in interface */}
                {isWorker && (
                  <div className="glass-card" style={{border: '1px solid var(--accent-farm)'}}>
                    <h3 style={{color: 'var(--accent-farm)', marginBottom: '12px'}}>Worker Desk</h3>
                    <p style={{marginBottom: '16px'}}>Mark your daily attendance and view assignments.</p>
                    <div style={{display: 'flex', gap: '12px'}}>
                      <button className="btn btn-success" onClick={() => {
                        setWorkers(prev => prev.map(w => {
                          if (w.name === activeUser.name) {
                            return { ...w, attendance: 'Present' };
                          }
                          return w;
                        }));
                        alert("Your attendance has been marked as Present for today!");
                      }}>
                        🌞 Check-In (Mark Present)
                      </button>
                      <button className="btn btn-secondary" onClick={() => alert("Task checklist submitted to supervisor.")}>
                        ✅ Submit Finished Tasks Report
                      </button>
                    </div>
                  </div>
                )}

                <div className="glass-card">
                  <h3 style={{marginBottom: '16px'}}>Daily Staff Roster & Attendance</h3>
                  <div className="table-container">
                    <table className="custom-table">
                      <thead>
                        <tr>
                          <th>Staff Name</th>
                          <th>Role</th>
                          <th>Today Duties</th>
                          <th>Assigned Status</th>
                          {isOwner && <th>Admin Action (Mark Attendance)</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {workers.map(w => (
                          <tr key={w.id}>
                            <td style={{fontWeight: '700', color: '#fff'}}>🧑‍🌾 {w.name}</td>
                            <td>{w.role}</td>
                            <td style={{fontSize: '12px', color: 'var(--text-muted)'}}>{w.duties}</td>
                            <td>
                              <span className={`badge ${w.attendance.toLowerCase()}`}>{w.attendance}</span>
                            </td>
                            {isOwner && (
                              <td>
                                <div style={{display: 'flex', gap: '6px'}}>
                                  <button className="btn btn-success" style={{padding: '4px 8px', fontSize: '11px'}} onClick={() => {
                                    setWorkers(prev => prev.map(worker => worker.id === w.id ? { ...worker, attendance: 'Present' } : worker));
                                  }}>Present</button>
                                  <button className="btn btn-danger" style={{padding: '4px 8px', fontSize: '11px'}} onClick={() => {
                                    setWorkers(prev => prev.map(worker => worker.id === w.id ? { ...worker, attendance: 'Absent' } : worker));
                                  }}>Absent</button>
                                </div>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Salary Ledgers */}
                {hasPermission('viewFinancials') && (
                  <div className="glass-card">
                    <h3 style={{marginBottom: '16px'}}>Salary Disbursements Ledger</h3>
                    <div className="table-container">
                      <table className="custom-table">
                        <thead>
                          <tr>
                            <th>Staff Name</th>
                            <th>Monthly Wage</th>
                            <th>Advances Outstanding</th>
                            <th>Payable Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {workers.map(w => (
                            <tr key={w.id}>
                              <td style={{fontWeight: '600'}}>{w.name}</td>
                              <td>₹{w.monthlySalary.toLocaleString()}</td>
                              <td style={{color: 'var(--accent-warning)'}}>₹{w.advanceGiven.toLocaleString()}</td>
                              <td style={{fontWeight: '700', color: 'var(--accent-farm)'}}>
                                ₹{(w.monthlySalary - w.advanceGiven).toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* ========================================================
                TAB 7: FINANCE & EXPENSES
                ======================================================== */}
            {currentTab === 'finance' && (
              <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                
                {/* Financial Summary */}
                {hasPermission('viewFinancials') ? (
                  <>
                    <div className="metrics-grid">
                      <div className="glass-card farm">
                        <div className="metric-card">
                          <span className="metric-label">Consolidated Income</span>
                          <span className="metric-value" style={{color: 'var(--accent-farm)'}}>
                            ₹{(shopSales.reduce((a,b)=>a+b.total, 0) + driverPayments.reduce((a,b)=>a+b.amountCollected, 0)).toLocaleString()}
                          </span>
                          <span className="metric-footer">Shop retail + Driver cash collection</span>
                        </div>
                      </div>
                      <div className="glass-card warning">
                        <div className="metric-card">
                          <span className="metric-label">Total Expenses</span>
                          <span className="metric-value" style={{color: 'var(--accent-error)'}}>
                            ₹{farmExpenses.reduce((a,b)=>a+b.amount, 0).toLocaleString()}
                          </span>
                          <span className="metric-footer">Feed, wages, bills & medicines</span>
                        </div>
                      </div>
                      <div className="glass-card finance">
                        <div className="metric-card">
                          <span className="metric-label">Overall Profit / Loss</span>
                          <span className="metric-value">
                            ₹{(shopSales.reduce((a,b)=>a+b.total, 0) + driverPayments.reduce((a,b)=>a+b.amountCollected, 0) - farmExpenses.reduce((a,b)=>a+b.amount, 0)).toLocaleString()}
                          </span>
                          <span className="metric-footer">Calculated on cash settlements</span>
                        </div>
                      </div>
                    </div>

                    {/* Cost per litre analytics */}
                    <div className="glass-card">
                      <h3>Milk Production Efficiency Report</h3>
                      <div className="metrics-grid" style={{marginTop: '16px'}}>
                        <div style={{textAlign: 'center', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px'}}>
                          <p style={{fontSize: '12px', color: 'var(--text-muted)'}}>Total Litres Extracted</p>
                          <h4 style={{fontSize: '24px', color: '#fff'}}>{milkProduction.reduce((a,b)=>a+b.quantity, 0).toFixed(0)} Litres</h4>
                        </div>
                        <div style={{textAlign: 'center', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px'}}>
                          <p style={{fontSize: '12px', color: 'var(--text-muted)'}}>Farm Net Operating Cost</p>
                          <h4 style={{fontSize: '24px', color: 'var(--accent-error)'}}>₹{farmExpenses.reduce((a,b)=>a+b.amount, 0).toLocaleString()}</h4>
                        </div>
                        <div style={{textAlign: 'center', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px'}}>
                          <p style={{fontSize: '12px', color: 'var(--text-muted)'}}>Calculated Feed Cost per Litre</p>
                          <h4 style={{fontSize: '24px', color: 'var(--accent-farm)'}}>
                            ₹{(farmExpenses.filter(e=>e.category==='Feed').reduce((a,b)=>a+b.amount, 0) / Math.max(1, milkProduction.reduce((a,b)=>a+b.quantity, 0))).toFixed(2)} / L
                          </h4>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="glass-card warning" style={{textAlign: 'center'}}>
                    Permission Denied: Financial Reports Hidden
                  </div>
                )}

                {/* Expense List */}
                <div className="glass-card">
                  <div className="flex-between" style={{marginBottom: '16px'}}>
                    <h3>Expense Registry</h3>
                    {hasPermission('add') && (
                      <button className="btn btn-primary" onClick={() => setActiveModal('add-expense')}>
                        {icons.plus} Log Farm Expense
                      </button>
                    )}
                  </div>
                  <div className="table-container">
                    <table className="custom-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Category</th>
                          <th>Details</th>
                          <th>Vendor / Supplier</th>
                          <th>Amount</th>
                          <th>Receipt Attachment</th>
                        </tr>
                      </thead>
                      <tbody>
                        {farmExpenses.map(e => (
                          <tr key={e.id}>
                            <td>{e.date}</td>
                            <td><span className="badge dry">{e.category}</span></td>
                            <td>{e.details}</td>
                            <td>{e.supplier}</td>
                            <td style={{fontWeight: '700', color: 'var(--accent-error)'}}>₹{e.amount}</td>
                            <td>
                              <span className={`badge ${e.billAttached ? 'approved' : 'pending'}`}>
                                {e.billAttached ? 'Uploaded ✓' : 'No Receipt'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* ========================================================
                TAB 8: CONFIGURE PERMISSIONS
                ======================================================== */}
            {currentTab === 'permissions' && isOwner && (
              <div className="glass-card">
                <h3 style={{marginBottom: '16px'}}>Granular Access Permissions Control</h3>
                <p style={{fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px'}}>
                  Configure customized scopes dynamically for individual staff members below.
                </p>

                <div style={{display: 'flex', flexDirection: 'column', gap: '30px'}}>
                  {users.map(u => (
                    <div key={u.id} style={{padding: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-glass)', borderRadius: '12px'}}>
                      <div className="flex-between" style={{marginBottom: '16px'}}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                          <span style={{fontSize: '32px'}}>{u.avatar}</span>
                          <div>
                            <h4 style={{fontSize: '16px', color: '#fff'}}>{u.name}</h4>
                            <p style={{fontSize: '12px', color: 'var(--accent-shop)'}}>{u.role}</p>
                          </div>
                        </div>
                      </div>

                      {/* Permissions matrix */}
                      <div className="perms-grid">
                        {Object.keys(u.permissions).map(permKey => (
                          <div 
                            key={permKey} 
                            className={`perm-toggle-card ${u.permissions[permKey] ? 'active' : ''}`}
                            onClick={() => {
                              // Action to permanently toggle permission in user list
                              setUsers(prev => prev.map(usr => {
                                if (usr.id === u.id) {
                                  const updatedUser = {
                                    ...usr,
                                    permissions: { ...usr.permissions, [permKey]: !usr.permissions[permKey] }
                                  };
                                  if (activeUser.id === u.id) setActiveUser(updatedUser);
                                  return updatedUser;
                                }
                                return usr;
                              }));
                            }}
                          >
                            <span className="perm-toggle-label">{permKey.replace(/([A-Z])/g, ' $1')}</span>
                            <input 
                              type="checkbox" 
                              className="perm-checkbox"
                              checked={u.permissions[permKey]} 
                              readOnly 
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </>
        )}
      </main>

      {/* ========================================================
          3. DEVELOPMENT FLOATING CONTROLLER (ROLE & PERMISSIONS TESTING DECK)
          ======================================================== */}
      <div className={`dev-controller-deck ${isDevDeckCollapsed ? 'collapsed' : ''}`} onClick={() => { if (isDevDeckCollapsed) setIsDevDeckCollapsed(false); }}>
        {isDevDeckCollapsed ? (
          <span className="dev-toggle-icon">⚙️</span>
        ) : (
          <div>
            <div className="flex-between" style={{borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px', marginBottom: '12px'}}>
              <h4 style={{fontSize: '14px', color: 'var(--accent-finance)', display: 'flex', alignItems: 'center', gap: '6px'}}>
                <span>⚙️ Demo Control Deck</span>
              </h4>
              <button 
                className="btn btn-secondary" 
                style={{padding: '2px 6px', fontSize: '10px'}}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDevDeckCollapsed(true);
                }}
              >
                Hide
              </button>
            </div>

            <div className="form-group" style={{marginBottom: '12px'}}>
              <label className="form-label" style={{fontSize: '11px'}}>Simulated Active Role</label>
              <select 
                className="form-select" 
                style={{padding: '6px 10px', fontSize: '12px'}} 
                value={activeUser.id} 
                onChange={(e) => handleUserChange(e.target.value)}
              >
                {users.map(u => (
                  <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
                ))}
              </select>
            </div>

            {/* Quick permission toggles for selected user */}
            <div style={{marginTop: '10px'}}>
              <p style={{fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '8px'}}>Quick Toggle Session Permissions:</p>
              <div style={{display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '180px', overflowY: 'auto', paddingRight: '4px'}}>
                {Object.keys(activeUser.permissions).map(pKey => (
                  <label key={pKey} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', cursor: 'pointer', background: 'rgba(255,255,255,0.02)', padding: '4px 8px', borderRadius: '4px'}}>
                    <span>{pKey.replace(/([A-Z])/g, ' $1')}</span>
                    <input 
                      type="checkbox" 
                      checked={activeUser.permissions[pKey]} 
                      onChange={() => toggleActivePermission(pKey)}
                    />
                  </label>
                ))}
              </div>
            </div>
            <p style={{fontSize: '9px', color: 'var(--text-muted)', marginTop: '8px', textAlign: 'center'}}>
              Use this deck to test different users & restrict/grant permission states on-the-fly.
            </p>
          </div>
        )}
      </div>

      {/* ========================================================
          4. MODAL OVERLAYS
          ======================================================== */}
      {activeModal && (
        <div className="modal-overlay">
          
          {/* Modal: View Buffalo Profile */}
          {activeModal === 'view-buffalo' && selectedBuffalo && (
            <div className="modal-content">
              <div className="modal-header">
                <h3>Buffalo Profile: {selectedBuffalo.tagNumber}</h3>
                <button className="btn btn-secondary" style={{padding: '4px 8px'}} onClick={() => setActiveModal(null)}>Close</button>
              </div>
              <div className="modal-body" style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
                  <span style={{fontSize: '64px'}}>{selectedBuffalo.image}</span>
                  <div>
                    <h4>Breed: {selectedBuffalo.breed}</h4>
                    <p style={{fontSize: '13px', color: 'var(--text-muted)'}}>DOB: {selectedBuffalo.dob}</p>
                    <p style={{fontSize: '13px', color: 'var(--text-muted)'}}>Purchased: {selectedBuffalo.purchaseDate}</p>
                  </div>
                </div>
                
                {/* Stats */}
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px'}}>
                  <div style={{background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '8px'}}>
                    <p style={{fontSize: '11px', color: 'var(--text-muted)'}}>Current Status</p>
                    <span className={`badge ${selectedBuffalo.status.toLowerCase()}`}>{selectedBuffalo.status}</span>
                  </div>
                  <div style={{background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '8px'}}>
                    <p style={{fontSize: '11px', color: 'var(--text-muted)'}}>Cost</p>
                    <span style={{fontWeight: '700'}}>{hasPermission('viewPurchasePrices') ? `₹${selectedBuffalo.purchaseCost.toLocaleString()}` : '₹ *****'}</span>
                  </div>
                </div>

                {/* History list */}
                <div>
                  <h4 style={{fontSize: '14px', marginBottom: '8px'}}>Milk Yield History</h4>
                  <div className="table-container">
                    <table className="custom-table" style={{fontSize: '12px'}}>
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Morning</th>
                          <th>Evening</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedBuffalo.milkHistory.length === 0 ? (
                          <tr><td colSpan="3" style={{textAlign: 'center'}}>No yield recorded</td></tr>
                        ) : (
                          selectedBuffalo.milkHistory.map((h, i) => (
                            <tr key={i}>
                              <td>{h.date}</td>
                              <td>{h.morning} L</td>
                              <td>{h.evening} L</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Pregnancy / Breeding details */}
                <div>
                  <h4 style={{fontSize: '14px', marginBottom: '8px'}}>Breeding History</h4>
                  {selectedBuffalo.pregnancies.length === 0 ? (
                    <p style={{fontSize: '12px', color: 'var(--text-muted)'}}>No pregnancy logged.</p>
                  ) : (
                    selectedBuffalo.pregnancies.map((p, i) => (
                      <div key={i} style={{padding: '8px', background: 'rgba(245, 158, 11, 0.05)', border: '1px dashed var(--accent-warning)', borderRadius: '6px', fontSize: '12px'}}>
                        Calving Due: <strong>{p.expectedCalving}</strong> | Status: <span className="badge pregnant">{p.status}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Modal: Register Buffalo */}
          {activeModal === 'add-buffalo' && (
            <div className="modal-content">
              <div className="modal-header">
                <h3>Register Buffalo Profile</h3>
                <button className="btn btn-secondary" style={{padding: '4px 8px'}} onClick={() => setActiveModal(null)}>Cancel</button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                addBuffalo({
                  id: formData.get('tagNumber'),
                  tagNumber: formData.get('tagNumber'),
                  breed: formData.get('breed'),
                  dob: formData.get('dob'),
                  purchaseDate: formData.get('purchaseDate'),
                  purchaseCost: parseFloat(formData.get('purchaseCost')),
                  status: formData.get('status'),
                  image: "🐄",
                  milkHistory: [],
                  pregnancies: [],
                  healthRecords: []
                });
              }}>
                <div className="modal-body">
                  <div className="form-group">
                    <label className="form-label">Ear Tag Number</label>
                    <input className="form-input" name="tagNumber" placeholder="e.g. BUF-006" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Breed</label>
                    <select className="form-select" name="breed">
                      <option value="Murrah">Murrah</option>
                      <option value="Nili-Ravi">Nili-Ravi</option>
                      <option value="Jafarabadi">Jafarabadi</option>
                      <option value="Surti">Surti</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Date of Birth</label>
                    <input type="date" className="form-input" name="dob" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Purchase Date</label>
                    <input type="date" className="form-input" name="purchaseDate" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Purchase Cost (INR)</label>
                    <input type="number" className="form-input" name="purchaseCost" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <select className="form-select" name="status">
                      <option value="Milking">Milking</option>
                      <option value="Dry">Dry</option>
                      <option value="Pregnant">Pregnant</option>
                      <option value="Sick">Sick</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">Save Profile</button>
                </div>
              </form>
            </div>
          )}

          {/* Modal: Log Milk Production */}
          {activeModal === 'log-production' && (
            <div className="modal-content">
              <div className="modal-header">
                <h3>Record Milk Production Session</h3>
                <button className="btn btn-secondary" style={{padding: '4px 8px'}} onClick={() => setActiveModal(null)}>Cancel</button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                addProductionLog({
                  id: `log-${Date.now()}`,
                  date: formData.get('date'),
                  session: formData.get('session'),
                  quantity: parseFloat(formData.get('quantity')),
                  note: formData.get('note')
                });
              }}>
                <div className="modal-body">
                  <div className="form-group">
                    <label className="form-label">Date</label>
                    <input type="date" className="form-input" name="date" defaultValue="2026-07-24" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Session</label>
                    <select className="form-select" name="session">
                      <option value="Morning">Morning Milking</option>
                      <option value="Evening">Evening Milking</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Quantity Extracted (Litres)</label>
                    <input type="number" step="0.1" className="form-input" name="quantity" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Remarks</label>
                    <input className="form-input" name="note" placeholder="All cattle healthy..." />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">Save Log</button>
                </div>
              </form>
            </div>
          )}

          {/* Modal: Record Delivery & Distribution */}
          {activeModal === 'log-distribution' && (
            <DriverDistributionForm 
              outlets={outlets} 
              activeUser={activeUser} 
              onClose={() => setActiveModal(null)} 
              onSubmit={addDistributionLog} 
            />
          )}

          {/* Modal: Driver Payment Collection */}
          {activeModal === 'add-payment' && (
            <div className="modal-content">
              <div className="modal-header">
                <h3>Log Outlet Payment Collection</h3>
                <button className="btn btn-secondary" style={{padding: '4px 8px'}} onClick={() => setActiveModal(null)}>Cancel</button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                recordDriverPayment(
                  formData.get('paymentId'),
                  formData.get('amountCollected'),
                  formData.get('paymentMethod'),
                  formData.get('remarks')
                );
                setActiveModal(null);
              }}>
                <div className="modal-body">
                  <div className="form-group">
                    <label className="form-label">Select Delivery Bill</label>
                    <select className="form-select" name="paymentId">
                      {driverPayments.filter(p => p.amountCollected === 0).map(p => (
                        <option key={p.id} value={p.id}>{p.outletName} - Due: ₹{p.amountDue} ({p.date})</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Amount Collected (INR)</label>
                    <input type="number" className="form-input" name="amountCollected" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Collection Method</label>
                    <select className="form-select" name="paymentMethod">
                      <option value="Cash">Cash</option>
                      <option value="UPI">UPI</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Credit">Remaining Credit</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Collection Remarks</label>
                    <input className="form-input" name="remarks" placeholder="Paid full amount..." />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-success">Record Collection</button>
                </div>
              </form>
            </div>
          )}

          {/* Modal: New Shop Sale */}
          {activeModal === 'add-sale' && (
            <div className="modal-content">
              <div className="modal-header">
                <h3>New Retail Sale Entry</h3>
                <button className="btn btn-secondary" style={{padding: '4px 8px'}} onClick={() => setActiveModal(null)}>Cancel</button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const prodName = formData.get('product');
                const qtyVal = parseFloat(formData.get('qty'));
                const pInfo = products.find(p => p.name === prodName);
                if (pInfo) {
                  const rate = pInfo.sellingPrice;
                  addShopSale({
                    id: `sale-${Date.now()}`,
                    date: "2026-07-24",
                    product: prodName,
                    qty: qtyVal,
                    price: rate,
                    total: rate * qtyVal,
                    paymentMethod: formData.get('paymentMethod'),
                    customer: formData.get('customer') || 'Walk-in'
                  });
                }
              }}>
                <div className="modal-body">
                  <div className="form-group">
                    <label className="form-label">Product</label>
                    <select className="form-select" name="product">
                      {products.map(p => (
                        <option key={p.id} value={p.name}>{p.name} - ₹{p.sellingPrice} (Stock: {p.currentStock})</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Quantity</label>
                    <input type="number" step="0.1" className="form-input" name="qty" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Payment Method</label>
                    <select className="form-select" name="paymentMethod">
                      <option value="Cash">Cash</option>
                      <option value="UPI">UPI</option>
                      <option value="Credit">Credit Ledger</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Customer Name (Optional)</label>
                    <input className="form-input" name="customer" placeholder="Walk-in Customer" />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">Process Sale</button>
                </div>
              </form>
            </div>
          )}

          {/* Modal: New Shop Purchase */}
          {activeModal === 'add-purchase' && (
            <div className="modal-content">
              <div className="modal-header">
                <h3>Log Product Purchase Invoice</h3>
                <button className="btn btn-secondary" style={{padding: '4px 8px'}} onClick={() => setActiveModal(null)}>Cancel</button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const prodName = formData.get('product');
                const qtyVal = parseFloat(formData.get('qty'));
                const pInfo = products.find(p => p.name === prodName);
                if (pInfo) {
                  const rate = pInfo.purchasePrice;
                  addShopPurchase({
                    id: `pur-${Date.now()}`,
                    date: "2026-07-24",
                    supplier: formData.get('supplier'),
                    invoiceNo: formData.get('invoiceNo'),
                    product: prodName,
                    qty: qtyVal,
                    price: rate,
                    total: rate * qtyVal
                  });
                }
              }}>
                <div className="modal-body">
                  <div className="form-group">
                    <label className="form-label">Supplier Name</label>
                    <input className="form-input" name="supplier" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Invoice Number</label>
                    <input className="form-input" name="invoiceNo" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Product To Restock</label>
                    <select className="form-select" name="product">
                      {products.map(p => (
                        <option key={p.id} value={p.name}>{p.name} (Current: {p.currentStock})</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Invoice Quantity</label>
                    <input type="number" step="0.1" className="form-input" name="qty" required />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">Process Purchase</button>
                </div>
              </form>
            </div>
          )}

          {/* Modal: Add Farm Expense */}
          {activeModal === 'add-expense' && (
            <div className="modal-content">
              <div className="modal-header">
                <h3>Log Farm Expense</h3>
                <button className="btn btn-secondary" style={{padding: '4px 8px'}} onClick={() => setActiveModal(null)}>Cancel</button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                addFarmExpense({
                  id: `exp-${Date.now()}`,
                  date: formData.get('date'),
                  category: formData.get('category'),
                  details: formData.get('details'),
                  amount: parseFloat(formData.get('amount')),
                  supplier: formData.get('supplier'),
                  billAttached: formData.get('billAttached') === 'true'
                });
              }}>
                <div className="modal-body">
                  <div className="form-group">
                    <label className="form-label">Expense Date</label>
                    <input type="date" className="form-input" name="date" defaultValue="2026-07-24" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select className="form-select" name="category">
                      <option value="Feed">Cattle Feed</option>
                      <option value="Medicine">Veterinary Medicine</option>
                      <option value="Fuel">Fuel / Electricity</option>
                      <option value="Labor">Labor Wages</option>
                      <option value="Equipment">Equipment / Spares</option>
                      <option value="Other">Other Expenses</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Expense Details</label>
                    <input className="form-input" name="details" placeholder="Washing solution, green fodder..." required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Vendor / Payment Recipient</label>
                    <input className="form-input" name="supplier" placeholder="e.g. Kisan feeds store" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Amount (INR)</label>
                    <input type="number" className="form-input" name="amount" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Do you have receipt?</label>
                    <select className="form-select" name="billAttached">
                      <option value="true">Yes, upload copy (simulated)</option>
                      <option value="false">No receipt copy</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">Save Expense</button>
                </div>
              </form>
            </div>
          )}

        </div>
      )}

    </div>
  );
}

// --- Dynamic Driver Distribution Validator Component ---
function DriverDistributionForm({ outlets, activeUser, onClose, onSubmit }) {
  const [date, setDate] = useState("2026-07-24");
  const [session, setSession] = useState("Morning");
  const [collected, setCollected] = useState(200);
  
  // State for dynamic values of distribution
  const [shopQty, setShopQty] = useState(80);
  const [distributions, setDistributions] = useState(() => {
    return outlets.map(o => ({ outletName: o.name, qty: 0 }));
  });

  const handleQtyChange = (outletName, val) => {
    const numVal = parseFloat(val) || 0;
    setDistributions(prev => prev.map(d => {
      if (d.outletName === outletName) {
        return { ...d, qty: numVal };
      }
      return d;
    }));
  };

  // Calculations
  const distributedTotal = shopQty + distributions.reduce((acc, curr) => acc + curr.qty, 0);
  const diff = collected - distributedTotal;
  const isMatch = Math.abs(diff) < 0.01;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!isMatch) return; // safety check
    
    // Format distributed list
    const finalDist = [
      { destination: "Own Milk Shop", qty: shopQty },
      ...distributions.filter(d => d.qty > 0).map(d => ({ destination: d.outletName, qty: d.qty }))
    ];

    onSubmit({
      id: `dist-${Date.now()}`,
      date,
      session,
      collected,
      distributed: finalDist,
      driverName: activeUser.name,
      vehicle: "Bolero Pickup (MH-12-XX-1234)",
      isSettled: false
    });
  };

  return (
    <div className="modal-content">
      <div className="modal-header">
        <h3>Record Delivery & Distribution</h3>
        <button className="btn btn-secondary" style={{padding: '4px 8px'}} onClick={onClose}>Cancel</button>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="modal-body">
          
          <div className="dash-row" style={{marginBottom: '16px'}}>
            <div className="form-group">
              <label className="form-label">Milking Session Date</label>
              <input type="date" className="form-input" value={date} onChange={(e)=>setDate(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">Session</label>
              <select className="form-select" value={session} onChange={(e)=>setSession(e.target.value)}>
                <option value="Morning">Morning</option>
                <option value="Evening">Evening</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Total Milk Collected (Litres)</label>
            <input 
              type="number" 
              className="form-input" 
              value={collected} 
              onChange={(e)=>setCollected(parseFloat(e.target.value) || 0)} 
              required 
            />
          </div>

          <hr style={{border: 'none', borderTop: '1px solid var(--border-glass)', margin: '16px 0'}} />
          <h4 style={{fontSize: '14px', marginBottom: '12px'}}>Quantity Delivered To Outlets:</h4>

          <div className="form-group">
            <label className="form-label">Own Milk Shop (Litres)</label>
            <input 
              type="number" 
              className="form-input" 
              value={shopQty} 
              onChange={(e)=>setShopQty(parseFloat(e.target.value) || 0)} 
              required 
            />
          </div>

          {outlets.map(o => {
            const currentDist = distributions.find(d => d.outletName === o.name);
            return (
              <div className="form-group" key={o.id}>
                <label className="form-label">{o.name} (Rate: ₹{o.sellingPrice}/L)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  value={currentDist ? currentDist.qty : 0} 
                  onChange={(e) => handleQtyChange(o.name, e.target.value)} 
                  required 
                />
              </div>
            );
          })}

          <hr style={{border: 'none', borderTop: '1px solid var(--border-glass)', margin: '16px 0'}} />

          {/* DYNAMIC BALANCE VERIFICATION METER */}
          <div className={`balance-meter ${isMatch ? 'matched' : 'mismatch'}`}>
            <div style={{flexGrow: 1}}>
              <p style={{fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'inherit'}}>VERIFICATION STATUS</p>
              <h4 style={{fontSize: '16px', color: 'inherit'}}>
                {isMatch ? "✓ Quantities Match!" : `Mismatch of ${diff.toFixed(1)} Litres`}
              </h4>
              <p style={{fontSize: '12px', opacity: 0.8, color: 'inherit'}}>
                Collected: {collected} L | Distributed: {distributedTotal} L
              </p>
            </div>
            <span style={{fontSize: '24px'}}>{isMatch ? "✅" : "⚠️"}</span>
          </div>

          {!isMatch && (
            <p style={{fontSize: '12px', color: 'var(--accent-error)', textAlign: 'center', marginBottom: '10px'}}>
              Total Milk Collected MUST equal Total Milk Distributed before submission is unlocked.
            </p>
          )}

        </div>
        <div className="modal-footer">
          <button type="submit" className="btn btn-success" disabled={!isMatch} style={{opacity: isMatch ? 1 : 0.5, cursor: isMatch ? 'pointer' : 'not-allowed'}}>
            Save Delivery Log
          </button>
        </div>
      </form>
    </div>
  );
}
