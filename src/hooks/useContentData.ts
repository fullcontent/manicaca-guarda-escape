import { useState, useEffect } from "react";
import contentData from "@/data/content.json";

export interface Room {
  id: number;
  name: string;
  capacity: string;
  price: string;
  description: string;
  amenities: string[];
  featured: boolean;
  images: string[];
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

export interface ContentData {
  rooms: Room[];
  gallery: GalleryImage[];
}

export const useContentData = () => {
  const [data, setData] = useState<ContentData>(contentData);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  // Simula carregar imagens da pasta uploads
  useEffect(() => {
    const savedImages = localStorage.getItem("uploaded_images");
    if (savedImages) {
      setUploadedImages(JSON.parse(savedImages));
    }
  }, []);

  const updateRoom = (roomId: number, updatedRoom: Partial<Room>) => {
    const newData = {
      ...data,
      rooms: data.rooms.map(room => 
        room.id === roomId 
          ? { ...room, ...updatedRoom }
          : room
      )
    };
    setData(newData);
    localStorage.setItem("content_data", JSON.stringify(newData));
  };

  const addImageToGallery = (image: Omit<GalleryImage, "id">) => {
    const newImage = {
      ...image,
      id: Math.max(...data.gallery.map(img => img.id), 0) + 1
    };
    const newData = {
      ...data,
      gallery: [...data.gallery, newImage]
    };
    setData(newData);
    localStorage.setItem("content_data", JSON.stringify(newData));
  };

  const removeImageFromGallery = (imageId: number) => {
    const newData = {
      ...data,
      gallery: data.gallery.filter(img => img.id !== imageId)
    };
    setData(newData);
    localStorage.setItem("content_data", JSON.stringify(newData));
  };

  const uploadImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        const imageName = `uploaded_${Date.now()}_${file.name}`;
        
        // Simula upload salvando no localStorage
        const newImages = [...uploadedImages, imageName];
        setUploadedImages(newImages);
        localStorage.setItem("uploaded_images", JSON.stringify(newImages));
        localStorage.setItem(`image_${imageName}`, dataUrl);
        
        resolve(imageName);
      };
      reader.readAsDataURL(file);
    });
  };

  const getImageUrl = (imageName: string) => {
    // Verifica se é uma imagem carregada
    const uploadedImage = localStorage.getItem(`image_${imageName}`);
    if (uploadedImage) {
      return uploadedImage;
    }
    
    // Caso contrário, usa as imagens dos assets
    try {
      return `/src/assets/${imageName}`;
    } catch {
      return "/placeholder.svg";
    }
  };

  // Carrega dados salvos no localStorage se existir
  useEffect(() => {
    const savedData = localStorage.getItem("content_data");
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch {
        // Se der erro, mantém os dados padrão
      }
    }
  }, []);

  return {
    data,
    updateRoom,
    addImageToGallery,
    removeImageFromGallery,
    uploadImage,
    getImageUrl,
    uploadedImages
  };
};