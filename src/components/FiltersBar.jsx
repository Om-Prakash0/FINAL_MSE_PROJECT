export default function FiltersBar({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory, 
  categories 
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      
      {/* Search Input */}
      <div className="relative flex-grow max-w-md">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span className="text-slate-400">🔍</span>
        </div>
        <input
          type="text"
          placeholder="Search events or venues..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm dark:text-white"
        />
      </div>

      {/* Category Pills (Scrollable horizontally on small screens) */}
      <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 hide-scrollbar items-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
              selectedCategory === category
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none"
                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
    </div>
  );
}