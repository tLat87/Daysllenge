import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native';
import { useApp } from '../state/LanguageAppContext';
import LanguageProfileSelector from '../ui/LanguageProfileSelector';
import { textStyles } from '../helpers/languageFontUtils';

interface ProfileRegistrationScreenProps {
  onComplete: () => void;
}

const ProfileRegistrationScreen: React.FC<ProfileRegistrationScreenProps> = ({ onComplete }) => {
  const { state, dispatch } = useApp();
  const [name, setName] = useState('');
  const [sex, setSex] = useState<'Man' | 'Woman' | ''>('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleContinue = () => {
    if (!name.trim()) {
      Alert.alert('Ошибка', 'Пожалуйста, введите ваше имя');
      return;
    }

    if (!sex) {
      Alert.alert('Ошибка', 'Пожалуйста, выберите пол');
      return;
    }

    // Обновляем пользователя в контексте
    dispatch({
      type: 'SET_USER',
      payload: {
        ...state.user,
        name: name.trim(),
        sex: sex as 'Man' | 'Woman',
        profilePicture: profileImage,
      },
    });

    onComplete();
  };

  const handleImageSelect = (image: string | null) => {
    setProfileImage(image);
  };

  const handleSexSelect = (selectedSex: 'Man' | 'Woman') => {
    setSex(selectedSex);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>2Days Sport Challenge</Text>
        <Text style={styles.title}>Register your profile</Text>
      </View>

      {/* Form Container */}
      <View style={styles.formContainer}>
        {/* Name Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Your name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#999999"
          />
        </View>

        {/* Sex Input */}
        <View style={styles.inputContainer}>
          <TouchableOpacity 
            style={styles.input}
            onPress={() => {
                  Alert.alert(
                    'Select Sex',
                    '',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Male', onPress: () => handleSexSelect('Man') },
                      { text: 'Female', onPress: () => handleSexSelect('Woman') },
                    ]
                  );
            }}
          >
            <Text style={[styles.inputText, !sex && styles.placeholderText]}>
              {sex || 'Sex'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Profile Picture */}
        <View style={styles.profilePictureContainer}>
          <LanguageProfileSelector
            currentImage={profileImage}
            onImageSelect={handleImageSelect}
          />
        </View>
      </View>

      {/* Continue Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[
            styles.continueButton,
            (!name.trim() || !sex) && styles.continueButtonDisabled
          ]} 
          onPress={handleContinue}
          disabled={!name.trim() || !sex}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  logo: {
    ...textStyles.subtitle,
    color: '#FF0000',
    marginBottom: 20,
  },
  title: {
    ...textStyles.subtitle,
    color: '#000000',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    marginRight: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#F9F9F9',
    marginBottom: 15,
    justifyContent: 'center',
    ...textStyles.input,
  },
  inputText: {
    ...textStyles.input,
    color: '#000000',
  },
  placeholderText: {
    ...textStyles.input,
    color: '#999999',
  },
  profilePictureContainer: {
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
  },
  continueButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  continueButtonText: {
    ...textStyles.button,
    color: '#ffffff',
  },
});

export default ProfileRegistrationScreen;
