const town=document.getElementById('zone');
const city=document.getElementById('city');
const content=document.querySelector('.content ul');
const btn=document.querySelector('.btn');
const sidebar=document.querySelector('.side');
const mapmove=document.getElementById('map');




function side(data){
    
    
    const allplace=[];
    const datalen=data.length;
    for(let i=0; i<datalen; i++){
        if(data[i].properties.county==""){continue}
        allplace.push(data[i].properties.county);
    }
    const place=Array.from(new Set(allplace));
    for(let i=0; i<place.length; i++){
        const county=document.createElement('option');
        county.textContent=place[i];
        county.setAttribute('value',place[i]);
        city.appendChild(county);   
    }



    city.addEventListener('change',getzone);
    town.addEventListener('change',gettown);
    content.addEventListener('click',function(e){
        console.log(e.target.textContent);
        console.log(e.target.nodeName);
        for(let i=0; i<datalen; i++){
            if(e.target.nodeName!=='H2'){return;}
            if(e.target.textContent==data[i].properties.name){
                map.setView([data[i].geometry.coordinates[1], data[i].geometry.coordinates[0]],20);  
                L.marker([data[i].geometry.coordinates[1], data[i].geometry.coordinates[0]], {icon: moveIcon}).addTo(map)
                 .bindPopup('<h1>'+data[i].properties.name+'</h1>')
                 .openPopup();
            }
        }
    })
    
  
    function getzone(e){
        let str='';
        let zone=e.target.value;
        const allarea=[];
        for(let i=0; i<datalen; i++){
            if(zone==data[i].properties.county){
                allarea.push(data[i].properties.town);     
            }
        }
        const area=Array.from(new Set(allarea));
        for(let i=0; i<area.length; i++){
            str+='<option value="'+area[i]+'">'+area[i]+'</option>'
        }
        town.innerHTML='<option value="">選擇地區</option>'+str;

        for(let i=0; i<datalen; i++){
            if(zone==data[i].properties.county){
                map.setView([data[i].geometry.coordinates[1], data[i].geometry.coordinates[0]],14);
                break;
            }
        }
    }


    function gettown(e){
        let zone=e.target.value;
        let str='';
        for(let i=0; i<datalen; i++){
            if(zone==data[i].properties.town){
                map.setView([data[i].geometry.coordinates[1], data[i].geometry.coordinates[0]],15);
                break;
            }
        }
        for(let i=0; i<datalen; i++){
            if(zone==data[i].properties.town){
                str+='<li><h2>'+data[i].properties.name+'</h2>\
                <p>位置: '+data[i].properties.address+'</p>\
                <p>'+data[i].properties.phone+'</p>\
                <p>口罩販售: '+data[i].properties.note+'</p>\
                <p>成人口罩數量: '+data[i].properties.mask_adult+'</p>\
                <p>兒童口罩數量: '+data[i].properties.mask_child+'</p></li>'
            }
        }
        content.innerHTML=str;
    }

    const date = new Date();
    const day=document.querySelector('.title h2');
    if(date.getDay()==0){day.textContent='星期日'}
    else if(date.getDay()==1){day.textContent='星期一'}
    else if(date.getDay()==2){day.textContent='星期二'}
    else if(date.getDay()==3){day.textContent='星期三'}
    else if(date.getDay()==4){day.textContent='星期四'}
    else if(date.getDay()==5){day.textContent='星期五'}
    else {day.textContent='星期六'}

    const year=document.querySelector('.title span');
    year.textContent=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();


    let a=1;
    btn.addEventListener('click',function(e){
        e.preventDefault();
        if(a==1){
            sidebar.style.transform='translateX(-300px)';
            mapmove.style.cssText = 'width:100vw; transform:translateX(0px);';
            a++;
        }      
       else{
            sidebar.style.transform='translateX(0px)';
            mapmove.style.cssText = 'transform:translateX(300px);';
            a=1;
        }
    })


}

