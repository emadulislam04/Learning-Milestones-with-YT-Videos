export const formatDuration = (isoDuration: string): string => {
  // Remove the "PT" prefix
  let duration = isoDuration.replace('PT', '');
  
  let hours = 0, minutes = 0, seconds = 0;
  
  // Extract hours, minutes, and seconds
  const hoursMatch = duration.match(/(\d+)H/);
  if (hoursMatch) {
    hours = parseInt(hoursMatch[1]);
    duration = duration.replace(hoursMatch[0], '');
  }
  
  const minutesMatch = duration.match(/(\d+)M/);
  if (minutesMatch) {
    minutes = parseInt(minutesMatch[1]);
    duration = duration.replace(minutesMatch[0], '');
  }
  
  const secondsMatch = duration.match(/(\d+)S/);
  if (secondsMatch) {
    seconds = parseInt(secondsMatch[1]);
  }
  
  // Format the duration as a human-readable string
  let formattedDuration = '';
  
  if (hours > 0) {
    formattedDuration += `${hours}h `;
  }
  
  if (minutes > 0 || hours > 0) {
    formattedDuration += `${minutes}m `;
  }
  
  formattedDuration += `${seconds}s`;
  
  return formattedDuration.trim();
};