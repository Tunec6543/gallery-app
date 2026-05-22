export const fetchPaintings = async () => {
  try {
    const response = await fetch(
      'https://registry.scalar.com/@mail-ufgwz/apis/gallery-api@latest?format=json'
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const api = await response.json();

    const paintings =
      api.paths['/paintings']
        .get
        .responses['200']
        .content['application/json']
        .example;

    return paintings.map((item, index) => ({
      id: index + 1,
      title: item.title,
      year: item.year,
      artist: item.artist,
      location: item.location,
      imageUrl: item.imageUrl
    }));

  } catch (error) {
    console.error('Failed to fetch paintings:', error);
    throw new Error('Не удалось загрузить картины');
  }
};