const url="https://www.random.org/integers/";   //HTTP REQUEST
var opts = {         //GUAGE CONFIGURATION
  angle: -0.2,
  lineWidth: 0.2,
    radiusScale: 1,
  pointer: {
    length: 0.6,
    strokeWidth: 0.035,
    color: '#000000'
  },
    
   renderTicks: {
          divisions: 10,
          divWidth: 1.2,
          divLength: 0.7,
          subDivisions: 3,
          subLength: 0.5,
          subWidth: 0.6,
         
        },
    staticLabels: {
  font: "17px sans-serif",  
  labels: [0,30,60,90,120,150,180,210,240,270,300],
  color: "#000000",  
},
    staticZones: [
   {strokeStyle: "#034a03", min: 1, max: 200},
   {strokeStyle: "#b50000", min: 200, max: 300}

],
    
  limitMax: 'false', 
 percentColors: [[0.0, "#a9d70b" ], [0.50, "#f9c802"], [1.0, "#ff0000"]],
  strokeColor: '#E0E0E0',
  generateGradient: true
};
var mousedownstop=0;
var down=0;
var gaugestop=0;
var startflag=0;
var stopped=1;
var control=0;
var a=0;
var b=30;
var target = document.getElementById('gauge');
var gauge = new Gauge(target).setOptions(opts);
gauge.maxValue = 300;
gauge.animationSpeed = 80;
gauge.set(0);
document.querySelector(".start").addEventListener("click",()=>{       //TRIGGERING THE keepcalling FUNCTION ON START BUTTON
    mousedownstop=0;
     gaugestop=0;
    stopped=0;
    startflag=1;
    control=0;
    keepcalling();
});
document.querySelector(".stop").addEventListener("click",()=>{        //SETTING THE VARIABLES TO THE DESIRED VALUE ON STOP BUTTON
    mousedownstop=1;
    gaugestop=1;
   stopped=1;
    startflag=0;
    stopflag=1;
    a=0;
    b=30;
});
document.querySelector(".brake").addEventListener("mousedown",()=>{        //TRIGGERING THE applybrakes FUNCTION ON BRAKE mousedown BUTTON
    if(mousedownstop!=1){
    down=1;
    stopped=0;
    applybrakes()
    }
})                                                        
document.querySelector(".brake").addEventListener("mouseup",()=>{       //TRIGGERING THE keepcalling FUNCTION ON BRAKE mouseup BUTTON
    down=0;
    if(gaugestop==0){
    stopped=1;
    startflag=1;
    control=0;
    keepcalling();}
    
})
function applybrakes(){                                                     
    if(stopped==0){
    startflag=0;
    control=1;
    fetch(`${url}?num=1&min=${a}&max=${b}&col=1&base=10&format=plain&rnd=new`)
      .then(gauge =>{
        return gauge.json();
    }).then(data=>{
        gauge.set(data);
        document.querySelector(".speed").textContent=data+"KM/H";
        if(a<=10){
            document.querySelector(".speed").textContent="0 KM/H";
            gauge.set(0);
            return;
        }
        else{
        b=a;
        a=b-30;
        }
        applybrakes();
   
    })
      .catch(data=>{
       document.querySelector(".speed").textContent=data+"KM/H";
        if(a==30){
            a=0;
            b=0;
        }
        else{
        b=a;
        a=b-30;
        }
        applybrakes();
       
})
}
}

function keepcalling(){
    if(down==0){
fetch(`${url}?num=1&min=${a}&max=${b}&col=1&base=10&format=plain&rnd=new`)
      .then(gauge =>{
        return gauge.json();
    }).then(data=>{
        gauge.set(data);
        document.querySelector(".speed").textContent=data+"KM/H";
        if(a==180){
            a=180;
            b=210;
        }
        else{
        a=b;
        b=a+30;
        }
      if(startflag==1){
        keepcalling();
      }
    else{
        if(control!=1){
        gauge.set(0);
         document.querySelector(".speed").textContent="0 KM/H";
        }
    }
    })
      .catch(data=>{
       document.querySelector(".speed").textContent=data+"KM/H";
        if(a==180){
            a=180;
            b=210;
        }
        else{
        a=b;
        b=a+30;
        }
       if(startflag==1){
        keepcalling();
       }
    else{
        gauge.set(0);
         document.querySelector(".speed").textContent="0 KM/H";
    }
})
}
}

