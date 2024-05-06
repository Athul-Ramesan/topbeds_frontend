import React, { ChangeEvent, useCallback, useState } from 'react';

interface ImageUploaderProps {
  onUpload: (files: File[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);

      const previewUrlPromises = files.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      Promise.all(previewUrlPromises)
        .then((urls) => {
          setPreviewUrls(urls);
          onUpload(files);
        })
        .catch((error) => {
          console.error('Error generating preview URLs:', error);
        });
    },
    [onUpload]
  );

  return (
    <div>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="mb-2"
      />
      <div className="flex flex-wrap">
        {previewUrls.map((previewUrl, index) => (
          <div key={index} className="mr-2 mb-2">
            <img src={previewUrl} alt={`Preview ${index}`} className="h-20 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;