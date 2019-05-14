import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Image } from "react-native";
import {
  Content, Text, List, ListItem, Icon,
  Container,
  Left,
} from "native-base";
import firebase from 'firebase';

const drawerCover = require("../assets/logo_blk.png");
const drawerImage = require("../assets/logo.png");
const keeperRoutes = [
  {
    name: "Home",
    route: "Home",
    icon: "md-home",
  },
  {
    name: "Search",
    route: "Search",
    icon: "md-search",
  },
  {
    name: "Post",
    route: "Post",
    icon: "md-add-circle-outline",
  },
  {
    name: "Inbox",
    route: "Messages",
    icon: "md-mail",
  },
  {
    name: "Notifications",
    route: "Notifications",
    icon: "md-notifications",
  },
  {
    name: "Profile",
    route: "MyProfile",
    icon: "md-person",
  },
  {
    name: "Logout",
    route: "logout",
    icon: "md-log-out",
  },
];

const tenantRoutes = [
  {
    name: "Home",
    route: "Home",
    icon: "md-home",
  },
  {
    name: "Post",
    route: "Post",
    icon: "md-add-circle-outline",
  },
  {
    name: "Inbox",
    route: "Messages",
    icon: "md-mail",
  },
  {
    name: "Notifications",
    route: "Notifications",
    icon: "md-notifications",
  },
  {
    name: "Profile",
    route: "MyProfile",
    icon: "md-person",
  },
  {
    name: "Logout",
    route: "logout",
    icon: "md-log-out",
  },
];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }

  navigate = async (item) => {
    if(item.name == "Logout"){
      await firebase.auth().signOut();
      this.props.navigation.navigate('Auth');
    } else {
      this.props.navigation.navigate(item.route)
    }
  }


  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff" }}
        >
          <Image source={drawerCover} style={styles.drawerCover} />

          <List
            dataArray={this.props.user.role === 'keeper' ? keeperRoutes : tenantRoutes}
            renderRow={data => 
              <ListItem
                button onPress={() => this.navigate(data)}>
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={{ color: "#333", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)
