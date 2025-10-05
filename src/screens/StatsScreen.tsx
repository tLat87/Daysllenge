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
import { useApp } from '../context/AppContext';
import { textStyles } from '../utils/fontUtils';

const StatsScreen: React.FC = () => {
  const { state } = useApp();

  const totalChallenges = state.completedChallenges.length;
  const totalBadges = state.badges.filter(badge => badge.isReceived).length;
  const totalTimeSpent = state.completedChallenges.reduce((total, challenge) => {
    return total + (challenge.actualDuration || challenge.duration);
  }, 0);
  const averageTime = totalChallenges > 0 ? Math.round(totalTimeSpent / totalChallenges) : 0;

  const calculateDaysActive = () => {
    if (!state.user.registrationDate) return 0;
    const now = new Date();
    const registrationDate = new Date(state.user.registrationDate);
    const diffTime = Math.abs(now.getTime() - registrationDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateTimeInApp = () => {
    // Calculate based on completed challenges and their durations
    const challengeTime = state.completedChallenges.reduce((total, challenge) => {
      return total + (challenge.actualDuration || challenge.duration);
    }, 0);
    
    // Add some base time for app usage (browsing, settings, etc.)
    const baseTime = state.completedChallenges.length * 5; // 5 minutes per challenge for app usage
    
    return challengeTime + baseTime;
  };

  const handleShareStatistics = async () => {
    try {
      const message = `My 2Days Sport Challenge Statistics:
• Completed Challenges: ${totalChallenges}
• Awards Received: ${totalBadges}
• Days Active: ${calculateDaysActive()}
• Challenge Progress: ${totalChallenges}/15

Keep pushing yourself! 💪`;

      await Share.share({
        message: message,
        title: '2Days Sport Challenge Statistics',
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
            <Text style={styles.statLabel}>Number of completed challenges:</Text>
            <Text style={styles.statValue}>{totalChallenges}</Text>
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

        {/* Challenge Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressContainer}>
            <View style={styles.progressCircle}>
              <Text style={styles.progressText}>{totalChallenges}/15</Text>
            </View>
          </View>
          <Text style={styles.progressLabel}>Challenge progress</Text>
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

