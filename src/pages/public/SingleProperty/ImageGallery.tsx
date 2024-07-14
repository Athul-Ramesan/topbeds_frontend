
const ImageGallery = () => {
  const images = [
    '/about-cozy-1.jpg',
    '/about-cozy-2.jpg',
    '/about-cozy-3.jpg',
  ];

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {images.map((src, index) => (
        <img key={index} src={src} alt={`Gallery image ${index}`} className="w-full h-auto rounded-lg" />
      ))}
    </div>
  );
};

export default ImageGallery;
