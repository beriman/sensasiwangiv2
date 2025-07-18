import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@/lib/supabase';

interface UseSupabaseImageUploadResult {
  isUploading: boolean;
  uploadImage: (file: File, bucketName: string) => Promise<string | null>;
}

export const useSupabaseImageUpload = (): UseSupabaseImageUploadResult => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const supabase = createClient();

  const uploadImage = async (file: File, bucketName: string): Promise<string | null> => {
    setIsUploading(true);
    const fileName = `${Date.now()}-${file.name}`;

    try {
      const { data, error } = await supabase.storage.from(bucketName).upload(fileName, file);

      if (error) {
        throw new Error(error.message);
      }

      const { data: { publicUrl } } = supabase.storage.from(bucketName).getPublicUrl(data.path);
      toast({ title: 'Gambar Terunggah', description: 'Gambar telah berhasil diunggah.' });
      return publicUrl;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat mengunggah gambar.';
      toast({ variant: 'destructive', title: 'Gagal mengunggah gambar', description: errorMessage });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { isUploading, uploadImage };
};
