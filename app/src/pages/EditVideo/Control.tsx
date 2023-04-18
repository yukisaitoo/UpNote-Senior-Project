/* eslint-disable react/prop-types */
import "./Control.scss";

import {
  FastForward,
  FastRewind,
  Pause,
  PlayArrow,
  SkipNext,
  VolumeDown,
  VolumeUp,
} from "@mui/icons-material";
import { Button, Grid, Popover, Slider, Tooltip } from "@mui/material";
import { makeStyles, withStyles } from "@mui/styles";
import {
  LegacyRef,
  MouseEventHandler,
  MutableRefObject,
  RefObject,
  SyntheticEvent,
} from "react";

const useStyles = makeStyles({
  volumeSlider: {
    width: "100px",
    color: "#9556CC",
  },

  bottomIcons: {
    color: "#999",
    padding: "12px 8px",

    "&:hover": {
      color: "#fff",
    },
  },
});

const PrettoSlider = withStyles({
  root: {
    height: "20px",
    color: "#9556CC",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: "#9556CC",
    border: "2px solid currentColor",
    marginTop: -3,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 5,
    borderRadius: 4,
    width: "100%",
  },
  rail: {
    height: 5,
    borderRadius: 4,
  },
})(Slider);

interface ControlType {
  onPlayPause: () => unknown;
  playing: boolean;
  onRewind: () => unknown;
  onForward: () => unknown;
  played: number;
  onSeek: (event: Event, value: number | number[], activeThumb: number) => void;
  onSeekMouseUp: (
    event: Event | SyntheticEvent<Element, Event>,
    value: number | number[]
  ) => void;
  onVolumeChangeHandler: (
    event: Event,
    value: number | number[],
    activeThumb?: number
  ) => void;
  onVolumeSeekUp: (
    event: Event | SyntheticEvent<Element, Event>,
    value: number | number[]
  ) => void;
  playRate: number;
  volume: number;
  mute: boolean;
  onMute: () => unknown;
  duration?: string;
  currentTime?: string;
  onMouseSeekDown: MouseEventHandler<HTMLSpanElement>;
  controlRef: LegacyRef<HTMLDivElement>;
}

const Control = ({
  onPlayPause,
  playing,
  onRewind,
  onForward,
  played,
  onSeek,
  onSeekMouseUp,
  onVolumeChangeHandler,
  onVolumeSeekUp,
  playRate,
  volume,
  mute,
  onMute,
  duration,
  currentTime,
  onMouseSeekDown,
  controlRef,
}: ControlType) => {
  const classes = useStyles();

  return (
    <div className="control_Container" ref={controlRef}>
      <div className="top_container">
        <h2>Video PLayer</h2>
      </div>
      <div className="mid__container">
        <div className="icon__btn" onDoubleClick={onRewind}>
          <FastRewind fontSize="medium" />
        </div>

        <div className="icon__btn" onClick={onPlayPause}>
          {playing ? (
            <Pause fontSize="medium" />
          ) : (
            <PlayArrow fontSize="medium" />
          )}{" "}
        </div>

        <div className="icon__btn">
          <FastForward fontSize="medium" onDoubleClick={onForward} />
        </div>
      </div>
      <div className="bottom__container">
        <div className="slider__container">
          <PrettoSlider
            min={0}
            max={100}
            value={played * 100}
            onChange={onSeek}
            onChangeCommitted={onSeekMouseUp}
            onMouseDown={onMouseSeekDown}
          />
        </div>
        <div className="control__box">
          <div className="inner__controls">
            <div className="icon__btn" onClick={onPlayPause}>
              {playing ? (
                <Pause fontSize="medium" />
              ) : (
                <PlayArrow fontSize="medium" />
              )}{" "}
            </div>
            <div className="icon__btn" onClick={onMute}>
              {mute ? (
                <VolumeDown fontSize="medium" />
              ) : (
                <VolumeUp fontSize="medium" />
              )}
            </div>

            <Slider
              className={`${classes.volumeSlider}`}
              onChange={onVolumeChangeHandler}
              value={volume * 100}
              onChangeCommitted={onVolumeSeekUp}
            />

            <span>
              {currentTime} : {duration}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Control;
