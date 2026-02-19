import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSignUp = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }
    setLoading(true);
    try {
      await login(email.trim(), password);
    } catch (e) {
      Alert.alert('Sign up failed', 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const Container = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  const containerProps = Platform.OS === 'ios' ? { behavior: 'padding' as const } : {};
  return (
    <Container style={styles.container} {...containerProps}>
      <Text style={styles.title}>BloodConnect</Text>
      <Text style={styles.subtitle}>Sign up to continue</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={Boolean(loading)}>
        <Text style={styles.buttonText}>{loading ? 'Signing up...' : 'Sign up'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.forgot} disabled={false} activeOpacity={1}>
        <Text style={styles.forgotText}>Already have an account? Sign in</Text>
      </TouchableOpacity>

      <Text style={styles.hint}>
        Demo: sign up with email like admin@bc.com, manager@bc.com, hr@bc.com, outreach@bc.com, volunteer@bc.com
      </Text>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#C41E3A',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  forgot: {
    alignSelf: 'center',
    marginTop: 16,
  },
  forgotText: {
    color: '#C41E3A',
    fontSize: 14,
  },
  hint: {
    marginTop: 24,
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
});
