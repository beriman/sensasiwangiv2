// src/components/add-to-calendar.tsx
'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { CalendarPlus, Download, Globe } from 'lucide-react';
import { format } from 'date-fns';

interface AddToCalendarProps {
  title: string;
  description: string;
  location: string;
  startDateTime: Date;
  durationInMinutes: number;
}

export function AddToCalendar({
  title,
  description,
  location,
  startDateTime,
  durationInMinutes,
}: AddToCalendarProps) {

  const getEndTime = (start: Date, duration: number) => {
    return new Date(start.getTime() + duration * 60000);
  };
  
  const formatDateForGoogle = (date: Date) => {
    return format(date, "yyyyMMdd'T'HHmmss'Z'");
  };
  
  const formatDateForICS = (date: Date) => {
    return format(date, "yyyyMMdd'T'HHmmss'Z'");
  };

  const handleGoogleCalendarClick = () => {
    const startTime = formatDateForGoogle(startDateTime);
    const endTime = formatDateForGoogle(getEndTime(startDateTime, durationInMinutes));
    
    const googleCalendarUrl = new URL('https://www.google.com/calendar/render');
    googleCalendarUrl.searchParams.append('action', 'TEMPLATE');
    googleCalendarUrl.searchParams.append('text', title);
    googleCalendarUrl.searchParams.append('dates', `${startTime}/${endTime}`);
    googleCalendarUrl.searchParams.append('details', description);
    googleCalendarUrl.searchParams.append('location', location);

    window.open(googleCalendarUrl.toString(), '_blank');
  };

  const handleDownloadICSClick = () => {
    const startTime = formatDateForICS(startDateTime);
    const endTime = formatDateForICS(getEndTime(startDateTime, durationInMinutes));
    const now = formatDateForICS(new Date());

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//sensasiwangi.id//NONSGML v1.0//EN',
      'BEGIN:VEVENT',
      `UID:${startTime}-${endTime}@sensasiwangi.id`,
      `DTSTAMP:${now}`,
      `DTSTART:${startTime}`,
      `DTEND:${endTime}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/ /g, '_')}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline" className="mt-4 w-full rounded-xl py-6 shadow-neumorphic">
                <CalendarPlus className="mr-2" />
                Tambahkan ke Kalender
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={handleGoogleCalendarClick}>
                <Globe className="mr-2 h-4 w-4" />
                <span>Google Calendar</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDownloadICSClick}>
                <Download className="mr-2 h-4 w-4" />
                <span>File .ics (Outlook, Apple)</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  );
}
