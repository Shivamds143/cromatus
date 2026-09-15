'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const WEBSITE_CHILDREN = [
  { href: '/admin/pages/home', label: 'Home' },
  { href: { pathname: '/admin/pages', query: { group: 'About Us' } }, label: 'About Us' },
  { href: '/admin/pages/servicesOverview', label: 'Services' },
  { href: '/admin/pages/industriesOverview', label: 'Industries' },
  { href: '/admin/pages/insightsOverview', label: 'Insights' },
  { href: { pathname: '/admin/pages', query: { group: 'Careers' } }, label: 'Careers' },
  { href: { pathname: '/admin/pages', query: { group: 'Contact Us' } }, label: 'Contact Us' }
];

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: '🏠' },
  { href: '/admin/pages', label: 'Website', icon: '🌐', children: WEBSITE_CHILDREN },
  { href: '/admin/services', label: 'Services', icon: '🧩' },
  { href: '/admin/industries', label: 'Industries', icon: '🏭' },
  { href: '/admin/insights', label: 'Insights', icon: '📰' },
  { href: '/admin/careers', label: 'Careers', icon: '💼' },
  { href: '/admin/testimonials', label: 'Testimonials', icon: '💬' },
  { href: '/admin/faqs', label: 'FAQs', icon: '❓' },
  { href: '/admin/media', label: 'Media Library', icon: '🖼️' },
  { href: '/admin/enquiries', label: 'Enquiries', icon: '✉️' },
  { href: '/admin/theme-branding', label: 'Theme & Branding', icon: '🎨' },
  { href: '/admin/seo', label: 'SEO', icon: '🔍' },
  { href: '/admin/redirects', label: 'Redirects', icon: '↪️' },
  { href: '/admin/cookie-privacy', label: 'Cookie & Privacy', icon: '🍪' },
  { href: '/admin/settings', label: 'Settings', icon: '⚙️' }
];

// Also includes the Custom Pages tool, tucked under Website since it shares
// the same page-builder as Services/Industries dynamic pages.
const WEBSITE_EXTRA_CHILD = { href: '/admin/custom-pages', label: 'Custom Pages' };

export default function AdminSidebar({ username }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [openMenu, setOpenMenu] = useState(pathname.startsWith('/admin/pages') || pathname.startsWith('/admin/custom-pages'));

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  function isActive(href) {
    if (href === '/admin') return pathname === '/admin';
    const path = href.split('?')[0];
    return pathname === path || pathname.startsWith(`${path}/`);
  }

  return (
    <aside className="w-64 shrink-0 bg-navy text-white flex flex-col overflow-y-auto">
      <div className="px-6 py-6 border-b border-white/10">
        <p className="text-xs font-bold tracking-[0.2em] text-brandorange">CHROMATUS</p>
        <p className="text-sm text-white/70">Admin CMS</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map((item) => {
          if (!item.children) {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span aria-hidden>{item.icon}</span>
                {item.label}
              </Link>
            );
          }

          const parentActive = isActive(item.href) || pathname.startsWith('/admin/custom-pages');
          const children = [...item.children, WEBSITE_EXTRA_CHILD];

          return (
            <div key={item.href}>
              <button
                onClick={() => setOpenMenu((v) => !v)}
                className={`w-full flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  parentActive ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span aria-hidden>{item.icon}</span>
                  {item.label}
                </span>
                <span aria-hidden className={`text-xs transition-transform ${openMenu ? 'rotate-90' : ''}`}>
                  ›
                </span>
              </button>
              {openMenu && (
                <div className="mt-1 ml-5 pl-3 border-l border-white/10 space-y-0.5">
                  {children.map((child) => {
                    const isObjHref = typeof child.href === 'object';
                    const childPath = isObjHref ? child.href.pathname : child.href;
                    const childGroup = isObjHref ? child.href.query?.group : undefined;
                    const childActive =
                      pathname === childPath && (childGroup === undefined || searchParams.get('group') === childGroup);
                    return (
                      <Link
                        key={isObjHref ? `${childPath}-${childGroup}` : childPath}
                        href={child.href}
                        className={`block rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                          childActive ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="px-6 py-4 border-t border-white/10">
        <p className="text-xs text-white/50 mb-2">Signed in as {username}</p>
        <button
          onClick={handleLogout}
          className="text-sm font-semibold text-brandorange hover:text-white transition"
        >
          Sign out
        </button>
        <Link href="/" className="block mt-2 text-xs text-white/50 hover:text-white/80">
          ← Back to site
        </Link>
      </div>
    </aside>
  );
}
