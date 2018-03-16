import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import NavBar from 'src/modules/shares/NavBar'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import IconEntypo from 'react-native-vector-icons/Entypo'
import { colors } from 'src/constant/mixins'

export default class GlobalPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      name: '',
      price: '',
      brand : '',
      numStar: ['star-o','star-o','star-o','star-o','star-o'],
      isAddButton: false,
      meassage: '',
      contentList: []
    }
  }

  handleChangeTitle (text) {
    this.setState({ title: text })
  }

  handleChangeName (text) {
    this.setState({ name: text })
  }

  handleChangeBrand (text) {
    this.setState({ brand: text })
  }

  handleChangePrice (text) {
    this.setState({ price: text })
  }

  handleChangeTextBox (text) {
    this.setState({ meassage: text })
  }

  setAmountRating(num){
    this.setState({
      numStar: this.state.numStar.map((_,index)=>{
        if(index < num){
          return 'star'
        }
        else{
          return 'star-o'
        }
      })
    })
  }

  isAddButton(bool){
    this.setState({ isAddButton : bool})
  }

  addContentBox(){
    const contentArr = this.state.contentList
    contentArr.push('content')
    console.log(contentArr,'eiei')
    this.setState({ contentList: contentArr })
    this.isAddButton(false)
  }

  render() {
    console.log(this.state.contentList,'contentList')
    return (
        <View style={styles.container}>
         <ScrollView 
          showsVerticalScrollIndicator={false} 
          scrollEventThrottle={16} 
          bounces={false}
          style={styles.body}
        >
            <View>
              <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                <Image 
                  style={{
                    flex: 1,
                    height: 200,
                    resizeMode: 'cover',
                  }}
                  source={{uri: 'https://goo.gl/XCL6pA'}}
                />
              </View>
              <View>
                <View style={styles.sectionBody}>
                  <Text style={styles.label}>Title</Text>
                  <View style={styles.textBox}>
                    <TextInput
                      style={styles.textInput}
                      value={this.state.title}
                      underlineColorAndroid='transparent'
                      onChangeText={(text) => this.handleChangeTitle(text)}
                    />
                  </View>
                
                  <Text style={styles.label}>Name</Text>
                  <View style={styles.textBox}>
                    <TextInput
                      style={styles.textInput}
                      value={this.state.name}
                      underlineColorAndroid='transparent'
                      onChangeText={(text) => this.handleChangeName(text)}
                    />
                  </View>

                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex : 1, paddingRight : 10 }}>
                      <Text style={styles.label}>Brand</Text>
                      <View style={styles.textBox}>
                        <TextInput
                          style={styles.textInput}
                          value={this.state.brand}
                          underlineColorAndroid='transparent'
                          onChangeText={(text) => this.handleChangeBrand(text)}
                        />
                      </View>
                    </View>
                    <View style={{ flex : 1, paddingLeft : 10 }}>
                      <Text style={styles.label}>Price</Text>
                      <View style={styles.textBox}>
                        <TextInput
                          style={styles.textInput}
                          value={this.state.price}
                          underlineColorAndroid='transparent'
                          onChangeText={(text) => this.handleChangePrice(text)}
                        />
                      </View>
                    </View>
                  </View>

                  <Text style={styles.label}>Rating</Text>
                  <View style={{
                    flex: 1, 
                    marginTop: 10,
                    marginBottom: 10,
                    flexDirection: 'row'
                  }}>
                    {this.state.numStar.map((item,key) => (
                      <TouchableOpacity key={key} onPress={() => this.setAmountRating(key+1)}>
                        <IconFontAwesome style={{ marginRight : 8 }} name={item} size={35} color={colors.yellow_star} />
                      </TouchableOpacity>
                    ))}
                  </View>

                  {/* <Text style={styles.label}>Content</Text> */}

                  <View style={{ marginTop: 15, marginLeft: 15, marginRight: 15 }}>
                    <View style={{ marginBottom: 5, flexDirection: 'row' }}>
                      <Text style={{ fontSize:15, color: colors.black, fontWeight: 'bold' }}>Content</Text>
                      <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity style={{ marginLeft: 24, flexDirection: 'row' }}>
                          <IconFontAwesome name='edit' size={18} />
                          <Text style={{ fontSize:15, color: colors.gray, marginLeft: 5 }}>Edit</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  {this.state.contentList.map((item,key) => 
                    <View>
                      {  item === 'content' && (
                        <View style={styles.bodyTextInput}>
                          <TextInput 
                            style={{ fontSize:15, color: colors.gray, minHeight: 100, paddingTop: 0, paddingBottom: 0 }}
                            multiline
                            maxHeight={300}
                            // editable={this.state.switchEditAndSent}
                            underlineColorAndroid='transparent'
                            onChangeText={text => this.handleChangeTextBox(text)}
                            value={this.state.staticMessage}
                            keyboardType='default'
                          />
                      </View>)}
                    </View>
                  )}
                  

                  { !this.state.isAddButton &&
                    <View style={styles.blockAdd}>
                      <TouchableOpacity style={styles.buttonAdd} onPress={() => this.isAddButton(true)}>
                        <IconMaterial name='add-circle' size={40}></IconMaterial>
                      </TouchableOpacity>
                    </View>
                  }

                  { this.state.isAddButton &&
                    <View style={styles.blockOption}>
                      <TouchableOpacity style={styles.buttonOptionLeft} onPress={() => this.addContentBox()}>
                        <IconEntypo name='text' size={40}></IconEntypo>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.buttonOptionRight} onPress={() => this.isAddButton(false)}>
                        <IconFontAwesome name='picture-o' size={40}></IconFontAwesome>
                      </TouchableOpacity>
                    </View>
                  }
                  
                  <View style={styles.blockSave}>
                    <TouchableOpacity style={styles.buttonSave}>
                      <Text style={{ fontSize: 18, color: '#FFF' }}>เพิ่มสินค้า</Text>
                    </TouchableOpacity>
                  </View>

                
                </View>
              </View>
            </View>
        {/* </View> */}
        </ScrollView>
        <View style={styles.header}>
          <View style={styles.platformHeader}>
            <NavBar titleName="AddProduct"/>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  body: {
    marginTop: Platform.OS === 'ios' ? 75 : 60
  },
  platformHeader: {
    height: Platform.OS === 'ios' ? 75 : 60,
    paddingTop: Platform.OS === 'ios' ? 25 : 0
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    zIndex: 1
  },
  coverHeader: {
    height: Platform.OS === 'ios' ? 75 : 60,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 0
  },
  label: {
    color: '#5C5C5C', 
    fontSize: 15
    // fontWeight: 'bold'
  },
  sectionBody: {
    backgroundColor: '#FFF', 
    margin: 5, 
    paddingHorizontal: 5, 
    paddingTop: 10, 
    paddingBottom: 10
  },
  textBox: {
    flex: 1, 
    // height: 42, 
    borderRadius: 3, 
    justifyContent: 'center', 
    backgroundColor: '#FFF',
    paddingHorizontal: 10, 
    marginTop: 10, 
    marginBottom: 10, 
    borderColor: '#dfdfdf', 
    borderWidth: 1
  },
  textInput: {
    flex: 1,
    color: '#000',
    fontSize: 15,
    height: 35,
    padding: 0
  },
  bodyTextInput: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    padding: 10,
    borderColor: '#dfdfdf',
    borderWidth: 1
  },
  buttonAdd: {
    justifyContent: 'center',
    alignItems: 'center',
    // flexDirection: 'row',
    backgroundColor: colors.white,
    height: 50,
    borderRadius: 3,
    zIndex: 2,
    borderColor: '#dfdfdf', 
    borderWidth: 1
  },
  blockAdd: {
    paddingTop: 20,
    padding: 5,
    // paddingVertical: 20
  },
  buttonSave: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.orange,
    height: 50,
    borderRadius: 3,
    zIndex: 2
  },
  blockSave: {
    borderTopColor: '#f1f1f1',
    borderTopWidth: 1,
    shadowColor: '#808080',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    padding: 5
  },
  blockOption: {
    flexDirection: 'row',
    paddingTop: 20,
    padding: 5,
  },
  buttonOptionLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray2,
    height: 50,
    borderBottomLeftRadius: 3,
    borderTopLeftRadius:3
  },
  buttonOptionRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray2,
    height: 50,
    borderBottomRightRadius: 3,
    borderTopRightRadius:3
  },
  // blockSave: {
  //   borderTopColor: '#f1f1f1',
  //   borderTopWidth: 1,
  //   shadowColor: '#808080',
  //   shadowOffset: { width: 0, height: 3 },
  //   shadowOpacity: 0.5,
  //   padding: 10
  //   // elevation: 1
  // }
})