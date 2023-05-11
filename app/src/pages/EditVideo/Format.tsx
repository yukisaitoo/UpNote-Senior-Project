export const formatTime = (time: number | string) => {
  //formarting duration of video

  if (isNaN(parseInt(time as string))) {
    return "00:00";
  } else {
    time = parseInt(time as string);
  }

  if (typeof time === "number") {
    const hours =
      (Math.floor(time / 60) + "").length < 2
        ? "0" + Math.floor(time / 60)
        : Math.floor(time / 60);
    const minutes =
      ((time % 60) + "").length < 2 ? "0" + (time % 60) : time % 60;
    return hours + ":" + minutes;
  }
};
