import { prompt } from '@kit.ArkUI';
@Entry
@Component
struct ComprehensiveInfoForm {
  @State name: string = ''; // 姓名
  @State nickname: string = ''; // 昵称
  @State gender: string = ''; // 性别
  @State age: number = 18; // 年龄
  @State ageGroup: string = '18-25岁'; // 年龄段
  @State birthday: string = '2000-01-01'; // 生日
  @State grade: string = '一年级'; // 年级
  @State country: string = '中国'; // 国家
  @State nation: string = '汉族'; // 民族
  @State job: string = ''; // 工作
  @State income: string = '5000-10000元'; // 收入状况
  @State houseData: string = '自有住房无贷款'; // 房屋数据
  @State height1: number = 170; // 身高(cm)
  @State weight: number = 60; // 体重(kg)
  @State maritalStatus: string = '未婚'; // 婚姻状况
  @State familyMembers: string = ''; // 家庭成员
  @State education: string = ''; // 教育背景
  @State heightInput: string = '170'; // 专门用于输入的字符串
  @State weightInput: string = ''; // 专门用于输入的字符串
  @State idCard: string = ''; // 身份证号码
  @State bankCardNumber: string = ''; // 银行卡号
  @State bankName: string = ''; // 开户行
  @State cardholderName: string = ''; // 持卡人姓名

  build() {
    Scroll() {
      Column() {
        // 标题
        Text('个人信息登记表')
          .fontSize(24)
          .fontWeight(FontWeight.Bold)
          .margin({ bottom: 20 })
          .width('100%')
          .textAlign(TextAlign.Center)

        // 基础信息组
        Row() {
          // 使用Flex布局确保标签顶格
          Text('姓名：')
            .fontSize(18)
            .width(90)  // 增加宽度确保标签完整显示
            .textAlign(TextAlign.Start)  // 左对齐顶格

          TextInput({ text: this.name })
            .onChange((value: string) => {
              this.name = value
            })
            .layoutWeight(1)  // 使用权重填充剩余空间
            .height(40)  // 设置合适的高度
            .borderRadius(4)  // 添加圆角
            .padding(5)  // 添加内边距
            .backgroundColor(Color.White)  // 设置背景色
        }
        .margin({ bottom: 15 })
        .width('100%')  // 确保行占满宽度
        .justifyContent(FlexAlign.Start)  // 整体左对齐

        Row() {
          // 使用Flex布局确保标签顶格
          Text('性别：')
            .fontSize(18)
            .width(90)  // 增加宽度确保标签完整显示
            .textAlign(TextAlign.Start)  // 左对齐顶格

          TextInput({ text: this.gender })
            .onChange((value: string) => {
              this.gender = value
            })
            .layoutWeight(1)  // 使用权重填充剩余空间
            .height(40)  // 设置合适的高度
            .borderRadius(4)  // 添加圆角
            .padding(5)  // 添加内边距
            .backgroundColor(Color.White)  // 设置背景色
        }
        .margin({ bottom: 15 })
        .width('100%')  // 确保行占满宽度
        .justifyContent(FlexAlign.Start)  // 整体左对齐

        this.buildAgeRow()
        this.buildAgeGroupRow()
        this.buildBirthdayRow()
        this.buildGradeRow()
        // 背景信息组
        Text('背景信息').fontSize(20).fontWeight(FontWeight.Bold).margin({ top: 20, bottom: 10 })
        this.buildCountryRow()
        this.buildNationRow()
        this.buildInputRow('工作：', this.job, (v) => { this.job = v })
        this.buildIncomeRow()
        this.buildHouseDataRow()

        // 身体信息组
        Text('身体信息').fontSize(20).fontWeight(FontWeight.Bold).margin({ top: 20, bottom: 10 })
        // 在组件顶部定义正确的状态变量

        // 在 build 方法中
        Row() {
          Text('身高：')
            .fontSize(18)
            .width(90)
            .textAlign(TextAlign.Start)

          // 使用专门用于输入的字符串变量
          TextInput({ text: this.heightInput })
            .onChange((value: string) => {
              this.heightInput = value; // 更新输入值

              // 尝试转换为数字
              const numValue = parseFloat(value);
              if (!isNaN(numValue)) {
                this.height1 = numValue; // 更新实际的身高数值
              }
            })
            .layoutWeight(1)
            .height(40)
            .borderRadius(4)
            .padding(5)
            .backgroundColor(Color.White)

          // 添加单位显示
          Text('cm')
            .fontSize(16)
            .margin({ left: 5 })
        }
        .margin({ bottom: 15 })
        .width('100%')
        .justifyContent(FlexAlign.Start)

        Row() {
          Text('体重：')
            .fontSize(18)
            .width(90)
            .textAlign(TextAlign.Start)

          // 使用专门用于输入的字符串变量
          TextInput({ text: this.weightInput })
            .onChange((value: string) => {
              this.weightInput = value; // 更新输入值

              // 尝试转换为数字
              const numValue = parseFloat(value);
              if (!isNaN(numValue)) {
                this.weight = numValue; // 更新实际的身高数值
              }
            })
            .layoutWeight(1)
            .height(40)
            .borderRadius(4)
            .padding(5)
            .backgroundColor(Color.White)

          // 添加单位显示
          Text('cm')
            .fontSize(16)
            .margin({ left: 5 })
        }
        .margin({ bottom: 15 })
        .width('100%')
        .justifyContent(FlexAlign.Start)

        // 家庭与教育组
        Text('家庭与教育').fontSize(20).fontWeight(FontWeight.Bold).margin({ top: 20, bottom: 10 })
        this.buildTextAreaRow('家庭成员：', this.familyMembers, (v) => { this.familyMembers = v })
        this.buildTextAreaRow('教育背景：', this.education, (v) => { this.education = v })
        // 财务信息组
        Text('财务信息').fontSize(20).fontWeight(FontWeight.Bold).margin({ top: 20, bottom: 10 })
        this.buildInputRow('持卡人姓名：', this.cardholderName, (v) => { this.cardholderName = v })
        this.buildInputRow('身份证号：', this.idCard, (v) => { this.idCard = v })
        this.buildInputRow('银行卡号：', this.bankCardNumber, (v) => { this.bankCardNumber = v })
        this.buildInputRow('开户行：', this.bankName, (v) => { this.bankName = v })
        // 提交按钮
        Button('提交完整信息', { type: ButtonType.Capsule })
          .width('80%')
          .height(50)
          .margin(30)
          .onClick(() => {
            this.submitForm()
          })
      }
      .padding(20)
      .width('100%')
    }
    .scrollable(ScrollDirection.Vertical)
    .scrollBar(BarState.On)
  }

