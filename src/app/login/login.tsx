import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { Link, useRouter } from 'expo-router'

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Informe e-mail e senha.');
      return;
    }
    router.replace('/home/home');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.logo}>MediDash</Text>

      {/* Welcome Message */}
      <Text style={styles.welcomeText}>Bem-vindo ao MediDash!</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#777" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="ENDEREÇO E-MAIL"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#777" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="SENHA"
          placeholderTextColor="#999"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Footer Text */}
      <Text style={styles.footerText}>Não tem conta?</Text>
      <Link href="/login/criar" asChild>
        <TouchableOpacity>
          <Text style={styles.linkText}>Crie agora!</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
