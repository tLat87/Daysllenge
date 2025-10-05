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
            style={styles.tab}
            onPress={() => onTabPress(tab.key)}
          >
            {/* <Text style={[
              styles.tabIcon,
              activeTab === tab.key && styles.activeTabIcon
            ]}> */}
              <Image source={tab.icon} style={{width: 24, height: 24, resizeMode: 'contain'}} />
            {/* </Text> */}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  logoContainer: {
    marginRight: 20,
  },
  logoBox: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  logoText: {
    ...textStyles.caption,
    color: '#FF0000',
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
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  tabIcon: {
    fontSize: 24,
    color: '#999999',
  },
  activeTabIcon: {
    color: '#FF0000',
  },
});

export default BottomTabNavigator;
