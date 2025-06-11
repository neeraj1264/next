export default function manifest() {
  return {
    name: 'Treasured Care For You',
    short_name: 'Treasured Care For You',
    description: 'Discover a community where independence is cherished. Treasured Care For You offers personalised NDIS support in a caring and welcoming environment for individuals and families',
    start_url: '/',
    display: 'fullscreen',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [ 
      {
        src: '/logo.jpg',
        sizes: '192x192',
        type: 'image/png', 
      },
      {
        src: '/logo.jpg', 
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}