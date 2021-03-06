import propTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Text, useTheme } from 'react-native-paper';

const ProfileAvatar = ({ name, avatar, onPress }) => {
  const { colors } = useTheme();

  const dummyAvatar = `https://avatars.dicebear.com/api/initials/${name}.png?b=%23${
    colors.primary.split('#')[1]
  }`;

  return (
    <View style={styles.mainContainer}>
      <Avatar.Image size={72} source={{ uri: avatar || dummyAvatar }} />

      <View onTouchEnd={onPress} style={styles.textContainer}>
        <Text style={styles.nameText}>{name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  textContainer: { marginLeft: 16, bottom: 4 },
  nameText: { fontWeight: 'bold', fontSize: 20, letterSpacing: 0.4 },
  updateProfileContainer: { flexDirection: 'row', alignItems: 'center' },
  updateProfileText: { marginRight: 4 },
  updateProfileIcon: { top: 1 },
});

ProfileAvatar.propTypes = {
  name: propTypes.string.isRequired,
  avatar: propTypes.string,
  onPress: propTypes.func,
};

ProfileAvatar.defaultProps = {
  onPress: () => {},
};

export default ProfileAvatar;
