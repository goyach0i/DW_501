var dec = ["0a","0b","1a","1b","2a","2b","3a","3b","4a","4b","5a","5b","6a","6b","7a","7b","8a","8b","9a","9b"];   //1~10까지 데이터값 배열 설정
var card=[];
var rst = [];  //빈 배열 설정
var player_card=0;   //플레이어 카드
var com_card=0;   //컴퓨터 카드
var count= 0;  //카운트값 변수 설정
var winaudio = new Audio("audio/win.mp3");
var loseaudio = new Audio("audio/lose.mp3");
var callaudio = new Audio("audio/call.mp3");
var dieaudio = new Audio("audio/die.mp3");   //효과음 설정
var round = 0;
 
function getRandom(min, max) {   //랜덤으로 숫자 뽑는 함수
  return Math.floor((Math.random() * (max - min + 1)) + min);
}
 
function getRandomArray(min, max, count)
{
  while (1)
  {
    var index = getRandom(min, max);
    // 중복 여부를 체크
    if (rst.indexOf(index) > -1)  //중복 -> continue로 다음코드 동작 pass
    {
      continue;
    }
    rst.push(index);
    // 원하는 배열 갯수가 되면 종료
    if (rst.length == count) //count값 만큼 rst 배열이 차면 break문으로 탈출
    {
      break;
    }
  }
  return rst;  //rst값 반환
}
 
function suple()//게임이 시작되자마자 시작 되는 함수, 카드 셔플을 담당
{
  getRandomArray(0,dec.length-1,dec.length);
  for (var i = 0; i < dec.length ; i++)
  {
    card.push(dec[rst.pop()]);   //card배열에 rst값 push로 넣어줌
  }
  count=0;  //count값 0 초기화
  turnccnt=0;  //턴카운트 0 -> 플레이어턴, 턴카운트 1 -> 컴퓨터턴
  player_card = card[count++];
  com_card = card[count++];       //순차적으로 플레이어와 컴퓨터에게 카드 분배
  Score();  //score 함수 동작
  Turn();  //turn 함수 동작
}
 
var call_cnt=0;   //call 판별하는 call_cnt값 초기화
var turncnt=0;   //턴 값 초기화
var score=0;  //스코어
var comdie =0;
var comcall=0;
function Turn()//누구의 턴인지 알려주는 함수
{
  round=count/2;    //count 2로 나누어주어 round값 저장
  roundtext.innerHTML="Round :";
  document.getElementById('round').innerHTML = round;
  dealeremotion.style.backgroundImage="url('imageIndian/dealer_basic.png')";
  dealeremotion.style.backgroundSize = "80px 80px";
  if(count==22)  //22카운트 만족 -> 10턴
  {
    if(score>0)  //스코어가 0보다 크다면
    {
      winaudio.play();
      winaudio.currentTime = 0;
      alert("WIN");   //게임 승리
    }
    else if(score==0)  //스코어가 0이라면
    {
      alert("DRAW");  //게임 무승부
    }
    else  //스코어가 0 미만이라면
    {
      loseaudio.play();
      loseaudio.currentTime = 0;
      alert("LOSE");   //게임 패배
    }
    rst=[];
    card=[];   //카드 배열 빈배열로 다시 초기화
 
    return;
  }
  if(comdie==1)  //comdie가 1로 set되면
  {
      dealer.innerHTML="";   //call, die 텍스트 삭제
      comdie=0;  //다시 0으로 초기화
  }
  if(comcall==1)  //comcall이 1로 set되면
  {
    dealer.innerHTML="";  //call, die 텍스트 삭제
    comcall=0;  //다시 0으로 초기화
  }
  com.style.backgroundImage="url('imageIndian/"+com_card+".png')";
  com.style.backgroundSize = "140px 200px";
  player.style.backgroundImage="url('imageIndian/back.png')";
  player.style.backgroundSize = "140px 200px";
  if(turncnt%2==0)
  {
  }
  else if(turncnt%2==1)    //턴카운트 1이면 컴퓨터 턴 전환
  {
    ComTurn();
  }
}
 
function ComTurn()  //컴퓨터 턴 동작 함수
{
  var callordie = Math.floor(Math.random()*5)+parseInt(player_card[0]);  //컴퓨터가 call or die를 선택하게 해주는 판별문, 0~5까지 랜덤으로 값을 뽑아
  //현재 라운드 플레이어 카드와 더해줌
  if(callordie>8)  //그 값이 8 초과라면
  {
    DieWin();  //컴퓨터 die 선택
  }
  else  //8 이하라면
  {
    if(call_cnt==1){comcall=1;}  //컴퓨터 턴이라면 컴퓨터 call, (comcall 1로 set)
    dealer.innerHTML="Call";  //call 텍스트 출력
    Call();  //콜 함수 동작
  }
}
 
