import React from 'react';
import {
  View,
  Text,
  Picker,
  Platform,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { Body, Right, ListItem, Icon, Button } from "native-base";
import styles from "./styles";
import {capitalize} from 'lodash';

// 当你使用的时候建议你放到别的文件里
const convertDateToString = (dateTime) => {
  if (!dateTime)
    return '';

  let date;
  if (typeof dateTime === 'string'){
    date = parseInt(dateTime);
  } else if (typeof dateTime === 'number'){
    date = dateTime;
  } else if (typeof dateTime === 'object'){
    date = dateTime;
  } else {
    return '';
  }

  const tempDate = new Date(date);
  return `${tempDate.getFullYear()}-${doubleDigitize(tempDate.getMonth() + 1)}-${doubleDigitize(tempDate.getDate())}`;
};


const createYearOptions = (unit) => {
  let data = [];
  // 获取当前年份
  const year = convertDateToString(new Date()).substring(0, 4);
  data = [{
    value: `${parseInt(year)}`,
    label: `${parseInt(year)}${unit}`,
  }];
  // 在数组的开头添加元素，这里是添加了一个元素，你也可以添加多个就像下面的for循环一样
  data.unshift({
    value: `${parseInt(year) + 1}`,
    label: `${parseInt(year) + 1}${unit}`,
  });
  // 在数组的结尾添加元素
  for (let i = 1; i < 50; i++) {
    data.push({
      value: `${parseInt(year) - i}`,
      label: `${parseInt(year) - i}${unit}`,
    });
  }
  // 返回处理好的数组
  return data;
};

// 这是一个用在redux-form中的表单样式 select。安卓中表现为modal,iOS为Picker
export default class YearOnlySelectInput extends React.Component {
  constructor(props) {
    super(props);
    let options;
    // 在这里我给这个组件设定了mode的属性，通过判断mode的存在
    if (props.mode && props.mode === 'year') {
      // 这里用来接收createYearOptions()函数处理好的数据
      options = createYearOptions(props.unit);
    } else {
      // 这里接收从父组件中传来的数据
      options = props.options ? props.options : [];
    }
    this.state = {
      // 因为组件的差异性，所以在这里android显示的默认值需要进行一个首字母大写的处理
      showedValue: Platform.OS === "ios" ? this.props.input.value : capitalize(this.props.input.value),
      selectedValue: this.props.input.value || (options ? options[0].value : ''),
      options,
      open: false,
    };
  }

  // 将数组转化成object的函数
  optionsArrayToObject = (arr) => arr.reduce((result, item) => {
    result[item['value']] = item['label'];
    return result;
  }, {});

  // ios 使用
  onSubmit = () => {
    this.setState({showedValue: this.state.selectedValue, open: false});
    // 将数据提交给redux-form管理
    this.props.input.onChange(this.state.selectedValue);
  };

  // ios 使用改变选中的值
  onValueChange = (date) => {
    this.setState({selectedValue: date});
  };

  // android 使用
  onValueChangeOnAndroid = (date) => {
    this.setState({showedValue: date.label, open: false});
    // 将数据提交给redux-form管理
    this.props.input.onChange(date.value);
  };

  render () {
    const { label, input, meta, isRequired } = this.props;
    // 你可以单独使用label属性，也可以使用input.name来写你的表单标签
    const translatedLabel = label ? label : input.name;
    const { dirty, error, touched } = meta;
    const hasError = (dirty || touched) && error;

    // 处理表单的样式
    const itemStyle = [styles.listItem];
    if (hasError) {
      itemStyle.push(styles.error);
    }

    // android 和iOS的默认展示内容
    const showedValueOnIOS = this.optionsArrayToObject(this.state.options)[this.state.showedValue] || 'Please select an option';
    const showedValueOnAndroid = this.state.showedValue || 'Please select an option';
    return (
      <ListItem style={itemStyle} inlineLabel onPress={()=> this.setState({open: true})}>
        <Text style={styles.label}>{translatedLabel}{isRequired && '*'}</Text>
        <Body style={styles.body}>
          <Text>
            {Platform.OS === "ios" ? showedValueOnIOS : showedValueOnAndroid}
          </Text>
        </Body>
        <Right style={styles.right}>
          <Icon name='arrow-forward' style={styles.icon} />
        </Right>

        <Modal
          visible={this.state.open}
          transparent={true}
        >
          <TouchableOpacity onPress={()=> this.setState({open: false})} style={Platform.OS === "ios" ? styles.touchableOpacity : styles.touchableOpacityOnAndroid}>
            <View></View>
          </TouchableOpacity>
          {Platform.OS === "ios" ? <View style={styles.modal}>
            <View style={styles.buttonLine}>
              <Button onPress={() => this.setState({open: false, selectedValue: (input.value)})} transparent>
                <Text style={styles.buttonText}>Cancel</Text>
              </Button>
              <Button onPress={this.onSubmit} transparent>
                <Text style={styles.buttonText}>OK</Text>
              </Button>
            </View>

            <Picker
              style={styles.picker}
              itemStyle={styles.pickerItem}
              selectedValue={this.state.selectedValue}
              onValueChange={(date) => this.onValueChange(date)}
              // onValueChange={this.onValueChange} 两种写法都可以
            >
              {this.state.options && this.state.options.map((option,index) =>
                <Picker.Item label={option.label} value={option.value} key={index} />
              )}
            </Picker>
          </View>
            : <ScrollView scrollEnabled style={styles.scrollView} padder>
              {this.state.options && this.state.options.map((option,index) =>
                <TouchableOpacity onPress={()=> this.onValueChangeOnAndroid(option)} key={index} style={styles.listView}>
                  <Text>{option.label}</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          }
        </Modal>
      </ListItem>
    );
  }
}
