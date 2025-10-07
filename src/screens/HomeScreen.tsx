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
  ScrollView,
} from 'react-native';
import { useApp } from '../context/AppContext';
import ChallengeProgress from '../components/ChallengeProgress';
import NewBadgeModal from '../components/NewBadgeModal';
import UserLevelCard from '../components/UserLevelCard';
import DailyQuestCard from '../components/DailyQuestCard';
import AnimatedTimer from '../components/AnimatedTimer';
import { textStyles } from '../utils/fontUtils';
import { COLORS } from '../constants';

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
              
              // Add experience and points
              const experienceGained = 50 + Math.floor(state.currentChallenge.duration / 5);
              dispatch({ type: 'ADD_EXPERIENCE', payload: experienceGained });
              
              // Update streak
              const newStreak = state.user.streak + 1;
              dispatch({ type: 'UPDATE_STREAK', payload: newStreak });
              
              // Check for quest completion
              const activeQuests = state.dailyQuests.filter(quest => !quest.isCompleted);
              activeQuests.forEach(quest => {
                if (quest.type === 'exercise' && quest.current < quest.target) {
                  const updatedQuest = { ...quest, current: quest.current + 1 };
                  if (updatedQuest.current >= quest.target) {
                    dispatch({ type: 'COMPLETE_QUEST', payload: updatedQuest });
                    dispatch({ type: 'ADD_EXPERIENCE', payload: quest.reward.experience });
                  }
                }
              });
              
              // Check for achievements
              const newCompletedCount = state.completedChallenges.length + 1;
              const firstStepsAchievement = state.achievements.find(a => a.id === '1');
              if (firstStepsAchievement && !firstStepsAchievement.isUnlocked && newCompletedCount >= firstStepsAchievement.requirement) {
                dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: firstStepsAchievement });
              }
              
              // Add badge for first completion
              if (state.completedChallenges.length === 0) {
                dispatch({ type: 'ADD_BADGE', payload: state.badges[0] });
                setNewBadge(state.badges[0]);
                setShowNewBadgeModal(true);
              } else {
                Alert.alert(
                  'Congratulations!', 
                  `You have completed the challenge!\n+${experienceGained} XP gained!`
                );
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

  const handleCompleteQuest = (quest: any) => {
    dispatch({ type: 'COMPLETE_QUEST', payload: quest });
    dispatch({ type: 'ADD_EXPERIENCE', payload: quest.reward.experience });
    Alert.alert(
      'Quest Completed!',
      `You earned ${quest.reward.experience} XP and ${quest.reward.points} points!`
    );
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
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
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

        {/* User Level Card */}
        <UserLevelCard user={state.user} />

        {/* Main Challenge Card */}
        {state.currentChallenge && (
          <View style={styles.challengeCard}>
            <Text style={styles.challengeTitle}>2-day challenge:</Text>
            <Text style={styles.challengeDescription}>{state.currentChallenge.title}</Text>
            
            {!state.currentChallenge.isAccepted ? (
              <>
                <AnimatedTimer 
                  timeLeft={timeLeft} 
                  isActive={false}
                />
                <TouchableOpacity style={styles.acceptButton} onPress={handleAcceptChallenge}>
                  <Text style={styles.acceptButtonText}>Accept the challenge</Text>
                </TouchableOpacity>
              </>
            ) : !state.currentChallenge.isCompleted ? (
              <>
                <AnimatedTimer 
                  timeLeft={timeLeft} 
                  isActive={true}
                />
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

        {/* Daily Quests Section */}
        <View style={styles.questsSection}>
          <Text style={styles.sectionTitle}>Daily Quests</Text>
          {state.dailyQuests.map((quest) => (
            <DailyQuestCard
              key={quest.id}
              quest={quest}
              onComplete={handleCompleteQuest}
            />
          ))}
        </View>

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
      </ScrollView>

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
    backgroundColor: COLORS.background,
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
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  statsIcon: {
    fontSize: 20,
    color: COLORS.primary,
  },
  questsSection: {
    marginVertical: 20,
  },
  sectionTitle: {
    ...textStyles.subtitle,
    color: COLORS.text,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  challengeCard: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 20,
    borderRadius: 16,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  challengeTitle: {
    ...textStyles.body,
    color: COLORS.background,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  challengeDescription: {
    ...textStyles.subtitle,
    color: COLORS.background,
    marginBottom: 15,
  },
  timerContainer: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timerLabel: {
    ...textStyles.caption,
    color: COLORS.text,
  },
  timerValue: {
    ...textStyles.caption,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  acceptButton: {
    backgroundColor: COLORS.background,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  acceptButtonText: {
    ...textStyles.button,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  completeButton: {
    backgroundColor: COLORS.success,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: COLORS.success,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  completeButtonText: {
    ...textStyles.button,
    color: COLORS.background,
    fontWeight: 'bold',
  },
  completedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  completedText: {
    ...textStyles.body,
    color: COLORS.background,
  },
  motivationSection: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  motivationTitle: {
    ...textStyles.subtitle,
    color: COLORS.text,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  motivationCard: {
    backgroundColor: COLORS.background,
    borderWidth: 2,
    borderColor: COLORS.borderRed,
    borderRadius: 16,
    padding: 20,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  motivationText: {
    ...textStyles.body,
    color: COLORS.primary,
    marginBottom: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    alignSelf: 'flex-start',
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  shareIcon: {
    color: COLORS.background,
    fontSize: 16,
    marginRight: 5,
  },
  shareText: {
    ...textStyles.caption,
    color: COLORS.background,
    fontWeight: 'bold',
  },
  motivationShareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  motivationShareIcon: {
    fontSize: 16,
    color: COLORS.background,
    marginRight: 8,
  },
  motivationShareText: {
    ...textStyles.caption,
    color: COLORS.background,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
