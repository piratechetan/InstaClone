import React,{useState} from 'react';
import {View,StyleSheet,TouchableOpacity,ScrollView,Image} from 'react-native'
import {Container,Form,Item,Input,Text,Button,Thumbnail,Content} from 'native-base'

import Storage from '@react-native-firebase/storage'
import ProgressBar from 'react-native-progress/Bar'
import logo from "../assets/InstaClone_logo.png"
import ImagePicker from 'react-native-image-picker'
import propTypes from 'prop-types';
import {signup} from '../action/auth'
import {connect} from 'react-redux'
const Register = ({signup,navigation}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [instaUsername, setInstaUserName] = useState('')
   
    // const [image, setimage] = useState(
    //     'https://firebase.google.com/downloads/brand-guidelines/PNG/logo-logomark.png'
    //     )
    // const [imageUploading, setimageUploading] = useState(false) 
    // const [uploadStatus, setuploadStatus] = useState(null)   

    // const chooseImage = async () => {
    //     ImagePicker.showImagePicker(options,(Response)=>{
    //         console.log("Response=",Response)
    //         if(Response.didCancel){
    //             console.log("User Cancelled image Picker");
    //         }else if(Response.error){
    //             console.log("ImagePicker Error: ",Response.error);
    //         }else if(response.customButton){
    //             console.log("User Tapped custom Button: ",Response.customButton)
    //         }else{
    //             console.log(Response)
    //             uploadImage(Response);
    //         }
    //     })

    // }
    // const uploadImage = async (Response) => {
    //     setimageUploading(true)
    //     const reference = Storage().ref(Response.fileName)
    //     const task = reference.putFile(Response.path)
    //     task.on("state_changed",(taskSnapshot)=>{
    //         const percentage = (taskSnapshot.bytesTransferred/taskSnapshot.totalBytes)*1000

    //         setuploadStatus(percentage)
    //     })
    //     task.then(async() =>{
    //         const url = await reference.getDownloadURL()
    //         setimage(url)
    //         setimageUploading(false)
    //     })
        
    // }
    const doSignUp = async () => {
        signup({name,instaUsername,email,password})
    }
    return (
    <Container style={styles.container}>
      <Content padder style={{marginTop:10}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {/* <View style={styles.imageContainer}>
            <TouchableOpacity onPress={chooseImage}>
              <Thumbnail large source={{uri: image}} />
            </TouchableOpacity>
          </View> */}

          {/* {imageUploading && (
            <ProgressBar progress={uploadStatus} style={styles.progress} />
          )} */}
          <Image source={logo} style={styles.image}/>
          <Text style={{alignSelf:'center',marginTop:5,color:'#758283',fontWeight:'900'}}>Sign up to see photos and videos</Text>
          <Text style={{alignSelf:'center',marginBottom:10,color:'#758283',fontWeight:'900'}}>from your friends </Text>

          <Form>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="Username"
                value={instaUsername}
                style={{color: '#eee'}}
                onChangeText={(text) => setInstaUserName(text)}
              />
            </Item>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="Name"
                value={name}
                style={{color: '#eee'}}
                onChangeText={(text) => setName(text)}
              />
            </Item>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="Email"
                value={email}
                style={{color: '#eee'}}
                onChangeText={(text) => setEmail(text)}
              />
            </Item>
            
            <Item regular style={styles.formItem}>
              <Input
                placeholder="Password"
                value={password}
                secureTextEntry={true}
                style={{color: '#eee'}}
                onChangeText={(text) => setPassword(text)}
              />
            </Item>
            
            <Button regular block onPress={doSignUp} style={{backgroundColor:'#1B98F5',margin:15}}>
              <Text>SignUp</Text>
            </Button>
            <Text style={{alignSelf:'center',marginTop:5,color:'#758283',fontWeight:'900'}}>By signing up, you are agree to our</Text>
            <Text style={{alignSelf:'center',color:'#758283',fontWeight:'900'}}>Terms, Data Policy and Cookies</Text>
             <Text style={{alignSelf:'center',marginBottom:10,color:'#758283',fontWeight:'900'}}>Policy</Text>


            <View style={{flexDirection:'row',marginTop: 10,justifyContent:'center'}}>
              <Text style={{color: 'grey', }}>
              Have an account?
            </Text>
            <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{marginLeft:5}}>
            <Text style={{color: '#1B98F5',}}>Login</Text>
          </TouchableOpacity>
            </View>
            
          </Form>
        </ScrollView>
      </Content>
    </Container>
  );

}

const mapDispatchToProps ={
    signup:(data) => signup(data)
}
signup.propTypes = {
    signup:propTypes.func.isRequired
}

export default connect(null,mapDispatchToProps)(Register);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'flex-start',
  },
  image: {
    alignSelf: 'center',
    width:210,
    height:60
  },
  progress: {width: null, marginBottom: 20},
  formItem: {
    marginLeft:15,
    marginRight:15,
    marginBottom: 7,
    borderColor:'grey',
    borderWidth:1
  },
});
