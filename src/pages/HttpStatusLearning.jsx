import { useState } from 'react';
import { ChevronDown, Code2, LockKeyhole, ShieldAlert } from 'lucide-react';
import { HTTP_METHODS, HTTP_STATUS_GROUPS } from '@/shared/config/httpStatusData';

const ACCESS_EXAMPLES = [
  { code: '404', title: 'Not Found', body: 'The requested page or resource could not be found.', example: 'GET /api/v1/marketplace/products/{unknown-id}' },
  { code: '401', title: 'Unauthorized', body: 'You need to sign in or provide valid credentials.', example: 'GET /api/v1/auth/users/me · no access token' },
  { code: '403', title: 'Forbidden', body: 'You are signed in, but you cannot perform this action.', example: 'DELETE a listing owned by another user' },
];

const BAZAAR_EXAMPLES = [
  ['GET', '/api/v1/marketplace/products', '200 · listings returned'],
  ['POST', '/api/v1/marketplace/products', '201 · listing created'],
  ['GET', '/api/v1/marketplace/products/{id}', '200 · listing returned, or 404 if missing'],
];

export const HttpStatusLearning = ({ requestPath }) => {
  const [expandedGroup, setExpandedGroup] = useState('4xx');
  const [showAllCodes, setShowAllCodes] = useState(false);

  const toggleGroup = (range) => {
    setExpandedGroup((current) => current === range ? '' : range);
    setShowAllCodes(false);
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
        <article className="rounded-2xl border border-paper-darkBorder bg-white p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-campus-blue">Why this happened</p>
          <h2 className="mt-2 text-xl font-bold text-navy-950">What does 404 mean?</h2>
          <p className="mt-2 text-sm leading-6 text-navy-700/80">The server was reachable and understood the request, but it couldn’t find the requested resource. A mistyped address, removed listing, or unknown route can lead here.</p>
          <div className="mt-4 space-y-2 font-mono text-xs">
            <p className="rounded-lg bg-paper-50 px-3 py-2 text-navy-800">GET /marketplace/products/123 <span className="font-sans text-navy-700/65">→ listing exists → 200 OK</span></p>
            <p className="rounded-lg bg-paper-50 px-3 py-2 text-navy-800">GET /marketplace/products/999999 <span className="font-sans text-navy-700/65">→ listing missing → 404</span></p>
            <p className="rounded-lg bg-paper-50 px-3 py-2 text-navy-800">GET /random-page <span className="font-sans text-navy-700/65">→ route missing → not found page</span></p>
          </div>
        </article>

        <article className="rounded-2xl border border-paper-darkBorder bg-white p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <LockKeyhole className="h-4 w-4 text-campus-blue" />
            <h2 className="text-xl font-bold text-navy-950">404, 401, or 403?</h2>
          </div>
          <div className="mt-4 space-y-3">
            {ACCESS_EXAMPLES.map((item) => (
              <div key={item.code} className="flex gap-3 rounded-xl border border-paper-border p-3">
                <span className={`h-fit rounded-md px-2 py-1 font-mono text-xs font-bold ${item.code === '404' ? 'bg-blue-50 text-blue-700' : 'bg-paper-100 text-navy-800'}`}>{item.code}</span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-navy-950">{item.title}</p>
                  <p className="mt-0.5 text-xs leading-5 text-navy-700/75">{item.body}</p>
                  <p className="mt-1 break-words font-mono text-[10px] text-navy-700/60">{item.example}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] leading-5 text-navy-700/60">Examples are typical; the exact response depends on the endpoint’s security and error handling.</p>
        </article>
      </section>

      <section className="rounded-2xl border border-paper-darkBorder bg-white p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-campus-blue" />
          <div>
            <h2 className="text-xl font-bold text-navy-950">HTTP status codes</h2>
            <p className="mt-1 text-sm text-navy-700/75">The first digit gives you a quick idea of what happened. Choose a group to see examples.</p>
          </div>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {HTTP_STATUS_GROUPS.map((group) => {
            const expanded = expandedGroup === group.range;
            const visibleCodes = expanded && showAllCodes ? group.codes : group.codes.slice(0, group.range === '4xx' ? 4 : 2);
            return (
              <article key={group.range} className="min-w-0 rounded-xl border border-paper-border bg-paper-50/70 p-3 sm:col-span-1">
                <button type="button" aria-expanded={expanded} aria-controls={`status-${group.range}`} onClick={() => toggleGroup(group.range)} className="flex w-full items-center justify-between gap-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-campus-blue rounded-md">
                  <span><span className="block font-mono text-sm font-bold text-campus-blue">{group.range}</span><span className="mt-0.5 block text-xs font-semibold text-navy-950">{group.title}</span></span>
                  <ChevronDown className={`h-4 w-4 shrink-0 text-navy-700/60 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                </button>
                {expanded && <div id={`status-${group.range}`} className="mt-3 border-t border-paper-border pt-2">
                  <p className="mb-2 text-[11px] leading-4 text-navy-700/70">{group.description}</p>
                  <ul className="space-y-1.5">
                    {visibleCodes.map(([code, label]) => <li key={code} className="flex gap-2 text-[11px] leading-4"><span className="font-mono font-semibold text-navy-950">{code}</span><span className="text-navy-700/75">{label}</span></li>)}
                  </ul>
                  {group.codes.length > visibleCodes.length && <button type="button" aria-expanded={showAllCodes} onClick={() => setShowAllCodes((shown) => !shown)} className="mt-2 text-[11px] font-semibold text-campus-blue hover:underline">{showAllCodes ? 'Show fewer' : 'More status codes'}</button>}
                </div>}
              </article>
            );
          })}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <article className="rounded-2xl border border-paper-darkBorder bg-white p-5 sm:p-6">
          <div className="flex items-center gap-2"><Code2 className="h-4 w-4 text-campus-blue" /><h2 className="text-lg font-bold text-navy-950">A few JNUBazaar examples</h2></div>
          <ul className="mt-4 space-y-2">
            {BAZAAR_EXAMPLES.map(([method, endpoint, result]) => <li key={`${method}-${endpoint}`} className="grid grid-cols-[3.25rem_minmax(0,1fr)] gap-x-2 gap-y-1 rounded-lg bg-paper-50 px-3 py-2 text-xs sm:grid-cols-[3.25rem_minmax(0,1fr)_auto] sm:items-center"><span className="font-mono font-bold text-campus-blue">{method}</span><code className="break-all text-navy-800">{endpoint}</code><span className="col-start-2 text-navy-700/65 sm:col-start-auto">{result}</span></li>)}
          </ul>
          <p className="mt-3 text-[11px] leading-5 text-navy-700/60">These routes are implemented by the marketplace service. Authentication rules may change the response for a particular request.</p>
        </article>

        <article className="rounded-2xl border border-paper-darkBorder bg-white p-5 sm:p-6">
          <h2 className="text-lg font-bold text-navy-950">HTTP methods</h2>
          <p className="mt-1 text-sm text-navy-700/75">The method describes what the client wants to do.</p>
          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
            {HTTP_METHODS.map(([method, description]) => <div key={method} className="min-w-0"><dt className="font-mono text-xs font-bold text-campus-blue">{method}</dt><dd className="mt-0.5 text-xs leading-5 text-navy-700/75">{description}</dd></div>)}
          </dl>
        </article>
      </section>

      <details className="group rounded-2xl border border-paper-darkBorder bg-white p-5 sm:p-6">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-campus-blue rounded-md">
          <span><span className="block text-lg font-bold text-navy-950">Request inspector</span><span className="mt-1 block text-sm text-navy-700/75">See the route this page could not match.</span></span>
          <ChevronDown className="h-5 w-5 shrink-0 text-navy-700/65 transition-transform group-open:rotate-180" />
        </summary>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-paper-border">
            <p className="border-b border-paper-border bg-paper-50 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-navy-700/70">Browser request</p>
            <pre className="overflow-x-auto p-3 font-mono text-xs leading-6 text-navy-800">{`GET ${requestPath}\nHost: ${window.location.host}\nAccept: text/html`}</pre>
          </div>
          <div className="overflow-hidden rounded-xl border border-paper-border">
            <p className="border-b border-paper-border bg-paper-50 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-navy-700/70">JNUBazaar frontend</p>
            <pre className="overflow-x-auto p-3 font-mono text-xs leading-6 text-navy-800">{'Route match: none\nFallback: NotFound page'}</pre>
          </div>
        </div>
        <p className="mt-3 text-[11px] leading-5 text-navy-700/60">This is a client-side route miss. The HTTP status on the wire depends on the web server or hosting fallback configuration. No query string, token, cookie, or authorization header is shown.</p>
      </details>
    </div>
  );
};

