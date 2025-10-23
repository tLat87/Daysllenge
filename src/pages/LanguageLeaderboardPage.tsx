import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import { useApp } from '../state/LanguageAppContext';
import { textStyles } from '../helpers/languageFontUtils';
import { COLORS } from '../constants';

const LeaderboardScreen: React.FC = () => {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly' | 'all'>('weekly');

  // Generate leaderboard with AI-generated players and real user
  const generateLeaderboard = () => {
    const aiPlayers = [
      {
        id: '1',
        name: 'Alex Johnson',
        profilePicture: undefined,
        points: 1250,
        level: 15,
        rank: 1,
        streak: 12,
      },
      {
        id: '2',
        name: 'Maria Silva',
        profilePicture: undefined,
        points: 1180,
        level: 14,
        rank: 2,
        streak: 8,
      },
      {
        id: '3',
        name: 'John Smith',
        profilePicture: undefined,
        points: 1100,
        level: 13,
        rank: 3,
        streak: 15,
      },
      {
        id: '4',
        name: 'Sarah Chen',
        profilePicture: undefined,
        points: 950,
        level: 12,
        rank: 4,
        streak: 6,
      },
      {
        id: '5',
        name: 'Mike Brown',
        profilePicture: undefined,
        points: 890,
        level: 11,
        rank: 5,
        streak: 9,
      },
      {
        id: '6',
        name: 'Emma Davis',
        profilePicture: undefined,
        points: 820,
        level: 10,
        rank: 6,
        streak: 5,
      },
      {
        id: '7',
        name: 'David Lee',
        profilePicture: undefined,
        points: 750,
        level: 9,
        rank: 7,
        streak: 4,
      },
      {
        id: '8',
        name: 'Sophie Martin',
        profilePicture: undefined,
        points: 680,
        level: 8,
        rank: 8,
        streak: 7,
      },
    ];

    // Add real user to leaderboard
    const userEntry = {
      id: state.user.id,
      name: state.user.name,
      profilePicture: state.user.profilePicture,
      points: state.user.points,
      level: state.user.level,
      rank: 0,
      streak: state.user.streak,
    };

    // Combine and sort by points
    const allPlayers = [...aiPlayers, userEntry].sort((a, b) => b.points - a.points);

    // Assign ranks
    const rankedPlayers = allPlayers.map((player, index) => ({
      ...player,
      rank: index + 1,
    }));

    return rankedPlayers;
  };

  const leaderboard = generateLeaderboard();

  useEffect(() => {
    // Update leaderboard with current user data
    dispatch({ type: 'UPDATE_LEADERBOARD', payload: leaderboard });
  }, [state.user.points, state.user.level, state.user.streak]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return COLORS.gold;
      case 2: return COLORS.silver;
      case 3: return COLORS.bronze;
      default: return COLORS.textSecondary;
    }
  };

  const handleUserPress = (user: any) => {
    Alert.alert(
      user.name,
      `Level: ${user.level}\nPoints: ${user.points}\nStreak: ${user.streak} days`,
      [{ text: 'OK' }]
    );
  };

  const renderLeaderboardItem = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity
      style={[
        styles.leaderboardItem,
        item.id === state.user.id && styles.currentUserItem
      ]}
      onPress={() => handleUserPress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.rankContainer}>
        <Text style={[styles.rankText, { color: getRankColor(item.rank) }]}>
          {getRankIcon(item.rank)}
        </Text>
      </View>
      
      <View style={styles.profileContainer}>
        {item.profilePicture ? (
          <Image 
            source={{ uri: item.profilePicture }} 
            style={styles.profileImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.profileImagePlaceholder}>
            <Text style={styles.profileImageText}>👤</Text>
          </View>
        )}
      </View>
      
      <View style={styles.userInfo}>
        <Text style={[
          styles.userName,
          item.id === state.user.id && styles.currentUserName
        ]}>
          {item.name} {item.id === state.user.id && '(You)'}
        </Text>
        <Text style={styles.userLevel}>Level {item.level}</Text>
      </View>
      
      <View style={styles.statsContainer}>
        <Text style={[
          styles.pointsText,
          item.id === state.user.id && styles.currentUserPoints
        ]}>
          {item.points}
        </Text>
        <Text style={styles.pointsLabel}>Points</Text>
        <Text style={styles.streakText}>{item.streak} 🔥</Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyText}>No data available</Text>
      <Text style={styles.emptySubtext}>Check back later for leaderboard updates</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Leaderboard</Text>
        <View style={styles.periodContainer}>
          <Text style={styles.periodText}>
            {activeTab === 'weekly' ? 'This Week' : 
             activeTab === 'monthly' ? 'This Month' : 'All Time'}
          </Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'weekly' && styles.activeTab]}
          onPress={() => setActiveTab('weekly')}
        >
          <Text style={[styles.tabText, activeTab === 'weekly' && styles.activeTabText]}>
            Weekly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'monthly' && styles.activeTab]}
          onPress={() => setActiveTab('monthly')}
        >
          <Text style={[styles.tabText, activeTab === 'monthly' && styles.activeTabText]}>
            Monthly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
            All Time
          </Text>
        </TouchableOpacity>
      </View>

      {/* User Position Summary */}
      {state.user.points === 0 && (
        <View style={styles.beginnerNotice}>
          <Text style={styles.beginnerIcon}>🎯</Text>
          <Text style={styles.beginnerTitle}>Start Your Journey!</Text>
          <Text style={styles.beginnerText}>
            Complete challenges to earn points and climb the leaderboard.{'\n'}
            You're currently at the beginning - let's go!
          </Text>
        </View>
      )}

      {/* Leaderboard */}
      <FlatList
        data={leaderboard}
        renderItem={renderLeaderboardItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />
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
    paddingVertical: 20,
  },
  headerTitle: {
    ...textStyles.subtitle,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  periodContainer: {
    backgroundColor: COLORS.backgroundSecondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  periodText: {
    ...textStyles.caption,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    ...textStyles.caption,
    color: COLORS.textSecondary,
    fontWeight: 'bold',
  },
  activeTabText: {
    ...textStyles.caption,
    color: COLORS.background,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  currentUserItem: {
    borderColor: COLORS.primary,
    borderWidth: 2,
    backgroundColor: COLORS.backgroundSecondary,
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
  },
  rankText: {
    ...textStyles.subtitle,
    fontWeight: 'bold',
  },
  profileContainer: {
    marginHorizontal: 12,
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
    backgroundColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageText: {
    fontSize: 24,
  },
  userInfo: {
    flex: 1,
    marginLeft: 8,
  },
  userName: {
    ...textStyles.body,
    color: COLORS.text,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  currentUserName: {
    color: COLORS.primary,
  },
  userLevel: {
    ...textStyles.caption,
    color: COLORS.textSecondary,
  },
  statsContainer: {
    alignItems: 'flex-end',
  },
  pointsText: {
    ...textStyles.subtitle,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  currentUserPoints: {
    color: COLORS.primaryDark,
  },
  pointsLabel: {
    ...textStyles.small,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  streakText: {
    ...textStyles.caption,
    color: COLORS.warning,
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    ...textStyles.subtitle,
    color: COLORS.text,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  emptySubtext: {
    ...textStyles.caption,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  beginnerNotice: {
    backgroundColor: COLORS.backgroundSecondary,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
  },
  beginnerIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  beginnerTitle: {
    ...textStyles.subtitle,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  beginnerText: {
    ...textStyles.caption,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default LeaderboardScreen;


