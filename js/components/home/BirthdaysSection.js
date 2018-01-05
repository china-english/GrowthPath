import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Image, TouchableOpacity, View } from 'react-native'
import { Spinner, Text } from 'native-base'

import * as colors from '../../constants/colors'
import SectionHeader from '../common/SectionHeader'
import commonStyles from '../common/commonStyles'
import * as clientsActions from '../../actions/clientsActions'

const styles = {
  birthdaysSection: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.white
  },
  birthdays: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  birthdayLine: {
    marginHorizontal: 10,
    marginTop: 4,
    marginBottom: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  personAvatarImg: {
    marginVertical: 4,
    marginHorizontal: 10,
    width: 42,
    height: 42,
    borderRadius: 4
  },
  agendaPersonName: {
    fontSize: 10,
    color: colors.grey600,
    textAlign: 'center',
    marginBottom: 6
  }
}

class BirthdaysSection extends Component {
  props: {
    birthdayClients: Array<Object>
  }
  state = {
    isLoading: true
  }

  async componentDidMount () {
    const {clientsActions} = this.props
    await clientsActions.loadBirthdayClients()
    this.setState({isLoading: false})
  }

  render () {
    const {birthdayClients} = this.props
    if (this.state.isLoading) {
      return (
        <Spinner />
      )
    }
    return (
      <View style={Object.assign({}, styles.birthdaysSection, commonStyles.componentSeparator)}>
        <SectionHeader materialCommunityIconName='bell' sectionText='生日提醒' />
        <View style={styles.birthdays}>
          <View style={styles.birthdayLine}>
            {birthdayClients.length > 0 && birthdayClients.map((birthdayClient) =>
              <TouchableOpacity key={birthdayClient.customerId}>
                <Image style={styles.personAvatarImg}
                  source={require('../../../images/avatar.jpg')} />
                <Text style={styles.agendaPersonName}>{birthdayClient.customerName}</Text>
              </TouchableOpacity>
            )
            }
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    birthdayClients: state.clients.birthdayClients
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clientsActions: bindActionCreators(clientsActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(BirthdaysSection)
