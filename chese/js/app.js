//base
require("./common") 
require("./play") 
require("./ai") 
require("./bill") 
require("./gambit") 


var nebPay=require('nebpay')
const _pay=new nebPay();

const appAddress='n1uwoCYTzM73VRCvkBQwAuyGScCvbQexk15'
const price=0.00000001;
const goodid='chese-0'

const pay=(nick,cb)=>{
  _pay.call(appAddress,price,'payed',goodid,{
    listener:rs=>{
      if(rs&&rs.txhash){
        alert('支付成功 开始愉快的玩耍把')

        cb&&cb();
      }
      else if(rs&& rs.execute_err=='contract check failed'){
        alert('合约检测失败，请检查浏览器钱包环境')
      }
    }
  })
}

let randomKeys='0123456789abcdefghijklmnopqrstuvwxyz'
const getRandom=(n)=>{
  for(var i=0,len=randomKeys.length,rs='';i<n;i++){
    rs +=randomKeys[Math.floor(Math.random()*len)];
  }
  return rs;
}

const init=()=>{
  if (typeof webExtensionWallet === "undefined") {
    alert('星云钱包环境未运行，请安装钱包插件')
  }
  
  let nick=localStorage.getItem('nickName');
  if(!nick){
    nick=Date.now()+'-'+getRandom(6)
    localStorage.setItem('nickName',nick)
  }

  let payed=localStorage.getItem('payed');
  let playedTimes= +(localStorage.getItem('playdTimes')||0);

  if(payed){
    initUi()
  }
  else{
    // if(playedTimes<1)
    {
      initUi();
    }
    
  }

  com.get('payMe').onclick=()=>{
    pay(nick,()=>{
      localStorage.setItem('payed',1);

      initUi();
    })
  }
  
}

const initUi=()=>{
  com.initUI(()=>{
    let playedTimes= +(localStorage.getItem('playdTimes')||0);
    playedTimes ++;
    localStorage.getItem('playdTimes',playedTimes);

    init();
  });
}

setTimeout(init,1000);
