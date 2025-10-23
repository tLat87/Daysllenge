import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import { textStyles } from '../helpers/languageFontUtils';
import { COLORS } from '../constants';

interface AnimatedTimerProps {
  timeLeft: string;
  isActive: boolean;
  onComplete?: () => void;
}

const LessonTimer: React.FC<AnimatedTimerProps> = ({ timeLeft, isActive, onComplete }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    if (isActive) {
      // Start pulsing animation
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );

      // Start glow animation
      const glowAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
        ])
      );

      pulseAnimation.start();
      glowAnimation.start();
      setIsPulsing(true);

      return () => {
        pulseAnimation.stop();
        glowAnimation.stop();
        setIsPulsing(false);
      };
    } else {
      pulseAnim.setValue(1);
      glowAnim.setValue(0);
      setIsPulsing(false);
    }
  }, [isActive]);

  const glowColor = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255, 0, 0, 0)', 'rgba(255, 0, 0, 0.3)'],
  });

  const getTimeColor = () => {
    if (timeLeft === 'Expired') return COLORS.error;
    if (isActive) return COLORS.primary;
    return COLORS.textSecondary;
  };

  const getTimeIcon = () => {
    if (timeLeft === 'Expired') return '⏰';
    if (isActive) return '🔥';
    return '⏱️';
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.timerContainer,
          {
            transform: [{ scale: pulseAnim }],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.glowEffect,
            {
              backgroundColor: glowColor,
            },
          ]}
        />
        <View style={styles.timerContent}>
          <Text style={styles.timerIcon}>{getTimeIcon()}</Text>
          <Text style={[styles.timerLabel, { color: getTimeColor() }]}>
            {isActive ? 'Time remaining:' : 'Until the end of the challenge:'}
          </Text>
          <Text style={[styles.timerValue, { color: getTimeColor() }]}>
            {timeLeft}
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  timerContainer: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  glowEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
  },
  timerContent: {
    alignItems: 'center',
    zIndex: 1,
  },
  timerIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  timerLabel: {
    ...textStyles.caption,
    marginBottom: 8,
    textAlign: 'center',
  },
  timerValue: {
    ...textStyles.subtitle,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LessonTimer;


