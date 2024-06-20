import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

const HomeScreen = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlock = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || supportedTypes.length === 0 || !isEnrolled) {
      Alert.alert('Face ID not supported or not set up on this device');
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate with Face ID',
      fallbackLabel: 'Use Passcode',
    });

    if (result.success) {
      setIsUnlocked(true);
    } else {
      Alert.alert('Authentication failed');
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>
        {isUnlocked ? 'Unlocked' : 'Locked'}
      </Text>
      <Button title="Unlock with Face ID" onPress={handleUnlock} />
      {isUnlocked && <Button title="Lock" onPress={handleLock} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  statusText: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default HomeScreen;
