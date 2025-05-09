export interface Video {
  id: string;
  title: string;
  duration: string; // Human-readable format like "2m 35s"
  thumbnailUrl: string;
  videoUrl: string;
  watched: boolean;
}

export interface Category {
  id: string;
  name: string;
  videos: Video[];
}