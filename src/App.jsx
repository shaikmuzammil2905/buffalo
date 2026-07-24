import React, { useState, useEffect, useRef } from 'react';
import * as mockData from './mockData';

export default function App() {
  // --- Persistent Local Database State ---
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('buf_users');
    return saved ? JSON.parse(saved) : mockData.initialUsers;
  });

  const [activeUser, setActiveUser] = useState(() => {
    const savedId = localStorage.getItem('buf_active_user_id') || 'owner-1';
    const found = users.find(u => u.id === savedId);
    return found || users[0];
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('buf_is_logged_in') === 'true';
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

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('buf_tasks');
    return saved ? JSON.parse(saved) : mockData.initialTasks;
  });

  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem('buf_attendance');
    return saved ? JSON.parse(saved) : mockData.initialAttendance;
  });

  // --- UI Layout & Control States ---
  const [currentTab, setCurrentTab] = useState('dashboard'); // dashboard, animals, production, distribution, shop, workers, finance, permissions, settings
  const [isDevDeckCollapsed, setIsDevDeckCollapsed] = useState(true);
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('buf_theme') || 'dark');
  const [tabLoading, setTabLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(() => localStorage.getItem('buf_remember_me') === 'true');

  // --- Authentication Screen Views ---
  const [authView, setAuthView] = useState('login'); // login, forgot, verify, reset
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [resetEmailAddress, setResetEmailAddress] = useState('');
  const [verificationCodeInput, setVerificationCodeInput] = useState('');
  const [newPasswordVal, setNewPasswordVal] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [sessionCodeGenerated, setSessionCodeGenerated] = useState('');

  // --- Modals state ---
  const [activeModal, setActiveModal] = useState(null); // add-buffalo, view-buffalo, log-production, log-distribution, add-sale, add-purchase, add-expense, add-employee, edit-employee, change-password
  const [selectedBuffalo, setSelectedBuffalo] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // --- Session Timeout Tracker ---
  const lastActiveTime = useRef(Date.now());
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);

  // --- Toast Alerts Notifications Roster ---
  const [toasts, setToasts] = useState([]);
  const showToast = (title, message, type = 'success') => {
    const id = Date.now() + Math.random().toString();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Sync to local storage
  useEffect(() => { localStorage.setItem('buf_users', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('buf_active_user_id', activeUser.id); }, [activeUser]);
  useEffect(() => { localStorage.setItem('buf_buffalos', JSON.stringify(buffalos)); }, [buffalos]);
  useEffect(() => { localStorage.setItem('buf_outlets', JSON.stringify(outlets)); }, [outlets]);
  useEffect(() => { localStorage.setItem('buf_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('buf_milk_production', JSON.stringify(milkProduction)); }, [milkProduction]);
  useEffect(() => { localStorage.setItem('buf_milk_distribution', JSON.stringify(milkDistribution)); }, [milkDistribution]);
  useEffect(() => { localStorage.setItem('buf_driver_payments', JSON.stringify(driverPayments)); }, [driverPayments]);
  useEffect(() => { localStorage.setItem('buf_driver_settlements', JSON.stringify(driverSettlements)); }, [driverSettlements]);
  useEffect(() => { localStorage.setItem('buf_shop_sales', JSON.stringify(shopSales)); }, [shopSales]);
  useEffect(() => { localStorage.setItem('buf_shop_purchases', JSON.stringify(shopPurchases)); }, [shopPurchases]);
  useEffect(() => { localStorage.setItem('buf_workers', JSON.stringify(workers)); }, [workers]);
  useEffect(() => { localStorage.setItem('buf_farm_expenses', JSON.stringify(farmExpenses)); }, [farmExpenses]);
  useEffect(() => { localStorage.setItem('buf_tasks', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem('buf_attendance', JSON.stringify(attendance)); }, [attendance]);
  
  useEffect(() => {
    localStorage.setItem('buf_is_logged_in', isLoggedIn ? 'true' : 'false');
    localStorage.setItem('buf_remember_me', rememberMe ? 'true' : 'false');
  }, [isLoggedIn, rememberMe]);

  // Theme apply
  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
    localStorage.setItem('buf_theme', theme);
  }, [theme]);

  // Tab change loading mock delay
  const handleTabChange = (tabName) => {
    setTabLoading(true);
    setCurrentTab(tabName);
    setTimeout(() => {
      setTabLoading(false);
    }, 450);
  };

  // --- Session Timeout Detection ---
  useEffect(() => {
    if (!isLoggedIn) return;

    const handleUserActivity = () => {
      lastActiveTime.current = Date.now();
      if (showTimeoutWarning) {
        setShowTimeoutWarning(false);
      }
    };

    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keypress', handleUserActivity);
    window.addEventListener('click', handleUserActivity);

    const interval = setInterval(() => {
      const elapsed = Date.now() - lastActiveTime.current;
      
      // Warning at 4 minutes (240s)
      if (elapsed > 4 * 60 * 1000 && !showTimeoutWarning) {
        setShowTimeoutWarning(true);
        showToast("Inactivity Warning", "You will be logged out in 60 seconds due to inactivity.", "warning");
      }
      
      // Logout at 5 minutes (300s)
      if (elapsed > 5 * 60 * 1000) {
        handleLogout();
        showToast("Session Expired", "You have been logged out due to inactivity.", "error");
      }
    }, 15000);

    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keypress', handleUserActivity);
      window.removeEventListener('click', handleUserActivity);
      clearInterval(interval);
    };
  }, [isLoggedIn, showTimeoutWarning]);

  // --- Authentication Handlers ---
  const handleLogin = (e) => {
    e.preventDefault();
    setTabLoading(true);
    
    setTimeout(() => {
      const user = users.find(u => u.email.toLowerCase().trim() === loginEmail.toLowerCase().trim());
      
      if (!user) {
        setTabLoading(false);
        showToast("Login Failed", "No account registered with this email.", "error");
        return;
      }

      if (user.status !== "Active") {
        setTabLoading(false);
        showToast("Account Inactive", "Your account has been deactivated. Contact Owner.", "warning");
        return;
      }

      if (user.password !== loginPassword) {
        setTabLoading(false);
        showToast("Login Failed", "Incorrect password entered.", "error");
        return;
      }

      // Success
      setActiveUser(user);
      setIsLoggedIn(true);
      setLoginPassword('');
      setTabLoading(false);
      showToast("Access Granted", `Welcome back, ${user.name}!`, "success");

      // Update last login
      setUsers(prev => prev.map(u => {
        if (u.id === user.id) {
          return { ...u, lastLogin: new Date().toISOString().replace('T', ' ').substring(0, 19) };
        }
        return u;
      }));

      // Route
      if (user.role === 'Owner') setCurrentTab('dashboard');
      else setCurrentTab('dashboard'); // custom employee workbench route is handles dynamically in the layout tabs
    }, 600);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    if (!rememberMe) {
      localStorage.removeItem('buf_active_user_id');
    }
    showToast("Logged Out", "Session closed successfully.", "info");
  };

  // Forgot password request code
  const handleForgotPasswordRequest = (e) => {
    e.preventDefault();
    const user = users.find(u => u.email.toLowerCase().trim() === resetEmailAddress.toLowerCase().trim());
    if (!user) {
      showToast("Account Not Found", "No registered profile matches this email.", "error");
      return;
    }

    setTabLoading(true);
    setTimeout(() => {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setSessionCodeGenerated(code);
      setTabLoading(false);
      setAuthView('verify');
      showToast("Verification Sent", `Security Reset Code sent to ${resetEmailAddress}!`, "info");
      // Deliver code directly via toast alert for interactive simulator ease
      setTimeout(() => {
        showToast("Security Key Code", `Your 6-digit reset code is: ${code}`, "warning");
      }, 1000);
    }, 1000);
  };

  // Verify Reset Code
  const handleVerifyCode = (e) => {
    e.preventDefault();
    if (verificationCodeInput === sessionCodeGenerated) {
      setAuthView('reset');
      showToast("Code Verified", "Please setup your new password.", "success");
    } else {
      showToast("Code Error", "The verification code you entered is invalid.", "error");
    }
  };

  // Password reset submit
  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPasswordVal !== newPasswordConfirm) {
      showToast("Password Mismatch", "Passwords do not match.", "error");
      return;
    }

    setUsers(prev => prev.map(u => {
      if (u.email.toLowerCase().trim() === resetEmailAddress.toLowerCase().trim()) {
        return { ...u, password: newPasswordVal };
      }
      return u;
    }));

    showToast("Success", "Password updated successfully. Please login.", "success");
    setAuthView('login');
    setResetEmailAddress('');
    setVerificationCodeInput('');
    setNewPasswordVal('');
    setNewPasswordConfirm('');
  };

  // User Profile Change Password
  const handleProfileChangePassword = (e) => {
    e.preventDefault();
    const current = e.target.currentPassword.value;
    const newPass = e.target.newPassword.value;
    const confirmPass = e.target.confirmNewPassword.value;

    if (activeUser.password !== current) {
      showToast("Authentication Error", "Current password is correct.", "error");
      return;
    }

    if (newPass !== confirmPass) {
      showToast("Mismatch Error", "Passwords do not match.", "error");
      return;
    }

    setUsers(prev => prev.map(u => {
      if (u.id === activeUser.id) {
        const updated = { ...u, password: newPass };
        setActiveUser(updated);
        return updated;
      }
      return u;
    }));

    showToast("Password Saved", "Your password has been changed.", "success");
    setActiveModal(null);
  };

  // --- Dynamic Permissions and RBAC guards ---
  const isOwner = activeUser.role === 'Owner';
  const isManager = activeUser.role === 'Farm Manager';
  const isShopKeeper = activeUser.role === 'Shop Keeper';
  const isDriver = activeUser.role === 'Driver';
  const isWorker = activeUser.role === 'Worker';

  const hasPermission = (permName) => {
    return activeUser.permissions[permName] === true;
  };

  const getModuleAccess = (tabName) => {
    // Owner bypasses everything
    if (isOwner) return true;

    // Direct dynamic permission toggles check
    if (!hasPermission('view')) return false;

    switch (tabName) {
      case 'dashboard':
        return true; // Everyone sees their own dashboard tab (Owner Dashboard or personalized Employee workbench)
      case 'animals':
      case 'production':
        return isManager || hasPermission('viewFarm');
      case 'distribution':
        return isDriver || hasPermission('viewLogistics');
      case 'shop':
        return isShopKeeper || hasPermission('viewShop');
      case 'workers':
        return isManager || hasPermission('viewWorkers');
      case 'finance':
        return hasPermission('viewFinancials');
      case 'permissions':
      case 'settings':
        return false; // Owner only settings
      default:
        return false;
    }
  };

  // --- Owner Operations user CRUD ---
  const handleAddEmployee = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      showToast("Error", "An employee with this email already exists.", "error");
      return;
    }

    const newEmp = {
      id: `emp-${Date.now()}`,
      employeeId: `EMP-0${users.length + 1}`,
      name: formData.get('name'),
      email: email,
      phone: formData.get('phone'),
      password: formData.get('password'),
      role: formData.get('role'),
      department: formData.get('department'),
      status: "Active",
      lastLogin: "Never",
      avatar: "🧑‍🌾",
      permissions: {
        view: true,
        add: false,
        edit: false,
        delete: false,
        export: false,
        viewFinancials: false,
        viewSellingPrices: false,
        viewPurchasePrices: false,
        viewInventoryValue: false
      }
    };

    setUsers(prev => [...prev, newEmp]);
    showToast("Employee Added", `${newEmp.name} registered as ${newEmp.role}.`, "success");
    setActiveModal(null);
  };

  const handleEditEmployee = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    setUsers(prev => prev.map(u => {
      if (u.id === selectedEmployee.id) {
        return {
          ...u,
          name: formData.get('name'),
          phone: formData.get('phone'),
          role: formData.get('role'),
          department: formData.get('department'),
          status: formData.get('status')
        };
      }
      return u;
    }));

    showToast("Success", "Employee details updated.", "success");
    setActiveModal(null);
    setSelectedEmployee(null);
  };

  const handleDeleteEmployee = (id) => {
    const userToDelete = users.find(u => u.id === id);
    if (userToDelete && userToDelete.role === 'Owner') {
      showToast("Action Blocked", "System must preserve Owner profiles.", "error");
      return;
    }

    setUsers(prev => prev.filter(u => u.id !== id));
    showToast("Deleted", "Employee record removed.", "info");
  };

  const handleResetUserPassword = (userId) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        showToast("Password Reset", `Password for ${u.name} set to "buffalo123".`, "info");
        return { ...u, password: "buffalo123" };
      }
      return u;
    }));
  };

  // --- Dynamic Permissions Grid toggle ---
  const handleTogglePermissions = (userId, permKey) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const updated = {
          ...u,
          permissions: { ...u.permissions, [permKey]: !u.permissions[permKey] }
        };
        if (activeUser.id === userId) setActiveUser(updated);
        return updated;
      }
      return u;
    }));
    showToast("Permission Saved", "Dynamic access levels updated.", "success");
  };

  // --- Workers desk tasks operations ---
  const handleTaskStatusUpdate = (taskId, newStatus) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        let progVal = t.progress;
        if (newStatus === 'Completed') progVal = 100;
        if (newStatus === 'Pending') progVal = 0;
        
        return { ...t, status: newStatus, progress: progVal };
      }
      return t;
    }));
    showToast("Task Updated", `Status updated to ${newStatus}`, "info");
  };

  const handleTaskProgressChange = (taskId, progressVal) => {
    const numProgVal = parseInt(progressVal);
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        let statusVal = t.status;
        if (numProgVal === 100) {
          statusVal = 'Completed';
          showToast("Task Finished", `Task "${t.taskName}" marked 100% complete!`, "success");
        } else if (numProgVal > 0) {
          statusVal = 'In Progress';
        } else {
          statusVal = 'Pending';
        }
        return { ...t, progress: numProgVal, status: statusVal };
      }
      return t;
    }));
  };

  // --- Attendance logging ---
  const handleWorkerCheckIn = () => {
    const today = new Date().toISOString().substring(0, 10);
    const existing = attendance.find(a => a.employeeId === activeUser.employeeId && a.date === today);
    
    if (existing) {
      showToast("Checked In Already", "You have already logged attendance for today.", "warning");
      return;
    }

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newAtt = {
      id: `att-${Date.now()}`,
      employeeId: activeUser.employeeId,
      employeeName: activeUser.name,
      date: today,
      status: "Present",
      checkInTime: time,
      checkOutTime: "—"
    };

    setAttendance(prev => [newAtt, ...prev]);
    showToast("Checked In", `Attendance logged at ${time}. Enjoy your shift!`, "success");
  };

  // --- Database System Backups & Restores ---
  const handleBackupDatabase = () => {
    const fullDbState = {
      buf_users: users,
      buf_buffalos: buffalos,
      buf_outlets: outlets,
      buf_products: products,
      buf_milk_production: milkProduction,
      buf_milk_distribution: milkDistribution,
      buf_driver_payments: driverPayments,
      buf_driver_settlements: driverSettlements,
      buf_shop_sales: shopSales,
      buf_shop_purchases: shopPurchases,
      buf_workers: workers,
      buf_farm_expenses: farmExpenses,
      buf_tasks: tasks,
      buf_attendance: attendance
    };

    const text = JSON.stringify(fullDbState, null, 2);
    const blob = new Blob([text], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `buffalo_dairy_db_backup_${new Date().toISOString().substring(0, 10)}.json`;
    a.click();
    showToast("Database Backup", "JSON backup download triggered successfully.", "success");
  };

  const handleRestoreDatabase = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target.result);
        
        // Validation checks
        if (parsed.buf_users && parsed.buf_buffalos && parsed.buf_products) {
          setUsers(parsed.buf_users);
          setBuffalos(parsed.buf_buffalos);
          setOutlets(parsed.buf_outlets);
          setProducts(parsed.buf_products);
          setMilkProduction(parsed.buf_milk_production);
          setMilkDistribution(parsed.buf_milk_distribution);
          setDriverPayments(parsed.buf_driver_payments);
          setDriverSettlements(parsed.buf_driver_settlements);
          setShopSales(parsed.buf_shop_sales);
          setShopPurchases(parsed.buf_shop_purchases);
          setWorkers(parsed.buf_workers);
          setFarmExpenses(parsed.buf_farm_expenses);
          setTasks(parsed.buf_tasks || []);
          setAttendance(parsed.buf_attendance || []);

          showToast("Restore Successful", "Database entities mapped successfully.", "success");
          
          // Re-validate session user
          const sessionUserId = activeUser.id;
          const found = parsed.buf_users.find(u => u.id === sessionUserId);
          if (found) setActiveUser(found);
          else setActiveUser(parsed.buf_users[0]);
        } else {
          showToast("Error", "Invalid backup file structure.", "error");
        }
      } catch (err) {
        showToast("Error", "Failed parsing database JSON file.", "error");
      }
    };
    reader.readAsText(file);
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
    settings: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    bell: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    plus: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    search: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    export: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    check: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
  };

  // --- Dynamic Notification alerts checklist loader ---
  const alerts = [];
  products.forEach(p => {
    if (p.currentStock <= p.minimumStock) {
      alerts.push({ id: `noti-p-${p.id}`, title: "Low Shop Stock", message: `${p.name} is running low (${p.currentStock} remaining)`, type: "warning" });
    }
  });
  buffalos.forEach(b => {
    if (b.status === 'Sick') {
      alerts.push({ id: `noti-b-${b.id}`, title: "Sick Animal Alert", message: `Buffalo tag ${b.tagNumber} is sick.`, type: "error" });
    }
  });

  // =========================================================================
  // VIEW RENDERER: AUTHENTICATION FLOWS (Gated Access Check)
  // =========================================================================
  if (!isLoggedIn) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'var(--bg-dark)',
        backgroundImage: 'radial-gradient(at 0% 0%, rgba(16, 185, 129, 0.08) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(6, 182, 212, 0.08) 0px, transparent 50%)',
        fontFamily: 'var(--font-sans)',
        padding: '20px'
      }}>
        {/* Toast Drawer overlay */}
        <ToastContainer toasts={toasts} />

        {authView === 'login' && (
          <div className="glass-card" style={{ width: '100%', maxWidth: '420px', padding: '40px 30px', border: '1px solid var(--border-glass)' }}>
            <div style={{textAlign: 'center', marginBottom: '24px'}}>
              <span style={{fontSize: '54px', animation: 'float 3s ease-in-out infinite', display: 'inline-block'}}>🐄</span>
              <h2 style={{fontSize: '24px', fontWeight: '800', marginTop: '12px', background: 'linear-gradient(135deg, #ffffff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                Buffalo Dairy Farm OS
              </h2>
              <p style={{fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px'}}>Sign in to your work panel</p>
            </div>

            <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="name@buffalo.com" 
                  value={loginEmail} 
                  onChange={(e) => setLoginEmail(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-group">
                <div className="flex-between">
                  <label className="form-label">Password</label>
                  <span 
                    style={{fontSize: '11px', color: 'var(--text-highlight)', cursor: 'pointer', fontWeight: '600'}}
                    onClick={() => setAuthView('forgot')}
                  >
                    Forgot Password?
                  </span>
                </div>
                <input 
                  type="password" 
                  className="form-input" 
                  placeholder="••••••••" 
                  value={loginPassword} 
                  onChange={(e) => setLoginPassword(e.target.value)} 
                  required 
                />
              </div>

              <label style={{display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: 'var(--text-body)', cursor: 'pointer', margin: '4px 0'}}>
                <input 
                  type="checkbox" 
                  checked={rememberMe} 
                  onChange={(e) => setRememberMe(e.target.checked)} 
                  style={{width: '15px', height: '15px'}} 
                />
                Remember my session on this device
              </label>

              <button type="submit" className="btn btn-primary" style={{width: '100%', padding: '12px', fontSize: '15px', marginTop: '8px'}} disabled={tabLoading}>
                {tabLoading ? <span className="shimmer" style={{padding: '0 10px'}}>Connecting...</span> : "Sign In"}
              </button>
            </form>

            <div style={{borderTop: '1px solid var(--border-glass)', paddingTop: '20px', marginTop: '24px'}}>
              <p style={{fontSize: '10px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', textAlign: 'center'}}>
                Simulator Demo Accounts (Click to Fill)
              </p>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px'}}>
                <button className="btn btn-secondary" style={{padding: '6px 8px', fontSize: '11px', whiteSpace: 'nowrap'}} onClick={() => { setLoginEmail('owner1@buffalo.com'); setLoginPassword('owner123'); }}>
                  👑 Owner 1
                </button>
                <button className="btn btn-secondary" style={{padding: '6px 8px', fontSize: '11px', whiteSpace: 'nowrap'}} onClick={() => { setLoginEmail('owner2@buffalo.com'); setLoginPassword('owner123'); }}>
                  👑 Owner 2
                </button>
                <button className="btn btn-secondary" style={{padding: '6px 8px', fontSize: '11px', whiteSpace: 'nowrap'}} onClick={() => { setLoginEmail('manager@buffalo.com'); setLoginPassword('manager123'); }}>
                  🚜 Farm Manager
                </button>
                <button className="btn btn-secondary" style={{padding: '6px 8px', fontSize: '11px', whiteSpace: 'nowrap'}} onClick={() => { setLoginEmail('shopkeeper@buffalo.com'); setLoginPassword('shop123'); }}>
                  🏪 Shop Keeper
                </button>
                <button className="btn btn-secondary" style={{padding: '6px 8px', fontSize: '11px', whiteSpace: 'nowrap'}} onClick={() => { setLoginEmail('driver@buffalo.com'); setLoginPassword('driver123'); }}>
                  🚚 Driver
                </button>
                <button className="btn btn-secondary" style={{padding: '6px 8px', fontSize: '11px', whiteSpace: 'nowrap'}} onClick={() => { setLoginEmail('worker@buffalo.com'); setLoginPassword('worker123'); }}>
                  🧑‍🌾 Worker
                </button>
              </div>
            </div>
          </div>
        )}

        {authView === 'forgot' && (
          <div className="glass-card" style={{ width: '100%', maxWidth: '420px', padding: '40px 30px', border: '1px solid var(--border-glass)' }}>
            <h3 style={{fontSize: '20px', marginBottom: '8px'}}>Reset Password</h3>
            <p style={{fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '20px'}}>Enter your email and we'll send you a simulation code to reset your password.</p>
            
            <form onSubmit={handleForgotPasswordRequest} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="name@buffalo.com" 
                  value={resetEmailAddress} 
                  onChange={(e) => setResetEmailAddress(e.target.value)} 
                  required 
                />
              </div>

              <div style={{display: 'flex', gap: '10px'}}>
                <button type="button" className="btn btn-secondary" style={{flex: 1}} onClick={() => setAuthView('login')} disabled={tabLoading}>
                  Back
                </button>
                <button type="submit" className="btn btn-primary" style={{flex: 2}} disabled={tabLoading}>
                  Send Verification
                </button>
              </div>
            </form>
          </div>
        )}

        {authView === 'verify' && (
          <div className="glass-card" style={{ width: '100%', maxWidth: '420px', padding: '40px 30px', border: '1px solid var(--border-glass)' }}>
            <h3 style={{fontSize: '20px', marginBottom: '8px'}}>Verify Security Key</h3>
            <p style={{fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '20px'}}>
              We generated a simulated security code. Check the slide-out notification on the top right, copy the code, and enter it below:
            </p>
            
            <form onSubmit={handleVerifyCode} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
              <div className="form-group">
                <label className="form-label">6-Digit Verification Code</label>
                <input 
                  type="text" 
                  maxLength="6"
                  className="form-input" 
                  placeholder="Enter code" 
                  value={verificationCodeInput} 
                  onChange={(e) => setVerificationCodeInput(e.target.value)} 
                  style={{textAlign: 'center', fontSize: '20px', letterSpacing: '0.2em', fontWeight: '800'}}
                  required 
                />
              </div>

              <div style={{display: 'flex', gap: '10px'}}>
                <button type="button" className="btn btn-secondary" style={{flex: 1}} onClick={() => setAuthView('forgot')}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{flex: 2}}>
                  Verify Code
                </button>
              </div>
            </form>
          </div>
        )}

        {authView === 'reset' && (
          <div className="glass-card" style={{ width: '100%', maxWidth: '420px', padding: '40px 30px', border: '1px solid var(--border-glass)' }}>
            <h3 style={{fontSize: '20px', marginBottom: '8px'}}>Enter New Password</h3>
            <p style={{fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '20px'}}>Configure a secure password for account: <strong>{resetEmailAddress}</strong></p>
            
            <form onSubmit={handleResetPassword} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
              <div className="form-group">
                <label className="form-label">New Password</label>
                <input 
                  type="password" 
                  className="form-input" 
                  placeholder="••••••••" 
                  value={newPasswordVal} 
                  onChange={(e) => setNewPasswordVal(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Confirm New Password</label>
                <input 
                  type="password" 
                  className="form-input" 
                  placeholder="••••••••" 
                  value={newPasswordConfirm} 
                  onChange={(e) => setNewPasswordConfirm(e.target.value)} 
                  required 
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{width: '100%'}}>
                Update Password
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // VIEW RENDERER: MAIN ERP APP CONTAINER
  // =========================================================================
  return (
    <div className="app-container">
      
      {/* Dynamic Toast Alert overlay popup stack */}
      <ToastContainer toasts={toasts} />

      {/* Warning modal for inactivity timeout */}
      {showTimeoutWarning && (
        <div className="modal-overlay" style={{zIndex: '2200'}}>
          <div className="glass-card" style={{width: '100%', maxWidth: '400px', padding: '30px', border: '1px solid var(--accent-warning)', textAlign: 'center'}}>
            <span style={{fontSize: '48px'}}>⏰</span>
            <h3 style={{color: 'var(--accent-warning)', margin: '14px 0'}}>Session Timeout Warning</h3>
            <p style={{fontSize: '13px', color: 'var(--text-body)', marginBottom: '20px'}}>
              You have been idle for 4 minutes. You will be logged out in 60 seconds.
            </p>
            <button className="btn btn-primary" onClick={() => { lastActiveTime.current = Date.now(); setShowTimeoutWarning(false); }}>
              Extend Session
            </button>
          </div>
        </div>
      )}

      {/* 1. SIDEBAR NAVIGATION WRAPPER */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-icon">🐄</span>
          <div className="brand-name">Buffalo Dairy</div>
        </div>

        <div className="user-badge">
          <span className="user-badge-avatar">{activeUser.avatar || "🧑‍🌾"}</span>
          <div className="user-badge-info">
            <h4 style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '140px'}}>{activeUser.name}</h4>
            <p>{activeUser.role}</p>
          </div>
        </div>

        <ul className="nav-menu">
          {/* Universal Workbench Tab */}
          <li className={`nav-item ${currentTab === 'dashboard' ? 'active' : ''}`} onClick={() => handleTabChange('dashboard')}>
            {icons.dashboard} {isOwner ? "Owner Dashboard" : "My Dashboard"}
          </li>

          {/* Conditional Navigation Elements based on dynamic RBAC policies */}
          {getModuleAccess('animals') && (
            <li className={`nav-item ${currentTab === 'animals' ? 'active' : ''}`} onClick={() => handleTabChange('animals')}>
              {icons.animal} Buffalo Profiles
            </li>
          )}

          {getModuleAccess('production') && (
            <li className={`nav-item ${currentTab === 'production' ? 'active' : ''}`} onClick={() => handleTabChange('production')}>
              {icons.milk} Milk Production
            </li>
          )}

          {getModuleAccess('distribution') && (
            <li className={`nav-item ${currentTab === 'distribution' ? 'active' : ''}`} onClick={() => handleTabChange('distribution')}>
              {icons.truck} Logistics & Delivery
            </li>
          )}

          {getModuleAccess('shop') && (
            <li className={`nav-item ${currentTab === 'shop' ? 'active' : ''}`} onClick={() => handleTabChange('shop')}>
              {icons.shop} Milk Shop
            </li>
          )}

          {getModuleAccess('workers') && (
            <li className={`nav-item ${currentTab === 'workers' ? 'active' : ''}`} onClick={() => handleTabChange('workers')}>
              {icons.worker} Worker Attendance
            </li>
          )}

          {getModuleAccess('finance') && (
            <li className={`nav-item ${currentTab === 'finance' ? 'active' : ''}`} onClick={() => handleTabChange('finance')}>
              {icons.finance} Business Finance
            </li>
          )}

          {/* Administrative Settings Dashboard */}
          {isOwner && (
            <>
              <li className={`nav-item ${currentTab === 'permissions' ? 'active' : ''}`} onClick={() => handleTabChange('permissions')}>
                {icons.key} Access Matrix (RBAC)
              </li>
              <li className={`nav-item ${currentTab === 'settings' ? 'active' : ''}`} onClick={() => handleTabChange('settings')}>
                {icons.settings} System Settings
              </li>
            </>
          )}

          {/* Logout Action */}
          <li className="nav-item" onClick={handleLogout} style={{marginTop: 'auto', color: 'var(--accent-error)'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg> 
            Logout Session
          </li>
        </ul>

        <div className="nav-footer" style={{fontSize: '11px', color: 'var(--text-muted)', padding: '12px'}}>
          ERP Engine v2.0
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE VIEWPORT VIEW */}
      <main className="main-viewport">
        
        {/* HEADER AREA */}
        <header className="top-header">
          <div>
            <h2>
              {currentTab === 'dashboard' && (isOwner ? 'Owner Dashboard' : 'Employee Workbench')}
              {currentTab === 'animals' && 'Animal Profile Directory'}
              {currentTab === 'production' && 'Farm Milk Production Ledger'}
              {currentTab === 'distribution' && 'Collection & Distribution Module'}
              {currentTab === 'shop' && 'Milk Shop Management'}
              {currentTab === 'workers' && 'Worker Operations & Attendance'}
              {currentTab === 'finance' && 'Consolidated Finance & P&L'}
              {currentTab === 'permissions' && 'User Access Permissions Grid'}
              {currentTab === 'settings' && 'System Configuration & Backups'}
            </h2>
            <p style={{fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px'}}>Session Date: Friday, 24 July 2026</p>
          </div>
          
          <div className="top-header-actions">
            {/* Theme selector toggle */}
            <div className="theme-switch-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} title="Toggle Light/Dark Theme">
              {theme === 'dark' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              )}
            </div>

            {/* Notification Drawer */}
            <div className="notification-bell" onClick={() => setShowNotificationCenter(!showNotificationCenter)}>
              {icons.bell}
              {alerts.length > 0 && <span className="notification-count">{alerts.length}</span>}
            </div>

            {/* Profile trigger */}
            <div 
              style={{cursor: 'pointer', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px'}} 
              onClick={() => setActiveModal('change-password')}
              title="Change Password"
            >
              🔑
            </div>

            {showNotificationCenter && (
              <div className="notification-panel">
                <div className="notification-header">
                  <h3>Alert Reminders ({alerts.length})</h3>
                  <button className="btn btn-secondary" style={{padding: '4px 8px', fontSize: '11px'}} onClick={() => setShowNotificationCenter(false)}>Close</button>
                </div>
                <div className="notification-list">
                  {alerts.length === 0 ? (
                    <div style={{padding: '20px', textAlign: 'center', color: 'var(--text-muted)'}}>No active alerts!</div>
                  ) : (
                    alerts.map(n => (
                      <div key={n.id} className="notification-item unread">
                        <span className="notification-item-icon">{n.type === 'warning' ? '⚠️' : '🚨'}</span>
                        <div className="notification-item-content">
                          <p style={{fontWeight: '600', color: 'var(--text-title)'}}>{n.title}</p>
                          <p style={{color: 'var(--text-body)', fontSize: '12px'}}>{n.message}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </header>

        {/* =========================================================================
            LOADING / ACCESS BLOCKED ROUTE GUARDS
            ========================================================================= */}
        {tabLoading ? (
          <TabLoadingSkeleton />
        ) : !getModuleAccess(currentTab) ? (
          <AccessDeniedView moduleName={currentTab} />
        ) : (
          <>
            {/* ========================================================
                TAB 1: DYNAMIC DASHBOARD (Owner Dashboard vs Employee workbench)
                ======================================================== */}
            {currentTab === 'dashboard' && (
              isOwner ? (
                /* OWNER DASHBOARD PANEL */
                <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                  <div className="metrics-grid">
                    <div className="glass-card farm">
                      <div className="metric-card">
                        <span className="metric-label">Total Milk Today</span>
                        <span className="metric-value">
                          {milkProduction.filter(m => m.date === '2026-07-24').reduce((a,b)=>a+b.quantity, 0).toFixed(1)} Litres
                        </span>
                        <span className="metric-footer">Morning + Evening yield</span>
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
                        {driverSettlements.filter(s => s.status === 'Pending').length > 0 ? (
                          driverSettlements.filter(s => s.status === 'Pending').map(s => (
                            <div key={s.id} style={{padding: '12px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid var(--accent-warning)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                              <div>
                                <p style={{fontWeight: '600'}}>Driver Settlement Approval Required</p>
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

                        <div style={{padding: '12px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid var(--accent-error)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                          <div>
                            <p style={{fontWeight: '600'}}>Veterinary Deworming Schedule</p>
                            <p style={{fontSize: '12px', color: 'var(--text-muted)'}}>3 Animals (BUF-001, BUF-003, BUF-005) vaccines due this week.</p>
                          </div>
                          <button className="btn btn-secondary" style={{padding: '6px 12px', fontSize: '12px'}} onClick={() => handleTabChange('animals')}>Roster</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* STAFF PERSONALIZED WORKBENCH PANEL */
                <EmployeeDashboardView 
                  activeUser={activeUser}
                  tasks={tasks}
                  attendance={attendance}
                  onCheckIn={handleWorkerCheckIn}
                  onStatusUpdate={handleTaskStatusUpdate}
                  onProgressChange={handleTaskProgressChange}
                  showToast={showToast}
                />
              )
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
                          <td style={{fontWeight: '700'}}>
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
                          <td style={{fontWeight: '600'}}>{m.date}</td>
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
                TAB 4: LOGISTICS & DISTRIBUTION
                ======================================================== */}
            {currentTab === 'distribution' && (
              <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
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
                        showToast("Settlement Submitted", "Daily settlement sent for approval.", "success");
                      }}>
                        ✅ Submit Daily Settlement to Owner
                      </button>
                    </div>
                  </div>
                )}

                <div className="dash-row">
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
                              <td style={{fontWeight: '600'}}>{o.name}</td>
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
              </div>
            )}

            {/* ========================================================
                TAB 5: MILK SHOP
                ======================================================== */}
            {currentTab === 'shop' && (
              <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
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
                      <span className="metric-footer">Restock needed</span>
                    </div>
                  </div>
                  <div className="glass-card finance">
                    <div className="metric-card">
                      <span className="metric-label">Purchases Processed Today</span>
                      <span className="metric-value">₹{shopPurchases.filter(p=>p.date==='2026-07-24').reduce((a,b)=>a+b.total, 0)}</span>
                      <span className="metric-footer">Stock refilled</span>
                    </div>
                  </div>
                </div>

                {hasPermission('add') && (
                  <div style={{display: 'flex', gap: '12px'}}>
                    <button className="btn btn-primary" onClick={() => setActiveModal('add-sale')}>
                      🛍️ New Retail Sale Entry
                    </button>
                    <button className="btn btn-secondary" onClick={() => setActiveModal('add-purchase')}>
                      📦 Log Product Purchase Invoice
                    </button>
                  </div>
                )}

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
                            <td style={{fontWeight: '700'}}>{p.name}</td>
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
              </div>
            )}

            {/* ========================================================
                TAB 6: WORKER OPERATIONS
                ======================================================== */}
            {currentTab === 'workers' && (
              <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
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
                            <td style={{fontWeight: '700'}}>🧑‍🌾 {w.name}</td>
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
              </div>
            )}

            {/* ========================================================
                TAB 7: BUSINESS FINANCE
                ======================================================== */}
            {currentTab === 'finance' && (
              <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                {hasPermission('viewFinancials') ? (
                  <>
                    <div className="metrics-grid">
                      <div className="glass-card farm">
                        <div className="metric-card">
                          <span className="metric-label">Consolidated Income</span>
                          <span className="metric-value" style={{color: 'var(--accent-farm)'}}>
                            ₹{(shopSales.reduce((a,b)=>a+b.total, 0) + driverPayments.reduce((a,b)=>a+b.amountCollected, 0)).toLocaleString()}
                          </span>
                          <span className="metric-footer">Shop + Driver collections</span>
                        </div>
                      </div>
                      <div className="glass-card warning">
                        <div className="metric-card">
                          <span className="metric-label">Total Expenses</span>
                          <span className="metric-value" style={{color: 'var(--accent-error)'}}>
                            ₹{farmExpenses.reduce((a,b)=>a+b.amount, 0).toLocaleString()}
                          </span>
                          <span className="metric-footer">Feed, wages & medicines</span>
                        </div>
                      </div>
                      <div className="glass-card finance">
                        <div className="metric-card">
                          <span className="metric-label">Overall Profit / Loss</span>
                          <span className="metric-value">
                            ₹{(shopSales.reduce((a,b)=>a+b.total, 0) + driverPayments.reduce((a,b)=>a+b.amountCollected, 0) - farmExpenses.reduce((a,b)=>a+b.amount, 0)).toLocaleString()}
                          </span>
                          <span className="metric-footer">Calculated ledger net</span>
                        </div>
                      </div>
                    </div>

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
                              <th>Vendor</th>
                              <th>Amount</th>
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
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                ) : (
                  <AccessDeniedView moduleName="Finance" />
                )}
              </div>
            )}

            {/* ========================================================
                TAB 8: CONFIGURE PERMISSIONS (RBAC Dashboard)
                ======================================================== */}
            {currentTab === 'permissions' && isOwner && (
              <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                
                {/* Employee Directory Section */}
                <div className="glass-card">
                  <div className="flex-between" style={{marginBottom: '16px'}}>
                    <h3>Employee Directory</h3>
                    <button className="btn btn-primary" onClick={() => setActiveModal('add-employee')}>
                      {icons.plus} Register New Employee
                    </button>
                  </div>

                  <div className="table-container">
                    <table className="custom-table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Department</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map(u => (
                          <tr key={u.id}>
                            <td>{u.employeeId}</td>
                            <td style={{fontWeight: '700'}}>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.role}</td>
                            <td>{u.department}</td>
                            <td>
                              <span className={`badge ${u.status === 'Active' ? 'approved' : 'sick'}`}>{u.status}</span>
                            </td>
                            <td>
                              <div style={{display: 'flex', gap: '8px'}}>
                                <button className="btn btn-secondary" style={{padding: '4px 8px', fontSize: '11px'}} onClick={() => { setSelectedEmployee(u); setActiveModal('edit-employee'); }}>Edit</button>
                                <button className="btn btn-secondary" style={{padding: '4px 8px', fontSize: '11px', color: 'var(--accent-warning)'}} onClick={() => handleResetUserPassword(u.id)}>Reset Pass</button>
                                {u.role !== 'Owner' && (
                                  <button className="btn btn-danger" style={{padding: '4px 8px', fontSize: '11px'}} onClick={() => handleDeleteEmployee(u.id)}>Delete</button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Permissions matrix Grid */}
                <div className="glass-card">
                  <h3 style={{marginBottom: '16px'}}>Dynamic Access Control Matrix</h3>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                    {users.map(u => (
                      <div key={u.id} style={{padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-glass)', borderRadius: '10px'}}>
                        <div className="flex-between" style={{marginBottom: '12px'}}>
                          <h4 style={{fontSize: '14px'}}>{u.name} ({u.role})</h4>
                          <span style={{fontSize: '12px', color: 'var(--text-muted)'}}>{u.email}</span>
                        </div>
                        <div className="perms-grid">
                          {Object.keys(u.permissions).map(permKey => (
                            <div 
                              key={permKey} 
                              className={`perm-toggle-card ${u.permissions[permKey] ? 'active' : ''}`}
                              onClick={() => handleTogglePermissions(u.id, permKey)}
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

              </div>
            )}

            {/* ========================================================
                TAB 9: SYSTEM SETTINGS (Backup / Restore)
                ======================================================== */}
            {currentTab === 'settings' && isOwner && (
              <div className="glass-card" style={{maxWidth: '600px'}}>
                <h3 style={{marginBottom: '16px'}}>System Management Settings</h3>
                
                <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                  <div style={{padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-glass)', borderRadius: '8px'}}>
                    <h4>Data Storage Backups</h4>
                    <p style={{fontSize: '12.5px', color: 'var(--text-muted)', margin: '6px 0 16px 0'}}>
                      Download a JSON snapshot of the local database or restore a previous snapshot configuration.
                    </p>
                    
                    <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
                      <button className="btn btn-primary" onClick={handleBackupDatabase}>
                        📥 Download Backup (.json)
                      </button>
                      <label className="btn btn-secondary" style={{display: 'inline-block', margin: 0, cursor: 'pointer'}}>
                        📤 Upload Restore (.json)
                        <input type="file" accept=".json" onChange={handleRestoreDatabase} style={{display: 'none'}} />
                      </label>
                    </div>
                  </div>

                  <div style={{padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-glass)', borderRadius: '8px'}}>
                    <h4>System Properties</h4>
                    <p style={{fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '4px'}}>
                      ERP Engine: version 2.0-stable | Connection Status: Online (localStorage DB)
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* 3. SIMULATOR DEMO CONTROLLER DECK */}
      <div className={`dev-controller-deck ${isDevDeckCollapsed ? 'collapsed' : ''}`} onClick={() => { if (isDevDeckCollapsed) setIsDevDeckCollapsed(false); }}>
        {isDevDeckCollapsed ? (
          <span className="dev-toggle-icon">⚙️</span>
        ) : (
          <div>
            <div className="flex-between" style={{borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px', marginBottom: '12px'}}>
              <h4 style={{fontSize: '13px', color: 'var(--accent-finance)'}}>⚙️ Demo Access Deck</h4>
              <button className="btn btn-secondary" style={{padding: '2px 6px', fontSize: '10px'}} onClick={(e) => { e.stopPropagation(); setIsDevDeckCollapsed(true); }}>Hide</button>
            </div>
            
            <div className="form-group">
              <label className="form-label" style={{fontSize: '11px'}}>Active Simulator Account</label>
              <select className="form-select" style={{fontSize: '12px', padding: '6px'}} value={activeUser.id} onChange={(e) => handleUserChange(e.target.value)}>
                {users.map(u => (
                  <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
                ))}
              </select>
            </div>
            <p style={{fontSize: '9.5px', color: 'var(--text-muted)', marginTop: '8px', textAlign: 'center'}}>
              Easily swap active accounts to see view permissions instantly!
            </p>
          </div>
        )}
      </div>

      {/* ========================================================
          4. POPUP MODALS OVERLAYS
          ======================================================== */}
      {activeModal && (
        <div className="modal-overlay">
          
          {/* Modal: Add Employee */}
          {activeModal === 'add-employee' && (
            <div className="modal-content">
              <div className="modal-header">
                <h3>Add Employee Profile</h3>
                <button className="btn btn-secondary" style={{padding: '4px 8px'}} onClick={() => setActiveModal(null)}>Cancel</button>
              </div>
              <form onSubmit={handleAddEmployee}>
                <div className="modal-body">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input className="form-input" name="name" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-input" name="email" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input className="form-input" name="phone" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Default Password</label>
                    <input type="password" className="form-input" name="password" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">System Role</label>
                    <select className="form-select" name="role">
                      <option value="Farm Manager">Farm Manager</option>
                      <option value="Shop Keeper">Shop Keeper</option>
                      <option value="Driver">Driver</option>
                      <option value="Worker">Worker</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Department</label>
                    <input className="form-input" name="department" required />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">Save Profile</button>
                </div>
              </form>
            </div>
          )}

          {/* Modal: Edit Employee */}
          {activeModal === 'edit-employee' && selectedEmployee && (
            <div className="modal-content">
              <div className="modal-header">
                <h3>Edit Employee: {selectedEmployee.name}</h3>
                <button className="btn btn-secondary" style={{padding: '4px 8px'}} onClick={() => { setActiveModal(null); setSelectedEmployee(null); }}>Cancel</button>
              </div>
              <form onSubmit={handleEditEmployee}>
                <div className="modal-body">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input className="form-input" name="name" defaultValue={selectedEmployee.name} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input className="form-input" name="phone" defaultValue={selectedEmployee.phone} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Role</label>
                    <select className="form-select" name="role" defaultValue={selectedEmployee.role}>
                      <option value="Owner">Owner</option>
                      <option value="Farm Manager">Farm Manager</option>
                      <option value="Shop Keeper">Shop Keeper</option>
                      <option value="Driver">Driver</option>
                      <option value="Worker">Worker</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Department</label>
                    <input className="form-input" name="department" defaultValue={selectedEmployee.department} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Account Status</label>
                    <select className="form-select" name="status" defaultValue={selectedEmployee.status}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">Update Profile</button>
                </div>
              </form>
            </div>
          )}

          {/* Modal: Change Password in profile */}
          {activeModal === 'change-password' && (
            <div className="modal-content">
              <div className="modal-header">
                <h3>Change Account Password</h3>
                <button className="btn btn-secondary" style={{padding: '4px 8px'}} onClick={() => setActiveModal(null)}>Cancel</button>
              </div>
              <form onSubmit={handleProfileChangePassword}>
                <div className="modal-body">
                  <div className="form-group">
                    <label className="form-label">Current Password</label>
                    <input type="password" name="currentPassword" className="form-input" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">New Password</label>
                    <input type="password" name="newPassword" className="form-input" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Confirm New Password</label>
                    <input type="password" name="confirmNewPassword" className="form-input" required />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">Update Password</button>
                </div>
              </form>
            </div>
          )}

          {/* Existing Modal: View Buffalo */}
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
              </div>
            </div>
          )}

          {/* Existing Modal: Add Buffalo */}
          {activeModal === 'add-buffalo' && (
            <div className="modal-content">
              <div className="modal-header">
                <h3>Register Buffalo Profile</h3>
                <button className="btn btn-secondary" style={{padding: '4px 8px'}} onClick={() => setActiveModal(null)}>Cancel</button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                setBuffalos(prev => [{
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
                }, ...prev]);
                showToast("Success", "Registered new animal tag.", "success");
                setActiveModal(null);
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

        </div>
      )}

    </div>
  );
}

// =========================================================================
// SUB-COMPONENT: TOAST DRAWER NOTIFICATION CONTAINER
// =========================================================================
function ToastContainer({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast-alert ${t.type}`}>
          <div style={{flexGrow: 1}}>
            <p className="toast-title">{t.title}</p>
            <p className="toast-message">{t.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// =========================================================================
// SUB-COMPONENT: DYNAMIC SKELETON LOADER
// =========================================================================
function TabLoadingSkeleton() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '20px', width: '100%'}}>
      <div className="skeleton-box skeleton-header" />
      <div className="metrics-grid">
        <div className="skeleton-box skeleton-card" />
        <div className="skeleton-box skeleton-card" />
        <div className="skeleton-box skeleton-card" />
      </div>
      <div className="skeleton-box" style={{height: '240px', width: '100%', borderRadius: '12px'}} />
    </div>
  );
}

// =========================================================================
// SUB-COMPONENT: RESTRICTED ACCESS SCREEN
// =========================================================================
function AccessDeniedView({ moduleName }) {
  return (
    <div className="glass-card access-denied-container">
      <div className="lock-icon-wrapper">
        <div className="lock-glow" />
        <svg className="lock-svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>
      <h2 style={{color: 'var(--accent-error)', fontSize: '22px', fontWeight: '800'}}>Access Denied</h2>
      <p style={{color: 'var(--text-muted)', fontSize: '14px', maxWidth: '440px', marginTop: '10px', lineHeight: '1.5'}}>
        Your account is currently restricted from viewing the <strong>{moduleName.toUpperCase()}</strong> module. 
        If you require operational access to this route, please submit a request to your System Administrator.
      </p>
    </div>
  );
}

// =========================================================================
// SUB-COMPONENT: STAFF PERSONALIZED WORKBENCH VIEW
// =========================================================================
function EmployeeDashboardView({ activeUser, tasks, attendance, onCheckIn, onStatusUpdate, onProgressChange, showToast }) {
  const myTasks = tasks.filter(t => t.employeeId === activeUser.employeeId);
  const myAttendance = attendance.filter(a => a.employeeId === activeUser.employeeId);

  const pendingCount = myTasks.filter(t => t.status !== 'Completed').length;
  const completedCount = myTasks.filter(t => t.status === 'Completed').length;
  
  // Calculate performance index score
  const score = myTasks.length > 0 ? Math.round((completedCount / myTasks.length) * 100) : 100;

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
      
      {/* Welcome Shift Bar */}
      <div className="glass-card finance" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px'}}>
        <div>
          <h3 style={{fontSize: '20px'}}>Hello, {activeUser.name}!</h3>
          <p style={{fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '2px'}}>Your active shift is running: 07:00 AM - 05:00 PM</p>
        </div>
        <button className="btn btn-success" onClick={onCheckIn}>
          ⏰ Log Attendance check-in
        </button>
      </div>

      {/* Metric summaries */}
      <div className="metrics-grid">
        <div className="glass-card">
          <div className="metric-card">
            <span className="metric-label">Assigned Tasks</span>
            <span className="metric-value">{myTasks.length}</span>
            <span className="metric-footer">Active shift total</span>
          </div>
        </div>
        <div className="glass-card warning">
          <div className="metric-card">
            <span className="metric-label">Pending / Active</span>
            <span className="metric-value" style={{color: 'var(--accent-warning)'}}>{pendingCount}</span>
            <span className="metric-footer">Needs attention</span>
          </div>
        </div>
        <div className="glass-card farm">
          <div className="metric-card">
            <span className="metric-label">Efficiency Index</span>
            <span className="metric-value" style={{color: 'var(--accent-farm)'}}>{score}%</span>
            <span className="metric-footer">Completed vs assigned tasks</span>
          </div>
        </div>
      </div>

      <div className="dash-row">
        
        {/* Left Column: Tasks manager with slider */}
        <div className="glass-card" style={{flexGrow: 2}}>
          <h3 style={{marginBottom: '16px'}}>My Assigned Task Queue</h3>
          
          {myTasks.length === 0 ? (
            <div style={{padding: '30px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px'}}>No tasks assigned to your roster.</div>
          ) : (
            <div style={{display: 'flex', flexDirection: 'column', gap: '14px'}}>
              {myTasks.map(t => (
                <div key={t.id} style={{padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-glass)', borderRadius: '8px'}}>
                  <div className="flex-between">
                    <h4 style={{fontSize: '14px'}}>{t.taskName}</h4>
                    <select 
                      className="form-select" 
                      style={{width: '120px', padding: '4px 8px', fontSize: '11px'}}
                      value={t.status}
                      onChange={(e) => onStatusUpdate(t.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <p style={{fontSize: '12px', color: 'var(--text-muted)', margin: '6px 0 12px 0'}}>{t.description}</p>
                  
                  {/* Slider Progress Bar */}
                  <div>
                    <div className="flex-between" style={{fontSize: '11px', marginBottom: '4px'}}>
                      <span>Completion: <strong>{t.progress}%</strong></span>
                      <span>Target: {t.dueDate}</span>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={t.progress} 
                        onChange={(e) => onProgressChange(t.id, e.target.value)}
                        style={{flexGrow: 1, cursor: 'pointer', accentColor: 'var(--accent-farm)'}}
                      />
                      {t.progress === 100 && <span style={{fontSize: '16px'}} title="Completed task">✅</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Attendance logs & Profile info */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
          <div className="glass-card">
            <h3>Attendance Log History</h3>
            <div className="table-container" style={{marginTop: '12px'}}>
              <table className="custom-table" style={{fontSize: '12px'}}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Punch In</th>
                  </tr>
                </thead>
                <tbody>
                  {myAttendance.length === 0 ? (
                    <tr><td colSpan="3" style={{textAlign: 'center'}}>No check-ins registered</td></tr>
                  ) : (
                    myAttendance.map(a => (
                      <tr key={a.id}>
                        <td>{a.date}</td>
                        <td><span className="badge present">Present</span></td>
                        <td>{a.checkInTime}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="glass-card warning">
            <h3>Shift Safety Policies</h3>
            <ul style={{fontSize: '12px', color: 'var(--text-body)', paddingLeft: '16px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px'}}>
              <li>Always wear gloves during dairy extraction.</li>
              <li>Report animal sickness triggers immediately to the supervisor.</li>
              <li>Ensure all milk canisters are sealed and serialized.</li>
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
}
