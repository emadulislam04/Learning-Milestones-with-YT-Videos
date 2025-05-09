import axios from 'axios';
import { formatDuration } from '../utils/formatDuration';

const API_KEY = 'AIzaSyDdc6dRrA3W14NW080ZDhOdSorCcev_qeQ';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const extractVideoId = (url: string): string | null => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
};

export const fetchVideoDetails = async (url: string) => {
  const videoId = extractVideoId(url);
  
  if (!videoId) {
    throw new Error('Invalid YouTube URL');
  }

  try {
    // Fetch video details
    const { data: videoData } = await axios.get(`${BASE_URL}/videos`, {
      params: {
        part: 'snippet,contentDetails',
        id: videoId,
        key: API_KEY
      }
    });

    if (!videoData.items || videoData.items.length === 0) {
      throw new Error('Video not found');
    }

    const videoItem = videoData.items[0];
    const title = videoItem.snippet.title;
    const thumbnailUrl = videoItem.snippet.thumbnails.high.url;
    const isoDuration = videoItem.contentDetails.duration;
    const duration = formatDuration(isoDuration);
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

    return {
      id: videoId,
      title,
      duration,
      thumbnailUrl,
      videoUrl
    };
  } catch (error) {
    console.error('Error fetching video details:', error);
    throw error;
  }
};