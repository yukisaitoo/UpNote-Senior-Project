import "./EditVideo.scss";

import { Breakpoint, Container } from "@mui/material";
import Button from "components/Button/Button";
import NavBar from "components/NavBar/Navbar";
import { LegacyRef, Ref, SyntheticEvent, useRef, useState } from "react";
import ReactPlayer, { ReactPlayerProps } from "react-player";
import BaseReactPlayer, { OnProgressProps } from "react-player/base";
import { useNavigate } from "react-router-dom";

import Control from "./Control";
import { formatTime } from "./Format";

let count = 0;

const EditVideo = () => {
  const navigate = useNavigate();

  const videoPlayerRef = useRef<BaseReactPlayer<ReactPlayerProps>>(
    {} as BaseReactPlayer<ReactPlayerProps>
  );
  const controlRef = useRef<HTMLElement>({} as HTMLElement);

  const [videoState, setVideoState] = useState({
    playing: true,
    muted: false,
    volume: 0.5,
    playbackRate: 1.0,
    played: 0,
    seeking: false,
    buffer: true,
  });

  //Destructuring the properties from the videoState
  const { playing, muted, volume, playbackRate, played, seeking, buffer } =
    videoState;

  // const currentTime = videoPlayerRef.current
  //   ? videoPlayerRef.current?.getCurrentTime()
  //   : "00:00";
  // const duration = videoPlayerRef.current
  //   ? videoPlayerRef.current?.getDuration()
  //   : "00:00";

  // const formatCurrentTime = formatTime(currentTime);
  // const formatDuration = formatTime(duration);

  const playPauseHandler = () => {
    //plays and pause the video (toggling)
    setVideoState({ ...videoState, playing: !videoState.playing });
  };

  const rewindHandler = () => {
    //Rewinds the video player reducing 5
    // videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() - 5);
  };

  const handleFastFoward = () => {
    //FastFowards the video player by adding 10
    // videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() + 10);
  };

  //console.log("========", (controlRef.current.style.visibility = "false"));
  const progressHandler = (state: OnProgressProps) => {
    if (count > 3) {
      console.log("close");
      controlRef.current.style.visibility = "hidden"; // toggling player control container
    } else if (controlRef.current.style.visibility === "visible") {
      count += 1;
    }

    if (!seeking) {
      setVideoState({ ...videoState, ...state });
    }
  };

  const seekHandler = (
    event: Event,
    value: number | number[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    activeThumb: number
  ) => {
    setVideoState({ ...videoState, played: (value as number) / 100 });
    videoPlayerRef.current.seekTo((value as number) / 100);
  };

  const seekMouseUpHandler = (
    event: Event | SyntheticEvent<Element, Event>,
    value: number | number[]
  ) => {
    console.log(value);

    setVideoState({ ...videoState, seeking: false });
    videoPlayerRef.current.seekTo((value as number) / 100);
  };

  const volumeChangeHandler = (
    event: Event,
    value: number | number[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    activeThumb?: number
  ) => {
    const newVolume = (value as number) / 100;

    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: Number(newVolume) === 0 ? true : false, // volume === 0 then muted
    });
  };

  const volumeSeekUpHandler = (
    event: Event | SyntheticEvent<Element, Event>,
    value: number | number[]
  ) => {
    const newVolume = parseFloat((value as number) + "") / 100;

    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: newVolume === 0 ? true : false,
    });
  };

  const muteHandler = () => {
    //Mutes the video player
    setVideoState({ ...videoState, muted: !videoState.muted });
  };

  const onSeekMouseDownHandler = (e: unknown) => {
    setVideoState({ ...videoState, seeking: true });
  };

  const mouseMoveHandler = () => {
    if (controlRef.current !== null && controlRef !== null)
      controlRef.current.style.visibility = "visible";
    count = 0;
  };

  const bufferStartHandler = () => {
    console.log("Bufering.......");
    setVideoState({ ...videoState, buffer: true });
  };

  const bufferEndHandler = () => {
    console.log("buffering stoped ,,,,,,play");
    setVideoState({ ...videoState, buffer: false });
  };

  return (
    <div className="edit-video">
      <NavBar />
      <div className="ev-content">
        <div className="ev-video">
          <div className="ev-dir-crumbs">
            <>Personal Collection &gt; Tech Vids &gt; New Note</>
          </div>
          <div className="ev-video-content">
            <div className="ev-v-c-crumbs">
              <>Video &gt; Can You Trust MKBHD?</>
            </div>
            <div className="ev-video-content-inner">
              <div className="player__wrapper" onMouseMove={mouseMoveHandler}>
                <ReactPlayer
                  ref={videoPlayerRef}
                  className="player"
                  url="https://www.youtube.com/watch?v=6arkndScw7A&list=PLSxgVLtIB0IFmQGuVMSE_wDHPW5rq4Ik7"
                  width="100%"
                  height="100%"
                  playing={playing}
                  volume={volume}
                  muted={muted}
                  onProgress={progressHandler}
                  onBuffer={bufferStartHandler}
                  onBufferEnd={bufferEndHandler}
                />

                {buffer && <p>Loading</p>}

                <Control
                  controlRef={controlRef as LegacyRef<HTMLDivElement>}
                  onPlayPause={playPauseHandler}
                  playing={playing}
                  onRewind={rewindHandler}
                  onForward={handleFastFoward}
                  played={played}
                  onSeek={seekHandler}
                  onSeekMouseUp={seekMouseUpHandler}
                  volume={volume}
                  onVolumeChangeHandler={volumeChangeHandler}
                  onVolumeSeekUp={volumeSeekUpHandler}
                  mute={muted}
                  onMute={muteHandler}
                  playRate={playbackRate}
                  // duration={formatDuration}
                  // currentTime={formatCurrentTime}
                  onMouseSeekDown={onSeekMouseDownHandler}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="ev-log">
          <div className="ev-log-title">
            <>Note Log</>
          </div>
          <div className="ev-log-list"></div>
        </div>
      </div>
    </div>
  );
};

export default EditVideo;
