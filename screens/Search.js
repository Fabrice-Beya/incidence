import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, FlatList, Platform, RefreshControl } from 'react-native';
import styles from '../styles';
import db from '../config/firebase';
import { getProfile } from '../actions/profile';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { bindActionCreators } from 'redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class Search extends React.Component {

  state = {
    search: '',
    results: []
  }

  searchUser = async () => {
    let results = []
    const query = await db.collection('users').where('fullname', '>=', this.state.search).get()
    query.forEach((response) => {
      results.push(response.data())
    })
    this.setState({ results: results })
    console.log(results)
  }

  goToUser = async (user) => {
    await this.props.getProfile(user.uid);
    this.props.navigation.navigate('Profile')
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TextInput
          style={styles.borderSearch}
          value={this.state.search}
          placeholder='search'
          autoFocus={true}
          returnKeyType='search'
          onSubmitEditing={this.searchUser}
          onChangeText={search => this.setState({ search })} />
        <FlatList
          data={this.state.results}
          keyExtractor={(item) => JSON.stringify(item.uid)}
          style={{ flex: 1 }}
          renderItem={({ item }) => {
            return (
              <View>
                <TouchableOpacity onPress={() => this.goToUser(item)} >
                  <View style={[styles.row, styles.space]}>
                    <View style={[styles.row, styles.center]}>
                      <Image style={styles.squareImage} source={{ uri: item.photo }} />
                      <View style={{ justifyContent: 'flex-start' }}>
                        <Text style={styles.bold}>{item.fullname}</Text>
                        <Text >{item.residence} - {item.unit}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )
          }}
        />
      </View >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getProfile }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Search)