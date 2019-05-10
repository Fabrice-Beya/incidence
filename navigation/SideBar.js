import React, { Component } from "react";
import { Image } from "react-native";
import {
  Content, Text, List, ListItem, Icon,
  Container,
  Left,
  Right,
  Badge,
  Footer,
  Button,
} from "native-base";
import firebase from 'firebase';

const drawerCover = require("../assets/logo_blk.png");
const drawerImage = require("../assets/logo.png");
const datas = [
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
    name: "Notifications",
    route: "Notifications",
    icon: "md-notifications",
  },
  {
    name: "Profile",
    route: "Profile",
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
          {/* <Image square style={styles.drawerImage} source={drawerImage} /> */}

          <List
            dataArray={datas}
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

export default SideBar;
