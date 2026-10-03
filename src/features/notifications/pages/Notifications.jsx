import React from 'react';
import { Bell } from 'lucide-react';

export const Notifications = () => (
  <main className="flex min-h-[60vh] items-center justify-center bg-paper-50 px-4 py-12">
    <section className="max-w-md text-center">
      <Bell className="mx-auto mb-4 h-10 w-10 text-navy-700/40" />
      <h1 className="text-2xl font-bold text-navy-950">Notifications are not available yet</h1>
      <p className="mt-2 text-sm text-navy-700/70">The backend does not currently provide notification endpoints.</p>
    </section>
  </main>
);
