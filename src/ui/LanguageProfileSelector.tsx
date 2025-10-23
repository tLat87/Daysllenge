import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { launchImageLibrary, ImagePickerResponse, MediaType } from 'react-native-image-picker';

interface ProfilePictureSelectorProps {
  currentImage: string | null;
  onImageSelect: (image: string | null) => void;
}

const LanguageProfileSelector: React.FC<ProfilePictureSelectorProps> = ({
  currentImage,
  onImageSelect,
}) => {
  const handleImageSelect = () => {
    Alert.alert(
      'Select Profile Photo',
      'Choose an image for your profile',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Choose from Gallery', 
          onPress: () => openImagePicker() 
        },
        { 
          text: 'Remove Photo', 
          style: 'destructive',
          onPress: () => onImageSelect(null) 
        },
      ]
    );
  };

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      quality: 0.8,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel || response.errorMessage) {
        return;
      }

      if (response.assets && response.assets[0]) {
        const imageUri = response.assets[0].uri;
        if (imageUri) {
          onImageSelect(imageUri);
        }
      }
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleImageSelect}>
      {currentImage ? (
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: currentImage }} 
            style={styles.profileImage}
            resizeMode="cover"
          />
        </View>
      ) : (
        <View style={styles.cameraContainer}>
          <Text style={styles.cameraIcon}>📷</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: 'hidden',
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  cameraContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    fontSize: 30,
    color: '#ffffff',
  },
});

export default LanguageProfileSelector;

