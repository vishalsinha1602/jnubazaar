import { lazy, Suspense } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, CircleX, Home, Route, Server, Store, Globe2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const HttpStatusLearning = lazy(() => import('@/pages/HttpStatusLearning').then((module) => ({ default: module.HttpStatusLearning })));

const redactPath = (pathname) => pathname
  .split('/')
  .map((part) => {
    if (/^[\da-f]{8}-[\da-f-]{27,}$/i.test(part) || part.length > 48 || /^[\w-]+\.[\w-]+\.[\w-]+$/.test(part)) return '[redacted]';
    return part;
  })
  .join('/') || '/';

const REQUEST_STEPS = [
  { title: 'Browser', note: 'Sends a page request', Icon: Globe2 },
  { title: 'JNUBazaar', note: 'Receives the request', Icon: Server },
  { title: 'Router', note: 'Looks for a matching route', Icon: Route },
  { title: 'No match', note: 'Shows this page', Icon: CircleX, error: true },
];

export default function NotFound({ onNavigate }) {
  const location = useLocation();
  const navigate = useNavigate();
  const requestPath = redactPath(location.pathname);

  const goBack = () => {
    if (window.history.state?.idx > 0) navigate(-1);
    else onNavigate?.('home');
  };

  return (
    <main className="min-h-screen bg-paper-50 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <section className="overflow-hidden rounded-2xl border border-paper-darkBorder bg-white shadow-subtle">
          <div className="grid gap-6 p-5 sm:p-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-10 md:p-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.14em] text-campus-blue">JNUBazaar · page not found</p>
              <h1 className="mt-3 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-navy-950 sm:text-4xl">Looks like this page took a wrong turn.</h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-navy-700/75 sm:text-base">The address doesn’t match a page here. Even good developers take a wrong turn now and then.</p>
              <code className="mt-4 inline-flex max-w-full break-all rounded-lg border border-paper-border bg-paper-50 px-3 py-2 font-mono text-xs text-navy-800">GET {requestPath}</code>
              <p className="mt-2 text-sm font-semibold text-navy-950">HTTP 404 · Not Found</p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <button type="button" onClick={() => onNavigate?.('home')} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-campus-blue px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-campus-blueHover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-campus-blue focus-visible:ring-offset-2"><Home className="h-4 w-4" /> Go home</button>
                <button type="button" onClick={() => onNavigate?.('marketplace')} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-paper-darkBorder bg-white px-4 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-paper-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-campus-blue"><Store className="h-4 w-4" /> Browse marketplace</button>
                <button type="button" onClick={goBack} className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-navy-700 transition-colors hover:bg-paper-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-campus-blue"><ArrowLeft className="h-4 w-4" /> Go back</button>
              </div>
            </div>
            <div aria-hidden="true" className="select-none text-left font-mono text-[clamp(6rem,22vw,10rem)] font-bold leading-none tracking-[-.09em] text-campus-blue/15 md:text-right">404</div>
          </div>

          <div className="border-t border-paper-border bg-paper-50/70 px-5 py-5 sm:px-8 sm:py-6 md:px-10">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-sm font-bold text-navy-950">The request journey</h2>
              <span className="font-mono text-[11px] text-navy-700/65">GET {requestPath}</span>
            </div>
            <ol className="mt-4 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-2">
              {REQUEST_STEPS.map(({ title, note, Icon, error }, index) => (
                <li key={title} className="flex min-w-0 flex-1 flex-col items-center gap-2 sm:flex-row">
                  <div className={`flex w-full items-center gap-3 rounded-xl border p-3 sm:min-h-[76px] sm:flex-col sm:items-start sm:justify-center sm:gap-1.5 ${error ? 'border-red-200 bg-red-50' : 'border-paper-darkBorder bg-white'}`}>
                    <Icon className={`h-4 w-4 shrink-0 ${error ? 'text-red-600' : 'text-campus-blue'}`} />
                    <div className="min-w-0"><p className={`text-xs font-semibold ${error ? 'text-red-700' : 'text-navy-950'}`}>{title}</p><p className="mt-0.5 text-[10px] leading-4 text-navy-700/70">{note}</p></div>
                  </div>
                  {index < REQUEST_STEPS.length - 1 && <ArrowRight className="hidden h-4 w-4 shrink-0 text-navy-700/40 sm:block" />}
                  {index < REQUEST_STEPS.length - 1 && <ArrowDown className="h-4 w-4 shrink-0 text-navy-700/40 sm:hidden" />}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <div className="mt-7">
          <Suspense fallback={<div className="rounded-2xl border border-paper-darkBorder bg-white p-6 text-sm text-navy-700/70">Loading the HTTP guide…</div>}>
            <HttpStatusLearning requestPath={requestPath} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
