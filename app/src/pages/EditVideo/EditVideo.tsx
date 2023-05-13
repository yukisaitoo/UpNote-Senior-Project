import "./EditVideo.scss";

import CommentIcon from "@mui/icons-material/Comment";
import EditIcon from "@mui/icons-material/Edit";
import MicIcon from "@mui/icons-material/Mic";
import NavBar from "components/NavBar/Navbar";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const MicRecorderClass = require("mic-recorder-to-mp3");
import Button from "components/Button/Button";
import Canvas from "components/Canvas/Canvas";
import { LegacyRef, SyntheticEvent, useEffect, useRef, useState } from "react";
import ReactPlayer, { ReactPlayerProps } from "react-player";
import BaseReactPlayer, { OnProgressProps } from "react-player/base";
import { useNavigate } from "react-router-dom";

import Control from "./Control";
import { formatTime } from "./Format";

let count = 0;
let visible = false;

const EditVideo = () => {
  // const navigate = useNavigate();

  const videoPlayerRef = useRef<BaseReactPlayer<ReactPlayerProps>>(
    {} as BaseReactPlayer<ReactPlayerProps>
  );
  const audioPlayerRef = useRef<HTMLAudioElement>({} as HTMLAudioElement);
  const controlRef = useRef<HTMLElement>({} as HTMLElement);
  const commentRef = useRef<HTMLDivElement>({} as HTMLDivElement);
  const canvasRef = useRef<HTMLCanvasElement>({} as HTMLCanvasElement);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [Mp3Recorder, setMp3Recorder] = useState(
    new MicRecorderClass({ bitRate: 128 })
  );

  const [videoState, setVideoState] = useState({
    playing: false,
    muted: false,
    volume: 0.9,
    playbackRate: 1.0,
    played: 0,
    seeking: false,
    buffer: true,
  });

  const [recorderState, setRecorderState] = useState({
    isRecording: false,
    micBlobURL: "",
    isBlocked: false,
  });

  const [commentState, setCommentState] = useState({
    text: "",
  });

  const [toolState, setToolState] = useState({
    activeTool: "none",
  });

  const [editLog, setEditLog] = useState({
    timeStamps: {} as {
      [key: string]: {
        type: string;
        micBlobURL?: string;
        text?: string;
        image?: ImageData;
      };
    },
  });

  //Destructuring the properties from the videoState
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { muted, volume, playbackRate, played, seeking, buffer } = videoState;

  let { playing } = videoState;

  const { isRecording, micBlobURL, isBlocked } = recorderState;

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }),
      () => {
        console.log("Permission Granted");
        setRecorderState({ ...recorderState, isBlocked: false });
      },
      () => {
        console.log("Permission Denied");
        setRecorderState({ ...recorderState, isBlocked: true });
      };
  }, []);

  let currentTime = "00:00",
    duration = "00:00";

  currentTime =
    videoPlayerRef.current.constructor.name === "ReactPlayer"
      ? videoPlayerRef.current?.getCurrentTime() + ""
      : "00:00";
  duration =
    videoPlayerRef.current.constructor.name === "ReactPlayer"
      ? videoPlayerRef.current?.getDuration() + ""
      : "00:00";

  const formatCurrentTime = formatTime(currentTime);
  const formatDuration = formatTime(duration);
  const url = localStorage.getItem("url") as string;
  const navigate = useNavigate();

  (() => {
    if (window.localStorage) {
      if (!localStorage.getItem("reload")) {
        localStorage["reload"] = true;
        window.location.reload();
      }
    }
  })();

  const playPauseHandler = () => {
    //plays and pause the video (toggling)
    setVideoState({ ...videoState, playing: !videoState.playing });
  };

  const rewindHandler = () => {
    //Rewinds the video player reducing 5
    videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() - 5);
  };

  const handleFastFoward = () => {
    //FastFowards the video player by adding 10
    videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() + 10);
  };

  //console.log("========", (controlRef.current.style.visibility = "false"));
  const progressHandler = (state: OnProgressProps) => {
    if (count > 3) {
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
    const newVolume = (value as number) / 100;

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSeekMouseDownHandler = (e: unknown) => {
    setVideoState({ ...videoState, seeking: true });
  };

  const mouseMoveHandler = (e: SyntheticEvent) => {
    if (toolState.activeTool === "draw") return;

    if (controlRef.current !== null && controlRef !== null) {
      if (e.type === "mouseover") {
        controlRef.current.style.visibility = "visible";
      }
      if (e.type === "mouseleave") {
        controlRef.current.style.visibility = "hidden";
      }
    }
    count = 0;
  };

  // const mouseClickHandler = (e: SyntheticEvent) => {
  //   if (controlRef.current !== null && controlRef !== null) {
  //     if (e.type === "click") {
  //       setVideoState({ ...videoState, playing: !videoState.playing });
  //     }
  //   }
  // };

  const bufferStartHandler = () => {
    setVideoState({ ...videoState, buffer: true });
  };

  const bufferEndHandler = () => {
    setVideoState({ ...videoState, buffer: false });
  };

  // Mic Functions

  const micStart = () => {
    if (isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          setRecorderState({ ...recorderState, isRecording: true });
        })
        .catch((e: Error) => console.error(e));
    }
  };

  const micStop = () => {
    Mp3Recorder.stop()
      .getMp3()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then(([buffer, blob]: [string, Blob]) => {
        const micBlobURL = URL.createObjectURL(blob);
        setRecorderState({ ...recorderState, micBlobURL, isRecording: false });
      })
      .catch((e: Error) => console.log(e));
  };

  const onToolChange = (e: string) => {
    if (playing) setVideoState({ ...videoState, playing: false });

    if (e === toolState.activeTool) {
      if (e === "mic") {
        if (recorderState.micBlobURL.length > 0) {
          setEditLog({
            timeStamps: {
              ...editLog.timeStamps,
              [formatCurrentTime as string]: {
                type: "mic",
                micBlobURL: recorderState.micBlobURL,
              },
            },
          });
          setRecorderState({
            ...recorderState,
            micBlobURL: "",
            isRecording: false,
          });
        }
      } else if (e === "comment") {
        if (commentState.text.length > 0) {
          setEditLog({
            timeStamps: {
              ...editLog.timeStamps,
              [formatCurrentTime as string]: {
                type: "comment",
                text: commentState.text,
              },
            },
          });
          setCommentState({ text: "" });
        }
      } else if (e === "draw") {
        const ctx = canvasRef.current.getContext("2d");

        setEditLog({
          timeStamps: {
            ...editLog.timeStamps,
            [formatCurrentTime as string]: {
              type: "draw",
              image: ctx?.getImageData(0, 0, 1120, 630),
            },
          },
        });

        ctx?.clearRect(0, 0, 1120, 630);
        // setCommentState({ text: "" });
      }

      setToolState({ activeTool: "none" });
    } else {
      setToolState({ activeTool: e });
    }
  };

  const checkEdits = async () => {
    if (
      Object.keys(editLog.timeStamps).includes(formatCurrentTime as string) &&
      playing
    ) {
      if (editLog.timeStamps[formatCurrentTime as string].type === "mic") {
        const playAudio = (audio: HTMLAudioElement) => {
          return new Promise((res) => {
            audio.play();
            audio.onended = res;
          });
        };

        playing = !playing;

        const test = async () => {
          const audio = new Audio(
            editLog.timeStamps[formatCurrentTime as string].micBlobURL
          );

          await playAudio(audio);
        };

        await test();

        setTimeout(() => {
          videoPlayerRef.current.seekTo(
            videoPlayerRef.current.getCurrentTime() + 1,
            "seconds"
          );
        }, 5);
      } else if (
        editLog.timeStamps[formatCurrentTime as string].type === "comment"
      ) {
        commentRef.current.innerHTML = `<div class="text-comment">${
          editLog.timeStamps[formatCurrentTime as string].text
        }</div>`;
        commentRef.current.style.visibility = "visible";
        setTimeout(() => {
          commentRef.current.innerHTML = "";
          commentRef.current.style.visibility = "hidden";
        }, 7000);
      } else if (
        editLog.timeStamps[formatCurrentTime as string].type === "draw"
      ) {
        const ctx = canvasRef.current.getContext("2d");

        const replayImage = async () => {
          visible = true;

          ctx?.putImageData(
            editLog.timeStamps[formatCurrentTime as string].image as ImageData,
            0,
            0
          );
        };

        await replayImage();

        setTimeout(() => {
          visible = false;
          ctx?.clearRect(0, 0, 1120, 630);
        }, 4000);
      }
    }
  };

  const getCanvasRef = (e: HTMLCanvasElement) => {
    canvasRef.current = e;
  };

  checkEdits();

  const saveVideo = () => {
    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const videoInfo = {
      title: "untitled",
      date: `${month}-${day}-${year}`,
      link: `${url}`,
    };

    localStorage.setItem("videos", JSON.stringify(videoInfo));

    navigate("/collection");
  };

  return (
    <div className="edit-video">
      <NavBar />
      <div className="ev-content">
        <div className="ev-content-child-video">
          <div className="ev-ccv-dir-crumbs">
            <>Personal Collection &gt; New Note</>
          </div>
          <div className="ev-ccv-content">
            <div className="ev-ccv-c-crumbs">
              <>Video &gt; Untitled</>
            </div>
            <div className="ev-ccv-c-inner">
              <div
                className="player__wrapper"
                onMouseOver={mouseMoveHandler}
                onMouseLeave={mouseMoveHandler}
                // onClick={mouseClickHandler}
              >
                <ReactPlayer
                  ref={videoPlayerRef}
                  className="player"
                  url={url}
                  width="100%"
                  height="100%"
                  playing={playing}
                  volume={volume}
                  muted={muted}
                  onProgress={progressHandler}
                  onBuffer={bufferStartHandler}
                  controls={false}
                  onBufferEnd={bufferEndHandler}
                />

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
                  duration={formatDuration}
                  currentTime={formatCurrentTime}
                  onMouseSeekDown={onSeekMouseDownHandler}
                />
              </div>
              <div ref={commentRef} className="ev-ccv-c-comment-wrap"></div>
            </div>
            <div className="ev-ccv-icons">
              <div className="ev-ccv-icon-wrap">
                <div className="ev-ccvi-draw">
                  <EditIcon
                    onClick={() => {
                      onToolChange("draw");
                    }}
                    style={
                      toolState.activeTool === "draw"
                        ? { color: "#F2000F" }
                        : {}
                    }
                  />
                </div>
                <div className="ev-ccvi-note">
                  <CommentIcon
                    style={
                      toolState.activeTool === "comment"
                        ? { color: "#F2000F" }
                        : {}
                    }
                    onClick={() => {
                      onToolChange("comment");
                    }}
                  />
                </div>
                <div className="ev-ccvi-draw">
                  <MicIcon
                    onClick={() => {
                      onToolChange("mic");
                    }}
                    style={
                      toolState.activeTool === "mic" ? { color: "#F2000F" } : {}
                    }
                  />
                </div>
                <Button
                  color="red"
                  onClick={() => {
                    navigate("/collection");
                  }}
                >
                  <>Cancel</>
                </Button>
                <Button color="blue" onClick={saveVideo}>
                  <>Save</>
                </Button>
              </div>
              <div className="ev-ccv-i-controls">
                {toolState.activeTool === "mic" ? (
                  <>
                    <button onClick={micStart} disabled={isRecording}>
                      Record
                    </button>
                    <button onClick={micStop} disabled={!isRecording}>
                      Stop
                    </button>
                    <audio
                      ref={audioPlayerRef}
                      src={micBlobURL}
                      controls={true}
                    />
                  </>
                ) : toolState.activeTool === "comment" ? (
                  <>
                    <div>
                      <label htmlFor="comment">Comment:</label>
                      <br />
                      <textarea
                        id="comment"
                        name="comment"
                        rows={4}
                        cols={50}
                        onChange={(e) =>
                          setCommentState({ text: e.target.value })
                        }
                      />
                      <br />
                    </div>
                  </>
                ) : (
                  <></>
                )}

                {
                  <Canvas
                    width={70 * 16}
                    height={70 * 9}
                    copyRef={getCanvasRef}
                    style={{
                      visibility:
                        toolState.activeTool === "draw" || visible
                          ? "visible"
                          : "hidden",
                    }}
                  />
                }
              </div>
            </div>
          </div>
        </div>
        <div className="ev-content-child-log">
          <div className="ev-ccl-wrap">
            <div className="ev-log-title">
              <>Note Log</>
            </div>
            <div className="ev-log-list">
              {Object.keys(editLog.timeStamps).map((x, i) => {
                return (
                  <div className="ev-log-list-item" key={x}>
                    <div className="ev-lli-timeStamp">{x}</div>
                    <div className="ev-lli-title">{i}</div>
                    <div className="ev-lli-icon">
                      {editLog.timeStamps[x].type === "comment" ? (
                        <CommentIcon />
                      ) : editLog.timeStamps[x].type === "draw" ? (
                        <EditIcon />
                      ) : (
                        <MicIcon />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditVideo;
