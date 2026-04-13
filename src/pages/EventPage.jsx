import { useState } from "react";
import eventsData from "../data/events.json";
import EventCard from "../components/EventCard";
import FiltersBar from "../components/FiltersBar";

export default function EventPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Automatically extract unique categories from our JSON data
  const categories = ["All", ...new Set(eventsData.map((event) => event.category))];

  // Filter the events based on search AND category
  const filteredEvents = eventsData.filter((event) => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      event.venue.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === "All" || event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="mb-8 mt-4">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-3">
          Upcoming Events
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
          Discover technical workshops, cultural fests, and hackathons happening around the KIET campus.
        </p>
      </div>

      {/* The Filters Bar */}
      <FiltersBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      {/* Grid of Filtered Events */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        /* Empty State if search finds nothing */
        <div className="text-center py-20 bg-white/50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
          <div className="text-5xl mb-4">🕵️‍♂️</div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">No events found</h3>
          <p className="text-slate-500 dark:text-slate-400">Try adjusting your search or filters to find what you're looking for.</p>
          <button 
            onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
            className="mt-6 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}

    </div>
  );
}