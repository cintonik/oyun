var express = require('express')
  , app = express(app)
  , server = require('http').createServer(app);
var EurecaServer = require('eureca.io').EurecaServer;

//initialise eurecaServer object and allow client side welcome() and send() methods to be called from server
//those allowed methods should be declared under tchat namespace in the client side
var eurecaServer = new EurecaServer({allow : ['girdi','ali','tuskla','tusfare']});

//attach eureca to express server
eurecaServer.attach(server);

//serve index.html as default static file
app.get('/', function (req, res, next) {
	res.sendfile('index.html');
}); 



//connections holder
var connections = {};
var oyuncular={};
// var ogonder={x:0,y:0},zgonder={x:0,y:0},mgonder={x:0,y:0};
var ogonder={},mgonder={};
var siloyuncular=[];
var mermiler={};
var zombiler=[];
var duvarlar={};
var yikduvarlar={};
var silahlar={};
var klgirdi={};
var faregirdi={};

var madet=0,zadet=0,oadet=0;
var mgecikme=0;
var msarjor=0;
var msardeg=0;
var oyundon,zombici;
var zadet=0;
var oyunbas=false;
var a=0,z=0;
var tur=1;
var duvars={
              duvar:{},
              yikduvar:{},
          }
          duvars.duvar[0]={
               duvargec:false,
               id:0, 
               renk:0,
              basx:200,
              basy:100,
              bitx:200,
              bity:250,
          };
           duvars.duvar[1]={
               duvargec:false,
               id:1, 
                renk:0,
              basx:200,
              basy:300,
              bitx:200,
              bity:500,
          };
           duvars.duvar[2]={
               duvargec:false,
               id:2, 
                renk:0,
              basx:200,
              basy:500,
              bitx:400,
              bity:500,
          };
           duvars.duvar[3]={
               duvargec:false,
               id:3, 
                renk:0,
              basx:450,
              basy:500,
              bitx:800,
              bity:500,
          };
           duvars.duvar[4]={
               duvargec:false,
               id:4, 
                renk:0,
              basx:850,
              basy:500,
              bitx:1200,
              bity:500,
          };
           duvars.duvar[5]={
               duvargec:false,
               id:5, 
                renk:0,
              basx:1200,
              basy:300,
              bitx:1200,
              bity:500,
          };
           duvars.duvar[6]={
               duvargec:false,
               id:6, 
                renk:0,
              basx:1000,
              basy:300,
              bitx:1200,
              bity:300,
          };
           duvars.duvar[7]={
               duvargec:false,
               id:7, 
                renk:0,
              basx:800,
              basy:300,
              bitx:950,
              bity:300,
          };
           duvars.duvar[8]={
               duvargec:false,
               id:8, 
                renk:0,
              basx:800,
              basy:100,
              bitx:800,
              bity:300,
          };
           duvars.duvar[9]={
               duvargec:false,
               id:9, 
                renk:0,
              basx:600,
              basy:100,
              bitx:800,
              bity:100,
          };
           duvars.duvar[10]={
               duvargec:false,
               id:10, 
                renk:0,
              basx:300,
              basy:100,
              bitx:550,
              bity:100,
          };
           duvars.duvar[11]={
               duvargec:false,
               id:11, 
                renk:0,
              basx:195,
              basy:100,
              bitx:250,
              bity:100,
          };
           duvars.duvar[12]={
               duvargec:false,
               id:12, 
              can:6,
              renk:30,
              basx:200,
              basy:250,
              bitx:200,
              bity:300,
          }
           duvars.duvar[13]={
               duvargec:false,
               id:13, 
              can:6, 
              renk:30,
              basx:400,
              basy:500,
              bitx:450,
              bity:500,
          }
           duvars.duvar[14]={
               duvargec:false,
               id:14,  
              can:6,
              renk:30,
              basx:800,
              basy:500,
              bitx:850,
              bity:500,
          }
           duvars.duvar[15]={
               duvargec:false,
               id:15,  
              can:6,
              renk:30,
              basx:950,
              basy:300,
              bitx:1000,
              bity:300,
          }
           duvars.duvar[16]={
               duvargec:false,
               id:16,  
              can:6,
              renk:30,
              basx:550,
              basy:100,
              bitx:600,
              bity:100,
          }
           duvars.duvar[17]={
               duvargec:false,
               id:17,  
              can:6,
              renk:30,
              basx:250,
              basy:100,
              bitx:300,
              bity:100,
          }

