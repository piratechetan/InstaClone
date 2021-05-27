import React from 'react';
import {} from 'react-native'
import {Body,Right,Button,Icon,Title,Text,Header,Left} from 'native-base'

import {connect} from 'react-redux'
import propTypes from 'prop-types'
import {signout} from '../action/auth'
const customHeader = ({signout,authState,navigation}) => {
    return(
        <Header
        androidStatusBarColor="#0f4c75"
        style={{
            backgroundColor:'#0f4c75'
        }}
        >
         <Body>
             <Title>InstaClone</Title>
         </Body>
      <Left>
             {authState.isAuthenticated && (
                 <>
                 <Button
                 transparent
                 iconleft
                 onPress={()=>navigation.navigate('AddPost')}
                 >
                <Text>Add Post</Text>
                 </Button>
                 <Button
                 transparent
                 onPress={()=>signout()}
                 >
                 <Icon name="log-out-outline" style={{color:'red'}} />
                 </Button>
                 </>
             )}
         </Left>
        </Header>
    )
}
const mapstateToProps = (state) => ({
    authState:state.auth
})
const mapDispatchToProps = {
    signout
}

customHeader.prototypes = {
    signout: propTypes.func.isRequired,
    authState:propTypes.object.isRequired
}

export default connect(mapstateToProps,mapDispatchToProps)(customHeader);