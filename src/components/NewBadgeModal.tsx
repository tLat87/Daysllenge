import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { Badge } from '../types';
import { textStyles } from '../utils/fontUtils';

interface NewBadgeModalProps {
  visible: boolean;
  badge: Badge;
  onClose: () => void;
}

const { width, height } = Dimensions.get('window');

const NewBadgeModal: React.FC<NewBadgeModalProps> = ({ visible, badge, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>NEW BADGE</Text>
          </View>
          
          <View style={styles.badgeContainer}>
            <View style={styles.badgeIcon}>
              <Text style={styles.badgeEmoji}>{badge.icon}</Text>
            </View>
            <Text style={styles.badgeName}>{badge.name}</Text>
            <Text style={styles.badgeDescription}>{badge.description}</Text>
          </View>
          
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#FF0000',
    borderRadius: 16,
    padding: 30,
    marginHorizontal: 20,
    maxWidth: width * 0.9,
    alignItems: 'center',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    ...textStyles.title,
    color: '#ffffff',
    textAlign: 'center',
  },
  badgeContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  badgeIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  badgeEmoji: {
    fontSize: 40,
  },
  badgeName: {
    ...textStyles.subtitle,
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  badgeDescription: {
    ...textStyles.caption,
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 20,
  },
  closeButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  closeButtonText: {
    ...textStyles.button,
    color: '#FF0000',
  },
});

export default NewBadgeModal;

