export function getFilteredPaintings(paintings, searchQuery, filters) {
    if (!paintings || !Array.isArray(paintings)) {
        return [];
    }

    return paintings.filter((item) => {
        const title = item.title || "";
        const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesArtist = filters.artists.length === 0 || 
                             filters.artists.includes(item.artist);
        
        const matchesLocation = filters.locations.length === 0 || 
                               filters.locations.includes(item.location);
        
        const year = parseInt(item.year) || 0;
        
        let matchesYear = true;
        if (filters.yearRange.from) {
            if (year < parseInt(filters.yearRange.from)) {
                matchesYear = false;
            }
        }
        if (filters.yearRange.to) {
            if (year > parseInt(filters.yearRange.to)) {
                matchesYear = false;
            }
        }

        return matchesSearch && matchesArtist && matchesLocation && matchesYear;
    });
}