import React,{useEffect} from 'react'
import {Text} from 'react-native'
import 'react-native-gesture-handler';
import { NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import {useDispatch,connect} from 'react-redux'
import auth from '@react-native-firebase/auth'

import Addpost from './screens/addPost'
import Home from './screens/home'
import Register from './screens/register'
import Login from './screens/login'
import CustomerHeader from './layout/customHeader'

import {SET_USER,IS_AUTHTHENTICATED} from './action/action.types'
import database from '@react-native-firebase/database'
import EmptyContainer from './components/emptyContainer'
import {requestPermission} from './utils/askPermission'


const Stack = createStackNavigator();

const App = ({authState}) => {

  const dispatch = useDispatch();

  const onAuthStatechanged=(user) => {
    if(user){
      dispatch({
        type:IS_AUTHTHENTICATED,
        payload:true
      })

      console.log(user._user.uid)

      database()
      .ref(`/users/${user._user.uid}`)
      .on('value',(snapshot)=>{
        console.log('User Details',snapshot.val())
        dispatch({
          type:SET_USER,
          payload:snapshot.val(),
        })
      })
    }else{
      dispatch({
        type:IS_AUTHTHENTICATED,
        payload:false

      })
    }
  }

  useEffect(()=>{
    requestPermission();
    const subscriber = auth().onAuthStateChanged(onAuthStatechanged)
    return subscriber;
  },[])

 if(authState.loading){
       return <EmptyContainer/>
 } 

  return(
      <>
       <NavigationContainer>
         <Stack.Navigator
          screenOptions={{
            header:(props)=> <CustomerHeader {...props} />
          }}
         >
           {authState.isAuthenticated ? (
             <>
             <Stack.Screen name="Home" component={Home}/>
             <Stack.Screen name="AddPost" component={Addpost}/>
             </>
           ) : (
             <>
             <Stack.Screen name="Login" component={Login} options={{
               headerShown:false
             }}
             />
             <Stack.Screen name="Register" component={Register} options={{
               headerShown:false
             }}/>
             </>
           )}
         </Stack.Navigator>
       </NavigationContainer>
      </>
  )
    
}


const mapStateToProps = (state) => ({
  authState:state.auth
})

export default connect(mapStateToProps)(App);
