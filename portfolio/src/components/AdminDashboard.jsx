import { useState, useEffect } from 'react';
import './AdminDashboard.css';

// Ultra-premium Mock Data for Dev Mode previews when Apps Script is not yet deployed
const MOCK_INQUIRIES = [
  {
    'Submission Date': '2026-05-31 14:20:10',
    'Inquiry Type': 'startup',
    'Name': 'Aditya Sen',
    'Company / Fund Name': 'EcoSphere Inc',
    'Website / Pitch URL': 'https://ecosphere.io',
    'Stage / Average Ticket Size': 'seed',
    'Focus / Sectors': 'CleanTech / EV',
    'Message': 'Building the next-gen decentralized carbon credit ledger. Looking for strategic advice and classroom scaling support to onboard enterprise pilots.',
    'Status': 'Pending'
  },
  {
    'Submission Date': '2026-05-31 11:05:45',
    'Inquiry Type': 'investor',
    'Name': 'Sarah Jenkins',
    'Company / Fund Name': 'Aether Ventures',
    'Website / Pitch URL': 'N/A',
    'Stage / Average Ticket Size': '50k-250k',
    'Focus / Sectors': 'AI, SaaS, B2B DeepTech',
    'Message': 'Interested in syndicating seed-stage deals with LYNQ Capital. We have a focus on B2B SaaS and would love to collaborate on co-investments.',
    'Status': 'Accepted'
  },
  {
    'Submission Date': '2026-05-30 16:45:22',
    'Inquiry Type': 'startup',
    'Name': 'Karthik Raja',
    'Company / Fund Name': 'Blulines Pay',
    'Website / Pitch URL': 'https://blulines.pay',
    'Stage / Average Ticket Size': 'growth',
    'Focus / Sectors': 'Fintech / Payments',
    'Message': 'Scaling unified cross-border payroll infrastructure. We have raised our Pre-Seed and are expanding operations across MENA. Need venture builder support.',
    'Status': 'Pending'
  }
];

const MOCK_BOOKINGS = [
  {
    'Booking Date': '2026-05-31 15:30:00',
    'Name': 'Rahul Mehta',
    'Email': 'rahul@mehta-partners.com',
    'Topic of Discussion': 'VC Syndication',
    'Selected Date': 'Mon Jun 15 2026',
    'Selected Time': '02:15 PM',
    'Duration (Mins)': '30',
    'Status': 'Pending'
  },
  {
    'Booking Date': '2026-05-31 09:12:14',
    'Name': 'Arman Malik',
    'Email': 'arman@fluxai.dev',
    'Topic of Discussion': 'Seed Funding Pitch',
    'Selected Date': 'Thu Jun 11 2026',
    'Selected Time': '10:30 AM',
    'Duration (Mins)': '15',
    'Status': 'Pending'
  }
];

const TIME_SLOTS = ['10:30 AM', '11:45 AM', '02:15 PM', '04:30 PM', '05:45 PM'];

