import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgeInfo } from '@/data/badges';

const getThresholdString = (badge: BadgeInfo) => {
    if (badge.levels.length === 1) {
        return badge.levels[0].threshold.toString();
    }
    return badge.levels.map(l => l.threshold).join('/');
};

interface BadgeCategoryCardProps {
    badge: BadgeInfo;
}

export function BadgeCategoryCard({ badge }: BadgeCategoryCardProps) {
    const Icon = badge.icon;
    const isCuratedBadge = badge.category === 'curated';
    
    // Create a dynamic description based on the levels
    const descriptionTemplate = badge.levels[0].description;
    const thresholdString = getThresholdString(badge);
    const finalDescription = descriptionTemplate.replace(/(\d+((?:\/\d+)*))/, `**${thresholdString}**`);


    return (
        <Card className="flex flex-col rounded-2xl border-none bg-transparent text-center shadow-neumorphic transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
            <CardHeader className="items-center pb-4">
            <div className={`relative flex h-24 w-24 items-center justify-center rounded-full shadow-neumorphic-inset ${isCuratedBadge ? 'bg-blue-100 text-blue-700' : 'bg-background'}`}>
                <Icon className="h-12 w-12" />
            </div>
            </CardHeader>
            <CardContent className="flex flex-grow flex-col">
            <CardTitle className="text-xl font-bold text-foreground/80">{badge.categoryTitle}</CardTitle>
            <p className="mt-2 flex-grow text-muted-foreground" dangerouslySetInnerHTML={{ __html: finalDescription.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground/80">$1</strong>') }}></p>
            </CardContent>
        </Card>
    )
}
