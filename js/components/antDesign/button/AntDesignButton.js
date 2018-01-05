import React, { Component } from 'react'
import { connect } from 'react-redux'

import { View, Text, ScrollView } from 'react-native'
import { WhiteSpace, WingBlank, Button, Icon } from 'antd-mobile'

import * as colors from '../../../constants/colors'

const styles = {
  background: {
    backgroundColor: colors.grey300
  },
  contentButton: {
    width: '50%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.black,
    height: 40,
    alignItems: 'center'
  },
  button: {
    width: '10%',
    borderWidth: 0,
    backgroundColor: colors.black
  },
  title: {
    color: colors.white,
    fontSize: 20
  }
}

class AntDesignButton extends Component {
  render () {
    return (

      <ScrollView style={{backgroundColor: colors.grey200}}>
        <WhiteSpace size='xl' />
        <View style={styles.header}>
          <Button size='small'
            style={styles.button}
            onClick={() => this.props.history.goBack()}>
            <Icon type='left' color={colors.white} />
          </Button>
          <Text style={styles.title}>按钮</Text>
          <Text style={{minWidth: 60}}>&nbsp;</Text>
        </View>

        <WhiteSpace size='xl' />
        <WingBlank size='lg'>
          <View>
            <Text>
              使用Antd-mobile中的按钮组件结合react-native应用到项目中实现，这是第一部分，本部分展示不同类型的按钮样式
            </Text>
          </View>
          <WhiteSpace />
          <Button style={styles.contentButton}>type null</Button>
          <WhiteSpace />
          <Button style={styles.contentButton} type='primary'>primary</Button>
          <WhiteSpace />
          <Button style={styles.contentButton} type='ghost'>ghost</Button>
          <WhiteSpace />
          <Button style={styles.contentButton} type='warning'>warning</Button>
          <WhiteSpace />
          <Button style={styles.contentButton} disabled>disabled</Button>
        </WingBlank>

        <WhiteSpace size='xl' />
        <WingBlank size='lg'>
          <View>
            <Text>
              第二部分，本部分展示不同类型的按钮大小
            </Text>
          </View>
          <WhiteSpace />
          <Button style={styles.contentButton} size='large'>type null(large)</Button>
          <WhiteSpace />
          <Button style={styles.contentButton} size='small'>type null(small)</Button>
          <WhiteSpace />
          <Button style={styles.contentButton} type='primary' size='large'>primary(large)</Button>
          <WhiteSpace />
          <Button style={styles.contentButton} type='primary' size='small'>primary(small)</Button>
          <WhiteSpace />
          <Button style={styles.contentButton} type='ghost' size='large'>ghost(large)</Button>
          <WhiteSpace />
          <Button style={styles.contentButton} type='ghost' size='small'>ghost(small)</Button>
          <WhiteSpace />
          <Button style={styles.contentButton} type='warning' size='large'>warning(large)</Button>
          <WhiteSpace />
          <Button style={styles.contentButton} type='warning' size='small'>warning(small)</Button>
          <WhiteSpace />
          <Button style={styles.contentButton} disabled size='large'>disabled</Button>
          <WhiteSpace />
          <Button style={styles.contentButton} disabled size='small'>disabled</Button>
        </WingBlank>
        <WhiteSpace size='xl' />
        <WingBlank size='lg'>

          {/* // TODO Icon 结合antd-mobile */}
          <View>
            <Text>
              第三部分，本部分展示按钮和Icon相结合的内容,antd-mobile中除去loading外，对Icon的支持并不太好
            </Text>
          </View>
          <WhiteSpace />
          <Button style={styles.contentButton} loading>type null</Button>
          <WhiteSpace />
          <Button style={styles.contentButton} type='primary'>
            <Icon type='check-circle-o' style={{marginRight: 8}} />
            <Text>primary</Text>
          </Button>
          <WhiteSpace />

          <View>
            <Text>
              第四部分，本部分按钮点击后颜色
            </Text>
          </View>
          <WhiteSpace />
          <Button style={styles.contentButton} activeStyle={{backgroundColor: colors.grey500}}>
            type null
          </Button>
          <WhiteSpace />
          <Button style={styles.contentButton} type='primary'
            activeStyle={{backgroundColor: colors.grey500}}>
            primary
          </Button>
          <WhiteSpace />
          <Button style={styles.contentButton}
            activeStyle={{backgroundColor: colors.grey700}}
            type='ghost'>ghost</Button>
          <WhiteSpace />
          <Button style={styles.contentButton} type='warning'
            activeStyle={{backgroundColor: colors.red900}}>warning</Button>
          <WhiteSpace />
          <Button style={styles.contentButton} disabled>disabled</Button>
          <WhiteSpace />
        </WingBlank>
      </ScrollView>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, mapDispatchToProps)(AntDesignButton)
