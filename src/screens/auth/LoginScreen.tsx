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
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { login } = useAuth();

  const ROLE_OPTIONS: { id: UserRole; label: string; subtitle: string }[] = [
    { id: 'admin', label: 'Admin', subtitle: 'Org-wide control & visibility' },
    { id: 'camp_manager', label: 'City / Cluster Manager', subtitle: 'City-level execution control' },
    { id: 'hr', label: 'HR / Volunteer Manager', subtitle: 'Volunteer management & performance' },
    { id: 'outreach', label: 'Helpline Team', subtitle: 'Emergency helpline operations' },
    { id: 'volunteer', label: 'Volunteer', subtitle: 'On-ground execution & follow-up' },
  ];

  const selectedLabel = selectedRole ? ROLE_OPTIONS.find((r) => r.id === selectedRole)?.label : null;

  const handleSignUp = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }
    if (!selectedRole) {
      Alert.alert('Error', 'Please select your role to continue');
      return;
    }
    setLoading(true);
    try {
      await login(email.trim(), password, selectedRole);
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

      <Text style={styles.roleLabel}>Select your role</Text>
      <TouchableOpacity
        style={[styles.dropdownTrigger, dropdownOpen && styles.dropdownTriggerOpen]}
        onPress={() => setDropdownOpen(!dropdownOpen)}
        activeOpacity={0.8}
      >
        <Text style={selectedLabel ? styles.dropdownTriggerText : styles.dropdownPlaceholder}>
          {selectedLabel ?? 'Choose role...'}
        </Text>
        <Ionicons name={dropdownOpen ? 'chevron-up' : 'chevron-down'} size={20} color="#888" />
      </TouchableOpacity>
      {dropdownOpen && (
        <View style={styles.dropdownList}>
          {ROLE_OPTIONS.map((role) => (
            <TouchableOpacity
              key={role.id}
              style={[styles.dropdownItem, selectedRole === role.id && styles.dropdownItemActive]}
              onPress={() => {
                setSelectedRole(role.id);
                setDropdownOpen(false);
              }}
              activeOpacity={0.7}
            >
              <Text style={[styles.dropdownItemText, selectedRole === role.id && styles.dropdownItemTextActive]}>
                {role.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {selectedRole && !dropdownOpen && (
        <Text style={styles.roleHint}>
          {ROLE_OPTIONS.find((r) => r.id === selectedRole)?.subtitle}
        </Text>
      )}

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
  roleLabel: {
    fontSize: 13,
    color: '#888',
    marginBottom: 8,
  },
  dropdownTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 0,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  dropdownTriggerOpen: {
    borderColor: '#333',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  dropdownTriggerText: {
    color: '#fff',
    fontSize: 16,
  },
  dropdownPlaceholder: {
    color: '#666',
    fontSize: 16,
  },
  dropdownList: {
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#333',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginTop: 0,
    marginBottom: 8,
    maxHeight: 220,
  },
  dropdownItem: {
    padding: 14,
    paddingLeft: 16,
    borderTopWidth: 1,
    borderTopColor: '#222',
  },
  dropdownItemActive: {
    backgroundColor: '#252525',
  },
  dropdownItemText: {
    color: '#fff',
    fontSize: 15,
  },
  dropdownItemTextActive: {
    color: '#C41E3A',
    fontWeight: '600',
  },
  roleHint: {
    fontSize: 12,
    color: '#888',
    marginTop: 6,
    marginBottom: 8,
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
