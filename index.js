// 创建dom，移除dom
// 获取时间,更新时间
// 撕的动作事件
    var pages = document.getElementsByClassName("pages")[0]
    var modal = document.getElementsByClassName("modal")[0]
    var local = window.navigator.language || "en-us";
    var date = new Date();
    var year = date.getFullYear();
    var dayNum = date.getDate();
    var month = date.getMonth();
    // console.log(trueM)
    var weekName = date.toLocaleDateString("en-us",{"weekday":"long"})//获取星期
    var monthName = date.toLocaleDateString("en-us",{"month":"long"})//获取月份根据获取的日期对象显示
    var deadTime = new Date("2020/12/31").getTime()
    var nowTime = date.getTime();
    //计算每个月的天数
// 返回每个月的实际天数的函数
function dayNumF(year,month){
   return new Date(year,month+1,0).getDate()
}
function getNewDate(){
 if(dayNum < dayNumF(year,month)){
     dayNum ++;
 }else{
     dayNum = 1;
 }
 if(dayNum == 1 && month <11){
     month++
 }else if(dayNum == 1 && month == 11){
     month = 0;
 }
 if(dayNum == 1 && month == 0){
     year++
 }
    var newdate = new Date(year,month,dayNum)
    console.log("now",newdate)
     nowTime = newdate.getTime()
    //  console.log('now',nowTime)
     weekName = newdate.toLocaleDateString("local",{"weekday":"long"})//获取星期
     monthName = newdate.toLocaleDateString("local",{"month":"long"})//获取月份根据获取的日期对象显示
    // console.log(newdate,weekName,monthName)
}

function tear(e){
    getNewDate()
    updateDay(e.target)
    
}
function updateDay(target){
    // console.log(disTime)
    if(deadTime-nowTime < 0){
        modal.classList.add("on")
       setTimeout(function(){
        modal.classList.remove("on")
       },2000)
        return;
    }else{
        if(target && target.classList.contains('page')){
            target.classList.add('teared')
            setTimeout(() => {
                pages.removeChild(target)
            }, 800);
        }else{
            return;
        }
        renderPage();
    }
}
function renderPage(){
    var newPage = document.createElement('div');
        newPage.classList.add('page')
    var str = '<p>'+monthName+'</p>\n<p>'+dayNum+'</p>\n<p>'+weekName+'</p><p>'+year+'</p>'
        newPage.innerHTML = str
        pages.appendChild(newPage)
}
renderPage()
var m_width = document.documentElement.clientWidth
// console.log(m_width)
if(m_width <= 800){
    pages.addEventListener('touchstart',tear)
}else{
    pages.addEventListener('click',tear)
}