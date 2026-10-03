import React from 'react';
import { ShieldCheck, Mail } from 'lucide-react';
import logo from '@/shared/assets/logos/logo.png';

const FOOTER_LINKS = [
  {
    title: 'Marketplace',
    links: [
      { label: 'All Listings', page: 'marketplace' },
      { label: 'Electronics', page: 'marketplace', filters: { category: 'electronics' } },
      { label: 'Books', page: 'marketplace', filters: { category: 'books' } },
      { label: 'Furniture', page: 'marketplace', filters: { category: 'furniture' } },
      { label: 'Clothing', page: 'marketplace', filters: { category: 'clothing' } },
    ],
  },
  {
    title: 'More Categories',
    links: [
      { label: 'Sports', page: 'marketplace', filters: { category: 'sports' } },
      { label: 'Vehicles', page: 'marketplace', filters: { category: 'vehicles' } },
      { label: 'Mobile', page: 'marketplace', filters: { category: 'mobile' } },
      { label: 'Laptop', page: 'marketplace', filters: { category: 'laptop' } },
      { label: 'Accessories', page: 'marketplace', filters: { category: 'accessories' } },
      { label: 'Other', page: 'marketplace', filters: { category: 'other' } },
    ],
  },
  {
    title: 'Campus Zones',
    links: [
      { label: 'KC Market Hub', page: 'marketplace' },
      { label: 'Central Library Lawns', page: 'marketplace' },
      { label: 'North Gate Complex', page: 'marketplace' },
      { label: 'Dakshinapuram Hostels', page: 'marketplace' },
      { label: 'Poorvanchal Complex', page: 'marketplace' },
    ],
  },
  {
    title: 'Your Account',
    links: [
      { label: 'My Profile', page: 'profile' },
      { label: 'Saved Items', page: 'wishlist' },
      { label: 'Messages', page: 'chat' },
      { label: 'Notifications', page: 'notifications' },
      { label: 'Sell an Item', page: 'sell' },
    ],
  },
  {
    title: 'Safety & Help',
    links: [
      { label: 'Student Safety Guidelines', page: 'home' },
      { label: 'Campus Pickup Hubs', page: 'home' },
      { label: 'Report Suspicious Activity', page: 'home' },
      { label: 'Privacy Policy', page: 'home' },
      { label: 'Terms of Service', page: 'home' },
    ],
  },
];

export const Footer = ({ onNavigate }) => {
  return (
    <footer className="bg-navy-950 text-paper-100 border-t border-navy-900">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 lg:gap-7 xl:gap-8">
          
          {/* Brand Column */}
          <div className="md:col-span-1 xl:col-span-2">
            {/* Logo */}
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="mb-4 flex items-center gap-3 text-left group"
            >
              <div className="jnubazaar-logo-tile flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1">
                <img src={logo} alt="" className="h-full w-full shrink-0 object-contain" />
              </div>
              <span className="font-sans text-xl font-bold tracking-tight text-white transition-colors group-hover:text-paper-200">
                JNUBazaar
              </span>
            </button>
            <p className="mb-3 text-xs font-medium leading-relaxed text-paper-200/80">
              Buy and sell within the JNU community.
            </p>
            <p className="mb-4 max-w-xs text-xs leading-relaxed text-paper-200/55">
              Dedicated peer-to-peer campus exchange network for Jawaharlal Nehru University students, scholars, and faculty.
            </p>
            <div className="flex items-center gap-1 text-[11px] text-campus-teal">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Exclusively for verified @jnu.ac.in domain users</span>
            </div>
          </div>

          {/* Navigation Columns */}
          {FOOTER_LINKS.map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-paper-200/60">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => onNavigate(link.page, link.filters)}
                      className="text-xs text-paper-100/70 hover:text-white transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-[11px] text-paper-100/45">
            <span>© {new Date().getFullYear()} JNUBazaar.</span>
            <span className="text-paper-100/20">·</span>
            <span>Made for the JNU community.</span>
            <span className="text-paper-100/20">·</span>
            <span>New Delhi 110067</span>
          </div>
          <a href="mailto:bazaar@jnu.ac.in" className="inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-paper-100/65 transition-colors hover:bg-white/5 hover:text-white" aria-label="Email JNU Bazaar">
            <Mail className="h-4 w-4" /> Contact JNUBazaar
          </a>
        </div>
      </div>
    </footer>
  );
};
