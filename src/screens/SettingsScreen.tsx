import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Switch,
  Alert,
  Share,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { textStyles } from '../utils/fontUtils';

const SettingsScreen: React.FC = () => {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState<'profile' | 'about' | 'settings'>('profile');
  const [userName, setUserName] = useState(state.user.name);
  const [userSex, setUserSex] = useState(state.user.sex);

  const handleSaveProfile = () => {
    dispatch({
      type: 'SET_USER',
      payload: {
        ...state.user,
        name: userName,
        sex: userSex,
      },
    });
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleToggleNotifications = () => {
    dispatch({ type: 'TOGGLE_NOTIFICATIONS' });
  };

  const handleResetProgress = () => {
    Alert.alert(
      'Reset Progress',
      'Are you sure you want to reset all your progress? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            dispatch({ type: 'RESET_PROGRESS' });
            Alert.alert('Success', 'Progress has been reset!');
          },
        },
      ]
    );
  };

  const handleShareProfile = async () => {
    try {
      await Share.share({
        message: `Мой профиль в 2Days Sport Challenge:\nИмя: ${state.user.name}\nПол: ${state.user.sex}\nДата регистрации: ${state.user.registrationDate.toLocaleDateString('ru-RU')}\nВремя в приложении: ${state.user.timeInApp} часов\nКоличество дней: ${state.user.numberOfDays} дней`,
        title: '2Days Sport Challenge',
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleShareApp = async () => {
    try {
      await Share.share({
        message: '2Days Sport Challenge - простой и мотивирующий способ добавить спорт в свою жизнь. Выполняйте короткие 2-дневные челленджи, получайте награды и создавайте здоровые привычки без ущерба для здоровья.',
        title: '2Days Sport Challenge',
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const renderProfileTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.profileSection}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Your name</Text>
          <TextInput
            style={styles.input}
            value={userName}
            onChangeText={setUserName}
            placeholder="Enter your name"
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Sex</Text>
          <View style={styles.sexSelector}>
            <TouchableOpacity
              style={[styles.sexOption, userSex === 'Man' && styles.activeSexOption]}
              onPress={() => setUserSex('Man')}
            >
              <Text style={[styles.sexText, userSex === 'Man' && styles.activeSexText]}>
                Man
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sexOption, userSex === 'Woman' && styles.activeSexOption]}
              onPress={() => setUserSex('Woman')}
            >
              <Text style={[styles.sexText, userSex === 'Woman' && styles.activeSexText]}>
                Woman
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.profilePicture}>
          <Text style={styles.profileEmoji}>👤</Text>
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Info</Text>
        <Text style={styles.infoText}>
          Registration date: {formatDate(state.user.registrationDate)}
        </Text>
        <Text style={styles.infoText}>
          Time in app: {state.user.timeInApp} hours
        </Text>
        <Text style={styles.infoText}>
          Number of days: {state.user.numberOfDays} days
        </Text>
        
        <TouchableOpacity style={styles.shareButton} onPress={handleShareProfile}>
          <Text style={styles.shareIcon}>📤</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );

  const renderAboutTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.aboutContent}>
        <Text style={styles.appLogo}>2Days Sport Challenge</Text>
        <Text style={styles.aboutText}>
          2Days Sport Challenge is a simple and motivating way to add sport to your life. 
          Complete short 2-day challenges, get rewards and create healthy habits without 
          compromising your health.
        </Text>
        
        <View style={styles.aboutActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleShareApp}>
            <Text style={styles.actionIcon}>📤</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>⭐</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderSettingsTab = () => (
    <View style={styles.tabContent}>
      {/* <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Notifications</Text>
        <Switch
          value={state.notificationsEnabled}
          onValueChange={handleToggleNotifications}
          trackColor={{ false: '#767577', true: '#FF0000' }}
          thumbColor={state.notificationsEnabled ? '#ffffff' : '#f4f3f4'}
        />
      </View> */}
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Reset progress</Text>
        <TouchableOpacity style={styles.resetButton} onPress={handleResetProgress}>
          <Text style={styles.resetIcon}>🔄</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'profile' && styles.activeTab]}
          onPress={() => setActiveTab('profile')}
        >
          <Text style={[styles.tabText, activeTab === 'profile' && styles.activeTabText]}>
            Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'about' && styles.activeTab]}
          onPress={() => setActiveTab('about')}
        >
          <Text style={[styles.tabText, activeTab === 'about' && styles.activeTabText]}>
            About app
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'settings' && styles.activeTab]}
          onPress={() => setActiveTab('settings')}
        >
          <Text style={[styles.tabText, activeTab === 'settings' && styles.activeTabText]}>
            Settings
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === 'profile' && renderProfileTab()}
      {activeTab === 'about' && renderAboutTab()}
      {activeTab === 'settings' && renderSettingsTab()}
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
    paddingHorizontal: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#FF0000',
  },
  tabText: {
    ...textStyles.small,
    color: '#666666',
  },
  activeTabText: {
    ...textStyles.small,
    color: '#ffffff',
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileSection: {
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    ...textStyles.caption,
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#f9f9f9',
    ...textStyles.input,
  },
  sexSelector: {
    flexDirection: 'row',
    gap: 10,
  },
  sexOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  activeSexOption: {
    backgroundColor: '#FF0000',
    borderColor: '#FF0000',
  },
  sexText: {
    ...textStyles.body,
    color: '#666666',
  },
  activeSexText: {
    ...textStyles.body,
    color: '#ffffff',
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  profileEmoji: {
    fontSize: 40,
  },
  infoSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    ...textStyles.body,
    color: '#000000',
    marginBottom: 15,
  },
  infoText: {
    ...textStyles.caption,
    color: '#666666',
    marginBottom: 8,
  },
  shareButton: {
    marginTop: 15,
    alignSelf: 'flex-start',
  },
  shareIcon: {
    fontSize: 20,
    color: '#FF0000',
  },
  saveButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    ...textStyles.button,
    color: '#ffffff',
  },
  aboutContent: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  appLogo: {
    ...textStyles.subtitle,
    color: '#FF0000',
    marginBottom: 30,
    textAlign: 'center',
  },
  aboutText: {
    ...textStyles.body,
    color: '#666666',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 30,
  },
  aboutActions: {
    flexDirection: 'row',
    gap: 20,
  },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 20,
    color: '#ffffff',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLabel: {
    ...textStyles.body,
    color: '#000000',
  },
  resetButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetIcon: {
    fontSize: 18,
    color: '#ffffff',
  },
});

export default SettingsScreen;

