import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { WriteStream, writeSync } from 'fs';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'transparent',
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

/* ================================================================= */

const MovieTabs = ({ writers, cast, awards, countries }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Writers" {...a11yProps(0)} />
        <Tab label="Cast" {...a11yProps(1)} />
        <Tab label="Awards and Nominations" {...a11yProps(2)} />
        <Tab label="Countries" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        Writers
        <ul className='writer-list'>
          {writers.map((writer, index) => {
            return(
              <li key={index}>{writer}</li>
            )
          })}
        </ul>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Cast
        <ul className='writer-list'>
          {cast.map((member, index) => {
            return(
              <li key={index}>{member}</li>
            )
          })}
        </ul>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Awards and Nominations
        <ul className='writer-list'>
          {Object.keys(awards).map((award, index) => {
            return(
              <li key={index}>{award} : {awards[award]}</li>
            )
          })}
        </ul>
      </TabPanel>
      <TabPanel value={value} index={3}>
        Countries
        <ul className='writer-list'>
          {countries.map((country, index) => {
            return(
              <li key={index}>{country}</li>
            )
          })}
        </ul>
      </TabPanel>
      <TabPanel value={value} index={4}>
        Countries
        <ul className='writer-list'>
          {countries.map((country, index) => {
            return(
              <li key={index}>{country}</li>
            )
          })}
        </ul>
      </TabPanel>
    </div>
  );
}


export default MovieTabs;