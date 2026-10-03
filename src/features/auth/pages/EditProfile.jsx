import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, BadgeCheck, Check, LockKeyhole, MapPin, Phone } from 'lucide-react';
import { ALL_HOSTELS, CAMPUS_CLUSTERS } from '@/shared/config/marketplaceData';
import { Button } from '@/shared/components/ui/Button';

export const EditProfile = ({ user, onNavigate, onSave }) => {
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    hostel: user?.hostel || '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [avatarFailed, setAvatarFailed] = useState(false);

  const cluster = useMemo(
    () => CAMPUS_CLUSTERS.find((campusCluster) => campusCluster.hostels.includes(form.hostel)),
    [form.hostel],
  );
  const avatar = user?.profileImage || user?.avatar;
  useEffect(() => setAvatarFailed(false), [avatar]);
  const initials = (user?.name || user?.username || 'JNU')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSaving(true);
    try {
      await onSave(form);
    } catch (saveError) {
      setError(saveError.message || 'Could not save your profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#f7f9fc] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <button
          type="button"
          onClick={() => onNavigate('profile')}
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-navy-700 transition hover:text-campus-blue"
        >
          <ArrowLeft className="h-4 w-4" /> Back to profile
        </button>

        <section className="overflow-hidden rounded-2xl border border-[#dfe6f0] bg-white shadow-[0_12px_36px_rgba(15,31,65,0.07)]">
          <header className="border-b border-[#e8edf4] px-6 py-6 sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-campus-blue">Account settings</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-navy-950">Edit your profile</h1>
            <p className="mt-1 text-sm text-navy-700/65">Add the contact and campus details you want to use on JNUBazaar.</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6 px-6 py-6 sm:px-8">
            <div className="flex items-center gap-4 rounded-xl bg-[#f7f9fc] p-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#dfe6f0] bg-navy-950 font-semibold text-white">
                {avatar && !avatarFailed ? <img src={avatar} alt={`${user?.name || 'Your'} profile`} referrerPolicy="no-referrer" onError={() => setAvatarFailed(true)} className="h-full w-full object-cover" /> : initials}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-navy-950">{user?.name}</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-campus-blue">
                  <BadgeCheck className="h-4 w-4 fill-[#1d9bf0] text-white" /> {user?.authProvider === 'GOOGLE' ? 'Signed in with Google' : 'Signed in with JNU email'}
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-navy-900">Full name</span>
                <input
                  required
                  maxLength={80}
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  className="w-full rounded-xl border border-[#d8e0eb] px-3.5 py-3 text-sm text-navy-950 outline-none transition placeholder:text-navy-700/40 focus:border-campus-blue focus:ring-4 focus:ring-blue-50"
                  placeholder="Your name"
                />
              </label>

              <label className="block sm:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-navy-900">Phone number <span className="font-normal text-navy-700/55">(optional, 10 digits)</span></span>
                <span className="relative block">
                  <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-700/55" />
                  <input
                    inputMode="numeric"
                    maxLength={10}
                    pattern="[0-9]{10}"
                    value={form.phone}
                    onChange={(event) => setForm({ ...form, phone: event.target.value.replace(/\D/g, '').slice(0, 10) })}
                    className="w-full rounded-xl border border-[#d8e0eb] py-3 pl-10 pr-4 text-sm text-navy-950 outline-none transition placeholder:text-navy-700/40 focus:border-campus-blue focus:ring-4 focus:ring-blue-50"
                    placeholder="10-digit phone number"
                  />
                </span>
              </label>

              <label className="block sm:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-navy-900">Campus hostel</span>
                <span className="relative block">
                  <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-700/55" />
                  <select
                    required
                    value={form.hostel}
                    onChange={(event) => setForm({ ...form, hostel: event.target.value })}
                    className="w-full appearance-none rounded-xl border border-[#d8e0eb] bg-white py-3 pl-10 pr-4 text-sm text-navy-950 outline-none transition focus:border-campus-blue focus:ring-4 focus:ring-blue-50"
                  >
                    <option value="" disabled>Select your hostel</option>
                    {ALL_HOSTELS.map((hostel) => <option key={hostel} value={hostel}>{hostel}</option>)}
                  </select>
                </span>
                {cluster && <span className="mt-1.5 block text-xs text-navy-700/60">{cluster.name} Cluster</span>}
              </label>

              <div className="sm:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-navy-900">JNU email</span>
                <div className="flex items-center justify-between gap-3 rounded-xl border border-[#e5eaf1] bg-[#f7f9fc] px-3.5 py-3">
                  <span className="truncate text-sm text-navy-700/70">{user?.email}</span>
                  <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-navy-700/55"><LockKeyhole className="h-3.5 w-3.5" /> Google account</span>
                </div>
                <p className="mt-1.5 text-xs text-navy-700/55">Your sign-in email cannot be changed here.</p>
              </div>
            </div>

            <div className="flex flex-col-reverse justify-end gap-3 border-t border-[#e8edf4] pt-5 sm:flex-row">
              {error && <p role="alert" className="self-center text-sm text-red-700 sm:mr-auto">{error}</p>}
              <Button type="button" variant="secondary" onClick={() => onNavigate('profile')}>Cancel</Button>
              <Button type="submit" variant="blue" icon={Check} disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</Button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};
