# 为什么写这个组件

我也不情愿呀，毕竟[github](https://github.com)上有那么多现成的，我照搬一个多省事呀。
可是我翻了半天也没找着一个符合我的客户需求的，所以只好写原生了。没经验，怎么办，看官网吧.[中文](http://reactnative.cn),[英文](http://facebook.github.io/react-native/)。
这是第一次写原生，写的不是很好，感觉可以更优化一点，但是因为工作没有太多时间做优化，所以只能暂时放弃了。

# 组件的功能

1. 在iOS上组件选用的为底部的Picker，类似于DateTimePicker的样式；
2. Android上则是Modal，显示区域外层为ScrollView,居中，可选择项多的时候可以滚动。

# 组件的使用

1. 组件是用在redux-form中，作为component来使用的；
2. 自定义的组件的属性：
* mode: 类型, string；
* unit: 单位, string;
* options: 可选择项, Array[{label: string, value: string}];
* label: 标签, string;
* isRequired: 是否必填, Boolean;
    
# 组件效果