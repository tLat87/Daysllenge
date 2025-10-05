import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { textStyles } from '../utils/fontUtils';

interface BottomTabNavigatorProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({ activeTab, onTabPress }) => {
  const tabs = [
    { key: 'home', icon: require('../assets/img/Home.png'), label: 'Home' },
    { key: 'challenges', icon: require('../assets/img/Power.png'), label: 'Challenges' },
    { key: 'stats', icon: require('../assets/img/stat.png'), label: 'Stats' },
    { key: 'badges', icon: require('../assets/img/Done.png'), label: 'Badges' },
    { key: 'settings', icon: require('../assets/img/Set.png'), label: 'Settings' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={styles.tab}
          onPress={() => onTabPress(tab.key)}
        >
          <Image 
            source={tab.icon} 
            style={[
              styles.tabIcon,
              activeTab === tab.key && styles.activeTabIcon
            ]} 
            resizeMode="contain"
          />
          {/* <Text style={[
            styles.tabLabel,
            activeTab === tab.key && styles.activeTabLabel
          ]}>
            {tab.label}
          </Text> */}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    height: 70,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  tabIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
    opacity: 0.5,
    tintColor: '#666666',
  },
  activeTabIcon: {
    opacity: 1,
    tintColor: '#FF0000',
  },
  tabLabel: {
    ...textStyles.small,
    color: '#666666',
  },
  activeTabLabel: {
    ...textStyles.small,
    color: '#FF0000',
  },
});

export default BottomTabNavigator;
