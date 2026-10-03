import React, { useEffect, useRef, useState } from 'react';
import { Heart, MessageSquare, Bell, Plus, Menu, X, User as UserIcon, LogOut, ChevronDown, Moon, Sun } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';
import { AnimatedBackground } from '@/shared/components/ui/AnimatedBackground';
import logo from '@/shared/assets/logos/logo.png';
import { VerifiedBadge } from '@/shared/components/ui/VerifiedBadge';

export const Navbar = ({
  activePage,
  onNavigate,
  user,
  wishlistCount = 0,
  unreadChatsCount = 1,
  onOpenLogin,
  onLogout,
  darkMode = false,
  onToggleDarkMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const displayName = String(user?.name || user?.username || user?.email || 'JNU Member');

  useEffect(() => {
    if (!profileDropdownOpen) return undefined;
    const handlePointerDown = (event) => {
      if (!profileMenuRef.current?.contains(event.target)) setProfileDropdownOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setProfileDropdownOpen(false);
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [profileDropdownOpen]);
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-paper-darkBorder transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Left: Brand Logo & Wordmark */}
          <button
            type="button"
            onClick={() => onNavigate('home')}
            aria-label="JNUBazaar home"
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0 text-left"
          >
            <div className="jnubazaar-logo-tile flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center overflow-hidden rounded-xl bg-white p-1">
              <img src={logo} alt="" className="h-full w-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-[18px] sm:text-[21px] font-bold leading-tight tracking-[-0.055em] text-navy-950 transition-colors group-hover:text-campus-blue">
                JNU<span className="text-campus-blue">Bazaar</span>
              </span>
              <span className="mt-0.5 hidden sm:block text-[9px] font-semibold uppercase tracking-[0.16em] text-navy-700/60">
                Campus Marketplace
              </span>
            </div>
          </button>

          {/* Center: Editorial Nav Links */}
          <nav aria-label="Main navigation" className="hidden md:flex">
            <AnimatedBackground
              defaultValue={activePage === 'marketplace' ? 'marketplace' : null}
              className="nav-animated-tabs flex flex-row items-center"
              backgroundClassName="nav-animated-tabs__highlight"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.3 }}
              enableHover
            >
              <button
                type="button"
                data-id="marketplace"
                aria-current={activePage === 'marketplace' ? 'page' : undefined}
                onClick={() => onNavigate('marketplace')}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-300 ${activePage === 'marketplace' ? 'font-semibold text-navy-950' : 'text-navy-800 hover:text-navy-950'}`}
              >
                Marketplace
              </button>
              <button
                type="button"
                data-id="categories"
                onClick={() => onNavigate('home', { scrollTo: 'categories' })}
                className="rounded-md px-3 py-1.5 text-sm font-medium text-navy-800 transition-colors duration-300 hover:text-navy-950"
              >
                Categories
              </button>
              <button
                type="button"
                data-id="how-it-works"
                onClick={() => onNavigate('home', { scrollTo: 'how-it-works' })}
                className="rounded-md px-3 py-1.5 text-sm font-medium text-navy-800 transition-colors duration-300 hover:text-navy-950"
              >
                How It Works
              </button>
            </AnimatedBackground>
          </nav>

          {/* Right: Activity, account, and listing actions */}
          <div className="flex items-center gap-1.5 sm:gap-4">
            <div className="hidden md:flex items-center gap-1.5 sm:gap-2">
            {/* Notification Center */}
            <button
              onClick={() => onNavigate('notifications')}
              className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${activePage === 'notifications' ? 'bg-blue-50 text-campus-blue' : 'text-navy-800 hover:bg-paper-100'}`}
              title="Notifications"
              aria-label={`Notifications${unreadChatsCount ? `, ${unreadChatsCount} unread` : ''}`}
            >
              <Bell className="h-[18px] w-[18px]" strokeWidth={1.9} />
              {unreadChatsCount > 0 && (
                <span className="absolute right-0 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-campus-blue px-1 text-[10px] font-bold leading-none text-white ring-2 ring-white">
                  {unreadChatsCount > 9 ? '9+' : unreadChatsCount}
                </span>
              )}
            </button>

            {/* Wishlist Link */}
            <button
              onClick={() => onNavigate('wishlist')}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-navy-800 transition-colors hover:bg-paper-100"
              title="Campus Wishlist"
              aria-label={`Wishlist${wishlistCount ? `, ${wishlistCount} saved items` : ''}`}
            >
              <Heart className="h-[18px] w-[18px]" strokeWidth={1.9} />
              {wishlistCount > 0 && (
                <span className="absolute right-0 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-campus-blue px-1 text-[10px] font-bold leading-none text-white ring-2 ring-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Chat Link */}
            <button
              onClick={() => onNavigate('chat')}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-navy-800 transition-colors hover:bg-paper-100"
              title="Messages"
              aria-label={`Messages${unreadChatsCount ? `, ${unreadChatsCount} unread` : ''}`}
            >
              <MessageSquare className="h-[18px] w-[18px]" strokeWidth={1.9} />
              {unreadChatsCount > 0 && (
                <span className="absolute right-0 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-campus-blue px-1 text-[10px] font-bold leading-none text-white ring-2 ring-white">
                  {unreadChatsCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={onToggleDarkMode}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={darkMode}
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="flex h-10 w-10 items-center justify-center gap-2 rounded-xl text-navy-800 transition-colors hover:bg-paper-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-campus-blue xl:w-auto xl:px-2.5"
            >
              {darkMode ? <Sun className="h-[18px] w-[18px]" strokeWidth={1.9} /> : <Moon className="h-[18px] w-[18px]" strokeWidth={1.9} />}
              <span className="hidden text-xs font-semibold xl:inline">{darkMode ? 'Light' : 'Dark'}</span>
            </button>
            {user && <span aria-hidden="true" className="mx-1 h-8 w-px bg-paper-border sm:mx-2" />}
            </div>

            {/* User Profile or Login */}
            {user ? (
              <div className="relative hidden md:block" ref={profileMenuRef}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  aria-expanded={profileDropdownOpen}
                  aria-haspopup="menu"
                  aria-controls="account-menu"
                  aria-label={profileDropdownOpen ? 'Close account menu' : 'Open account menu'}
                  className="flex items-center gap-2 rounded-xl border border-paper-darkBorder bg-white px-2 py-1.5 transition-colors hover:bg-paper-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-campus-blue"
                >
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-7 h-7 rounded-full object-cover border border-paper-darkBorder"
                    />
                    {user.verified && (
                      <VerifiedBadge placement="avatar" size="xs" />
                    )}
                  </div>
                  <span className="hidden sm:inline-block text-xs font-semibold text-navy-950 max-w-[90px] truncate">
                    {displayName.split(/[\s@]/)[0]}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-navy-700/70 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown */}
                {profileDropdownOpen && (
                  <div id="account-menu" role="menu" className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-paper-darkBorder bg-white shadow-[0_18px_48px_rgba(15,31,65,0.2)] animate-in fade-in">
                    <div className="bg-paper-50 px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative shrink-0">
                          <img src={user.avatar} alt="" className="h-12 w-12 rounded-full border-2 border-white object-cover shadow-sm" />
                          {user.verified && <VerifiedBadge placement="avatar" size="sm" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold text-navy-950">{displayName}</p>
                          <p className="mt-1 truncate text-xs text-navy-700/75">{user.email}</p>
                          <p className="mt-1 truncate text-[11px] font-medium text-campus-blue">{user.verified ? 'Verified JNU account' : user.affiliation || 'JNU Community'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-paper-border p-2">
                      <button role="menuitem" onClick={() => { onNavigate('profile'); setProfileDropdownOpen(false); }} className="group flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left transition-colors hover:bg-paper-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-campus-blue">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-paper-100 text-navy-700 transition-colors group-hover:bg-blue-50 group-hover:text-campus-blue"><UserIcon className="h-4 w-4" /></span>
                        <span className="min-w-0"><span className="block text-sm font-semibold text-navy-950">My Profile & Listings</span><span className="mt-0.5 block text-[11px] text-navy-700/65">Manage your account and items</span></span>
                      </button>
                      <button role="menuitem" onClick={() => { onNavigate('wishlist'); setProfileDropdownOpen(false); }} className="group flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left transition-colors hover:bg-paper-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-campus-blue">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-paper-100 text-navy-700 transition-colors group-hover:bg-blue-50 group-hover:text-campus-blue"><Heart className="h-4 w-4" /></span>
                        <span className="min-w-0"><span className="block text-sm font-semibold text-navy-950">Saved Items</span><span className="mt-0.5 block text-[11px] text-navy-700/65">Your wishlist</span></span>
                        {wishlistCount > 0 && <span className="ml-auto rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-campus-blue">{wishlistCount}</span>}
                      </button>
                      <button role="menuitem" onClick={() => { onNavigate('chat'); setProfileDropdownOpen(false); }} className="group flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left transition-colors hover:bg-paper-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-campus-blue">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-paper-100 text-navy-700 transition-colors group-hover:bg-blue-50 group-hover:text-campus-blue"><MessageSquare className="h-4 w-4" /></span>
                        <span className="min-w-0"><span className="block text-sm font-semibold text-navy-950">Messages</span><span className="mt-0.5 block text-[11px] text-navy-700/65">Your conversations</span></span>
                      </button>
                    </div>

                    <div className="border-t border-paper-border p-2">
                      <button role="menuitem" onClick={() => { onLogout(); setProfileDropdownOpen(false); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300">
                        <LogOut className="h-4 w-4" /> Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="hidden md:inline-flex h-10 items-center justify-center rounded-lg border border-[#d9e2f0] bg-white px-4 text-sm font-semibold text-navy-900 transition-colors hover:border-campus-blue hover:bg-blue-50/60 hover:text-campus-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
              >
                Sign In
              </button>
            )}

            {/* Prominent "Sell Item" Action Button */}
            <Button
              variant="blue"
              size="sm"
              icon={Plus}
              onClick={() => onNavigate('sell')}
              className="hidden md:inline-flex h-10 rounded-lg px-4 text-sm font-semibold shadow-sm whitespace-nowrap"
            >
              Sell Item
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg text-navy-900 hover:bg-paper-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden max-h-[calc(100dvh-64px)] overflow-y-auto border-t border-paper-darkBorder py-3 space-y-1 bg-paper-50/95 animate-in fade-in">
            <button
              onClick={() => {
                onNavigate("marketplace");
                setMobileMenuOpen(false);
              }}
              className="w-full min-h-11 text-left px-4 py-2 text-sm font-medium text-navy-900 hover:bg-paper-100 rounded-md"
            >
              Explore Marketplace
            </button>
            <button
              onClick={() => {
                onNavigate("home", { scrollTo: "categories" });
                setMobileMenuOpen(false);
              }}
              className="w-full min-h-11 text-left px-4 py-2 text-sm font-medium text-navy-900 hover:bg-paper-100 rounded-md"
            >
              Browse Categories
            </button>
            <button
              onClick={() => {
                onNavigate("home", { scrollTo: "how-it-works" });
                setMobileMenuOpen(false);
              }}
              className="w-full min-h-11 text-left px-4 py-2 text-sm font-medium text-navy-900 hover:bg-paper-100 rounded-md"
            >
              How It Works
            </button>
            <button
              onClick={() => {
                onNavigate("notifications");
                setMobileMenuOpen(false);
              }}
              className="w-full min-h-11 text-left px-4 py-2 text-sm font-medium text-navy-900 hover:bg-paper-100 rounded-md flex items-center gap-2"
            >
              <Bell className="h-4 w-4" /> Notifications{unreadChatsCount > 0 ? ` (${unreadChatsCount})` : ''}
            </button>
            <button
              onClick={() => {
                onNavigate("wishlist");
                setMobileMenuOpen(false);
              }}
              className="w-full min-h-11 text-left px-4 py-2 text-sm font-medium text-navy-900 hover:bg-paper-100 rounded-md"
            >
              Saved Items ({wishlistCount})
            </button>
            <button
              onClick={() => { onNavigate('chat'); setMobileMenuOpen(false); }}
              className="w-full min-h-11 text-left px-4 py-2 text-sm font-medium text-navy-900 hover:bg-paper-100 rounded-md"
            >Messages ({unreadChatsCount})</button>
            <button
              onClick={() => { onToggleDarkMode?.(); }}
              className="w-full min-h-11 text-left px-4 py-2 text-sm font-medium text-navy-900 hover:bg-paper-100 rounded-md flex items-center gap-2"
            >{darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}{darkMode ? 'Switch to light mode' : 'Switch to dark mode'}</button>
            <button
              onClick={() => { onNavigate('sell'); setMobileMenuOpen(false); }}
              className="mt-2 w-full min-h-11 text-left px-4 py-2 text-sm font-semibold text-white bg-campus-blue hover:bg-blue-700 rounded-lg flex items-center gap-2"
            ><Plus className="h-4 w-4" />Sell an item</button>
            {!user && <button onClick={() => { onOpenLogin?.(); setMobileMenuOpen(false); }} className="w-full min-h-11 text-left px-4 py-2 text-sm font-medium text-navy-900 hover:bg-paper-100 rounded-md">Sign in</button>}
            {user && <button onClick={() => { onLogout?.(); setMobileMenuOpen(false); }} className="w-full min-h-11 text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md">Sign out</button>}
            {user && (
              <button
                onClick={() => {
                  onNavigate("profile");
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm font-medium text-navy-900 hover:bg-paper-100 rounded-md"
              >
                My Profile & Listings
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
