import React, {useState, useRef} from 'react';
import {View, Text, TouchableOpacity, PanResponder, Image} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const VideoScoringApp = () => {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [coordinates, setCoordinates] = useState({x: 50, y: 50});
  const videoRef = useRef(null);

  const togglePlayPause = () => {
    setVideoPlaying(prev => !prev);
  };

  const handleStop = () => {
    setVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.seek(0);
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      if (videoPlaying) {
        let newX = Math.max(
          0,
          Math.min(100, coordinates.x + gestureState.dx / 3),
        );
        let newY = Math.max(
          0,
          Math.min(100, coordinates.y + gestureState.dy / 3),
        );
        setCoordinates({x: Math.round(newX), y: Math.round(newY)});
      }
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <TouchableOpacity onPress={togglePlayPause} style={styles.videoWrapper}>
          <Video
            ref={videoRef}
            source={require('../../../app/assets/sample.mp4')}
            style={styles.video}
            resizeMode="cover"
            paused={!videoPlaying}
          />

          {!videoPlaying && (
            <View style={styles.playIconContainer}>
              <Icon name="play" size={20} color="#ffffff" />
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>X: {coordinates.x}</Text>
          <Text style={[styles.scoreText, {marginLeft: 35}]}>
            Y: {coordinates.y}
          </Text>
        </View>
      </View>

      <View style={styles.scoringContainer} {...panResponder.panHandlers}>
        <Image
          source={require('../../../app/assets/happy.png')}
          style={styles.happyIcon}
        />
        <Image
          source={require('../../../app/assets/like.png')}
          style={styles.likeIcon}
        />
        <Image
          source={require('../../../app/assets/unhappy.png')}
          style={styles.unhappyIcon}
        />
        <Image
          source={require('../../../app/assets/dislike.png')}
          style={styles.dislikeIcon}
        />
        <View
          style={[
            styles.indicator,
            {
              left: `${coordinates.x}%`,
              top: `${coordinates.y}%`,
              width: 30,
              height: 30,
              borderRadius: 15,
            },
          ]}
        />
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity
          onPress={togglePlayPause}
          style={styles.controlButton}>
          <Icon name="play" size={12} color="#004d40" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={togglePlayPause}
          style={styles.controlButton1}>
          <Icon name="pause" size={15} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleStop} style={styles.controlButton}>
          <Icon name="stop" size={12} color="#004d40" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VideoScoringApp;
