import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { badgeData, BadgeCategory } from '@/data/badges';
import { type Profile } from '@/lib/types';

interface ProfileBadgesProps {
  profile: Profile;
}

export function ProfileBadges({ profile }: ProfileBadgesProps) {
  const userBadges = profile.badges ? { ...profile.badges } : {};
  if (profile.curation?.isCurated) {
    userBadges.curated = 1;
  }

  if (Object.keys(userBadges).length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <h3 className="text-center text-sm font-semibold uppercase text-muted-foreground tracking-wider sm:text-left">Pencapaian</h3>
      <div className="mt-2 flex flex-wrap justify-center gap-3 sm:justify-start">
        <TooltipProvider delayDuration={100}>
          {Object.entries(userBadges).map(([badgeKey, level]) => {
            const category = badgeData[badgeKey as BadgeCategory];
            if (!category) return null;
            const achievedLevel = category.levels.find(l => l.level === level);
            if (!achievedLevel) return null;

            const Icon = category.icon;
            const isCuratedBadge = badgeKey === 'curated';

            return (
              <Tooltip key={badgeKey}>
                <TooltipTrigger asChild>
                  <div className={cn(
                    "relative flex h-12 w-12 items-center justify-center rounded-full shadow-neumorphic-inset transition-all",
                    isCuratedBadge ? 'bg-blue-100 text-blue-700' : 'bg-background'
                  )}>
                    <Icon className="h-6 w-6" />
                    {!isCuratedBadge && (
                      <span className="absolute -bottom-1 -right-1 rounded-full bg-accent-gradient px-1.5 py-0.5 text-xs font-bold text-accent-foreground shadow-sm">
                        Lv.{level}
                      </span>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-bold">{achievedLevel.title}</p>
                  <p>{achievedLevel.description}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </div>
    </div>
  );
}