  // 通用输入行构建方法
  @Builder
  buildInputRow(label: string, value: string, onChange: (value: string) => void) {
    Row() {
      Text(label).fontSize(18).width(100)
      TextInput({ text: value })
        .onChange(onChange)
        .layoutWeight(1)
        .height(40)
        .borderRadius(4)
        .padding(5)
        .backgroundColor(Color.White)
    }
    .margin({ bottom: 15 })
    .height(50)
  }

  // 文本区域构建方法
  @Builder
  buildTextAreaRow(label: string, value: string, onChange: (value: string) => void) {
    Row() {
      Text(label).fontSize(18).width(100)
      TextArea({ text: value })
        .onChange(onChange)
        .layoutWeight(1)
        .height(80)
        .borderRadius(4)
        .padding(5)
        .backgroundColor(Color.White)
    }
    .margin({ bottom: 15 })
    .height(100)
  }


  // 年龄输入行
  @Builder
  buildAgeRow() {
    Row() {
      Text('年龄：').fontSize(18).width(100)
      Slider({
        value: this.age,
        min: 1,
        max: 100,
        step: 1,
        style: SliderStyle.OutSet
      })
        .layoutWeight(1)
        .onChange((value) => { this.age = value })

      Text(`${this.age}岁`).fontSize(16).margin({ left: 10 }).width(50)
    }
    .margin({ bottom: 15 })
  }

  // 年龄段选择
  @Builder
  buildAgeGroupRow() {
    Row() {
      Text('年龄段：').fontSize(18).width(100)
      Select([
        { value: '0-17岁', icon: '' },
        { value: '18-25岁', icon: '' },
        { value: '26-35岁', icon: '' },
        { value: '36-45岁', icon: '' },
        { value: '46-60岁', icon: '' },
        { value: '60岁以上', icon: '' }
      ])
        .value(this.ageGroup)
        .onSelect((index, value) => { this.ageGroup = value as string })
        .layoutWeight(1)
    }
    .margin({ bottom: 15 })
  }

  // 生日选择
  @Builder
  buildBirthdayRow() {
    Row() {
      Text('生日：').fontSize(18).width(100)
      DatePicker({
        start: new Date('1900-01-01'),
        end: new Date(),
        selected: new Date(this.birthday)
      })
    }
    .margin({ bottom: 15 })
  }

