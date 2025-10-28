import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon, Loader } from 'lucide-react';
import axios from 'axios';

const ImageUpload = ({ onImageUploaded, currentImage, label = "Upload Image" }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setError('Image size must be less than 10MB');
      return;
    }

    setError(null);
    setUploading(true);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append('image', file);

      // Upload to Cloudinary
      const response = await axios.post(
        'https://api.bnbatiment.com/api/cloudinary/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 30000, // 30 seconds timeout
        }
      );

      if (response.data.success) {
        setPreview(response.data.url);
        if (onImageUploaded) {
          onImageUploaded(response.data.url);
        }
      } else {
        setError(response.data.message || 'Upload failed');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError(
        err.response?.data?.message || 
        err.message || 
        'Failed to upload image. Please try again.'
      );
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (onImageUploaded) {
      onImageUploaded('');
    }
  };

  // Use preview or currentImage
  const displayImage = preview || currentImage;

  return (
    <div className="image-upload-container">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors">
        {displayImage ? (
          <div className="relative">
            <img
              src={displayImage}
              alt="Preview"
              className="w-full h-64 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              {uploading ? (
                <Loader className="animate-spin text-blue-500" size={48} />
              ) : (
                <Upload className="text-gray-400" size={48} />
              )}
            </div>
            <label className="cursor-pointer">
              <span className="text-blue-600 hover:text-blue-700 font-medium">
                {uploading ? 'Uploading...' : 'Click to upload or drag and drop'}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                disabled={uploading}
              />
            </label>
            <p className="mt-2 text-sm text-gray-500">
              PNG, JPG, GIF, WEBP up to 10MB
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-2 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {uploading && (
        <div className="mt-2 text-sm text-blue-600 flex items-center gap-2">
          <Loader className="animate-spin" size={16} />
          Uploading image...
        </div>
      )}
    </div>
  );
};

export default ImageUpload;

