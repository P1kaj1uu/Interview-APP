import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../utils/theme';

interface LinearGradientProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function LinearGradient({ children, style }: LinearGradientProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.gradient} />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
    opacity: 0.9,
    borderRadius: 16,
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
});
