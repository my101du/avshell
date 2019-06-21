# 关于

这是一个 1024 的跨平台客户端（ios肯定是无法上线的，顾及要越狱），使用 ionic framework 开发，jQuery 进行 http 请求后，对文档的html代码进行过滤，屏蔽多余的内容。

安卓版体验下载地址 ： http://pan.baidu.com/s/1i372fU9 提取码 j5ek 

--------------------------- 
市面上有个 t69y 的客户端，据 cl 官方说是假的（但是我觉得做的不错啊有木有……） 
而 cl 官方的那个，就是套个壳啊套个壳。 

我也不知道脑子哪里抽了，中秋节白天走亲戚，晚上就捣鼓这玩意，想实现如下特性 

1. 稍微纯正一点的 APP 的体验 
2. 能过滤掉多余的东西（比如发帖的作者，内容为王的网站，也没人看作者吧） 
3. 一键下图 
4. 一键把 magnet 转成 torrent 

问题： 
1. 因为 cl 没有提供 api 一类的东西，所以基本上是 ajax 抓取 html 代码，进行正则处理后显示；耗流量较大，请务必在 wifi 环境下使用 
2. 只读取第一楼（毕竟 cl 上帖子的主要精华都在第一楼……），没有任何回帖、作者等信息 
3. 图片多的时候，略卡 


# TODO

## 翻页
当前页码显示
版块标题消失

## cookie
 如何把 ismod 这个cookie值发送出去

## 插件
 原生社交分享 http://plugins.cordova.io/#/package/nl.x-services.plugins.socialsharing

cordova的umeng插件，不支持微信

https://github.com/apache/cordova-plugin-whitelist

## 版块分类切换
 切换后内容不刷新

## 界面
版 块图标

##  bug
刚打开时，图片加载前空白
加载 gif 不断闪烁（安卓上慢慢飘到左边看不见的屏幕外）
导航混乱，从收藏里返回列表后，再次点击到详情，不会刷新
收藏后，要要强制刷新“收藏”
收藏状态判断，显示不同的文本，可以取消收藏

## 安全
h ttps防窃听
http://caoliu.ias3.com/read.php?tid=15
反向代理网址

## magnet转torrent

## 网址跳转抓取

## 注意假客户端 t69y
官方：read.php?tid=1648542&page=e#a

## 登录状态处理（没账号啊……）

## file 方式读取 http request，以及下载文件、

# 参考
https://github.com/yangyangwithgnu/hardseed