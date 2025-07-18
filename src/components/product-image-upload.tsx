import Image from 'next/image';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRef } from 'react';

interface ProductImageUploadProps {
  imageUrl: string;
  isUploading: boolean;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ProductImageUpload({
  imageUrl,
  isUploading,
  onImageChange,
}: ProductImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-2">
      <div className="relative mx-auto h-48 w-48 shrink-0">
        {isUploading ? (
          <div className="h-full w-full rounded-xl bg-muted animate-pulse" />
        ) : (
          <Image
            src={imageUrl || 'https://placehold.co/600x600.png'}
            alt="Pratinjau gambar produk"
            fill
            className="rounded-xl object-cover shadow-neumorphic-inset"
          />
        )}
      </div>
      <Input
        type="file"
        ref={fileInputRef}
        onChange={onImageChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
      <Button
        type="button"
        variant="outline"
        className="w-full rounded-xl shadow-neumorphic transition-all hover:shadow-neumorphic-active"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
      >
        <Upload className="mr-2 h-5 w-5" />
        {isUploading ? 'Mengunggah...' : 'Ubah Gambar'}
      </Button>
    </div>
  );
}
