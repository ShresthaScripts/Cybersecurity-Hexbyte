import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Shield, Key, Link2, AlertTriangle, Wifi,
  Smartphone, Lock, FileSearch, Eye, MessageSquareWarning, Monitor,
  BarChart3, Settings, User, Bot, ChevronLeft, ChevronRight, Menu, X, LogOut
} from "lucide-react";
import { base44 } from "@/api/base44Client";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Password Vault", icon: Key, path: "/vault" },
  { label: "Link Scanner", icon: Link2, path: "/link-scanner" },
  { label: "Breach Monitor", icon: AlertTriangle, path: "/breach-monitor" },
  { label: "Network Checker", icon: Wifi, path: "/network-checker" },
  { label: "2FA Assistant", icon: Smartphone, path: "/2fa-assistant" },
  { label: "Permission Auditor", icon: Lock, path: "/permission-auditor" },
  { label: "File Analyzer", icon: FileSearch, path: "/file-analyzer" },
  { label: "Privacy Toolkit", icon: Eye, path: "/privacy-toolkit" },
  { label: "Scam Detector", icon: MessageSquareWarning, path: "/scam-detector" },
  { label: "Device Health", icon: Monitor, path: "/device-health" },
  { label: "Reports", icon: BarChart3, path: "/reports" },
];

const bottomItems = [
  { label: "AI Assistant", icon: Bot, path: "/ai-assistant" },
  { label: "Settings", icon: Settings, path: "/settings" },
  { label: "Profile", icon: User, path: "/profile" },
];

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    base44.auth.logout("/login");
  };

  const NavLink = ({ item }) => {
    const active = location.pathname === item.path;
    return (
      <Link
        to={item.path}
        onClick={() => setMobileOpen(false)}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group
          ${active
            ? "bg-emerald-500/10 text-emerald-400"
            : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
          }`}
      >
        <item.icon size={18} className={`shrink-0 ${active ? "text-emerald-400" : "text-slate-500 group-hover:text-slate-300"}`} />
        {!collapsed && <span className="truncate">{item.label}</span>}
        {active && !collapsed && (
          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400" />
        )}
      </Link>
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
          <Shield size={16} className="text-white" />
        </div>
        {!collapsed && (
          <span className="text-lg font-bold text-white tracking-tight">Insight</span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto hidden lg:flex w-7 h-7 items-center justify-center rounded-md hover:bg-white/5 text-slate-500 hover:text-slate-300 transition-colors"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(item => <NavLink key={item.path} item={item} />)}
      </nav>

      <div className="px-3 py-4 border-t border-white/5 space-y-1">
        {bottomItems.map(item => <NavLink key={item.path} item={item} />)}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200 w-full"
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-lg glass flex items-center justify-center text-slate-300"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/60 z-40"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="lg:hidden fixed left-0 top-0 bottom-0 w-[260px] bg-[hsl(220,18%,6%)] border-r border-white/5 z-50 overflow-hidden"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-md flex items-center justify-center text-slate-400 hover:text-white"
            >
              <X size={18} />
            </button>
            {sidebarContent}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:block fixed left-0 top-0 bottom-0 bg-[hsl(220,18%,6%)] border-r border-white/5 z-30 transition-all duration-300 ${
          collapsed ? "w-[68px]" : "w-[240px]"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
