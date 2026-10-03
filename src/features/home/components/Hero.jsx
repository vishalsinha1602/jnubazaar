import React from "react";
import { ArrowRight, Plus, ShieldCheck, Tag, Users } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { CreepyButton } from "@/shared/components/ui/CreepyButton";
import { formatPrice } from "@/shared/utils/formatPrice";

export const Hero = ({
  products = [],
  loading = false,
  error = "",
  onExplore,
  onSell,
  onOpenProduct,
}) => {
  const listings = products
    .filter((product) => product.status !== "sold")
    .slice(0, 3);
  const campusCount = new Set(
    products
      .map(
        (product) =>
          product.seller?.hostel || product.sellerHostel || product.hostel,
      )
      .filter((hostel) => typeof hostel === "string" && hostel.trim())
      .map((hostel) => hostel.trim().toLocaleLowerCase()),
  ).size;

  return (
    <section className="relative overflow-hidden bg-paper-50">
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse at 78% 36%, rgba(92, 126, 255, .14), transparent 34%), linear-gradient(to right, #dce5ff 1px, transparent 1px), linear-gradient(to bottom, #dce5ff 1px, transparent 1px)`,
          backgroundSize: "auto, 56px 56px, 56px 56px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-3 flex flex-col items-start">
            <h1 className="font-sans text-5xl sm:text-6xl lg:text-7xl font-bold text-navy-950 leading-[1.05] tracking-tight mb-5">
              Everything
              <br />
              You Need.
              <br />
              <span className="text-campus-blue">Right Here</span>
              <br />
              on Campus.
            </h1>
            <p className="text-lg text-navy-800/80 leading-relaxed max-w-[420px] mb-7">
              Buy, sell and discover things from students on campus. Zero
              commission. Safe campus handovers. @jnu.ac.in only.
            </p>
            <div className="flex items-center gap-3 flex-wrap mb-8">
              <CreepyButton
                onClick={onExplore}
                aria-label="Explore Marketplace"
              >
                <span className="flex items-center gap-2 whitespace-nowrap">
                  Explore Marketplace{" "}
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </span>
              </CreepyButton>
              <Button
                variant="secondary"
                size="lg"
                onClick={onSell}
                className="sell-button-light-hover h-[52px] w-[220px] shrink-0 text-sm whitespace-nowrap"
              >
                <Plus className="w-4 h-4 shrink-0" /> Sell Something
              </Button>
            </div>
            <div className="flex items-center flex-wrap gap-x-6 gap-y-2">
              <div className="flex items-center gap-1.5 text-xs text-navy-700/80">
                <ShieldCheck className="w-3.5 h-3.5 text-campus-teal shrink-0" />
                <span className="font-medium">Verified @jnu.ac.in Only</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-navy-700/80">
                <Tag className="w-3.5 h-3.5 text-campus-terracotta shrink-0" />
                <span className="font-medium">₹0 Platform Commission</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-navy-700/80">
                <Users className="w-3.5 h-3.5 text-navy-800 shrink-0" />
                <span className="font-medium">JNU campus community</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-3">
            <div className="bg-white border border-paper-darkBorder rounded-xl p-4 shadow-card">
              <div className="flex items-center justify-between mb-3 px-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-navy-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-campus-blue" />{" "}
                  Recent Campus Listings
                </span>
              </div>

              <div className="space-y-1">
                {loading ? (
                  <p className="px-3 py-8 text-sm text-navy-700/60">
                    Loading current listings…
                  </p>
                ) : error ? (
                  <p role="alert" className="px-3 py-8 text-sm text-red-600">
                    {error}
                  </p>
                ) : listings.length ? (
                  listings.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onOpenProduct?.(item)}
                      className="flex w-full items-center gap-4 rounded-xl border border-transparent p-3 text-left transition-colors hover:border-blue-100 hover:bg-blue-50/60"
                    >
                      {item.images?.[0] ? (
                        <img
                          src={item.images[0]}
                          alt=""
                          className="h-14 w-14 shrink-0 rounded-xl border border-paper-darkBorder object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[10px] font-semibold uppercase tracking-wider text-blue-500">
                          JNU
                        </div>
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-navy-950">
                          {item.title}
                        </span>
                        <span className="mt-0.5 block truncate text-xs text-navy-700/65">
                          {item.seller?.hostel ||
                            item.sellerHostel ||
                            item.hostel ||
                            item.categoryLabel ||
                            "JNU Campus"}
                        </span>
                        <span className="mt-1 inline-block rounded-md border border-blue-100 bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700">
                          {item.condition || "Available"}
                        </span>
                      </span>
                      <span className="shrink-0 text-sm font-bold tabular-nums text-navy-950">
                        {formatPrice(item.price)}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-8 text-sm text-navy-700/65">
                    No active listings yet. Be the first to list something on
                    campus.
                  </div>
                )}
              </div>

              <div className="mt-3 pt-3 border-t border-paper-border flex items-center justify-between gap-3 px-2 text-[11px] text-navy-700/60">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-campus-teal" />{" "}
                  Student-to-student handover
                </span>
                <span className="shrink-0">{listings.length} shown</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { val: products.length, label: "Active Listings" },
                { val: "₹0", label: "Commission Fee" },
                { val: campusCount, label: "Hostels Represented" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white border border-paper-darkBorder rounded-xl p-3 text-center shadow-subtle"
                >
                  <div className="text-xl font-sans font-bold text-navy-950 tabular-nums">
                    {stat.val}
                  </div>
                  <div className="text-[10px] text-navy-700/70 font-medium mt-0.5 leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-paper-darkBorder to-transparent" />
    </section>
  );
};
