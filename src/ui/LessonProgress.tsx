import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Challenge } from '../types';

interface ChallengeProgressProps {
  challenge: Challenge;
  onComplete: () => void;
}

const LessonProgress: React.FC<ChallengeProgressProps> = ({ challenge, onComplete }) => {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && !challenge.isCompleted) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, challenge.isCompleted]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsActive(true);
  };

  const handleComplete = () => {
    setIsActive(false);
    onComplete();
  };

  const progressPercentage = challenge.duration > 0 ? (elapsedTime / (challenge.duration * 60)) * 100 : 0;

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progressCircle}>
          <Text style={styles.progressText}>{formatTime(elapsedTime)}</Text>
        </View>
        <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
          <Text style={styles.completeButtonText}>Comp</Text>
        </TouchableOpacity>
      </View>
      
      {!isActive && (
        <TouchableOpacity style={styles.startButton} onPress={handleStart}>
          <Text style={styles.startButtonText}>Start Challenge</Text>
        </TouchableOpacity>
      )}
      
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${Math.min(progressPercentage, 100)}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    borderWidth: 3,
    borderColor: '#FF0000',
  },
  progressText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF0000',
  },
  completeButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  completeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF0000',
    borderRadius: 4,
  },
});

export default LessonProgress;


