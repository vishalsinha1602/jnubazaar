import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';

export const Chat = ({ onNavigate }) => (
  <main className="flex min-h-[60vh] items-center justify-center bg-paper-50 px-4 py-12">
    <section className="max-w-md text-center">
      <MessageSquare className="mx-auto mb-4 h-10 w-10 text-navy-700/40" />
      <h1 className="text-2xl font-bold text-navy-950">Messaging is not available yet</h1>
      <p className="mt-2 text-sm text-navy-700/70">The backend does not currently provide messaging endpoints.</p>
      <Button variant="secondary" className="mt-5" onClick={() => onNavigate('marketplace')}>Browse Marketplace</Button>
    </section>
  </main>
);
