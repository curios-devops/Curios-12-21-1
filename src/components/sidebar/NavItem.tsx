import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
}

export default function NavItem({ to, icon: Icon, label, isActive, isCollapsed }: NavItemProps) {
  return (
    <Link 
      to={to}
      className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} p-2.5 rounded-lg transition-colors ${
        isActive 
          ? 'text-[#007BFF] bg-[#1a1a1a]' 
          : 'text-gray-400 hover:text-[#007BFF] hover:bg-[#1a1a1a]'
      }`}
    >
      <Icon size={24} />
      {!isCollapsed && <span className="text-[15px]">{label}</span>}
    </Link>
  );
}