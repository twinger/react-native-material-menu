import React from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
} from 'react-native';

const Touchable = Platform.select({
  android: TouchableNativeFeedback,
  default: TouchableHighlight,
});

function MenuItem({
  value,
  children,
  disabled,
  disabledTextColor,
  ellipsizeMode,
  onPress,
  style,
  textStyle,
  ...props
}) {
  const touchableProps =
    Platform.OS === 'android'
      ? { background: TouchableNativeFeedback.SelectableBackground() }
      : {};

  return (
    <Touchable
      disabled={disabled}
      onPress={onPress}
      {...touchableProps}
      {...props}
    >
      <View style={[styles.container, style]}>
        {value &&  (<Text
          ellipsizeMode={ellipsizeMode}
          numberOfLines={1}
          style={[
            styles.title,
            disabled && { color: disabledTextColor },
            textStyle,
          ]}
        >
          {value}
        </Text>
        )}
        {children}
      </View>
    </Touchable>
  );
}

MenuItem.defaultProps = {
  disabled: false,
  disabledTextColor: '#bdbdbd',
  ellipsizeMode: Platform.OS === 'ios' ? 'clip' : 'tail',
  underlayColor: '#e0e0e0',
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    justifyContent: 'center',
    maxWidth: 248,
    minWidth: 124,
  },
  title: {
    fontSize: 14,
    fontWeight: '400',
    paddingHorizontal: 16,
    textAlign: 'left',
  },
});

export default MenuItem;
