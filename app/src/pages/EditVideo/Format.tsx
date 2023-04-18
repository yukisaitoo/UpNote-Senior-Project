export const formatTime = (time: number | string) => {
  //formarting duration of video
  if (isNaN(time as number)) {
    return "00:00";
  }

  const date = new Date((time as number) * 1000);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");
  if (hours) {
    //if video have hours
    return `${hours}:${minutes.toString().padStart(2, "0")} `;
  } else return `${minutes}:${seconds}`;
};
