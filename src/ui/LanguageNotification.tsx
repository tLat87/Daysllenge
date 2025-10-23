import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Notification } from '../types';
import { textStyles } from '../helpers/languageFontUtils';
import { COLORS } from '../constants';

interface NotificationCardProps {
  notification: Notification;
  onPress?: (notification: Notification) => void;
  onMarkAsRead?: (notificationId: string) => void;
}

const LanguageNotification: React.FC<NotificationCardProps> = ({ 
  notification, 
  onPress, 
  onMarkAsRead 
}) => {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'reminder': return '⏰';
      case 'achievement': return '🏆';
      case 'quest': return '🎯';
      case 'streak': return '🔥';
      case 'social': return '👥';
      default: return '📢';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'reminder': return COLORS.warning;
      case 'achievement': return COLORS.gold;
      case 'quest': return COLORS.primary;
      case 'streak': return COLORS.error;
      case 'social': return '#9C27B0';
      default: return COLORS.textSecondary;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        !notification.isRead && styles.unreadContainer
      ]}
      onPress={() => onPress?.(notification)}
      onLongPress={() => onMarkAsRead?.(notification.id)}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <View style={[
          styles.iconContainer,
          { backgroundColor: getNotificationColor(notification.type) }
        ]}>
          <Text style={styles.icon}>{getNotificationIcon(notification.type)}</Text>
        </View>
        
        <View style={styles.textContainer}>
          <Text style={[
            styles.title,
            !notification.isRead && styles.unreadTitle
          ]}>
            {notification.title}
          </Text>
          <Text style={styles.message}>{notification.message}</Text>
          <Text style={styles.time}>{formatTime(notification.createdAt)}</Text>
        </View>
        
        {!notification.isRead && (
          <View style={styles.unreadDot} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  unreadContainer: {
    borderColor: COLORS.primary,
    borderWidth: 2,
    backgroundColor: COLORS.backgroundSecondary,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...textStyles.body,
    color: COLORS.text,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  unreadTitle: {
    color: COLORS.primary,
  },
  message: {
    ...textStyles.caption,
    color: COLORS.textSecondary,
    marginBottom: 4,
    lineHeight: 18,
  },
  time: {
    ...textStyles.small,
    color: COLORS.textLight,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginLeft: 8,
  },
});

export default LanguageNotification;