//register connections
eurecaServer.onConnect(function (connection) {
    console.log('New client ', connection.id, connection.eureca.remoteAddress);
	connections[connection.id] = {nick:null, client:eurecaServer.getClient(connection.id)};
	oyuncular[connection.id] = new cisim(10,"red",600,600,0,0,"oyuncu",connection.id,100,silahlar[0]);
	oyunbasla();
	for (var i in connections){
			connections[i].client.girdi(connection.id);
	}
});

//unregister connections
eurecaServer.onDisconnect(function (connection) {    
    console.log('Client quit', connection.id);
	delete connections[connection.id];
    delete oyuncular[connection.id];
});
eurecaServer.exports.tuskla= function(aa,id){
    klgirdi={
        tus:aa,
        id:id}

}
eurecaServer.exports.tusfare= function(aa,id){
    faregirdi={
        tus:aa,
        id:id
    }
}
function oyunbasla(){
    console.log("asd");
oyundon=setInterval(oyundongu,20);
//zombici=setInterval(zombicik,2000);
    
}
function cisim(gen,renk,x,y,aci,hiz,type,id,can,silah){
    this.silah=silah;
    this.id =id;
    this.can=can;
    this.type = type;
    this.width = gen;
    this.height = gen;
    this.speed = hiz;
    this.angle = aci;
    this.moveAngle = 0;
    this.para=0;
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = renk;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);        
        ctx.restore();    
    }
    this.newPos = function() {
       // this.angle += this.moveAngle * Math.PI / 45;
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
    }
}
function oyundongu(){
   //  console.log("girdi");
     
      if(oyuncular.can<100)
      oyuncular.can=oyuncular.can+0.1;
      if(zadet<=0){
     //  if(!oyunbas){
      zombicik(tur);
	  //   console.log(zombiler);
    tur++;
klgirdi[66]=false;
oyunbas=false;
// }
}
    // console.log(zombiler.x,zombiler.y);
      oyunalani();
       for (var i=12;i<=17;i++){
       if(duvarlar[i].can<=0){
       duvars.duvar[duvarlar[i].id].duvargec=true;
         }
         else
         {duvars.duvar[duvarlar[i].id].duvargec=false;}
      }
  //    dinleyici();
      
    //  oyuncular.update();
    for (var i in oyuncular){
      //  console.log(i);
      oyuncular[i].newPos();
      if(i==klgirdi.id && i==faregirdi.id){
    tusbas(i);
      }
	ogonder[i]={
x:oyuncular[i].x,
y:oyuncular[i].y		
	};
}
   //   console.log(oyuncular[i].x);
      carpma (mermiler,zombiler);
      carpma (zombiler,oyuncular);
      duvarcarp (mermiler);
      duvarcarp (oyuncular);
      duvarcarp(zombiler);
      for(var i in mermiler){
          if(mermiler.x<0 || mermiler.x>1350 || mermiler.y<0 || mermiler.y>650){
              delete mermiler[i];
          }
      //    mermiler[i].update();
          mermiler[i].newPos();
          mgonder[i]={x:mermiler[i].x,
              y:mermiler[i].y}
      }
      var zgonder=[];
         for(var i in zombiler){ 
			// console.log(i);   
         var gaci={
             x:zombiler[i].x,
             y:zombiler[i].y,
         }
	//	 console.log(zombiler.x,zombiler.y);
          zombiler[i].angle=yon(gaci);
       //   zombiler[i].update();
          zombiler[i].newPos();
      zgonder[i]={x:zombiler[i].x,
                  y:zombiler[i].y}
      }
   //   console.log(oyuncular[0].x);
   for (var c in connections){
       if(connections[c]){
	//	 console.log(zombiler);
   connections[c].client.ali(oyuncular,zombiler,mermiler);}}
      }
	  function zombicik(tur){
          var can =5+tur*2;
          for(var i=0;i<=6+tur*4;i++){
              var kon={
              x:Math.random()*1350,
              y:Math.random()*650,
          }
        //  console.log(kon.x,kon.y);
            while(kon.x>200 && kon.x<1200 && kon.y>100 && kon.y<500){
            //    console.log(kon.x,kon.y);
              kon={
              x:Math.random()*1350,
              y:Math.random()*650,
          }}
       //   console.log(kon);
          zombiler[i]=new cisim(10,"green",kon.x,kon.y,yon(kon),-0.2,"zombi",zadet,can,35);
          zadet++;
          }
		//  console.log(zombiler);
          
      }
	  function oyunalani(){
          for (var i=0; i<=11;i++)
          duvarlar[i]=new duvarciz(duvars.duvar[i]);
          for (var i=12;i<=17;i++)
          duvarlar[i]=new duvarciz(duvars.duvar[i]);
      }
