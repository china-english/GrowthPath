import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Dimensions } from 'react-native'
import {
  Body,
  Button,
  CheckBox,
  Container,
  Content,
  Footer,
  FooterTab,
  Header,
  Icon,
  Input,
  Item,
  Left,
  List,
  ListItem,
  Right,
  Separator,
  Text,
  Title,
  View
} from 'native-base'

import { convertMoneyToString, optionsArrayToObject } from '../../businessLogic/utils'
import { state } from '../../constants/optionsValues'
import * as colors from '../../constants/colors'
import commonStyles from '../common/commonStyles'

const screenWidth = Dimensions.get('window').width

const styles = {
  container: {},
  searchBar: {
    backgroundColor: colors.white,
    marginVertical: 10,
    marginHorizontal: 12,
    borderRadius: 4,
    width: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchIcon: {
    flex: 1,
    color: colors.grey300,
    fontSize: 20
  },
  searchBarText: {
    flex: 1,
    fontSize: 12,
    height: 25
  },
  dividerText: {
    fontWeight: 'bold',
    fontSize: 17
  },
  title: {
    width: screenWidth * 2 / 3
  },
  buttonStyle: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    height: 13,
    marginTop: 3,
    marginLeft: 5
  },
  textStyle: {
    fontSize: 6
  },
  checkBox: {
    marginLeft: -10
  },
  customerName: {
    marginLeft: 20,
    fontSize: 14
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  customerInformationStyle: {
    fontSize: 10,
    paddingTop: 1,
    marginLeft: 6,
    marginRight: 2
  },
  customerGender: {
    width: 22,
    fontSize: 10,
    paddingTop: 1,
    textAlign: 'right',
    marginLeft: 2,
    marginRight: 2
  },
  customerAge: {
    width: 24,
    fontSize: 10,
    textAlign: 'right',
    marginLeft: 2,
    marginRight: 2
  },
  textColor: {
    color: colors.grey800
  },
  customerInvestment: {
    width: 80,
    textAlign: 'right',
    marginLeft: 2,
    marginRight: 0,
    fontSize: 10
  },
  confirmButton: {
    backgroundColor: colors.blue500
  },
  confirmButtonText: {
    fontSize: 16,
    color: colors.white
  }
}

class OptionsScreen extends Component {
  props:{
    clients: Array<Object>,
    pageNumber: number,
    client: ?Object,
    multiple: ?boolean
  }

  state = {
    selected: '',
    count: 0
  }

  onChange = value => {
    this.setState({selected: value})
  }

  render () {
    if (this.state.isLoading) {
      return (
        <View />
      )
    }
    const {multiple} = this.props
    return (
      <Container style={styles.container}>
        <Header searchBar rounded style={commonStyles.backgroundWhite}
          iosBarStyle={colors.iosBarColor}
          androidStatusBarColor={colors.statusBarColor}>

          <Left style={commonStyles.headerLeft}>
            <Button transparent warning onPress={() => this.props.history.goBack()}>
              <Icon name='ios-arrow-back' />
            </Button>
          </Left>

          <Body style={commonStyles.headerTitle}>
            <Title style={{color: 'black', fontSize: 20}}>库存状态</Title>
          </Body>

          <Right>
            <Button warning transparent><Text>确定</Text></Button>
          </Right>
        </Header>

        <Content style={{backgroundColor: colors.grey100}}>
          <View style={commonStyles.backgroundWhite}>
            {state && state.map((content, index) =>
              <ListItem key={content.value} button onPress={() => this.onChange(content.value)}
                style={{height: 55}} last={state.length - 1 === index}>
                <Text style={Object.assign({}, {fontSize: 18}, this.state.selected === content.value ? {color: colors.orange500} : {})}>{content.name}</Text>
                {this.state.selected === content.value &&
                <Right>
                  <Icon name='checkmark' style={{fontSize: 40, color: colors.orange500}} />
                </Right>
                }
              </ListItem>)
            }
            <View style={{borderWidth: 1, borderColor: colors.grey400, marginHorizontal: 15, marginVertical: 15, flexDirection: 'row', alignItems: 'center'}}>
              <Input maxLength={15} placeholder='状态说明' onChangeText={value => this.setState({count: value.length})} />
              <Text style={{marginRight: 5}}>{this.state.count}/15</Text>
            </View>
          </View>
        </Content>

      </Container>
    )
  }
}

export default OptionsScreen
