import React, { useEffect, useMemo, useState } from 'react';
import { Check, ChevronDown, ChevronUp, Mail, MapPin, Package, Pencil, Plus, Trash2, UserRound } from 'lucide-react';
import { productService } from '@/features/products/services/productService';
import { Button } from '@/shared/components/ui/Button';
import { Loader } from '@/shared/components/ui/Loader';
import { formatPrice } from '@/shared/utils/formatPrice';
import { VerifiedBadge } from '@/shared/components/ui/VerifiedBadge';

export const Profile = ({ user, onNavigate }) => {
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [avatarFailed, setAvatarFailed] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [showAllListings, setShowAllListings] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const profileImage = user?.profileImage || user?.avatar;

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      try {
        const listings = user?.id ? await productService.getBySeller(user.id) : [];
        if (active) setMyProducts(listings);
      } catch {
        if (active) setMyProducts([]);
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    window.scrollTo({ top: 0 });
    return () => { active = false; };
  }, [user?.id]);

  useEffect(() => setAvatarFailed(false), [profileImage]);

  const initials = useMemo(() => (user?.name || user?.username || 'JNU')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join(''), [user?.name, user?.username]);

  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-8">
        <div className="text-center">
          <p className="mb-4 text-navy-700">Please sign in to view your profile.</p>
          <Button variant="primary" onClick={() => onNavigate('login')}>Sign In with JNU</Button>
        </div>
      </div>
    );
  }

  const missingSetup = !user.hostel || !user.phone;
  const completedBasics = [user.name, user.phone, user.hostel].filter(Boolean).length;
  const visibleProducts = showAllListings ? myProducts : myProducts.slice(0, 6);
  const deleteListing = async (productId) => {
    setDeleteError('');
    setDeletingId(productId);
    try {
      await productService.delete(productId);
      setMyProducts((items) => items.filter((item) => item.id !== productId));
      setConfirmDeleteId(null);
    } catch (error) {
      setDeleteError(error.message || 'Could not delete this listing.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-paper-50">
      <section className="border-b border-paper-darkBorder bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border border-paper-darkBorder bg-navy-950 text-2xl font-semibold text-white shadow-card">
              {profileImage && !avatarFailed ? (
                <img
                  key={profileImage}
                  src={profileImage}
                  alt={`${user.name || 'Your'} profile`}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={() => setAvatarFailed(true)}
                />
              ) : <span aria-label="Profile initials">{initials || <UserRound className="h-9 w-9" />}</span>}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="break-words text-3xl font-bold tracking-tight text-navy-950">{user.name || user.username || 'JNU member'}</h1>
                {user.verified && <VerifiedBadge />}
              </div>
              <p className="mt-2 flex items-center gap-2 text-sm text-navy-700/70">
                <Mail className="h-4 w-4 shrink-0" /> <span className="truncate">{user.email}</span>
              </p>
              {user.hostel && (
                <p className="mt-1.5 flex items-center gap-2 text-sm text-navy-700/70">
                  <MapPin className="h-4 w-4 shrink-0" /> {user.hostel}
                </p>
              )}
            </div>

            <Button variant="secondary" size="sm" icon={Pencil} onClick={() => onNavigate('edit-profile')}>
              Edit profile
            </Button>
          </div>

          <div className="mt-7 grid gap-3 border-t border-paper-border pt-5 sm:grid-cols-3">
            <div className="rounded-xl bg-paper-50 p-4">
              <p className="text-xs font-medium text-navy-700/60">Account status</p>
              <p className="mt-1 font-semibold text-navy-950">{user.verificationStatus === 'VERIFIED' ? 'JNU email verified' : 'Google account connected'}</p>
            </div>
            <div className="rounded-xl bg-paper-50 p-4">
              <p className="text-xs font-medium text-navy-700/60">Profile details</p>
              <p className="mt-1 font-semibold text-navy-950">{completedBasics} of 3 added</p>
            </div>
            <div className="rounded-xl bg-paper-50 p-4">
              <p className="text-xs font-medium text-navy-700/60">Your listings</p>
              <p className="mt-1 font-semibold text-navy-950">{loading ? 'Loading…' : `${myProducts.length} active`}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-6 px-4 py-7 sm:px-6 lg:px-8">
        {missingSetup && (
          <section className="flex flex-col gap-4 rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-campus-blue">Welcome to JNUBazaar</p>
              <h2 className="mt-1 text-lg font-bold text-navy-950">Finish setting up your profile</h2>
              <p className="mt-1 max-w-2xl text-sm text-navy-700/75">Add your hostel and phone number so your campus profile is ready when you list an item.</p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-navy-700/70">
                <span className="inline-flex items-center gap-1"><Check className="h-3.5 w-3.5 text-campus-teal" /> Name</span>
                <span className={`inline-flex items-center gap-1 ${user.hostel ? 'text-campus-teal' : ''}`}>{user.hostel ? <Check className="h-3.5 w-3.5" /> : '○'} Hostel</span>
                <span className={`inline-flex items-center gap-1 ${user.phone ? 'text-campus-teal' : ''}`}>{user.phone ? <Check className="h-3.5 w-3.5" /> : '○'} Phone</span>
              </div>
            </div>
            <Button variant="blue" icon={Pencil} onClick={() => onNavigate('edit-profile')}>Complete profile</Button>
          </section>
        )}

        <section className="overflow-hidden rounded-2xl border border-paper-darkBorder bg-white">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-paper-border px-5 py-4 sm:px-6">
            <div>
              <h2 className="text-lg font-bold text-navy-950">Your listings</h2>
              <p className="mt-0.5 text-sm text-navy-700/60">{loading ? 'Loading your items…' : `${myProducts.length} ${myProducts.length === 1 ? 'item' : 'items'} posted`}</p>
            </div>
            <Button variant="accent" size="sm" icon={Plus} onClick={() => onNavigate('sell')}>List an item</Button>
          </div>

          {deleteError && <p role="alert" className="mx-5 mt-4 text-sm text-red-700 sm:mx-6">{deleteError}</p>}
          {loading ? <div className="py-12"><Loader /></div> : myProducts.length ? (
            <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-3">
              {visibleProducts.map((product) => (
                <article key={product.id} className="flex min-w-0 gap-3 rounded-xl border border-paper-darkBorder bg-white p-3">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white text-navy-700/35 sm:h-24 sm:w-24">
                    {product.images?.[0] ? <img src={product.images[0]} alt={product.title} className="h-full w-full object-cover" /> : <Package className="h-7 w-7" />}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p title={product.title} className="truncate text-sm font-semibold text-navy-950">{product.title}</p>
                    <p className="mt-1 font-serif text-base font-bold text-navy-950">{formatPrice(product.price)}</p>
                    <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
                      <button aria-label={`Edit ${product.title}`} onClick={() => onNavigate('sell', { productId: product.id })} className="inline-flex min-h-8 items-center gap-1.5 rounded-lg border border-paper-darkBorder bg-white px-2.5 text-xs font-semibold text-navy-800 transition hover:border-campus-blue hover:text-campus-blue">
                        <Pencil className="h-3.5 w-3.5" /> Edit
                      </button>
                      {confirmDeleteId === product.id ? (
                        <div className="flex items-center gap-1.5" role="group" aria-label={`Confirm deleting ${product.title}`}>
                          <button onClick={() => setConfirmDeleteId(null)} disabled={deletingId === product.id} className="min-h-8 rounded-lg px-2 text-xs font-medium text-navy-700 hover:bg-white">Cancel</button>
                          <button onClick={() => deleteListing(product.id)} disabled={deletingId === product.id} className="min-h-8 rounded-lg bg-red-600 px-2.5 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-60">{deletingId === product.id ? 'Removing…' : 'Confirm'}</button>
                        </div>
                      ) : (
                        <button aria-label={`Remove ${product.title}`} onClick={() => { setDeleteError(''); setConfirmDeleteId(product.id); }} className="inline-flex min-h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 hover:text-red-700">
                          <Trash2 className="h-3.5 w-3.5" /> Remove
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="px-5 py-12 text-center sm:py-16">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-paper-50 text-navy-700/45"><Package className="h-7 w-7" /></div>
              <h3 className="mt-4 font-semibold text-navy-950">Your first listing starts here</h3>
              <p className="mx-auto mt-1 max-w-sm text-sm text-navy-700/65">List something you no longer need and make it useful to someone else on campus.</p>
              <Button variant="blue" icon={Plus} className="mt-5" onClick={() => onNavigate('sell')}>Create your first listing</Button>
            </div>
          )}
          {!loading && myProducts.length > 6 && (
            <div className="flex justify-center border-t border-paper-border px-4 py-3">
              <button onClick={() => setShowAllListings((value) => !value)} className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-semibold text-campus-blue transition hover:bg-paper-50">
                {showAllListings ? <><ChevronUp className="h-4 w-4" /> Show fewer</> : <><ChevronDown className="h-4 w-4" /> Show all {myProducts.length} listings</>}
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};
