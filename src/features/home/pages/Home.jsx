import React, { useEffect } from "react";
import { Hero } from "@/features/home/components/Hero";
import { SearchBar } from "@/features/home/components/SearchBar";
import { CategorySection } from "@/features/home/components/CategorySection";
import { FeaturedProducts } from "@/features/home/components/FeaturedProducts";
import { HowItWorks } from "@/features/home/components/HowItWorks";
import { Button } from "@/shared/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/shared/components/ui/ScrollReveal";

export const Home = ({
  products,
  loading,
  productsError,
  wishlistIds,
  onWishlistToggle,
  onNavigate,
  onOpenProduct,
  onStartChat,
  scrollTarget,
}) => {
  useEffect(() => {
    if (scrollTarget) {
      const el = document.getElementById(scrollTarget);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [scrollTarget]);

  return (
    <div>
      {/* HERO */}
      <Hero
        products={products}
        loading={loading}
        error={productsError}
        onExplore={() => onNavigate("marketplace")}
        onSell={() => onNavigate("sell")}
        onOpenProduct={onOpenProduct}
      />

      {/* SEARCH BAR - prominent campus marketplace search */}
      <div className="sticky top-[104px] z-30 bg-white/95 backdrop-blur-xl pt-3 pb-3 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchBar onSearch={(params) => onNavigate("marketplace", params)} />
        </div>
      </div>

      {/* CATEGORIES */}
      <ScrollReveal>
        <CategorySection
          products={products}
          onCategorySelect={(cat) =>
            onNavigate("marketplace", { category: cat.id })
          }
          onViewAll={() => onNavigate("marketplace")}
        />
      </ScrollReveal>

      {/* FEATURED PRODUCTS */}
      <ScrollReveal>
        <FeaturedProducts
          products={products}
          loading={loading}
          wishlistIds={wishlistIds}
          onWishlistToggle={onWishlistToggle}
          onOpenProduct={onOpenProduct}
          onStartChat={onStartChat}
          onViewAll={() => onNavigate("marketplace")}
        />
      </ScrollReveal>

      {/* CAMPUS SECTION */}
      {/* HOW IT WORKS */}
      <ScrollReveal>
        <HowItWorks />
      </ScrollReveal>

      {/* SELL CTA */}
      <ScrollReveal>
        <section className="py-14 bg-navy-950 border-t border-navy-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-paper-200/60 mb-2">
                  End of Semester Clearance
                </p>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight mb-1">
                  Got something you don't
                  <br />
                  need anymore?
                </h2>
                <p className="text-base text-campus-terracotta font-medium mt-2">
                  Someone in JNU might need it.
                </p>
                <p className="text-sm text-paper-100/60 mt-2 max-w-md leading-relaxed">
                  Pass down textbooks, coolers, and cycles to arriving juniors
                  rather than leaving them behind or selling to external scrap
                  vendors at pennies on the rupee.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Button
                  variant="blue"
                  size="lg"
                  onClick={() => onNavigate("sell")}
                  className="h-[52px] rounded-xl border-[#d45136] px-6 text-sm font-semibold whitespace-nowrap shadow-sm"
                >
                  List an Item Now — Free <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() =>
                    onNavigate("home", { scrollTo: "how-it-works" })
                  }
                  className="h-[52px] rounded-xl border-white/80 px-6 text-sm font-semibold whitespace-nowrap"
                >
                  Campus Guidelines
                </Button>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
};
