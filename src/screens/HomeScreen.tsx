import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Share,
  Alert,
  Image,
} from 'react-native';
import { useApp } from '../context/AppContext';
import ChallengeProgress from '../components/ChallengeProgress';
import NewBadgeModal from '../components/NewBadgeModal';
import { textStyles } from '../utils/fontUtils';

const HomeScreen: React.FC = () => {
  const { state, dispatch } = useApp();
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [challengeProgress, setChallengeProgress] = useState<number>(0);
  const [showNewBadgeModal, setShowNewBadgeModal] = useState<boolean>(false);
  const [newBadge, setNewBadge] = useState<any>(null);

  useEffect(() => {
    if (state.currentChallenge) {
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const endTime = state.currentChallenge!.endDate!.getTime();
        const diff = endTime - now;

        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          setTimeLeft(`${days}d ${hours}h ${minutes}m`);
        } else {
          setTimeLeft('Expired');
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [state.currentChallenge]);

  const handleAcceptChallenge = () => {
    if (state.currentChallenge && !state.currentChallenge.isAccepted) {
      // Mark challenge as accepted
      const acceptedChallenge = {
        ...state.currentChallenge,
        isAccepted: true,
        acceptedAt: new Date(),
      };
      dispatch({ type: 'SET_CURRENT_CHALLENGE', payload: acceptedChallenge });
      Alert.alert('Challenge Accepted!', 'You have accepted the challenge. Good luck!');
    }
  };

  const handleCompleteChallenge = () => {
    if (state.currentChallenge && state.currentChallenge.isAccepted) {
      Alert.alert(
        'Complete Challenge',
        'Are you sure you want to mark this challenge as completed?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Complete',
            onPress: () => {
              const completedChallenge = {
                ...state.currentChallenge,
                isCompleted: true,
                completedAt: new Date(),
                actualDuration: state.currentChallenge.duration, // Use the planned duration
              };
              dispatch({ type: 'COMPLETE_CHALLENGE', payload: completedChallenge });
              
              // Add badge for first completion
              if (state.completedChallenges.length === 0) {
                dispatch({ type: 'ADD_BADGE', payload: state.badges[0] });
                setNewBadge(state.badges[0]);
                setShowNewBadgeModal(true);
              } else {
                Alert.alert('Congratulations!', 'You have completed the challenge!');
              }
            }
          }
        ]
      );
    }
  };

  const handleShareChallenge = async () => {
    try {
      await Share.share({
        message: `I completed the challenge: ${state.currentChallenge?.title}`,
        title: '2Days Sport Challenge',
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleShareMotivation = async () => {
    try {
      await Share.share({
        message: state.motivations[0]?.text || 'Daily motivation',
        title: '2Days Sport Challenge',
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header with Profile */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            {state.user.profilePicture ? (
              <Image 
                source={{ uri: state.user.profilePicture }} 
                style={styles.profileImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Text style={styles.profileImageText}>👤</Text>
              </View>
            )}
          </View>
          <Text style={styles.greeting}>Hello, {state.user.name}</Text>
        </View>
        <TouchableOpacity style={styles.statsIconButton}>
          <Text style={styles.statsIcon}>📊</Text>
        </TouchableOpacity>
      </View>

      {/* Main Challenge Card */}
      {state.currentChallenge && (
        <View style={styles.challengeCard}>
          <Text style={styles.challengeTitle}>2-day challenge:</Text>
          <Text style={styles.challengeDescription}>{state.currentChallenge.title}</Text>
          
          {!state.currentChallenge.isAccepted ? (
            <>
              <View style={styles.timerContainer}>
                <Text style={styles.timerLabel}>Until the end of the challenge:</Text>
                <Text style={styles.timerValue}>{timeLeft}</Text>
              </View>
              <TouchableOpacity style={styles.acceptButton} onPress={handleAcceptChallenge}>
                <Text style={styles.acceptButtonText}>Accept the challenge</Text>
              </TouchableOpacity>
            </>
          ) : !state.currentChallenge.isCompleted ? (
            <>
              <View style={styles.timerContainer}>
                <Text style={styles.timerLabel}>Time remaining:</Text>
                <Text style={styles.timerValue}>{timeLeft}</Text>
              </View>
              <TouchableOpacity style={styles.completeButton} onPress={handleCompleteChallenge}>
                <Text style={styles.completeButtonText}>Complete Challenge</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.completedContainer}>
                <Text style={styles.completedText}>✅ Challenge Completed!</Text>
                <TouchableOpacity style={styles.shareButton} onPress={handleShareChallenge}>
                  <Text style={styles.shareIcon}>📤</Text>
                  <Text style={styles.shareText}>Share Achievement</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      )}

      {/* Motivation Card */}
      <View style={styles.motivationSection}>
        <Text style={styles.motivationTitle}>Motivation for the day:</Text>
        <View style={styles.motivationCard}>
          <Text style={styles.motivationText}>{state.motivations[0]?.text}</Text>
          <TouchableOpacity style={styles.motivationShareButton} onPress={handleShareMotivation}>
            <Text style={styles.motivationShareIcon}>↗</Text>
            <Text style={styles.motivationShareText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* New Badge Modal */}
      {newBadge && (
        <NewBadgeModal
          visible={showNewBadgeModal}
          badge={newBadge}
          onClose={() => {
            setShowNewBadgeModal(false);
            setNewBadge(null);
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    marginRight: 15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageText: {
    fontSize: 25,
  },
  greeting: {
    ...textStyles.subtitle,
    color: '#000000',
    fontWeight: 'bold',
  },
  statsIconButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  statsIcon: {
    fontSize: 20,
    color: '#FF0000',
  },
  challengeCard: {
    backgroundColor: '#FF0000',
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 20,
    borderRadius: 12,
  },
  challengeTitle: {
    ...textStyles.body,
    color: '#ffffff',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  challengeDescription: {
    ...textStyles.subtitle,
    color: '#ffffff',
    marginBottom: 15,
  },
  timerContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timerLabel: {
    ...textStyles.caption,
    color: '#000000',
  },
  timerValue: {
    ...textStyles.caption,
    color: '#000000',
    fontWeight: 'bold',
  },
  acceptButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  acceptButtonText: {
    ...textStyles.button,
    color: '#FF0000',
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  completeButtonText: {
    ...textStyles.button,
    color: '#ffffff',
  },
  completedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  completedText: {
    ...textStyles.body,
    color: '#ffffff',
  },
  motivationSection: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  motivationTitle: {
    ...textStyles.subtitle,
    color: '#000000',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  motivationCard: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 20,
  },
  motivationText: {
    ...textStyles.body,
    color: '#FF0000',
    marginBottom: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  shareIcon: {
    color: '#ffffff',
    fontSize: 16,
    marginRight: 5,
  },
  shareText: {
    ...textStyles.caption,
    color: '#ffffff',
  },
  motivationShareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF0000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
  },
  motivationShareIcon: {
    fontSize: 16,
    color: '#ffffff',
    marginRight: 8,
  },
  motivationShareText: {
    ...textStyles.caption,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
