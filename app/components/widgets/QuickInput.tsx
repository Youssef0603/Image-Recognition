import React, {useState, useEffect} from 'react';
import {TextInput, StyleSheet, View, Animated, Text} from 'react-native';

const QuickInput = ({
  value,
  onChangeText = () => {},
  placeholder = '',
  style = {},
  variant = 'none',
  labelType = 'animated', // New prop to control label behavior: 'animated', 'static', 'none'
}) => {
  const [isFocused, setFocused] = useState(false);
  const animatedIsFocused = useState(new Animated.Value(value ? 1 : 0))[0];

  useEffect(() => {
    if (labelType === 'animated') {
      Animated.timing(animatedIsFocused, {
        toValue: isFocused || value ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [isFocused, value, labelType]);

  const labelStyle = {
    position: 'absolute',
    left: 0,
    paddingHorizontal: 10,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 3],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ['#aaa', '#000'],
    }),
  };

  const staticLabelStyle = {
    position: 'absolute',
    left: 0,
    top: value || isFocused ? 3 : 18,
    fontSize: value || isFocused ? 12 : 16,
    color: value || isFocused ? '#000' : '#aaa',
  };

  return (
    <View
      style={[
        styles.container,
        styles[variant],
        style,
        {
          paddingTop: variant === 'none' ? 0 : 18,
        },
      ]}>
      {labelType === 'animated' && (
        <Animated.Text style={labelStyle}>{placeholder}</Animated.Text>
      )}
      {labelType === 'static' && (
        <Text style={staticLabelStyle}>{placeholder}</Text>
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[variant == 'none' ? styles.input : {}]}
        placeholder={labelType === 'none' ? placeholder : ''}
        blurOnSubmit
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  input: {
    height: 50,
    fontSize: 16,
    color: '#333',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  outline: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 16,
    color: '#333',
    paddingHorizontal: 10,
  },
  solid: {
    backgroundColor: '#fff',
    elevation: 2,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  underline: {
    borderBottomWidth: 2,
    borderColor: '#ccc',
  },
});

export default QuickInput;
