import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { CATEGORIES } from "@/shared/config/marketplaceData";
import { Button } from "@/shared/components/ui/Button";

export const SearchBar = ({
  onSearch,
  initialQuery = "",
  initialCategory = "all",
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.({
      search: query.trim(),
      category: category !== "all" ? category : undefined,
    });
  };

  return (
    <div className="search-bar-shell w-full rounded-2xl border border-paper-darkBorder bg-white px-2 py-2 shadow-sm transition-colors focus-within:border-campus-blue focus-within:ring-2 focus-within:ring-campus-blue/15">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-0 flex-col sm:flex-row"
      >
        {/* Category Selector */}
        <div className="relative mb-2 flex w-full shrink-0 items-center border-b border-paper-border pb-2 sm:mb-0 sm:w-auto sm:border-b-0 sm:border-r sm:pb-0 sm:pr-3 sm:mr-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter by category"
            className="search-category-select h-11 w-full cursor-pointer appearance-none border-none bg-transparent py-2 pl-3 pr-8 text-sm font-semibold text-navy-950 focus:outline-none sm:w-52"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 h-4 w-4 text-navy-700/65" />
        </div>

        {/* Search Input */}
        <div className="flex-1 relative flex items-center w-full">
          <Search className="pointer-events-none absolute left-3 h-[18px] w-[18px] text-navy-700/65" />
          <input
            type="text"
            aria-label="Search campus listings"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for books, cycles, electronics, furniture..."
            className="h-11 w-full border-none bg-transparent py-2 pl-10 pr-3 text-sm font-medium text-navy-950 placeholder:text-navy-700/55 focus:outline-none"
          />
        </div>

        {/* Search Button */}
        <Button
          type="submit"
          variant="blue"
          size="md"
          className="mt-2 h-11 w-full shrink-0 px-6 sm:mt-0 sm:w-auto"
        >
          Search
        </Button>
      </form>
    </div>
  );
};
