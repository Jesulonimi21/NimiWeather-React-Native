import React,{Component} from 'react';
import {TextInput,StyleSheet,View} from 'react-native';

export default class SearchInput extends React.Component{
        constructor(props){
            super(props);
            this.state={
                text:''
            }
        }
    handleChangeText=(text)=>{
        this.setState({text});
    }

    handleSubmitEditing=()=>{
        const {text}=this.state;
        const {onSubmit}=this.props;

        if(!text){
            return;
        }

        onSubmit(text);
        this.setState({text:''});
    }
    render(){
        const{text}=this.state;
        return<View style={styles.container}>
<TextInput style={styles.textInput} 
value={text}
placeholder={this.props.placeholder}
    autoCorrect={false}
    underlineColorAndroid="transparent"
    placeholderTextColor='white'
    clearButtonMode="always"
    onChangeText={this.handleChangeText}
    onSubmitEditing={this.handleSubmitEditing}
    ></TextInput>
        </View>
    }
}

const styles=StyleSheet.create({
    container:{
        width:300,
        height:40,
        backgroundColor:'#666',
        marginHorizontal:20,
        paddingHorizontal:10,
        marginTop:20,
        borderRadius:5
    },
    textInput:{
        flex:1,
        color:'white'
    }

})