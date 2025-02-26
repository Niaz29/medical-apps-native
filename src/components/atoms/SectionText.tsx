import React from 'react';
import { Text, StyleSheet } from 'react-native';

export const SectionTitle: React.FC<{ children: string }> = ({ children }) => (
  <Text style={styles.title}>{children}</Text>
);

export const SectionDescription: React.FC<{ children: string }> = ({ children }) => (
  <Text style={styles.description}>{children}</Text>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666666',
    marginTop: 10,
    paddingHorizontal: 30,
    // marginBottom: 40,
  },
});
