import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const QuickButton = ({
  onPress = () => {},
  title = 'Label',
  color = '#007bff',
  disabled = false,
  loading = false,
  style = {},
  textStyle = {},
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.button,
      {backgroundColor: color},
      style,
      disabled && styles.disabled,
    ]}
    disabled={disabled || loading}
    activeOpacity={0.7}>
    {loading ? (
      <ActivityIndicator size="small" color="#ffffff" />
    ) : (
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabled: {
    opacity: 0.5,
  },
});

export default QuickButton;
