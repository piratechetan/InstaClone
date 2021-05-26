import React,{useState} from 'react';
import {View,StyleSheet,TouchableOpacity,ScrollView} from 'react-native'
import {Container,Form,Item,Input,Text,Button,Thumbnail,Content} from 'native-base'

import Storage from '@react-native-firebase/storage'
import ProgressBar from 'react-native-progress/Bar'

import ImagePicker from 'react-native-image-picker'
import propTypes from 'prop-types';
import {signup} from '../action/auth'
import {connect} from 'react-redux'
const Register = ({signup}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [instaUsername, setInstaUserName] = useState('')
    const [country, setCountry] = useState('')
    const [image, setimage] = useState(
        'https://firebase.google.com/downloads/brand-guidelines/PNG/logo-logomark.png'
        )
    const [imageUploading, setimageUploading] = useState(false) 
    const [uploadStatus, setuploadStatus] = useState(null)   

    const chooseImage = async () => {
        ImagePicker.showImagePicker(options,(Response)=>{
            console.log("Response=",Response)
            if(Response.didCancel){
                console.log("User Cancelled image Picker");
            }else if(Response.error){
                console.log("ImagePicker Error: ",Response.error);
            }else if(response.customButton){
                console.log("User Tapped custom Button: ",Response.customButton)
            }else{
                console.log(Response)
                uploadImage(Response);
            }
        })

    }
    const uploadImage = async (Response) => {
        setimageUploading(true)
        const reference = Storage().ref(Response.fileName)
        const task = reference.putFile(Response.path)
        task.on("state_changed",(taskSnapshot)=>{
            const percentage = (taskSnapshot.bytesTransferred/taskSnapshot.totalBytes)*1000

            setuploadStatus(percentage)
        })
        task.then(async() =>{
            const url = await reference.getDownloadURL()
            setimage(url)
            setimageUploading(false)
        })
        
    }
    const doSignUp = async () => {
        signup({name,instaUsername,country,email,password})
    }
    return (
    <Container style={styles.container}>
      <Content padder>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={chooseImage}>
              <Thumbnail large source={{uri: image}} />
            </TouchableOpacity>
          </View>

          {imageUploading && (
            <ProgressBar progress={uploadStatus} style={styles.progress} />
          )}

          <Form>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="name"
                value={name}
                style={{color: '#eee'}}
                onChangeText={(text) => setName(text)}
              />
            </Item>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="email"
                value={email}
                style={{color: '#eee'}}
                onChangeText={(text) => setEmail(text)}
              />
            </Item>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="password"
                value={password}
                secureTextEntry={true}
                style={{color: '#eee'}}
                onChangeText={(text) => setPassword(text)}
              />
            </Item>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="Instagram user name"
                value={instaUsername}
                style={{color: '#eee'}}
                onChangeText={(text) => setInstaUserName(text)}
              />
            </Item>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="country"
                value={country}
                style={{color: '#eee'}}
                onChangeText={(text) => setCountry(text)}
              />
            </Item>
            <Button regular block onPress={doSignUp}>
              <Text>SignUp</Text>
            </Button>
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
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'flex-start',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 5,
  },
  progress: {width: null, marginBottom: 20},
  formItem: {
    marginBottom: 20,
  },
});
