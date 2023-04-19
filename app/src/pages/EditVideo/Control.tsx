/* eslint-disable react/prop-types */
import "./Control.scss";

import { Pause, PlayArrow, VolumeMute, VolumeUp } from "@mui/icons-material";
import { Slider } from "@mui/material";
import { makeStyles, withStyles } from "@mui/styles";
import { LegacyRef, MouseEventHandler, SyntheticEvent } from "react";

const useStyles = makeStyles({
  volumeSlider: {
    width: "20px",
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
    // marginTop: -3,
    // marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  // valueLabel: {
  //   left: "calc(40% + 4px)",
  // },
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
  played,
  onSeek,
  onSeekMouseUp,
  onVolumeChangeHandler,
  onVolumeSeekUp,
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
      <div className="mid__container"></div>
      <div className="bottom__container">
        <div className="slider__container">
          <PrettoSlider
            min={0}
            max={100}
            value={played * 100}
            onChange={onSeek}
            onChangeCommitted={onSeekMouseUp}
            onMouseDown={onMouseSeekDown}
            className={"pretto-slider"}
          />
        </div>
        <div className="control__box">
          <div className="inner__controls">
            <div className="icon__btn" onClick={onPlayPause}>
              {playing ? (
                <Pause fontSize="medium" htmlColor="#4dc9ff" />
              ) : (
                <PlayArrow fontSize="medium" htmlColor="#4dc9ff" />
              )}{" "}
            </div>
            <div className="icon__btn" onClick={onMute}>
              {mute ? (
                <VolumeMute fontSize="medium" htmlColor="#4dc9ff" />
              ) : (
                <VolumeUp fontSize="medium" htmlColor="#4dc9ff" />
              )}
            </div>

            <Slider
              className={`${classes.volumeSlider} c-slider`}
              onChange={onVolumeChangeHandler}
              value={!mute ? volume * 100 : 0}
              onChangeCommitted={onVolumeSeekUp}
            />

            {/* <span className="c-time">
              {currentTime} : {duration}
            </span> */}
          </div>
        </div>
        <div className="bc-shadow-wrap">
          <div className="bc-shadow"></div>
        </div>
      </div>
    </div>
  );
};

export default Control;
