var jin = new Array(0,0,0,0,0,0,0,0,0,0);//井字格，O为1，X为-1
var XorO = 0;//轮到O还是X下棋
var enableAI = 1;//默认启用AI
var gameover = false;//游戏是否结束
var player_won = 0;
var AI_won = 0;
var draw =0;
 
function AI(me,emy){
	var maxValue=new Array(0,0,0,0,0,0,0,0,0,0);
	var hisValue=new Array(0,0,0,0,0,0,0,0,0,0);
	var i=0;
	//AI的价值
	for(i=1;i<10;i++){
		
		var y=parseInt((i-1)/3);
		var x=parseInt((i-1)%3);
		if(jin[3*y+1]!=emy && jin[3*y+2]!=emy && jin[3*y+3]!=emy)maxValue[i]++;//横排
		if(jin[x+1]!=emy && jin[x+1+3]!=emy && jin[x+1+6]!=emy)maxValue[i]++;//竖排
		if(i==7 || i==5 || i==3){
			if(jin[7]!=emy && jin[5]!=emy && jin[3]!=emy)maxValue[i]++;//斜排1
		}
		if(i==1 || i==5 || i==9){
			if(jin[1]!=emy && jin[5]!=emy && jin[9]!=emy)maxValue[i]++;//斜排2
		}
	}
	//玩家的价值
	for(i=1;i<10;i++){
		var y=parseInt((i-1)/3);
		var x=parseInt((i-1)%3);
		if(jin[3*y+1]!=me && jin[3*y+2]!=me && jin[3*y+3]!=me)hisValue[i]++;//横排
		if(jin[x+1]!=me && jin[x+1+3]!=me && jin[x+1+6]!=me)hisValue[i]++;//竖排
		if(i==7 || i==5 || i==3){
			if(jin[7]!=me && jin[5]!=me && jin[3]!=me)hisValue[i]++;//斜排1
		}
		if(i==1 || i==5 || i==9){
			if(jin[1]!=me && jin[5]!=me && jin[9]!=me)hisValue[i]++;//斜排2
		}
	}
	
	//判断绝对价值
	for(i=1;i<10;i++){
		var y=parseInt((i-1)/3);
		var x=parseInt((i-1)%3);
		if((jin[3*y+1]+jin[3*y+2]+jin[3*y+3])==emy*2)maxValue[i]=100;//横排
		if((jin[x+1]+jin[x+1+3]+jin[x+1+6])==emy*2)maxValue[i]=100;//竖排
		if(i==7 || i==5 || i==3){
			if((jin[7]+jin[5]+jin[3])==emy*2)maxValue[i]=100;//斜排1
		}
		if(i==1 || i==5 || i==9){
			if((jin[1]+jin[5]+jin[9])==emy*2)maxValue[i]=100;//斜排2
		}
	}
	for(i=1;i<10;i++)maxValue[i]+=hisValue[i];//价值求和
	
	//选择最高价值的一步棋
	var max=-100,go=1;
	for(i=1;i<10;i++){
		if(maxValue[i]>max && jin[i]==0){//该格未被走过
			go=i;
			max=maxValue[i];
		}
	}
	bn(go);
}
function bn(i){
	if(jin[i]!=0 || gameover)return ;//游戏结束时或该棋格已被下过
	if(XorO==0){
		if(i==1)document.getElementById("bt1").value="O";
		else if(i==2)document.getElementById("bt2").value="O";
		else if(i==3)document.getElementById("bt3").value="O";
		else if(i==4)document.getElementById("bt4").value="O";
		else if(i==5)document.getElementById("bt5").value="O";
		else if(i==6)document.getElementById("bt6").value="O";
		else if(i==7)document.getElementById("bt7").value="O";
		else if(i==8)document.getElementById("bt8").value="O";
		else if(i==9)document.getElementById("bt9").value="O";
		jin[i]=1;
	}
	else{
		if(i==1)document.getElementById("bt1").value="X";
		else if(i==2)document.getElementById("bt2").value="X";
		else if(i==3)document.getElementById("bt3").value="X";
		else if(i==4)document.getElementById("bt4").value="X";
		else if(i==5)document.getElementById("bt5").value="X";
		else if(i==6)document.getElementById("bt6").value="X";
		else if(i==7)document.getElementById("bt7").value="X";
		else if(i==8)document.getElementById("bt8").value="X";
		else if(i==9)document.getElementById("bt9").value="X";
		jin[i]=-1;
	}
	cgTurn();
}
//交换回合
function cgTurn(){
	var sum=0;
	for(var i=0;i<10;i++)if(jin[i]!=0)sum++;
	
	if( checkWin()==true ){
		gameover=true;
		if(XorO==0){
			document.getElementById("info").value="O胜利!";
			player_won++;balance();
		}
		else {
			document.getElementById("info").value="X胜利!";
			AI_won++;balance();
		}
		return ;
	}
	if(sum==9){
		document.getElementById("info").value="平局!";
		draw++;balance();
		return ;
	}
	XorO=(XorO+1)%2;
	if(XorO==0)document.getElementById("info").value="轮到O";
	else {
		document.getElementById("info").value="轮到X";
		if(enableAI==1)AI(-1,1);//默认玩家走O AI走X
	}
}
//判断是否有人胜利
function checkWin(){
	var num=false;
	if(jin[7]+jin[8]+jin[9]==-3 || jin[7]+jin[8]+jin[9]==3)return true;
	else if(jin[4]+jin[5]+jin[6]==-3 || jin[4]+jin[5]+jin[6]==3)return true;
	else if(jin[1]+jin[2]+jin[3]==-3 || jin[1]+jin[2]+jin[3]==3)return true;
	else if(jin[1]+jin[4]+jin[7]==-3 || jin[1]+jin[4]+jin[7]==3)return true;
	else if(jin[2]+jin[5]+jin[8]==-3 || jin[2]+jin[5]+jin[8]==3)return true;
	else if(jin[3]+jin[6]+jin[9]==-3 || jin[3]+jin[6]+jin[9]==3)return true;
	else if(jin[1]+jin[5]+jin[9]==-3 || jin[1]+jin[5]+jin[9]==3)return true;
	else if(jin[7]+jin[5]+jin[3]==-3 || jin[7]+jin[5]+jin[3]==3)return true;
}
function restart(){
	for(i=1;i<10;i++)jin[i]=0;
	document.getElementById("bt1").value="  ";
	document.getElementById("bt2").value="  ";
	document.getElementById("bt3").value="  ";
	document.getElementById("bt4").value="  ";
	document.getElementById("bt5").value="  ";
	document.getElementById("bt6").value="  ";
	document.getElementById("bt7").value="  ";
	document.getElementById("bt8").value="  ";
	document.getElementById("bt9").value="  ";
	document.getElementById("info").value="游戏开始!玩家先行!"
	XorO = 0;
	gameover=false;
}
//更变AI启用状态
function cgAI(){
	enableAI=(enableAI+1)%2;
	if(enableAI==0)document.getElementById("enableAI").value="开启AI";
	else document.getElementById("enableAI").value="关闭AI";
}
//结算、更新界面
function balance(){
	document.getElementById("o_win").value=player_won;
	document.getElementById("x_win").value=AI_won;
	document.getElementById("draw").value=draw;
}


