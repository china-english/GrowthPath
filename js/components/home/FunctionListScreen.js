import React, { Component } from 'react'
import { Image, Dimensions } from 'react-native'
import { connect } from 'react-redux'

import { withRouter } from 'react-router-native'
import {
  Text,
  CardItem,
  View
} from 'native-base'

const height = Dimensions.get('window').height

const styles = {
  name: {
    textAlign: 'center'
  },
  background: {
    backgroundColor: 'white'
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    lineHeight: 35
  },
  mainStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingTop: 10
  },
  card: {
    width: 150,
    height: height / 4,
    marginTop: 10,
    flex: 0
  },
  picture: {
    resizeMode: 'contain',
    height: 120,
    width: 150
  }
}

const functionData = [
  {
    id: 'birthday',
    name: '生日提醒',
    url: require('../../../images/happy_birthday.jpg')
  },
  {
    id: 'question',
    name: '智能问答',
    url: require('../../../images/travel.jpg')
  },
  {
    id: 'schedule',
    name: '日程安排',
    url: require('../../../images/fight.jpg')
  },
  {
    id: 'ant-design',
    name: 'ant-design(button)',
    url: require('../../../images/fight.jpg')
  },
  {
    id: 'form',
    name: '表单',
    url: require('../../../images/head.png')
  }
  // {
  //   id: 'all',
  //   name: '凑数',
  //   url: require('../../../images/happy_birthday.jpg')
  // }
]

class FunctionListScreen extends Component {
  render () {
    console.log(this.props)
    return (
      <View style={styles.mainStyle}>
        {functionData &&
         functionData.map((item, index) =>
           <View style={styles.card} key={index}>
             <CardItem button cardBody style={{flexDirection: 'column'}}
               onPress={() => this.props.history.push(item.id)}>
               <Image source={item.url} style={styles.picture} />
               <Text style={{marginVertical: 10}}>
                 {item.name}
               </Text>
             </CardItem>

           </View>
         )}
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FunctionListScreen))
