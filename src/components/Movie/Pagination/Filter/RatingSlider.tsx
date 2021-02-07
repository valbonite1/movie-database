import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

const valuetext = (value: number) => {
  return `${value}`;
}

const RatingSlider = ({value, handleRatingChange}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Rating
      </Typography>
      <Slider
        min={0}
        max={10}
        value={value}
        onChange={handleRatingChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
}

export default RatingSlider;