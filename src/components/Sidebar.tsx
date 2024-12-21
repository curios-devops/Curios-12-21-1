import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { HomeIcon, Globe2, Library } from 'lucide-react';
import Logo from './sidebar/Logo';
import NavItem from './sidebar/NavItem';
import CollapseButton from './sidebar/CollapseButton';
import SignInModal from './auth/SignInModal';
import SignUpModal from './auth/SignUpModal';
import AuthButtonGroup from './auth/buttons/AuthButtonGroup';

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isCollapsed, toggleSidebar }: SidebarProps) {
  const location = useLocation();
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSignInClick = () => {
    setTimeout(() => setShowSignIn(true), 150);
  };

  const handleSignUpClick = () => {
    setTimeout(() => setShowSignUp(true), 150);
  };

  const handleModalClose = () => {
    setShowSignIn(false);
    setShowSignUp(false);
  };

  return (
    <>
      <aside 
        className={`fixed left-0 top-0 h-screen bg-[#111111] border-r border-gray-800 flex flex-col transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-56'
        }`}
      >
        <div className="flex-shrink-0 p-4">
          <div className="flex items-center gap-3">
            <Logo isCollapsed={isCollapsed} />
            {!isCollapsed && (
              <CollapseButton 
                isCollapsed={isCollapsed} 
                onClick={toggleSidebar} 
                position="top" 
              />
            )}
          </div>
        </div>

        <nav className="flex-1 px-2 py-4">
          <div className="space-y-1">
            <NavItem
              to="/"
              icon={HomeIcon}
              label="Home"
              isActive={location.pathname === '/'}
              isCollapsed={isCollapsed}
            />
            <NavItem
              to="/explore"
              icon={Globe2}
              label="Explore"
              isActive={location.pathname === '/explore'}
              isCollapsed={isCollapsed}
            />
            <NavItem
              to="/library"
              icon={Library}
              label="Library"
              isActive={location.pathname === '/library'}
              isCollapsed={isCollapsed}
            />
          </div>
        </nav>

        <div className={`flex-shrink-0 mt-auto ${isCollapsed ? 'px-2' : 'px-4'} pb-6`}>
          {!isCollapsed ? (
            <AuthButtonGroup
              onSignInClick={handleSignInClick}
              onSignUpClick={handleSignUpClick}
            />
          ) : (
            <CollapseButton 
              isCollapsed={isCollapsed} 
              onClick={toggleSidebar} 
              position="bottom" 
            />
          )}
        </div>
      </aside>

      <SignInModal 
        isOpen={showSignIn} 
        onClose={handleModalClose}
        onSignUpClick={() => {
          setShowSignIn(false);
          setTimeout(() => setShowSignUp(true), 150);
        }}
      />
      <SignUpModal 
        isOpen={showSignUp} 
        onClose={handleModalClose}
        onSignInClick={() => {
          setShowSignUp(false);
          setTimeout(() => setShowSignIn(true), 150);
        }}
      />
    </>
  );
}