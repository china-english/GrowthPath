import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Dimensions, TextInput } from 'react-native'
import {
  Container,
  Content,
  Header,
  Body,
  Left,
  Right,
  Title,
  Button,
  Icon,
  Footer,
  Text,
  View,
  ListItem,
  List,
  Thumbnail
} from 'native-base'

import * as questionActions from '../../actions/questionActions'

import QuestionForm from './QuestionForm'
import commonStyles from '../common/commonStyles'

import * as colors from '../../constants/colors'

const sceneWidth = Dimensions.get('window').width

const styles = {
  name: {
    textAlign: 'center'
  },
  background: {
    backgroundColor: colors.grey100
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
    paddingTop: 8
  },
  card: {
    marginLeft: 10,
    marginRight: 10
    // marginHorizontal: 10   // 不能使用
  },
  picture: {
    resizeMode: 'cover',
    height: 120
  },
  cardInfoLine: {
    marginTop: 6,
    padding: 6,
    paddingVertical: 6,
    marginBottom: 10
  }
}

class QuestionScreen extends Component {
  state = {
    submitting: false,
    question: '',
    value: ''
  }

  handleSubmit = (value) => {
    console.log(value.question)
    this.setState({question: value.question, value: ''})
    const {questionActions} = this.props
    questionActions.createQuestion(value.question)
                   .then(res => {
                     console.log('ok')
                     console.log(res)
                   })
                   .catch(error => {
                     console.log(error)
                   })
  }

  render () {
    console.log(this.props.record)
    return (
      <Container>
        <Header style={commonStyles.header}
          iosBarStyle={colors.iosBarColor}
          androidStatusBarColor={colors.statusBarColor}>

          <Left style={commonStyles.headerLeft}>
            <Button transparent onPress={() => this.props.history.goBack()} title='返回'>
              <Icon name='ios-arrow-back' style={commonStyles.white} />
            </Button>
          </Left>
          <Body style={commonStyles.headerTitle}>
            <Title style={commonStyles.headerText}>智能问答</Title>
          </Body>

          <Right />

        </Header>

        <Content style={styles.background}>
          <List>
            {this.props.record && this.props.record.map((record, index) =>
              <ListItem key={index} style={Object.assign({}, {borderBottomWidth: 0}, record.asker ? {justifyContent: 'flex-end'} : {justifyContent: 'flex-start'})}>
                <Text style={{maxWidth: 200}}>{record.content}</Text>
              </ListItem>
            )}
          </List>
        </Content>

        <Footer>
          <View style={{width: sceneWidth}}>
            <QuestionForm onSubmit={this.handleSubmit} submitting={this.state.submitting} value={this.state.value} />
          </View>
        </Footer>

      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    questionActions: bindActionCreators(questionActions, dispatch)
  }
}

const mapStateToProps = state => ({
  record: state.question.record
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestionScreen)
