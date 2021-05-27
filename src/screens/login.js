import React,{useState} from 'react';
import {StyleSheet,View,ScrollView,Image,TouchableOpacity} from 'react-native'
import {Container,Form,Item,Input,Text,Button,H3} from 'native-base';
import logo from '../assets/InstaClone_logo.png'
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {signin} from "../action/auth"

const Login = ({navigation,signin}) => {
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const doSignIn = () => {
     signin({email,password})
 }
    return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Image
          source={logo}
          style={{width: 210, height: 60, marginTop: 30,alignSelf: 'center',}}
          resizeMode="contain"
        />

        <Form style={{marginTop:20}}>
          <Item  style={styles.formItem}>
            <Input
              placeholder="Email"
              value={email}
              style={{color: '#eee'}}
              onChangeText={(text) => setEmail(text)}
            />
          </Item>
          <Item  style={styles.formItem}>
            <Input
              placeholder="Password"
              value={password}
              secureTextEntry={true}
              style={{color: '#eee'}}
              onChangeText={(text) => setPassword(text)}
            />
          </Item>
          <Button  block onPress={doSignIn}>
            <Text>SignIn</Text>
          </Button>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={{marginTop: 10}}>
            <Text style={{color: '#fff', textAlign: 'center'}}>
              Do not have an account, SignUp here
            </Text>
          </TouchableOpacity>
        </Form>
      </ScrollView>
    </Container>
  );
}

const mapDispatchToProps = {
    signin:(data)=>signin(data)
}

signin.propTypes = {
    signin: propTypes.func.isRequired
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'flex-start',
  },
  heading: {
    textAlign: 'center',
    color: '#fdcb9e',
    marginHorizontal: 5,
    marginTop: 30,
  },
  formItem: {
      marginLeft:15,
      marginRight:15,
    marginBottom: 7,
   
    borderColor:'grey',
    borderWidth:1,
    elevation:1
  },
});


export default connect(null,mapDispatchToProps)(Login);