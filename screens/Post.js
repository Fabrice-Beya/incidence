import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles';

class Post extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Post</Text>
      </View>
    );
  }
}

export default Post;