function leftpad(str,len,chr){
let tl=len-(new String(str)).length;
let pad="";
for(let i=0;i<tl;i++){
pad+=chr;
}
return pad+(new String(str));
}
let adcount=1;
let frameoff=[0,35];
let framecount=[0,142];
let isadding=false;
let dia=null;
let cad=0;
let cthr;
let adcb;
let foundpopup=false;
//waits on another thread
function showad(num,cb){
if(isadding){
return;
}
adcb=cb;
dia=new BaseDialog("ad");
isadding=true;
dia.show();
cad=num;
cthr=Threads.thread(()=>{
let counter=Time.time;
for(let i=frameoff[cad];i<frameoff[cad]+framecount[cad];i++){
let stri=new java.lang.String("ad-ad"+leftpad(cad,2,"0")+"-"+leftpad(i,4,"0"));
Core.app.post(()=>{dia.cont.clearChildren();if(foundpopup){dia.cont.add("next time you boot your game click on 'going down the rabbithole' -").row();};dia.cont.image(Core.atlas.find(stri));});
while(Time.time<counter+2){}
counter=Time.time;
}
isadding=false;
});
}
function updatead(){
if(!isadding){
 if(dia!=null){
  dia.hide();
  adcb();
 }
}
}
Events.run(EventType.Trigger.update,()=>{
updatead();
});
// listen for the event where a unit is destroyed
Events.on(UnitDestroyEvent, event => {
  // display toast on top of screen when the unit was a player
  if(event.unit.isPlayer()){
    Core.app.post(()=>{
    showad(1,()=>{});});
  }
})
Events.on(ClientLoadEvent,e=>{if(Vars.mods.locateMod("popup")!=null){foundpopup=true;}});
