import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Bars3Icon,
  XMarkIcon,
  MoonIcon,
  SunIcon,
  UserCircleIcon,
  ChartBarIcon,
  PresentationChartBarIcon,
  MapIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const handleLogout = () => navigate('/');

  const navItems = [
    { 
      label: 'Dashboard', 
      path: '/dashboard',
      icon: ChartBarIcon,
      description: 'Client compliance overview'
    },
    { 
      label: 'Overview', 
      path: '/overview',
      icon: PresentationChartBarIcon,
      description: 'Analytics and insights'
    },
    { 
      label: 'Roadmap', 
      path: '/roadmap',
      icon: MapIcon,
      description: 'Future planning'
    },
    { 
      label: 'Settings', 
      path: '/settings',
      icon: Cog6ToothIcon,
      description: 'Configure your account'
    },
    { 
      label: 'Pricing', 
      path: '/pricing',
      icon: CreditCardIcon,
      description: 'Plans and billing'
    },
  ];

  const isActiveRoute = (path) => location.pathname === path;

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
        {/* Enhanced Sidebar */}
        <aside className="hidden md:flex flex-col w-72 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl border-r border-white/20 dark:border-gray-700/20">
          {/* Logo Section */}
          <div className="px-6 py-8 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <ChartBarIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  PensionPro
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Compliance Dashboard</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 py-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveRoute(item.path);
              
              return (
<Link
  key={item.label}
  to={item.path}
  className="group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
  style={{
    background: 'transparent', // No highlighting background
    color: darkMode ? '#ffffff' : '#000000', // ALWAYS black in light mode, ALWAYS white in dark mode
    border: isActive ? (darkMode ? '3px solid #401D6C' : '3px solid #EC385D') : 'none', // Your brand purple in dark, your brand pink in light
    boxShadow: 'none' // Remove shadow
  }}
>
                  <Icon className={`w-5 h-5 transition-all duration-300 ${
                    isActive 
                      ? 'text-pink-900 dark:text-white' 
                      : 'text-purple-500 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 group-hover:scale-110'
                  }`} />
                  <div className="flex-1">
                    <div className={`font-semibold transition-colors duration-300 ${
                      isActive 
                        ? 'text-pink-900 dark:text-white' 
                        : 'text-purple-700 dark:text-purple-300'
                    }`}>
                      {item.label}
                    </div>
                    <div className={`text-xs transition-colors duration-300 ${
                      isActive 
                        ? 'text-pink-800 dark:text-pink-100' 
                        : 'text-purple-500 dark:text-purple-400'
                    }`}>
                      {item.description}
                    </div>
                  </div>
                  {isActive && (
                    <div className="w-2 h-2 bg-pink-900 dark:bg-white rounded-full animate-pulse"></div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Profile Section */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                <UserCircleIcon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm text-gray-900 dark:text-white">John Doe</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Premium Plan</div>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar Toggle */}
        <div className="md:hidden absolute top-4 left-4 z-50">
          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg border border-white/20 dark:border-gray-700/20"
          >
            {mobileOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Enhanced Mobile Sidebar */}
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            
            {/* Mobile Sidebar */}
            <div className="fixed top-0 left-0 w-80 h-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-2xl z-50 transform transition-transform duration-300">
              {/* Mobile Logo Section */}
              <div className="px-6 py-8 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                      <ChartBarIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                        PensionPro
                      </h1>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Compliance Dashboard</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setMobileOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Mobile Navigation */}
              <nav className="px-6 py-6 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = isActiveRoute(item.path);
                  
                  return (
                    <Link
                      key={item.label}
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={`group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                        isActive
                          ? 'bg-gradient-to-r from-pink-500 to-pink-600 shadow-lg shadow-pink-500/25 border-2 border-pink-300 ring-2 ring-purple-400 ring-opacity-50'
                          : 'text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-700 dark:hover:text-purple-300'
                      }`}
                    >
                      <Icon className={`w-5 h-5 transition-all duration-300 ${
                        isActive 
                          ? 'text-pink-900 dark:text-white' 
                          : 'text-purple-500 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 group-hover:scale-110'
                      }`} />
                      <div className="flex-1">
                        <div className={`font-semibold transition-colors duration-300 ${
                          isActive 
                            ? 'text-pink-900 dark:text-white' 
                            : 'text-purple-700 dark:text-purple-300'
                        }`}>
                          {item.label}
                        </div>
                        <div className={`text-xs transition-colors duration-300 ${
                          isActive 
                            ? 'text-pink-800 dark:text-pink-100' 
                            : 'text-purple-500 dark:text-purple-400'
                        }`}>
                          {item.description}
                        </div>
                      </div>
                      {isActive && (
                        <div className="w-2 h-2 bg-pink-900 dark:bg-white rounded-full animate-pulse"></div>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Enhanced Navbar */}
          <header className="flex justify-between items-center px-6 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg border-b border-white/20 dark:border-gray-700/20">
            {/* Page Title */}
            <div className="hidden md:block">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {navItems.find(item => item.path === location.pathname)?.description || 'Welcome back'}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
                <BellIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </button>

              {/* Dark mode toggle */}
              <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              >
                {darkMode ? (
                  <SunIcon className="h-5 w-5 text-yellow-400 rotate-0 transition-transform duration-300 hover:rotate-180" />
                ) : (
                  <MoonIcon className="h-5 w-5 text-gray-600 rotate-0 transition-transform duration-300 hover:-rotate-12" />
                )}
              </button>

              {/* Profile dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                    <UserCircleIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">John Doe</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Admin</div>
                  </div>
                </button>
                
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white/95 dark:bg-gray-700/95 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 dark:border-gray-600/20 z-50 animate-in slide-in-from-top-2 duration-200">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-600">
                      <div className="font-medium text-gray-900 dark:text-white">John Doe</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">john.doe@company.com</div>
                    </div>
                    <div className="py-2">
                      <Link
                        to="/account"
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        <UserCircleIcon className="w-4 h-4" />
                        <span>Account Settings</span>
                      </Link>
                      <Link
                        to="/pricing"
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        <CreditCardIcon className="w-4 h-4" />
                        <span>Billing</span>
                      </Link>
                    </div>
                    <div className="py-2 border-t border-gray-200 dark:border-gray-600">
                      <button
                        onClick={() => {
                          handleLogout();
                          setProfileMenuOpen(false);
                        }}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 hover:scale-[1.02]"
                      >
                        <ArrowRightOnRectangleIcon className="w-4 h-4" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Page Outlet */}
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;