
function PayedContract(){

}

PayedContract.prototype={
  init:()=>{},
  payed:(name,goodid)=>{
    LocalContractStorage.set(`${name}-${goodid}`,1)
  },
  login:name=>{
    LocalContractStorage.set(`${name}`,1)
  },
  isExist:(name)=>{
    return LocalContractStorage.get(`${name}`)==1
  },
  isPayed:(name,goodid)=>{
    return LocalContractStorage.get(`${name}-${goodid}`)==1
  }
}

module.exports=PayedContract