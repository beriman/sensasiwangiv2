// src/components/content-renderer.tsx
import React from 'react';

interface ContentRendererProps {
  content: string;
}

const getYouTubeEmbedUrl = (url: string) => {
  const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  if (videoIdMatch && videoIdMatch[1]) {
    return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
  }
  return null;
};

const getTikTokEmbedUrl = (url: string) => {
    // Matches URLs like https://www.tiktok.com/@username/video/1234567890123456789
    const videoIdMatch = url.match(/tiktok\.com\/.*\/video\/(\d+)/);
    if (videoIdMatch && videoIdMatch[1]) {
      return `https://www.tiktok.com/embed/v2/${videoIdMatch[1]}`;
    }
    return null;
};

const getInstagramEmbedUrl = (url: string) => {
    // Matches URLs like https://www.instagram.com/p/Cxyz123Abc/
    const postIdMatch = url.match(/instagram\.com\/(?:p|reel)\/([a-zA-Z0-9_-]+)/);
    if (postIdMatch && postIdMatch[1]) {
      // Instagram requires `/embed/` at the end
      return `https://www.instagram.com/p/${postIdMatch[1]}/embed/`;
    }
    return null;
}

const urlRegex = /(https?:\/\/[^\s]+)/g;

export function ContentRenderer({ content }: ContentRendererProps) {
  if (!content) return null;

  const parts = content.split(urlRegex);

  return (
    <div className="space-y-4 text-base text-foreground/80 whitespace-pre-wrap">
      {parts.map((part, index) => {
        if (part.match(urlRegex)) {
          const youtubeUrl = getYouTubeEmbedUrl(part);
          if (youtubeUrl) {
            return (
              <div key={index} className="aspect-video w-full max-w-xl mx-auto my-4">
                <iframe
                  src={youtubeUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                ></iframe>
              </div>
            );
          }

          const tiktokUrl = getTikTokEmbedUrl(part);
          if (tiktokUrl) {
            return (
                 <div key={index} className="w-full max-w-[325px] h-[750px] mx-auto my-4">
                    <iframe
                        src={tiktokUrl}
                        title="TikTok video player"
                        frameBorder="0"
                        allow="autoplay; encrypted-media;"
                        allowFullScreen
                        className="w-full h-full rounded-lg"
                    ></iframe>
                </div>
            )
          }

          const instagramUrl = getInstagramEmbedUrl(part);
          if (instagramUrl) {
              return (
                  <div key={index} className="w-full max-w-md mx-auto my-4">
                    <iframe
                        src={instagramUrl}
                        title="Instagram post"
                        frameBorder="0"
                        allowTransparency
                        scrolling="no"
                        className="w-full h-[550px] rounded-lg border"
                    ></iframe>
                  </div>
              )
          }

          // Fallback to a regular link
          return <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-accent underline hover:text-accent/80">{part}</a>;

        }
        return <span key={index}>{part}</span>;
      })}
    </div>
  );
}
