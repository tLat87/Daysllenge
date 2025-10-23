import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  Share,
} from 'react-native';
import { useApp } from '../state/LanguageAppContext';
import { textStyles } from '../helpers/languageFontUtils';

const StatsScreen: React.FC = () => {
  const { state } = useApp();

  const totalLessons = state.completedLessons.length;
  const totalBadges = state.badges.filter(badge => badge.isReceived).length;
  const totalTimeSpent = state.completedLessons.reduce((total, lesson) => {
    return total + (lesson.actualDuration || lesson.duration);
  }, 0);
  const averageTime = totalLessons > 0 ? Math.round(totalTimeSpent / totalLessons) : 0;
  const totalWordsLearned = state.user.wordsLearned;

  const calculateDaysActive = () => {
    if (!state.user.registrationDate) return 0;
    const now = new Date();
    const registrationDate = new Date(state.user.registrationDate);
    const diffTime = Math.abs(now.getTime() - registrationDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateTimeInApp = () => {
    // Calculate based on completed lessons and their durations
    const lessonTime = state.completedLessons.reduce((total, lesson) => {
      return total + (lesson.actualDuration || lesson.duration);
    }, 0);
    
    // Add some base time for app usage (browsing, settings, etc.)
    const baseTime = state.completedLessons.length * 5; // 5 minutes per lesson for app usage
    
    return lessonTime + baseTime;
  };

  const handleShareStatistics = async () => {
    try {
      const message = `My LinguaQuest Language Learning Statistics:
• Completed Lessons: ${totalLessons}
• Words Learned: ${totalWordsLearned}
• Awards Received: ${totalBadges}
• Days Active: ${calculateDaysActive()}
• Learning Progress: ${totalLessons}/15

Keep learning! 📚`;

      await Share.share({
        message: message,
        title: 'LinguaQuest Language Learning Statistics',
      });
    } catch (error) {
      console.log('Error sharing statistics:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Statistics</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* User Profile Section */}
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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Statistics Summary Card */}
        <View style={styles.statsCard}>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Number of completed lessons:</Text>
            <Text style={styles.statValue}>{totalLessons}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Words learned:</Text>
            <Text style={styles.statValue}>{totalWordsLearned}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Number of awards received:</Text>
            <Text style={styles.statValue}>{totalBadges}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Activity by day:</Text>
            <Text style={styles.statValue}>{calculateDaysActive()} days</Text>
          </View>
        </View>

        {/* Learning Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressContainer}>
            <View style={styles.progressCircle}>
              <Text style={styles.progressText}>{totalLessons}/15</Text>
            </View>
          </View>
          <Text style={styles.progressLabel}>Learning progress</Text>
        </View>

        {/* Language Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressContainer}>
            <View style={styles.progressCircle}>
              <Text style={styles.progressText}>{state.user.currentLanguage}</Text>
            </View>
          </View>
          <Text style={styles.progressLabel}>Current language</Text>
        </View>
      </ScrollView>

      {/* Share Statistics Button */}
      <View style={styles.shareButtonContainer}>
        <TouchableOpacity style={styles.shareButton} onPress={handleShareStatistics}>
          <Text style={styles.shareIcon}>↗</Text>
          <Text style={styles.shareButtonText}>Share statistics</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#000000',
  },
  headerTitle: {
    ...textStyles.subtitle,
    color: '#000000',
    fontWeight: 'bold',
  },
  headerSpacer: {
    width: 40,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  profileImageContainer: {
    marginRight: 15,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageText: {
    fontSize: 30,
  },
  greeting: {
    ...textStyles.subtitle,
    color: '#000000',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  statLabel: {
    ...textStyles.body,
    color: '#666666',
    flex: 1,
  },
  statValue: {
    ...textStyles.subtitle,
    color: '#FF0000',
    fontWeight: 'bold',
  },
  progressCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  progressContainer: {
    marginRight: 20,
  },
  progressCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FF0000',
  },
  progressText: {
    ...textStyles.body,
    color: '#FF0000',
    fontWeight: 'bold',
  },
  progressLabel: {
    ...textStyles.subtitle,
    color: '#000000',
    fontWeight: 'bold',
  },
  shareButtonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  shareButton: {
    backgroundColor: '#FF0000',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareIcon: {
    fontSize: 20,
    color: '#ffffff',
    marginRight: 10,
  },
  shareButtonText: {
    ...textStyles.button,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default StatsScreen;

