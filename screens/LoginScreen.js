import React, { Component } from 'react';
import { Container, 
  Header, 
  Content, 
  List, 
  ListItem, 
  Thumbnail, 
  Text, 
  Body, 
  Icon,  
  Item, 
  Input,  } from 'native-base';
import { StyleSheet, 
  Image, 
  View, 
  TabNavigator, 
  ListView, 
  ActivityIndicator, 
  TouchableOpacity, 
  AsyncStorage, 
  ScrollView,
  Keyboard, 
  KeyboardAvoidingView,
  Animated, } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { ProgressDialog } from 'react-native-simple-dialogs';

const IMAGE_HEIGHT_SMALL = 60;

export default class LoginScreen extends React.Component {

  static navigationOptions = {
    header: null,
  }
 
  constructor(props) {
    super(props);
    this.imageHeight = new Animated.Value(120);
    this.state = {
        isLoading: false,
        email: '',
        password: '',
        auth:{}
    }
  }

  componentWillMount () {
    console.log("mounted");
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    console.log('unmounted');
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = (event) => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT_SMALL,
    }).start();
    console.log('image reduced');
  };

  keyboardWillHide = (event) => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT,
    }).start();
  };

/*  openProgress() {
        this.setState({ showProgress: true })

        setTimeout(
            () => this.setState({ showProgress: false }),
            2500
        );
    }*/

  /*onLoginPress = async () => {
    const resetActionLogin = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Main'})
      ]
    });

      this.openProgress();

      fetch('http://api.mysnackbox.co/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          auth: responseJson
        }, function() {
         // console.log(this.state.auth);
          if(this.state.auth.registered === true){
            AsyncStorage.setItem("token",this.state.auth.token);
            this.props.navigation.dispatch(resetActionLogin);
          }
          else{
            //console.log('here');
            alert('Wrong email/password');
          }
        });
      });
  }*/

  render() {
    const { navigate } = this.props.navigation;

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding">
        <ScrollView style={styles.scroll}>
          <Container style={ styles.container }>
                <View style={{ flex:1,flexDirection:'column',alignItems:'center',marginTop:40 }}>
                  <View>
                    <Animated.Image style={styles.imageStyle} source={require('../assets/images/icon.png')}/>
                    <Item style={{ marginBottom:10, width:300 }} >
                      <Input placeholder='StoreID / Phone number' keyboardType = 'numeric' returnKeyType="next" />
                    </Item>
                    <Item style={{ marginBottom:10, width:300 }}>
                      <Input placeholder='Password' secureTextEntry returnKeyType="go"/>
                    </Item>
                  </View>
                  
                  <View style={ styles.viewStyle }>
                    <TouchableOpacity style={styles.register}>
                      <Text style={{color:'#ffffff', fontWeight:'bold' }} onPress={this.onLoginPress}>LOGIN</Text>
                    </TouchableOpacity>
                  </View>
                  
                  <ProgressDialog
                    visible={this.state.showProgress}
                    message="Logging in..."
                    activityIndicatorSize="large"
                    activityIndicatorColor="black"
                  />
                </View>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  scroll: {
    backgroundColor: '#fff',
    padding: 30,
    flexDirection: 'column'
  },
  imageStyle: {
    height: 100,
    width: 100,
    marginBottom:50,
    alignSelf:'center',
  },
  viewStyle:{
    width: 300,
    height:80,
    marginTop:50,
  },
  loginButton: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 5,
   // paddingVertical: 5,
    // paddingHorizontal: 15,
    width: window.width - 30,
},
  register:{
    marginBottom:20, 
    width:window.width -100,
    alignItems:'center',
    justifyContent:'center',
    height:50,
    backgroundColor: '#3f3f3f',
    borderRadius:10,
}
});