import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  Share,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { textStyles } from '../utils/fontUtils';

const BadgesScreen: React.FC = () => {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState<'received' | 'notReceived'>('received');

  const receivedBadges = state.badges.filter(badge => badge.isReceived);
  const notReceivedBadges = state.badges.filter(badge => !badge.isReceived);

  const handleShareBadge = async (badge: any) => {
    try {
      await Share.share({
        message: `I earned the badge: ${badge.name} - ${badge.description}`,
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

  const renderBadgeItem = ({ item }: { item: any }) => (
    <View style={styles.badgeItem}>
      <View style={styles.badgeInfo}>
        {item.receivedAt && (
          <Text style={styles.badgeDate}>{formatDate(item.receivedAt)}</Text>
        )}
        <Text style={styles.badgeName}>{item.name}</Text>
        <Text style={styles.badgeDescription}>{item.description}</Text>
        {item.isReceived && (
          <TouchableOpacity style={styles.shareButton} onPress={() => handleShareBadge(item)}>
            <Text style={styles.shareIcon}>📤</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.badgeIcon}>
        <Text style={styles.badgeEmoji}>{item.icon}</Text>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyText}>No rewards available</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My badges</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'received' && styles.activeTab]}
          onPress={() => setActiveTab('received')}
        >
          <Text style={[styles.tabText, activeTab === 'received' && styles.activeTabText]}>
            Received
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'notReceived' && styles.activeTab]}
          onPress={() => setActiveTab('notReceived')}
        >
          <Text style={[styles.tabText, activeTab === 'notReceived' && styles.activeTabText]}>
            Not received
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === 'received' ? (
        receivedBadges.length === 0 ? (
          renderEmptyState()
        ) : (
          <FlatList
            data={receivedBadges}
            renderItem={renderBadgeItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        )
      ) : (
        <FlatList
          data={notReceivedBadges}
          renderItem={renderBadgeItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
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
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerTitle: {
    ...textStyles.subtitle,
    color: '#000000',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#FF0000',
  },
  tabText: {
    ...textStyles.caption,
    color: '#666666',
  },
  activeTabText: {
    ...textStyles.caption,
    color: '#ffffff',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  badgeItem: {
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badgeInfo: {
    flex: 1,
  },
  badgeDate: {
    ...textStyles.small,
    color: '#666666',
    marginBottom: 8,
  },
  badgeName: {
    ...textStyles.body,
    color: '#000000',
    marginBottom: 8,
  },
  badgeDescription: {
    ...textStyles.caption,
    color: '#666666',
    lineHeight: 20,
  },
  shareButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  shareIcon: {
    fontSize: 20,
    color: '#FF0000',
  },
  badgeIcon: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 30,
  },
  badgeEmoji: {
    fontSize: 30,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    ...textStyles.body,
    color: '#666666',
    textAlign: 'center',
  },
});

export default BadgesScreen;

