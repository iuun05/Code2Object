//调用库文件
#include <SevenSegmentTM1637.h>
#include <ThreeWire.h>
#include <RtcDS1302.h>
#include <SevenSegmentExtended.h>
//定义数码管对象。时钟对象
SevenSegmentExtended  display(4,5);
ThreeWire myWire(A1,A0,A2);
RtcDS1302<ThreeWire> Rtc(myWire);

void setup(){
  pinMode(13, OUTPUT);
  display.begin();
  Rtc.Begin();
  Rtc.SetIsRunning(true);
  digitalWrite(13,LOW);
  Rtc.SetDateTime(RtcDateTime("Jun/01/2025", "07:59:50"));
  pinMode(11, OUTPUT);
  pinMode(10, INPUT);
  //设置初始时间7点59 蜂鸣器D11,LED D13 初始静音不亮 按钮D10
}

void loop(){
  display.printTime(Rtc.GetDateTime().Hour(),Rtc.GetDateTime().Minute(),true);//显示当前世界
  if ((Rtc.GetDateTime().Minute() == 0 && Rtc.GetDateTime().Second() == 1) && ((Rtc.GetDateTime().Hour() == 8 || Rtc.GetDateTime().Hour() == 13) || Rtc.GetDateTime().Hour() == 18)) {
    while (true) {
      digitalWrite(13,HIGH);
      digitalWrite(11,HIGH);
      delay(100);
      digitalWrite(13,LOW);
      digitalWrite(11,LOW);
      delay(100);
      if (digitalRead(10)) {
        noTone(11);
        break;

      }
    }//到达早8点，午13点，下午16点，声光警报提醒，如果按下按钮，警报停止
    if (Rtc.GetDateTime().Hour() == 8) {
      delay(200);
      display.clear();
      delay(200);
      display.printTime(Rtc.GetDateTime().Hour(),Rtc.GetDateTime().Minute(),true);

    }
    if (Rtc.GetDateTime().Hour() == 13) {
      delay(200);
      display.clear();
      delay(200);
      display.printTime(Rtc.GetDateTime().Hour(),Rtc.GetDateTime().Minute(),true);

    }
    if (Rtc.GetDateTime().Hour() == 18) {
      delay(200);
      display.clear();
      delay(200);
      display.printTime(Rtc.GetDateTime().Hour(),Rtc.GetDateTime().Minute(),true);

    }

  }//警报整点，数码管刷新

}