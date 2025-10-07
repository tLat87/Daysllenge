import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  Alert,
} from 'react-native';
import { useApp } from '../context/AppContext';
import NotificationCard from '../components/NotificationCard';
import { textStyles } from '../utils/fontUtils';
import { COLORS } from '../constants';

const NotificationsScreen: React.FC = () => {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

  const allNotifications = state.notifications;
  const unreadNotifications = state.notifications.filter(notification => !notification.isRead);

  const handleNotificationPress = (notification: any) => {
    if (!notification.isRead) {
      dispatch({ type: 'MARK_NOTIFICATION_READ', payload: notification.id });
    }
    
    if (notification.actionUrl) {
      // Handle navigation to specific screen
      Alert.alert('Action', `Navigate to: ${notification.actionUrl}`);
    }
  };

  const handleMarkAsRead = (notificationId: string) => {
    dispatch({ type: 'MARK_NOTIFICATION_READ', payload: notificationId });
  };

  const handleMarkAllAsRead = () => {
    const unreadIds = unreadNotifications.map(n => n.id);
    unreadIds.forEach(id => {
      dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id });
    });
  };

  const renderNotificationItem = ({ item }: { item: any }) => (
    <NotificationCard
      notification={item}
      onPress={handleNotificationPress}
      onMarkAsRead={handleMarkAsRead}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>📢</Text>
      <Text style={styles.emptyText}>
        {activeTab === 'all' ? 'No notifications yet' : 'No unread notifications'}
      </Text>
      <Text style={styles.emptySubtext}>
        {activeTab === 'all' 
          ? 'You\'ll see notifications about your progress, achievements, and reminders here.' 
          : 'All caught up! Check back later for new notifications.'
        }
      </Text>
    </View>
  );

  const getDisplayedNotifications = () => {
    return activeTab === 'all' ? allNotifications : unreadNotifications;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        {unreadNotifications.length > 0 && (
          <TouchableOpacity 
            style={styles.markAllButton}
            onPress={handleMarkAllAsRead}
          >
            <Text style={styles.markAllText}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
            All ({allNotifications.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'unread' && styles.activeTab]}
          onPress={() => setActiveTab('unread')}
        >
          <Text style={[styles.tabText, activeTab === 'unread' && styles.activeTabText]}>
            Unread ({unreadNotifications.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <FlatList
        data={getDisplayedNotifications()}
        renderItem={renderNotificationItem}
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
  markAllButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  markAllText: {
    ...textStyles.caption,
    color: COLORS.background,
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
    paddingHorizontal: 20,
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
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
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
});

export default NotificationsScreen;


