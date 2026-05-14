---
abbrlink: ''
categories:
- - 教程
date: '2026-05-13T20:53:41.690971+08:00'
tags:
- TDL
- 教程
- telegram下载
- 媒体文件下载
- 下载器
- 表情监听
title: TDL Docker部署教程
updated: '2026-05-14T14:46:22.667+08:00'
---
# TDL Docker 部署教程

## 前言

意想不到，此项目也会由于AI的日益强大而成功实现。

曾经两个魔改项目为了实现一个下载需求，还不太好用，没想到现在，能够按照我的想法成功落地，也是感慨万千。

---

{% note color:red 特别注意

1. 本教程针对Linux系统的部署，非Linux系统，教程可能并不适用。
2. 部署服务器网络良好。  %}

## Docker安装

这个没啥好说的，直接上docker安装脚本即可。

```shell
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
systemctl enable docker
```

如下图所示：

![](https://images.snakexgc.com/file/1778685120374_image.png)

## 安装TDL

本教程会默认启动一个aria2 docker镜像作为下载器。

推荐使用Aria2为：https://p3terx.com/archives/docker-aria2-pro.html

当前Aria2支持Rclone上传，请按其教程进行配置即可。

---

### 1. 准备Docker配置文件

在项目目录或服务器上的部署目录中创建配置和数据目录：

```bash
cd  # 回到用户目录下
mkdir -p tdl  # 创建tdl文件夹
cd tdl # 进入tdl文件夹
```

如图：

![](https://images.snakexgc.com/file/1778685576823_image.png)

拉取docker-compose.yml文件：

```bash
wget https://raw.githubusercontent.com/snakexgc/tdl/refs/heads/master/docker-compose.yml -O docker-compose.yml
```

如图：

![](https://images.snakexgc.com/file/1778685747192_image.png)

### 2. 修改Aria2 RPC密码

修改刚刚拉取的 docker-compose.yml 文件
![](https://images.snakexgc.com/file/1778686880144_image.png)

![](https://images.snakexgc.com/file/1778686943839_image.png)
此处的密码需要修改，修改完成后保存。

### 3. 启动服务

```bash
docker compose pull
docker compose up -d
```

如图：

![](https://images.snakexgc.com/file/1778686621957_image.png)

启动后访问：

- Web 管理面板：`http://服务器IP:22335`
- tdl 下载代理端口：`22334`（映射到容器内默认 `http.port` 端口 `22334`）

**默认登录用户名和密码均为 `admin`**。首次登录后请按顶部红色警告引导，进入“配置文件 > Web 管理面板”修改用户名和密码。

![](https://images.snakexgc.com/file/1778687190860_image.png)

### 4. 配置修改

{% note color:red 艺高人胆大提示 修改配置后，每次重启都需要再次登录，如果你有足够胆量，可以一次配置完后，再重启。 %}

#### 1. 修改用户名和密码

使用默认用户名和密码进行登录后，去修改用户和密码

![](https://images.snakexgc.com/file/1778687563702_image.png)

![](https://images.snakexgc.com/file/1778687628744_image.png)

修改后，往上滑，点击保存后，点击重启

![](https://images.snakexgc.com/file/1778687685491_image.png)
重启后，输入新的用户名和密码，登入面板，此时警告横幅以消失

![](https://images.snakexgc.com/file/1778687782723_image.png)

#### 2. 修改Aria2 RPC配置

左侧边栏点击 配置文件
找到 aria2 配置区域

![](https://images.snakexgc.com/file/1778687934962_image.png)
修改链接和密钥，然后上拉保存并重启

![](https://images.snakexgc.com/file/1778688113808_image.png)
此时再次登录WebUI，点击侧边栏的下载管理，应该会正常显示aria2NG的界面，状态为链接成功，如下图：

![](https://images.snakexgc.com/file/1778688215554_image.png)

#### 3. 修改下载链接

左侧边栏点击 配置文件
找到 下载链接 配置区域
按照下图修改后，保存并重启

![](https://images.snakexgc.com/file/1778688622212_image.png)

#### 4. 登录telegram账号

左侧边栏点击 用户管理，然后点击 用户登录
输入用户名(保持默认，或者全英文字母)，根据流程完成登录即可。

![](https://images.snakexgc.com/file/1778688915645_image.png)
如果出现如下报错，需要在配置文件中配置NTP服务器，如果网络确认没有问题，就需要配置NTP服务器

![](https://images.snakexgc.com/file/1778689043269_image.png)
配置如下：

![](https://images.snakexgc.com/file/1778689213523_image.png)

登录成功如下截图：

![](https://images.snakexgc.com/file/1778689554740_image.png)

---

### 5. 触发表情下载

之后给消息增加一个表情回应，看TDL是否会开始下载

![](https://images.snakexgc.com/file/1778689781342_image.png)

## 更新

首先进入tdl文件夹

```bash
cd
cd tdl
```

停止服务：

```bash
docker compose down
```

升级镜像：

```bash
docker compose pull
```

启动容器：

```bash
docker compose up -d
```

## 结语

使用过程中发现问题，欢迎issues或者电报群反馈，可能消息回复不是很及时，十分抱歉。