function carpma (carpan,carpilan){
          if(carpilan.type =="oyuncu"){
              for(var i in carpan){
              var deger=Math.sqrt((carpilan.x-carpan[i].x)*(carpilan.x-carpan[i].x)+(carpilan.y-carpan[i].y)*(carpilan.y-carpan[i].y));
              if(deger<10){if(z>50){ z=0;
                  carpilan.can=carpilan.can-carpan[i].silah;
                  if (carpilan.can<=0)
                  oyunbitti();}
                else { z=z+1;
               //     console.log(z);
				}}
              }
              }
          else for(var k in carpilan)
          if(carpilan[k].type =="zombi"){
          for(var i in carpan){
              if(carpan[i] && carpilan[k]){
      var deger=Math.sqrt((carpilan[k].x-carpan[i].x)*(carpilan[k].x-carpan[i].x)+(carpilan[k].y-carpan[i].y)*(carpilan[k].y-carpan[i].y));
      if(deger<10){
          if(carpilan[k].can>carpan[i].can){
           carpilan[k].can=carpilan[k].can-carpan[i].can;
           delete carpan[i];}
           else if(carpan[i].can >= carpilan[k].can){
               carpan[i].can=carpan[i]-carpilan[k].can;
               delete carpilan[k];
            zadet--;
            for(var s in oyuncular){
              //  console.log(s);
            if(oyuncular.id==carpan[i].id)
        oyuncular.para=oyuncular.para+(8+tur*2);}}}}}
          }
      }
	  function tusbas(data){
 if (faregirdi.tus.x) {ateset(faregirdi.tus,data)}
    if (klgirdi.tus && klgirdi.tus[37]) {oyuncular[data].x-=1; }
    if (klgirdi.tus && klgirdi.tus[39]) {oyuncular[data].x+=1; }
    if (klgirdi.tus && klgirdi.tus[38]) {oyuncular[data].y-=1; }
    if (klgirdi.tus && klgirdi.tus[40]) {oyuncular[data].y+=1; }
    if (klgirdi.tus && klgirdi.tus[49]) {oyuncular[data].silah=silahlar[0];}
    if (klgirdi.tus && klgirdi.tus[50]) {oyuncular[data].silah=silahlar[1];}
    if (klgirdi.tus && klgirdi.tus[69]) {
        for (var i=12;i<=17;i++){
        var duvarort={};
        duvarort.x=(duvarlar[i].basx + duvarlar[i].bitx)/2;
        duvarort.y=(duvarlar[i].basy + duvarlar[i].bity)/2;
        var deger=Math.sqrt((oyuncular[data].x-duvarort.x)*(oyuncular[data].x-duvarort.x)+(oyuncular[data].y-duvarort.y)*(oyuncular[data].y-duvarort.y));
        if(deger<200){ if(duvarlar[i].can<6){
        duvars.duvar[duvarlar[i].id].can=duvars.duvar[duvarlar[i].id].can+0.02;
        duvars.duvar[duvarlar[i].id].renk=duvars.duvar[duvarlar[i].id].renk-0.2; } }
    }}
    if (klgirdi.tus && klgirdi.tus[66]) {oyunbas=true;}
}
function duvarcarp(data){
          for(var k in data) 
          if(data[k].type =="mermi" ){
              for(var i in duvarlar){
                      if(duvarlar[i].basx==duvarlar[i].bitx){
                     if(data[k])
                       if(duvarlar[i].basy<data[k].y && duvarlar[i].bity>data[k].y) {
                       if(data[k].x-duvarlar[i].basx<5 && data[k].x-duvarlar[i].basx>-5){
                           if(!duvars.duvar[duvarlar[i].id].duvargec){
                               if (duvarlar[i].renk<10){
                                   delete data[k]; }

                       } }
                          }
                      } else if(duvarlar[i].bity==duvarlar[i].basy){
                          if(data[k])
                          if(data[k].y-duvarlar[i].basy<5 && data[k].y-duvarlar[i].basy>-5){
                              
                              if(duvarlar[i].basx<data[k].x && duvarlar[i].bitx>data[k].x){
                                  if(!duvars.duvar[duvarlar[i].id].duvargec){
                                  if (duvarlar[i].renk<10){
                                   delete data[k]; }
                              } }
                          }
                      }
      }}
      for(var k in data) 
    if(data[k].type=="oyuncu"){
     for(var i in duvarlar){
                      if(duvarlar[i].basx==duvarlar[i].bitx){
                     if(data[k])
                       if(duvarlar[i].basy<data[k].y && duvarlar[i].bity>data[k].y) {
                       if(data[k].x-duvarlar[i].basx<5 && data[k].x-duvarlar[i].basx>-5){
                         if(data[k].x>duvarlar[i].basx){
                         
                             if(!duvars.duvar[duvarlar[i].id].duvargec)
                             oyuncular[k].x++;
                         }if(data[k].x<duvarlar[i].basx){
                         
                             if(!duvars.duvar[duvarlar[i].id].duvargec)
                             oyuncular[k].x--;
                         }
                              }
                          }
                      } else if(duvarlar[i].bity==duvarlar[i].basy){
                          if(data[k])
                          if(data[k].y-duvarlar[i].basy<5 && data[k].y-duvarlar[i].basy>-5){
                              if(duvarlar[i].basx<data[k].x && duvarlar[i].bitx>data[k].x){
                              if(data[k].y>duvarlar[i].basy){
                             
                             if(!duvars.duvar[duvarlar[i].id].duvargec)
                             oyuncular[k].y++;
                         }if(data[k].y<duvarlar[i].basy){
                          
                             if(!duvars.duvar[duvarlar[i].id].duvargec)
                             oyuncular[k].y--;
                         }
                              }
                          }
                      }
      }   
 //   console.log(oyuncular);
}
    for(var k in data) 
    if(data[k].type=="zombi"){
     for(var i in duvarlar){
                      if(duvarlar[i].basx==duvarlar[i].bitx){
                     if(data[k])
                       if(duvarlar[i].basy<data[k].y && duvarlar[i].bity>data[k].y) {
                       if(data[k].x-duvarlar[i].basx<5 && data[k].x-duvarlar[i].basx>-5){
                         if(data[k].x>duvarlar[i].basx){if (duvarlar[i].renk>10){
                                      duvars.duvar[duvarlar[i].id].can=duvars.duvar[duvarlar[i].id].can-0.1;
                                      duvars.duvar[duvarlar[i].id].renk=duvars.duvar[duvarlar[i].id].renk+1; 
                                       if(duvarlar[i].can<=0){
                                           duvars.duvar[duvarlar[i].id].duvargec=true;
                                       }
                                   }
                             if(!duvars.duvar[duvarlar[i].id].duvargec)
                             data[k].x++;
                         }if(data[k].x<duvarlar[i].basx){if (duvarlar[i].renk>10){
                                      duvars.duvar[duvarlar[i].id].can=duvars.duvar[duvarlar[i].id].can-0.1;
                                      duvars.duvar[duvarlar[i].id].renk=duvars.duvar[duvarlar[i].id].renk+1; 
                    
                                   }
                             if(!duvars.duvar[duvarlar[i].id].duvargec)
                             data[k].x--;
                         }
                              }
                          }
                      } else if(duvarlar[i].bity==duvarlar[i].basy){
                          if(data[k])
                          if(data[k].y-duvarlar[i].basy<5 && data[k].y-duvarlar[i].basy>-5){
                              if(duvarlar[i].basx<data[k].x && duvarlar[i].bitx>data[k].x){
                              if(data[k].y>duvarlar[i].basy){if (duvarlar[i].renk>10){
                                      duvars.duvar[duvarlar[i].id].can=duvars.duvar[duvarlar[i].id].can-0.1;
                                      duvars.duvar[duvarlar[i].id].renk=duvars.duvar[duvarlar[i].id].renk+1;  
                                   
                                   }
                                  if(!duvars.duvar[duvarlar[i].id].duvargec)
                             data[k].y++;
                         }if(data[k].y<duvarlar[i].basy){
                             if (duvarlar[i].renk>10){
                                      duvars.duvar[duvarlar[i].id].can=duvars.duvar[duvarlar[i].id].can-0.1;
                                      duvars.duvar[duvarlar[i].id].renk=duvars.duvar[duvarlar[i].id].renk+1; 
                                    
                                   }
                             if(!duvars.duvar[duvarlar[i].id].duvargec)
                             data[k].y--;
                         }
                              }
                          }
                      }
      }   
    }
}
function yon(data) {
	                    
	for(var i in oyuncular){
	//	console.log(data.x,data.y);
	// console.log(oyuncular[i].x,oyuncular[i].y);
          var bmes=5000;
          var smes={deg:5000,
              i:0};
          bmes=Math.sqrt((oyuncular[i].x-data.x)*(oyuncular[i].x-data.x)+(oyuncular[i].y-data.y)*(oyuncular[i].y-data.y));
		//  console.log(bmes);
          if(bmes<smes.deg){
              smes.deg=bmes;
              smes.i=i;
          }
      }
	//  console.log(smes.i);
	// console.log(oyuncular[smes.i]);
	// console.log(oyuncular);
	  if(oyuncular[smes.i]){
		//  console.log(smes.i);
          var baci;
             if (oyuncular[smes.i].x<data.x && oyuncular[smes.i].y<data.y)
      {baci=Math.PI-Math.atan((oyuncular[smes.i].x-data.x)/(oyuncular[smes.i].y-data.y));}
      else  if(oyuncular[smes.i].y<data.y && oyuncular[smes.i].x>data.x)
      {baci=(Math.PI)-Math.atan((oyuncular[smes.i].x-data.x)/(oyuncular[smes.i].y-data.y));}
      else if(oyuncular[smes.i].x>data.x && oyuncular[smes.i].y>data.y)
      {baci=2*Math.PI-Math.atan((oyuncular[smes.i].x-data.x)/(oyuncular[smes.i].y-data.y));}
      else if(oyuncular[smes.i].y>data.y && oyuncular[smes.i].x<data.x)
      {baci=2*Math.PI-Math.atan((oyuncular[smes.i].x-data.x)/(oyuncular[smes.i].y-data.y));}
// console.log(baci);
      return baci;
	  }
}

