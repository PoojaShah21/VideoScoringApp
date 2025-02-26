import React from 'react';
import {StatusBar} from 'react-native';
import VideoPlayer from './app/Screens/VideoPlayer';

const App = () => {
  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
      <VideoPlayer />
    </>
  );
};

export default App;