export default function AdminDashboard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Data States
  const [inquiries, setInquiries] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isDevMode, setIsDevMode] = useState(false);

  // UI States
  const [activeTab, setActiveTab] = useState('inquiries'); // 'inquiries' or 'bookings'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null); // Detailed view modal
  const [crmLoading, setCrmLoading] = useState(false);
  const [crmSuccessMsg, setCrmSuccessMsg] = useState('');

  // Admin Calendar States
  const [viewDate, setViewDate] = useState(new Date(2026, 5, 1)); // June 2026 default
  const [adminSelectedDate, setAdminSelectedDate] = useState(null);
  const [calendarViewActive, setCalendarViewActive] = useState(true); // Toggle between Calendar and List view in bookings

  // Session check on mount
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('lynq_admin_auth');
    if (sessionAuth === 'true') {
      setIsLoggedIn(true);
      const savedEmail = sessionStorage.getItem('lynq_admin_email');
      const savedPass = sessionStorage.getItem('lynq_admin_pass');
      if (savedEmail && savedPass) {
        fetchSpreadsheetData(savedEmail, savedPass);
      }
    }
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (email !== 'shameelb2b@gmail.com' || password !== 'Shameel@Admin') {
      setError('Access Denied: Invalid credentials.');
      return;
    }

    setLoading(true);
    await fetchSpreadsheetData(email, password);
  };

  const fetchSpreadsheetData = async (userEmail, userPass) => {
    const scriptUrl = import.meta.env.VITE_APPS_SCRIPT_URL;

    if (!scriptUrl) {
      console.warn("VITE_APPS_SCRIPT_URL not found. Booting in Demo Mode with Mock Data.");
      setInquiries(MOCK_INQUIRIES);
      setBookings(MOCK_BOOKINGS);
      setIsLoggedIn(true);
      setIsDevMode(true);
      setLoading(false);
      
      sessionStorage.setItem('lynq_admin_auth', 'true');
      sessionStorage.setItem('lynq_admin_email', userEmail);
      sessionStorage.setItem('lynq_admin_pass', userPass);
      return;
    }

    try {
      const response = await fetch(
        `${scriptUrl}?email=${encodeURIComponent(userEmail)}&password=${encodeURIComponent(userPass)}`,
        { method: 'GET' }
      );
      const resData = await response.json();

      if (resData.status === 'success') {
        setInquiries(resData.inquiries || []);
        setBookings(resData.bookings || []);
        setIsLoggedIn(true);
        setIsDevMode(false);

        sessionStorage.setItem('lynq_admin_auth', 'true');
        sessionStorage.setItem('lynq_admin_email', userEmail);
        sessionStorage.setItem('lynq_admin_pass', userPass);
      } else if (resData.status === 'unauthorized') {
        setError('Cloud Authorization Failed: Incorrect credentials.');
      } else {
        setError(resData.message || 'An unexpected server error occurred.');
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError('Connection Error: Failed to communicate with Google Sheets. Check your VITE_APPS_SCRIPT_URL.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    sessionStorage.removeItem('lynq_admin_auth');
    sessionStorage.removeItem('lynq_admin_email');
    sessionStorage.removeItem('lynq_admin_pass');
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  // Two-way Status CRM Updates
  const handleUpdateStatus = async (newStatus) => {
    if (!selectedItem) return;
    
    setCrmLoading(true);
    setCrmSuccessMsg('');

    const targetType = selectedItem.type;
    const itemData = selectedItem.data;
    const timestamp = itemData['Submission Date'] || itemData['Booking Date'];
    const name = itemData['Name'];

    const scriptUrl = import.meta.env.VITE_APPS_SCRIPT_URL;

    // Local state updating helper
    const applyLocalStateUpdate = () => {
      if (targetType === 'inquiry') {
        setInquiries(prev => prev.map(item => {
          if (item['Submission Date'] === timestamp && item['Name'] === name) {
            return { ...item, 'Status': newStatus };
          }
          return item;
        }));
      } else {
        setBookings(prev => prev.map(item => {
          if (item['Booking Date'] === timestamp && item['Name'] === name) {
            return { ...item, 'Status': newStatus };
          }
          return item;
        }));
      }
      
      // Update active modal selected item context
      setSelectedItem(prev => ({
        ...prev,
        data: { ...prev.data, 'Status': newStatus }
      }));
    };

    if (isDevMode || !scriptUrl) {
      // Offline/Local dev mode updates state instantly
      setTimeout(() => {
        applyLocalStateUpdate();
        setCrmSuccessMsg(`Status successfully updated to ${newStatus}! (Local Sync Completed)`);
        setCrmLoading(false);
      }, 1000);
      return;
    }

    try {
      const payload = {
        type: 'updateStatus',
        dbType: targetType,
        timestamp: timestamp,
        name: name,
        status: newStatus
      };

      const response = await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      // Simple wait since no-cors requests do not expose response bodies
      setTimeout(() => {
        applyLocalStateUpdate();
        setCrmSuccessMsg(`Status updated to ${newStatus}! Sheet notification dispatched.`);
        setCrmLoading(false);
      }, 1200);

    } catch (err) {
      console.error("CRM Update failed:", err);
      setError('Connection Error: Failed to post updates back to Google Sheet.');
      setCrmLoading(false);
    }
  };

  // CSV Exporter
  const handleExportCSV = () => {
    let headers = [];
    let rows = [];
    let filename = '';

    if (activeTab === 'inquiries') {
      headers = ['Submission Date', 'Inquiry Type', 'Name', 'Company / Fund Name', 'Website / Pitch URL', 'Stage / Average Ticket Size', 'Focus / Sectors', 'Message', 'Status'];
      rows = inquiries.map(item => [
        item['Submission Date'] || '',
        item['Inquiry Type'] || 'N/A',
        item['Name'] || '',
        item['Company / Fund Name'] || '',
        item['Website / Pitch URL'] || '',
        item['Stage / Average Ticket Size'] || '',
        item['Focus / Sectors'] || '',
        item['Message'] || '',
        item['Status'] || 'Pending'
      ]);
      filename = `Inquiries_Report_${new Date().toISOString().slice(0,10)}.csv`;
    } else {
      headers = ['Booking Date', 'Name', 'Email', 'Topic of Discussion', 'Selected Date', 'Selected Time', 'Duration (Mins)', 'Status'];
      rows = bookings.map(item => [
        item['Booking Date'] || '',
        item['Name'] || '',
        item['Email'] || '',
        item['Topic of Discussion'] || '',
        item['Selected Date'] || '',
        item['Selected Time'] || '',
        item['Duration (Mins)'] || '',
        item['Status'] || 'Pending'
      ]);
      filename = `Bookings_Report_${new Date().toISOString().slice(0,10)}.csv`;
    }

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(val => `"${val.toString().replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Metrics
  const totalInquiries = inquiries.length;
  const totalBookings = bookings.length;
  const startupCount = inquiries.filter(i => {
    const type = (i['Inquiry Type'] || '').toLowerCase();
    return type.includes('startup');
  }).length;
  const investorCount = inquiries.filter(i => {
    const type = (i['Inquiry Type'] || '').toLowerCase();
    return type.includes('investor');
  }).length;

  // Search filter
  const filteredInquiries = inquiries.filter(item => {
    const searchStr = searchQuery.toLowerCase();
    return (
      (item['Name'] || '').toLowerCase().includes(searchStr) ||
      (item['Company / Fund Name'] || '').toLowerCase().includes(searchStr) ||
      (item['Focus / Sectors'] || '').toLowerCase().includes(searchStr) ||
      (item['Message'] || '').toLowerCase().includes(searchStr) ||
      (item['Status'] || 'Pending').toLowerCase().includes(searchStr)
    );
  });

  const filteredBookings = bookings.filter(item => {
    const searchStr = searchQuery.toLowerCase();
    
    // Direct calendar date filter taking precedence when set in Calendar view
    if (activeTab === 'bookings' && calendarViewActive && adminSelectedDate) {
      const selectedDateString = adminSelectedDate.toDateString();
      if (item['Selected Date'] !== selectedDateString) {
        return false;
      }
    }

    return (
      (item['Name'] || '').toLowerCase().includes(searchStr) ||
      (item['Email'] || '').toLowerCase().includes(searchStr) ||
      (item['Topic of Discussion'] || '').toLowerCase().includes(searchStr) ||
      (item['Status'] || 'Pending').toLowerCase().includes(searchStr)
    );
  });

  // Calendar Helpers
  const handlePrevMonth = () => {
    setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const renderCalendarDays = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const startOffset = firstDay === 0 ? 6 : firstDay - 1; // Mon is index 0

    const cells = [];

    for (let i = 0; i < startOffset; i++) {
      cells.push({ type: 'empty', id: `empty-${i}` });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(year, month, day);
      const dateString = dateObj.toDateString();
      
      // Calculate how many bookings are scheduled for this day
      const dayBookings = bookings.filter(b => b['Selected Date'] === dateString);
      
      cells.push({
        type: 'day',
        day,
        date: dateObj,
        bookings: dayBookings,
        id: `day-${day}`
      });
    }

    return cells;
  };

  // Login view rendering
  if (!isLoggedIn) {
    return (
      <div className="admin-login-wrapper">
        <div className="login-backdrop-glow" />
        <div className="login-glass-card">
          <div className="login-card-header">
            <div className="login-logo-mark">LQ</div>
            <h3>LYNQ OPERATIONS</h3>
            <p>Ecosystem Command Dashboard</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="admin-login-form">
            {error && (
              <div className="login-error-alert">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="alert-icon">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <div className="login-form-group">
              <label htmlFor="login-email">SECURE EMAIL IDENTIFIER</label>
              <div className="input-with-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="input-icon">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input
                  type="email"
                  id="login-email"
                  required
                  placeholder="e.g. name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="login-form-group">
              <label htmlFor="login-password">DECRYPTION SECURITY KEY</label>
              <div className="input-with-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="input-icon">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  type="password"
                  id="login-password"
                  required
                  placeholder="••••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="login-submit-btn">
              <span>{loading ? 'AUTHENTICATING OPERATIONS...' : 'BOOT SYSTEM'}</span>
              {!loading && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="btn-arrow">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              )}
            </button>
          </form>

          <div className="login-security-notice">
            <span>✦ CLOUD-ENCRYPTED DIRECT CHANNEL</span>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard view rendering
  return (
    <div className="admin-console-layout">
      {/* Dev Mode Banner */}
      {isDevMode && (
        <div className="dev-mode-alert-bar">
          <span>⚠️ <strong>DEVELOPMENT PREVIEW MODE</strong>: Communicating via local mockup. Set your Google Web App URL in environment variables to link live data.</span>
        </div>
      )}

      {/* Header */}
      <header className="console-header">
        <div className="console-title-group">
          <div className="console-badge">OPERATIONAL COMMAND</div>
          <h1>Ecosystem Intelligence Console</h1>
          <span className="console-subtitle">MOHAMMED SHAMEEL · LYNQ CAPITAL</span>
        </div>

        <div className="console-actions-group">
          <button onClick={() => window.location.hash = ''} className="console-nav-home-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>Exit Dashboard</span>
          </button>
          <button onClick={handleSignOut} className="console-sign-out-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Disconnect</span>
          </button>
        </div>
      </header>

      {/* Metrics Row */}
      <div className="console-metrics-row">
        <div className="metric-glass-card">
          <div className="metric-icon-circle purple">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div className="metric-vals">
            <h3>{totalInquiries}</h3>
            <span>Total Inquiries</span>
          </div>
        </div>

        <div className="metric-glass-card">
          <div className="metric-icon-circle green">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className="metric-vals">
            <h3>{totalBookings}</h3>
            <span>Calls Scheduled</span>
          </div>
        </div>

        <div className="metric-glass-card">
          <div className="metric-icon-circle blue">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div className="metric-vals">
            <h3>{startupCount}</h3>
            <span>Startups Registered</span>
          </div>
        </div>

        <div className="metric-glass-card">
          <div className="metric-icon-circle gold">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="metric-vals">
            <h3>{investorCount}</h3>
            <span>Investors Connected</span>
          </div>
        </div>
      </div>

      {/* Main Panel Controls */}
      <div className="console-main-container">
        <div className="console-toolbar">
          <div className="console-tabs-group">
            <button
              onClick={() => { setActiveTab('inquiries'); setSearchQuery(''); }}
              className={`console-tab-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
            >
              Inquiries Database ({filteredInquiries.length})
            </button>
            <button
              onClick={() => { setActiveTab('bookings'); setSearchQuery(''); }}
              className={`console-tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
            >
              Calendar Bookings ({filteredBookings.length})
            </button>
          </div>

          <div className="console-actions-right">
            {activeTab === 'bookings' && (
              <div className="calendar-subview-toggle">
                <button
                  type="button"
                  className={`subview-btn ${calendarViewActive ? 'active' : ''}`}
                  onClick={() => { setCalendarViewActive(true); setAdminSelectedDate(null); }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="subview-icon">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Calendar View
                </button>
                <button
                  type="button"
                  className={`subview-btn ${!calendarViewActive ? 'active' : ''}`}
                  onClick={() => { setCalendarViewActive(false); setAdminSelectedDate(null); }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="subview-icon">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                  Classic List
                </button>
              </div>
            )}

            <div className="console-search-wrapper">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="search-icon">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder={`Search records...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button onClick={handleExportCSV} className="console-export-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Database Split View for Calendar Bookings */}
        {activeTab === 'bookings' && calendarViewActive ? (
          <div className="console-calendar-workspace-split">
            {/* Visual Calendar Panel */}
            <div className="console-visual-calendar-card">
              <div className="admin-calendar-header">
                <button type="button" className="cal-nav-btn" onClick={handlePrevMonth} aria-label="Previous Month">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <h4 className="admin-calendar-month-title">
                  {viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h4>
                <button type="button" className="cal-nav-btn" onClick={handleNextMonth} aria-label="Next Month">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>

              <div className="admin-calendar-weekdays">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(w => (
                  <div key={w} className="admin-weekday-lbl">{w[0]}</div>
                ))}
              </div>

              <div className="admin-calendar-days-grid">
                {renderCalendarDays().map((cell, idx) => {
                  if (cell.type === 'empty') {
                    return <div key={cell.id} className="admin-calendar-day-empty" />;
                  }

                  const isSelected = adminSelectedDate && 
                    adminSelectedDate.getDate() === cell.day && 
                    adminSelectedDate.getMonth() === cell.date.getMonth() && 
                    adminSelectedDate.getFullYear() === cell.date.getFullYear();
                  
                  const hasBookings = cell.bookings.length > 0;

                  return (
                    <button
                      type="button"
                      key={cell.id}
                      className={`admin-calendar-day-btn ${isSelected ? 'selected' : ''} ${hasBookings ? 'has-bookings' : ''}`}
                      onClick={() => {
                        // Toggle selected date filter
                        if (isSelected) {
                          setAdminSelectedDate(null);
                        } else {
                          setAdminSelectedDate(cell.date);
                        }
                      }}
                    >
                      <span className="admin-day-number">{cell.day}</span>
                      {hasBookings && (
                        <span className="day-bookings-count-badge" title={`${cell.bookings.length} Call(s)`}>
                          {cell.bookings.length}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {adminSelectedDate && (
                <div className="calendar-filter-indicator-box">
                  <span>Filtered: <strong>{adminSelectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</strong></span>
                  <button type="button" className="clear-date-filter-btn" onClick={() => setAdminSelectedDate(null)}>
                    Clear Filter
                  </button>
                </div>
              )}
            </div>

            {/* Filtered Table list */}
            <div className="console-calendar-data-table-wrapper">
              {filteredBookings.length === 0 ? (
                <div className="table-empty-state">
                  <p>No calendar bookings scheduled for this date.</p>
                </div>
              ) : (
                <table className="console-data-table">
                  <thead>
                    <tr>
                      <th>CLIENT NAME</th>
                      <th>TOPIC</th>
                      <th>TIME (IST)</th>
                      <th>DURATION</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((item, idx) => (
                      <tr key={idx} onClick={() => setSelectedItem({ type: 'booking', data: item })}>
                        <td className="bold-col">{item['Name']}</td>
                        <td>{item['Topic of Discussion']}</td>
                        <td className="bold-col text-teal">{item['Selected Time']}</td>
                        <td>{item['Duration (Mins)']} Min Call</td>
                        <td>
                          <span className={`pill-badge status-pill ${((item['Status'] || 'Pending').toLowerCase())}`}>
                            {item['Status'] || 'Pending'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        ) : (
          /* Classic List View */
          <div className="console-table-viewport">
            {activeTab === 'inquiries' ? (
              filteredInquiries.length === 0 ? (
                <div className="table-empty-state">
                  <p>No inquiry records match the current filter criteria.</p>
                </div>
              ) : (
                <table className="console-data-table">
                  <thead>
                    <tr>
                      <th>SUBMISSION DATE</th>
                      <th>TYPE</th>
                      <th>NAME</th>
                      <th>COMPANY / FUND</th>
                      <th>STAGE / TICKET</th>
                      <th>WEBSITE / PITCH</th>
                      <th>STATUS</th>
                      <th>MESSAGE EXCERPT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInquiries.map((item, idx) => {
                      const type = (item['Inquiry Type'] || 'N/A').toLowerCase();
                      const isStartup = type.includes('startup');
                      return (
                        <tr key={idx} onClick={() => setSelectedItem({ type: 'inquiry', data: item })}>
                          <td className="time-col">{item['Submission Date']}</td>
                          <td>
                            <span className={`pill-badge ${isStartup ? 'startup' : 'investor'}`}>
                              {isStartup ? 'Startup' : 'Investor'}
                            </span>
                          </td>
                          <td className="bold-col">{item['Name']}</td>
                          <td>{item['Company / Fund Name']}</td>
                          <td>{item['Stage / Average Ticket Size']}</td>
                          <td className="link-col">
                            {item['Website / Pitch URL'] && item['Website / Pitch URL'] !== 'N/A' ? (
                              <a href={item['Website / Pitch URL']} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                {item['Website / Pitch URL'].substring(0, 24)}...
                              </a>
                            ) : 'N/A'}
                          </td>
                          <td>
                            <span className={`pill-badge status-pill ${((item['Status'] || 'Pending').toLowerCase())}`}>
                              {item['Status'] || 'Pending'}
                            </span>
                          </td>
                          <td className="msg-excerpt-col">{item['Message'] ? item['Message'].substring(0, 50) + '...' : 'N/A'}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )
            ) : (
              filteredBookings.length === 0 ? (
                <div className="table-empty-state">
                  <p>No calendar booking records match the current filter criteria.</p>
                </div>
              ) : (
                <table className="console-data-table">
                  <thead>
                    <tr>
                      <th>BOOKING TIMESTAMP</th>
                      <th>CLIENT NAME</th>
                      <th>EMAIL ADDRESS</th>
                      <th>TOPIC</th>
                      <th>SCHEDULED DATE</th>
                      <th>TIME (IST)</th>
                      <th>DURATION</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((item, idx) => (
                      <tr key={idx} onClick={() => setSelectedItem({ type: 'booking', data: item })}>
                        <td className="time-col">{item['Booking Date']}</td>
                        <td className="bold-col">{item['Name']}</td>
                        <td className="link-col">
                          <a href={`mailto:${item['Email']}`} onClick={(e) => e.stopPropagation()}>{item['Email']}</a>
                        </td>
                        <td>{item['Topic of Discussion']}</td>
                        <td>{item['Selected Date']}</td>
                        <td className="bold-col text-teal">{item['Selected Time']}</td>
                        <td>{item['Duration (Mins)']} Mins</td>
                        <td>
                          <span className={`pill-badge status-pill ${((item['Status'] || 'Pending').toLowerCase())}`}>
                            {item['Status'] || 'Pending'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
            )}
          </div>
        )}
      </div>

      {/* Detailed Modal Overlay with Two-Way CRM Controls */}
      {selectedItem && (
        <div className="console-modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="console-modal-card" onClick={(e) => e.stopPropagation()}>
            <header className="modal-header">
              <div className="modal-title-left">
                <span className="modal-stamp">{selectedItem.data['Submission Date'] || selectedItem.data['Booking Date']}</span>
                <h2>{selectedItem.data['Name']}</h2>
                <div className="modal-badges-row">
                  {selectedItem.type === 'inquiry' ? (
                    <span className={`pill-badge ${selectedItem.data['Inquiry Type'] === 'startup' ? 'startup' : 'investor'}`}>
                      {selectedItem.data['Inquiry Type'] === 'startup' ? 'Startup Founder' : 'Investor Partners'}
                    </span>
                  ) : (
                    <span className="pill-badge scheduler">Calendar Booking</span>
                  )}
                  <span className={`pill-badge status-pill ${((selectedItem.data['Status'] || 'Pending').toLowerCase())}`}>
                    {selectedItem.data['Status'] || 'Pending'}
                  </span>
                </div>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedItem(null)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </header>

            <div className="modal-body-content">
              {selectedItem.type === 'inquiry' ? (
                <>
                  <div className="modal-info-grid">
                    <div className="info-box">
                      <span className="lbl">COMPANY / FUND NAME</span>
                      <span className="val">{selectedItem.data['Company / Fund Name'] || 'N/A'}</span>
                    </div>

                    <div className="info-box">
                      <span className="lbl">
                        {selectedItem.data['Inquiry Type'] === 'startup' ? 'STAGE' : 'TICKET SIZE'}
                      </span>
                      <span className="val">{selectedItem.data['Stage / Average Ticket Size'] || 'N/A'}</span>
                    </div>

                    <div className="info-box">
                      <span className="lbl">
                        {selectedItem.data['Inquiry Type'] === 'startup' ? 'WEBSITE / DECK' : 'SECTORS / FOCUS'}
                      </span>
                      <span className="val text-normal-weight">
                        {selectedItem.data['Inquiry Type'] === 'startup' && selectedItem.data['Website / Pitch URL'] !== 'N/A' ? (
                          <a href={selectedItem.data['Website / Pitch URL']} target="_blank" rel="noopener noreferrer">
                            {selectedItem.data['Website / Pitch URL']}
                          </a>
                        ) : (
                          selectedItem.data['Focus / Sectors'] || 'N/A'
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="modal-message-box">
                    <span className="lbl">TRANSMITTED MESSAGE</span>
                    <p className="val msg-body">{selectedItem.data['Message']}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="modal-info-grid">
                    <div className="info-box">
                      <span className="lbl">EMAIL ADDRESS</span>
                      <span className="val text-normal-weight">
                        <a href={`mailto:${selectedItem.data['Email']}`}>{selectedItem.data['Email']}</a>
                      </span>
                    </div>

                    <div className="info-box">
                      <span className="lbl">TOPIC OF DISCUSSION</span>
                      <span className="val">{selectedItem.data['Topic of Discussion'] || 'N/A'}</span>
                    </div>

                    <div className="info-box">
                      <span className="lbl">DURATION</span>
                      <span className="val">{selectedItem.data['Duration (Mins)']} Minutes Strategy Session</span>
                    </div>
                  </div>

                  <div className="modal-booking-detail-card">
                    <span className="lbl">CONFIRMED MEETING TIME</span>
                    <div className="booking-time-badge">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="time-clock-icon">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <div>
                        <h3>{selectedItem.data['Selected Date']}</h3>
                        <p>{selectedItem.data['Selected Time']} (India Standard Time · IST)</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* TWO-WAY OPERATIONAL CRM ACTIONS BAR */}
              <div className="modal-crm-controls-section">
                <span className="lbl">OPERATIONAL DISPOSITION</span>
                
                {crmSuccessMsg && (
                  <div className="crm-success-alert">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="check-success-icon">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{crmSuccessMsg}</span>
                  </div>
                )}

                <div className="crm-actions-buttons-row">
                  <button
                    type="button"
                    disabled={crmLoading}
                    onClick={() => handleUpdateStatus('Accepted')}
                    className={`crm-btn accept-btn ${selectedItem.data['Status'] === 'Accepted' ? 'active' : ''}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="crm-btn-icon">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Accept
                  </button>

                  <button
                    type="button"
                    disabled={crmLoading}
                    onClick={() => handleUpdateStatus('Busy')}
                    className={`crm-btn busy-btn ${selectedItem.data['Status'] === 'Busy' ? 'active' : ''}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="crm-btn-icon">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                    Mark Busy
                  </button>

                  <button
                    type="button"
                    disabled={crmLoading}
                    onClick={() => handleUpdateStatus('Declined')}
                    className={`crm-btn decline-btn ${selectedItem.data['Status'] === 'Declined' ? 'active' : ''}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="crm-btn-icon">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    Decline
                  </button>
                </div>
                
                {crmLoading && (
                  <div className="crm-loading-spinner-row">
                    <span className="spinner-decor"></span>
                    <span>Syncing status changes with cloud spreadsheet...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