  // 年级选择
  @Builder
  buildGradeRow() {
    Row() {
      Text('年级：').fontSize(18).width(100)
      Select([
        { value: '幼儿园', icon: '' },
        { value: '一年级', icon: '' },
        { value: '二年级', icon: '' },
        { value: '三年级', icon: '' },
        { value: '四年级', icon: '' },
        { value: '五年级', icon: '' },
        { value: '六年级', icon: '' },
        { value: '初一', icon: '' },
        { value: '初二', icon: '' },
        { value: '初三', icon: '' },
        { value: '高一', icon: '' },
        { value: '高二', icon: '' },
        { value: '高三', icon: '' },
        { value: '大学', icon: '' }
      ])
        .value(this.grade)
        .onSelect((index, value) => { this.grade = value as string })
        .layoutWeight(1)
    }
    .margin({ bottom: 15 })
  }

  // 国家选择
  @Builder
  buildCountryRow() {
    Row() {
      Text('国家：').fontSize(18).width(100)
      Select([
        { value: '中国', icon: '' },
        { value: '美国', icon: '' },
        { value: '日本', icon: '' },
        { value: '韩国', icon: '' },
        { value: '英国', icon: '' },
        { value: '法国', icon: '' },
        { value: '德国', icon: '' },
        { value: '其他', icon: '' }
      ])
        .value(this.country)
        .onSelect((index, value) => { this.country = value as string })
        .layoutWeight(1)
    }
    .margin({ bottom: 15 })
  }

  // 民族选择
  @Builder
  buildNationRow() {
    Row() {
      Text('民族：').fontSize(18).width(100)
      Select([
        { value: '汉族', icon: '' },
        { value: '蒙古族', icon: '' },
        { value: '回族', icon: '' },
        { value: '藏族', icon: '' },
        { value: '维吾尔族', icon: '' },
        { value: '苗族', icon: '' },
        { value: '其他', icon: '' }
      ])
        .value(this.nation)
        .onSelect((index, value) => { this.nation = value as string })
        .layoutWeight(1)
    }
    .margin({ bottom: 15 })
  }

  // 收入状况选择
  @Builder
  buildIncomeRow() {
    Row() {
      Text('收入状况：').fontSize(18).width(100)
      Select([
        { value: '3000元以下', icon: '' },
        { value: '3000-5000元', icon: '' },
        { value: '5000-10000元', icon: '' },
        { value: '10000-20000元', icon: '' },
        { value: '20000元以上', icon: '' }
      ])
        .value(this.income)
        .onSelect((index, value) => { this.income = value as string })
        .layoutWeight(1)
    }
    .margin({ bottom: 15 })
  }

  // 房屋数据选择
  @Builder
  buildHouseDataRow() {
    Row() {
      Text('房屋情况：').fontSize(18).width(100)
      Select([
        { value: '自有住房无贷款', icon: '' },
        { value: '自有住房有贷款', icon: '' },
        { value: '租房', icon: '' },
        { value: '与父母同住', icon: '' },
        { value: '其他', icon: '' }
      ])
        .value(this.houseData)
        .onSelect((index, value) => { this.houseData = value as string })
        .layoutWeight(1)
    }
    .margin({ bottom: 15 })
  }


  // 体重输入
  @Builder
  buildWeightRow() {
    Row() {
      Text('体重：').fontSize(18).width(100)
      Slider({
        value: this.weight,
        min: 20,
        max: 200,
        step: 1,
        style: SliderStyle.OutSet
      })
        .layoutWeight(1)
        .onChange((value) => { this.weight = value })

      Text(`${this.weight}kg`).fontSize(16).margin({ left: 10 }).width(60)
    }
    .margin({ bottom: 15 })
  }

  // 婚姻状况选择


  // 提交表单方法
  private submitForm() {
    if (!this.name) {
      prompt.showToast({ message: '请输入姓名', duration: 2000 });
      return;
    }

    if (!this.familyMembers) {
      prompt.showToast({ message: '请填写家庭成员信息', duration: 2000 });
      return;
    }

    // 实际应用中这里会提交数据到服务器
    console.log('完整个人信息提交：', JSON.stringify({
      name: this.name,
      nickname: this.nickname,
      gender: this.gender,
      age: this.age,
      ageGroup: this.ageGroup,
      birthday: this.birthday,
      grade: this.grade,
      country: this.country,
      nation: this.nation,
      job: this.job,
      income: this.income,
      houseData: this.houseData,
      height: this.height,
      weight: this.weight,
      maritalStatus: this.maritalStatus,
      familyMembers: this.familyMembers,
      education: this.education,
      // 新增财务信息
      idCard: this.idCard,
      bankCardNumber: this.bankCardNumber,
      bankName: this.bankName,
      cardholderName: this.cardholderName
    }));

    prompt.showToast({
      message: `信息提交成功！\n姓名：${this.name}\n年龄：${this.age}岁`,
      duration: 3000
    });
  }
}
