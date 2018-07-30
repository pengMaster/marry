# marry - 微信小程序端

#### 项目介绍 v1.0 version
婚礼邀请函

#### 效果图
   <img src="https://github.com/pengMaster/meteor/blob/master/doc/show1.png" width="150" height="250" align="left" alt=""/>
      <img src="https://github.com/pengMaster/meteor/blob/master/doc/show2.png" width="150" height="250" align="center" alt=""/>

#### 软件架构
软件架构说明
 - library依赖


#### 安装教程
1.Add it in your root build.gradle

```java
    allprojects {
		repositories {
			...
			maven { url 'https://jitpack.io' }
		}
	}
```
    
2.Add it in your App build.gradle

```java
    dependencies {
        implementation 'com.github.pengMaster:meteor:v1.0.2'
    }
```

#### 使用说明


3.Attribute introduction

- type :整体线束所处位置
    - top:至于顶部，头朝下
    - mid_left:至于左侧，头朝右
    - mid_right:至于右侧，头朝左
    - bottom:至于底部，头朝上
- topLineCount :顶部线束数量
- midLineCount :中部线束数量
- bottomLineCount :底部线束数量
- lineWidth :每条线束宽度
- lineColor :每条线束颜色

4.import your project
```java
    <com.lan.john.gradienttest.wiget.GradientPaintView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:background="@android:color/transparent"
        app:lineWidth="3"
        app:topLineCount="15"
        app:midLineCount="20"
        app:bottomLineCount="8"
        app:type="top" />

```

5.edit count
```java
    /**
     * 代码动态设置线束
     *
     * @param countTop 顶部线束数量
     * @param countMid 中间线束数量
     * @param countBottom 底部线束数量
     */
    public void setLineCount(int countTop,int countMid ,int countBottom){
        lineCountTop = countTop;
        lineCountMid = countMid;
        lineCountBottom = countBottom;
        //可在线程中刷新
        postInvalidate();
    }

```
#### 参与贡献

1. Fork 本项目
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request


#### github地址

1. https://github.com/pengMaster/meteor
