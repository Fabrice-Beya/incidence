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

// const drawerCover = require("../../../assets/drawer-cover.png");
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
    icon: "md-heart",
  }, 
  {
    name: "Profile",
    route: "Profile",
    icon: "md-person",
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

  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff"}}
        >
          {/* <Image source={drawerCover} style={styles.drawerCover} /> */}
          <Image square style={styles.drawerImage} source={drawerImage} />

          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                
                onPress={() => this.props.navigation.navigate(data.route)}
                
              >
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

            <Button style={{flex:1, justifyContent: 'flex-end', alignItems: 'center', margin: 30}} iconLeft transparent dark onPress={() => this.signout()}>
              <Icon name='home' />
              <Text>Logout</Text>
            </Button>
          
         
          
        </Content>
      </Container>
    );
  }
}

export default SideBar;
  