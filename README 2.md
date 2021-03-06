
# 在android上使用信鸽推送

https://github.com/Jeepeng/react-native-xinge-push

1. 在android/app/src/main/AndroidManifest.xml文件中添加如下代码

<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools" // 绑定tools
    package="com.lendingcar.dealer"
    android:versionCode="1"
    android:versionName="1.0">

<!-- 【必须】 信鸽SDK所需权限   -->
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
<uses-permission android:name="android.permission.VIBRATE" />
<!-- 【常用】 信鸽SDK所需权限 -->
<uses-permission android:name="android.permission.RECEIVE_USER_PRESENT" />
<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<!-- 【可选】 信鸽SDK所需权限 -->
<uses-permission android:name="android.permission.RESTART_PACKAGES" />
<uses-permission android:name="android.permission.BROADCAST_STICKY" />
<uses-permission android:name="android.permission.KILL_BACKGROUND_PROCESSES" />
<uses-permission android:name="android.permission.GET_TASKS" />
<uses-permission android:name="android.permission.READ_LOGS" />
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.BATTERY_STATS" />


2. 在application中添加tools
<application
  android:name=".MainApplication"
  android:allowBackup="true"
  android:label="@string/app_name"
  android:icon="@mipmap/ic_launcher"
  android:theme="@style/AppTheme"
  tools:replace="android:allowBackup"> // here

3.  在application结束前添加

<!-- 【必须】 信鸽receiver广播接收 -->
  <receiver android:name="com.tencent.android.tpush.XGPushReceiver"
      android:process=":xg_service_v3" >
      <intent-filter android:priority="0x7fffffff" >
          <!-- 【必须】 信鸽SDK的内部广播 -->
          <action android:name="com.tencent.android.tpush.action.SDK" />
          <action android:name="com.tencent.android.tpush.action.INTERNAL_PUSH_MESSAGE" />
          <!-- 【必须】 系统广播：开屏和网络切换 -->
          <action android:name="android.intent.action.USER_PRESENT" />
          <action android:name="android.net.conn.CONNECTIVITY_CHANGE" />
          <!-- 【可选】 一些常用的系统广播，增强信鸽service的复活机会，请根据需要选择。当然，你也可以添加APP自定义的一些广播让启动service -->
          <action android:name="android.bluetooth.adapter.action.STATE_CHANGED" />
          <action android:name="android.intent.action.ACTION_POWER_CONNECTED" />
          <action android:name="android.intent.action.ACTION_POWER_DISCONNECTED" />
      </intent-filter>
  </receiver>

  <!-- 【可选】APP实现的Receiver，用于接收消息透传和操作结果的回调，请根据需要添加 -->
  <!-- YOUR_PACKAGE_PATH.CustomPushReceiver需要改为自己的Receiver： -->
  <receiver android:name="com.jeepeng.react.xgpush.receiver.MessageReceiver"
      android:exported="true" >
      <intent-filter>
          <!-- 接收消息透传 -->
          <action android:name="com.tencent.android.tpush.action.PUSH_MESSAGE" />
          <!-- 监听注册、反注册、设置/删除标签、通知被点击等处理结果 -->
          <action android:name="com.tencent.android.tpush.action.FEEDBACK" />
      </intent-filter>
  </receiver>

  <!-- 【必须】 (2.30及以上版新增)展示通知的activity -->
  <!-- 【注意】 如果被打开的activity是启动模式为SingleTop，SingleTask或SingleInstance，请根据通知的异常自查列表第8点处理-->
  <activity
      android:name="com.tencent.android.tpush.XGPushActivity"
      android:exported="false" >
      <intent-filter>
          <!-- 若使用AndroidStudio，请设置android:name="android.intent.action"-->
          <action android:name="android.intent.action" />
      </intent-filter>
  </activity>

  <!-- 【必须】 信鸽service -->
  <service
      android:name="com.tencent.android.tpush.service.XGPushServiceV3"
      android:exported="true"
      android:persistent="true"
      android:process=":xg_service_v3" />
  <!-- 【必须】 提高service的存活率 -->
  <service
      android:name="com.tencent.android.tpush.rpc.XGRemoteService"
      android:exported="true">
      <intent-filter>
          <!-- 【必须】 请修改为当前APP包名 .PUSH_ACTION, 如demo的包名为：com.qq.xgdemo -->
          <action android:name="com.lendingcar.dealer.PUSH_ACTION" />
      </intent-filter>
  </service>
  <!-- 【必须】 增强xg_service存活率 -->
  <service
      android:name="com.tencent.android.tpush.service.XGDaemonService"
      android:process=":xg_service_v3" />

  <!-- 【必须】 【注意】authorities修改为 包名.AUTH_XGPUSH, 如demo的包名为：com.qq.xgdemo-->
  <provider
      android:name="com.tencent.android.tpush.XGPushProvider"
      android:authorities="com.lendingcar.dealer.AUTH_XGPUSH"
      android:exported="true"/>
  <!-- 【必须】 【注意】authorities修改为 包名.TPUSH_PROVIDER, 如demo的包名为：com.qq.xgdemo-->
  <provider
      android:name="com.tencent.android.tpush.SettingsContentProvider"
      android:authorities="com.lendingcar.dealer.TPUSH_PROVIDER"
      android:exported="false" />
  <!-- 【必须】 【注意】authorities修改为 包名.TENCENT.MID.V3, 如demo的包名为：com.qq.xgdemo-->
  <provider
      android:name="com.tencent.mid.api.MidProvider"
      android:authorities="com.lendingcar.dealer.TENCENT.MID.V3"
      android:exported="true" >
  </provider>

  <!-- 【必须】 请将YOUR_ACCESS_ID修改为APP的AccessId，“21”开头的10位数字，中间没空格 -->
  <meta-data
      android:name="XG_V2_ACCESS_ID"
      android:value="2100274459" /> <!-- 替换 -->
  <!-- 【必须】 请将YOUR_ACCESS_KEY修改为APP的AccessKey，“A”开头的12位字符串，中间没空格 -->
  <meta-data
      android:name="XG_V2_ACCESS_KEY"
      android:value="A54RNXI355NN" /> <!-- 替换 -->