function Call()  //call 했을 때 동작
{
  callaudio.play();
  callaudio.currentTime = 0;
  if(call_cnt==1)//두번째 call
  {
    dealer.innerHTML="Call";  //콜 텍스트 출력
    call_cnt=0;  //call_cnt값 0으로 다시 초기화
    OpenCard();  //카드 오픈
  }
  else//첫번째 call
  {
    dealer.innerHTML="Call";  //call 텍스트 출력
    call_cnt=1;  //call_cnt 값 1로 set
    turncnt+=1;  //turncnt도 1씩 증가
    Turn();  //턴 함수 동작
  }
}
 
function OpenCard()  //카드 판별
{
    if(player_card[0]>com_card[0])  //플레이어 카드 > 컴퓨터 카드
    {
      CallWin();  //callwin 동작
    }
    else if(player_card[0]<com_card[0])  //플레이어 카드 < 컴퓨터 카드
    {
      CallLose();  //calllose 동작
    }
    if(player_card[0]==com_card[0])  //무승부 상황
    {
      Draw()
    }
}
 
function Draw(){  //무승부
  turncnt++;  //turncnt값 증가
  call_cnt=0;  //call_cnt값 0으로 초기화
  player_card = card[count++];
  com_card = card[count++];   //다음카드 분배
  setTimeout(Turn,2000);   //2초뒤 Turn 동작
}
 
 
function CallWin()  //콜 해서 이겼을 때
{
  score+=200;  //200점 스코어 추가
  turncnt = 0;  //turncnt 0으로 초기화
  call_cnt=0;  // call_cnt 0으로 초기화
  comcall=1;  //comcall 1로 set
  player.style.backgroundImage="url('imageIndian/"+player_card+".png')";
  player.style.backgroundSize = "140px 200px";
  dealeremotion.style.backgroundImage="url('imageIndian/dealer_lose.png')";
  dealeremotion.style.backgroundSize = "80px 80px";
  Score();  //스코어 함수 동작
  player_card = card[count++];
  com_card = card[count++];  //다음 카드 분배
  setTimeout(Turn,2000);  //2초 뒤 Turn 동작
}
 
function CallLose(){   //콜 해서 졌을 때
  score-=200;  //200점 스코어 감점
  turncnt = 1;  //turncnt 1로 set
  call_cnt=0;  //call_cnt값 0으로 초기화
  comcall=1;  //comcall 1로 set
  player.style.backgroundImage="url('imageIndian/"+player_card+".png')";
  player.style.backgroundSize = "140px 200px";
  dealeremotion.style.backgroundImage="url('imageIndian/dealer_win.png')";
  dealeremotion.style.backgroundSize = "80px 80px";
  Score();  //스코어 함수 동작
 
  player_card = card[count++];
  com_card = card[count++];  //다음 카드 분배
  setTimeout(Turn,2000); //2초 뒤 Turn함수 동작
}
function DieWin(){   //컴퓨터가 Die 선언
  dieaudio.play();
  dieaudio.currentTime = 0;
  if(com_card[0]=="9"){score+=400;}    //만약 컴퓨터 카드가 '10'을 가지고 있다면?
  score+=100;   //총 500점 스코어 득점
  turncnt=0;
  call_cnt=0;
  comdie=1;  //각 카운트값 초기화 및 set
  dealer.innerHTML="DIE"  //컴퓨터 DIE 텍스트 출력
  player.style.backgroundImage="url('imageIndian/"+player_card+".png')";
  player.style.backgroundSize = "140px 200px";
  dealeremotion.style.backgroundImage="url('imageIndian/dealer_lose.png')";
  dealeremotion.style.backgroundSize = "80px 80px";
  Score();  //스코어 함수 동작
  player_card = card[count++];
  com_card = card[count++];  //다음 카드 분배
  setTimeout(Turn,2000);  //2초 뒤 Turn 동작
}
 
function DieLose()   //Player Die 선언
{
  dieaudio.play();
  dieaudio.currentTime = 0;
  if(player_card[0]=="9"){score-=400;}  //만약 플레이어가 '10'을 가지고 있다면?
  score-=100;  //총 500점 감점
  turncnt=1;
  call_cnt=0;  //각 카운트값 초기화 및 set
  dealer.innerHTML="";
  player.style.backgroundImage="url('imageIndian/"+player_card+".png')";
  player.style.backgroundSize = "140px 200px";
  dealeremotion.style.backgroundImage="url('imageIndian/dealer_win.png')";
  dealeremotion.style.backgroundSize = "80px 80px";
  Score();  //스코어 함수 동작
  player_card = card[count++];
  com_card = card[count++];  //다음 카드 분배
  setTimeout(Turn,2000);  //2초 뒤 Turn함수 동작
}
 
function Score()    //스코어함수
{
  winscore.innerHTML = score;  //스코어 출력
}
