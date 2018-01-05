import React, { Component } from 'react'
import {
  Text,
  Button,
  FooterTab,
  Footer
} from 'native-base'

class FooterDisplay extends Component {
  render () {
    return (
      <Footer>
        <FooterTab>
          <Button disabled full title='展示' onPress={() => console.log('权力展示')}>
            <Text style={{color: 'white'}}>个人测试专用(Z&T)</Text>
          </Button>
        </FooterTab>
      </Footer>
    )
  }
}

export default FooterDisplay
