import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  deadline: string;
}

export const CountdownTimer = ({ deadline }: CountdownTimerProps) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(deadline) - +new Date();
        let timeLeft: { days?: number; hours?: number; minutes?: number; seconds?: number } = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const timerComponents: any[] = [];
    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval as keyof typeof timeLeft]) {
            return;
        }
        timerComponents.push(
            <span key={interval}>
                {timeLeft[interval as keyof typeof timeLeft]}
                {interval.substring(0,1)}
            </span>
        );
    });
    
    return (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {timerComponents.length ? timerComponents.reduce((prev, curr) => [prev, ' ', curr]) : <span>Time's up!</span>}
        </div>
    );
};
