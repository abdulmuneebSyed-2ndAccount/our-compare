// components/SearchBar.jsx
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export default function SearchBar({ onSearchSelect }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]); // Initialize as empty array

  useEffect(() => {
    let timer;
    if (query.length > 2) {
      timer = setTimeout(() => {
        fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            query
          )}.json?access_token=pk.eyJ1Ijoic3llZDc4Njc4NiIsImEiOiJjbTZzNDNyM2UwM3JuMnFzYjdndjl6dDdnIn0.vIu9Tx54Wx6UkIP2XfZlQA&country=IN&proximity=78.4867,17.3850&limit=5`
        )
          .then((res) => res.json())
          .then((data) => {
            // Add null check for data.features
            setSuggestions(data.features || []);
          })
          .catch((error) => {
            console.error("Search error:", error);
            setSuggestions([]);
          });
      }, 300);
    }
    return () => {
      clearTimeout(timer);
      setSuggestions([]);
    };
  }, [query]);

  return (
    <div className="space-y-4 relative">
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Pickup Location"
          className="w-full bg-white"
          readOnly
          value="Your current location"
        />
      </div>
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Where to?"
          className="w-full bg-white"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {/* Add null check before accessing length */}
        {suggestions && suggestions.length > 0 && (
          <div className="absolute top-full w-full bg-white shadow-lg z-20 mt-1 rounded-md">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onSearchSelect(suggestion.center);
                  setQuery(suggestion.place_name);
                  setSuggestions([]);
                }}
              >
                {suggestion.place_name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
