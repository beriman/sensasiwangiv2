import Link from 'next/link';
import { Leaf, Trees, Citrus, Sparkles, Waves, Flame } from 'lucide-react';

const scentProfileIcons: { [key: string]: React.ElementType } = {
  Floral: Leaf,
  Woody: Trees,
  Citrus: Citrus,
  Oriental: Sparkles,
  Fresh: Waves,
  Spicy: Flame,
};

interface ProductPropertiesProps {
  properties: { [key: string]: any };
  perfumerProfileSlug?: string;
}

export function ProductProperties({
  properties,
  perfumerProfileSlug,
}: ProductPropertiesProps) {
  const propertiesToShow = { ...properties };
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
      {Object.entries(propertiesToShow).map(([key, value]) => {
        const Icon = key === 'Scent Profile' ? scentProfileIcons[value] : null;
        const isPerfumerLink = key === 'Perfumer' && perfumerProfileSlug;

        return (
          <div key={key}>
            <p className="font-semibold text-muted-foreground">{key}</p>
            {isPerfumerLink ? (
              <Link
                href={`/browse?seller=${perfumerProfileSlug}`}
                className="flex items-center gap-2 text-foreground/90 underline hover:text-accent"
              >
                {value}
              </Link>
            ) : (
              <div className="flex items-center gap-2 text-foreground/90">
                {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
                <span>{value}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