function duvarciz(data){
this.id=data.id;
this.can=data.can;
this.renk=data.renk;
this.type="duvar";
this.basx=data.basx;
this.basy=data.basy;
this.bitx=data.bitx;
this.bity=data.bity;
// console.log(this.basx,this.basy,this.bitx,this.bity);
// ctx.beginPath();
// ctx.lineWidth =10;
// ctx.moveTo(data.basx,data.basy);
// ctx.lineTo(data.bitx,data.bity);
// ctx.strokeStyle ='hsl(0,100%,'+data.renk+'%)';
// ctx.stroke();
}
function ateset(data,i){
          mgecikme[i]=mgecikme[i]+1;
          if(mgecikme[i]>=oyuncular[i].silah.atishiz/20){
          msarjor[i]=msarjor[i]+1;
          if(msarjor[i]<=oyuncular[i].silah.sarjor){  
          var baci;
      //    console.log(data.x);
          if(data.x){var pos=data.pos;
              var mhiz=5;                   
          mermiler[madet]=new cisim(3,"black",oyuncular[i].x,oyuncular[i].y,yon(pos),oyuncular[i].silah.mhiz,"mermi",oyuncular[i].id,oyuncular[i].silah.can,oyuncular[i].silah.tur);
      
      madet++;
      if(madet>300){madet=0;}
        }
         
      mgecikme=0;}
    else{msardeg=msardeg+1;
        if(msardeg>=oyuncular[i].silah.sardegsur/20){msarjor=0;
            msardeg=0;}
        
    }}
    var mgos=oyuncular[i].silah.sarjor-msarjor;
      //    ctx.font ="20px Arial"
      //    ctx.fillStyle ="red"
      //    ctx.textAlign = "center"
      //    ctx.fillText(mgos,50,600)
    }
    var tabanca={
        can:10,
        mhiz:5,
        sarjor:15,
        atishiz:1000,
        sardegsur:5000,
        tur:"tabanca",
        maxmermi:90,
        
    }
    var otomatik={
        can:7,
        mhiz:5,
        sarjor:30,
        atishiz:300,
        sardegsur:5000,
        tur:"otomatik",
        maxmermi:180,
        
    }
silahlar[0]=tabanca;
silahlar[1]=otomatik;

console.log('Eureca.io tchat server listening on port 8000')
server.listen(8000);
