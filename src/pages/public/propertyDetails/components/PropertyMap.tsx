// import React from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

// interface PropertyMapProps {
//   location: string;
// }

// const PropertyMap: React.FC<PropertyMapProps> = ({ location }) => {
//   // You'll need to convert the location string to latitude and longitude
//   // This is a placeholder function - you'll need to implement actual geocoding
//   const getCoordinates = (loc: string) => {
//     // Implement geocoding here
//     return [51.505, -0.09]; // Example coordinates (London)
//   };

//   const [lat, lng] = getCoordinates(location);

//   return (
//     <MapContainer center={[lat, lng]} zoom={13} style={{ height: '400px', width: '100%' }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <Marker position={[lat, lng]}>
//         <Popup>
//           Property location
//         </Popup>
//       </Marker>
//     </MapContainer>
//   );
// };

// export default PropertyMap;