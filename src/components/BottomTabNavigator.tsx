import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { textStyles } from '../utils/fontUtils';
import { COLORS } from '../constants';

interface BottomTabNavigatorProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({ activeTab, onTabPress }) => {
  const tabs = [
    { key: 'home', icon: require('../assets/img/Home.png'), label: 'Home' },
    { key: 'lessons', icon: require('../assets/img/Power.png'), label: 'Lessons' },
    { key: 'vocabulary', icon: '📚', label: 'Vocabulary' },
    { key: 'achievements', icon: '🏆', label: 'Achievements' },
    { key: 'leaderboard', icon: '📊', label: 'Ranking' },
    { key: 'notifications', icon: '🔔', label: 'Alerts' },
    { key: 'badges', icon: require('../assets/img/Done.png'), label: 'Badges' },
    { key: 'settings', icon: require('../assets/img/Set.png'), label: 'Settings' },
  ];

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image source={require('../assets/img/150.png')} style={{width: 50, height: 50}} />
      </View>
      
      {/* Navigation Icons */}
      <View style={styles.navigationContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.activeTab]}
            onPress={() => onTabPress(tab.key)}
          >
            {typeof tab.icon === 'string' ? (
              <Text style={[
                styles.tabIcon,
                activeTab === tab.key && styles.activeTabIcon
              ]}>
                {tab.icon}
              </Text>
            ) : (
              <Image 
                source={tab.icon} 
                style={[
                  styles.tabImage,
                  activeTab === tab.key && styles.activeTabImage
                ]} 
              />
            )}
            <Text style={[
              styles.tabLabel,
              activeTab === tab.key && styles.activeTabLabel
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 2,
    borderTopColor: COLORS.borderRed,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    alignItems: 'center',
  },
  logoContainer: {
    marginRight: 16,
  },
  logoBox: {
    backgroundColor: COLORS.background,
    borderWidth: 2,
    borderColor: COLORS.borderRed,
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
  },
  logoText: {
    ...textStyles.caption,
    color: COLORS.primary,
    fontWeight: 'bold',
    lineHeight: 12,
  },
  navigationContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
  },
  tab: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 8,
    minWidth: 60,
  },
  activeTab: {
    backgroundColor: COLORS.backgroundSecondary,
  },
  tabIcon: {
    fontSize: 20,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  activeTabIcon: {
    color: COLORS.primary,
  },
  tabImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginBottom: 4,
    tintColor: COLORS.textSecondary,
  },
  activeTabImage: {
    tintColor: COLORS.primary,
  },
  tabLabel: {
    ...textStyles.small,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontSize: 10,
  },
  activeTabLabel: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default BottomTabNavigator;
