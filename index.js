let jsonobj;
let newstory;
let askstory;
let showstory;
let jobstory;
let start =0;
let last = 30;
let num = 0;
let promisearray;

//버튼누를떄마다 스타트와 라스트값조정
window.addEventListener('load',function(){
   /*let req = new XMLHttpRequest();
    let address="https://hacker-news.firebaseio.com/v0/topstories.json";
    req.addEventListener('load',function(){
        console.log(req.response);
        jsonobj=req.response;
    });
    req.responseType="json";

    req.open("GET",address,true);
    req.send(null);
    */
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
    .then(function(res){
        if(res.ok){ 
            return res.json();//resolve에 결과값담아서 넘김
        }else{
            throw new Error("통신불가!");
        }
    })
    .then(function(arr){
        jsonobj = arr;
        //이 배열값을 가지고 아이디값을 토대로 또 요청하여 main부에 뿌린다.
        topstoryMake(jsonobj);
    });
});

function Moreclick(){
    let cont = document.getElementsByClassName("contentPrint");
    cont[0].innerHTML = '';
    start= start+30;
    last = last +30;
    topstoryMake(jsonobj);
}
function newclick(){
    let cont = document.getElementsByClassName("contentPrint");
    cont[0].innerHTML = '';
    start= start+30;
    last = last +30;
    newstoryMake(newstory);
}
let Morebtn = document.getElementsByClassName("More");
Morebtn[0].addEventListener("click",Moreclick);

let newpart = document.getElementById("newpart");
newpart.addEventListener('click',function(){
    num = 0;
    start =0;
    last = 30;
    fetch("https://hacker-news.firebaseio.com/v0/newstories.json")
    .then(function(res){
        if(res.ok){
            return res.json();
        }else{
            throw new Error("통신불가!");
        }
    })
    .then(function(json){
        newstory=json;
        newstoryMake(newstory);
    });


    let cont = document.getElementsByClassName("contentPrint");
    cont[0].innerHTML = '';
    let morebutton = document.createElement("button");
    morebutton.classList.add("More");
    morebutton.addEventListener('click',newclick);
    morebutton.innerHTML = "More";
    let buttondiv = document.getElementById("buttondiv");
    buttondiv.innerHTML = '';
    buttondiv.appendChild(morebutton);
});
function showclick(){
    let cont = document.getElementsByClassName("contentPrint");
    cont[0].innerHTML = '';
    start= start+30;
    last = last +30;
    showstoryMake(showstory);
}
function askclick(){
    let cont = document.getElementsByClassName("contentPrint");
    cont[0].innerHTML = '';
    start= start+30;
    last = last +30;
    askstoryMake(askstory);
}
function jobclick(){
    let cont = document.getElementsByClassName("contentPrint");
    cont[0].innerHTML = '';
    start= start+30;
    last = last +30;
    jobstoryMake(jobstory);
}
function jobstoryMake(obj){
    createContent(obj);
    Promise.all(promisearray)
    .then(function(json){
        json.forEach(function(curValue){
            if(curValue!==null){
            let flewhour = parseInt(Date.now()/1000);
            console.log(curValue);
                let contenthour = curValue.time;
                let minushour = new Date(flewhour - contenthour);
                
                let divTag = document.createElement('div'); 
                let link = document.createElement('a');
                link.classList.add("link");
                let bottomdivTag = document.createElement('div'); 
                bottomdivTag.classList.add("bottomdivTag");
                let ago = document.createElement('a');
                ago.href = "#";
                if(minushour>86400){
                    ago.innerHTML = `${parseInt(minushour/86400)}days ago |`;
                }else if(minushour>3600 && minushour<86400 ){
                    ago.innerHTML = `${parseInt(minushour/3600)}hours ago |`;
                }else if(minushour>60 && minushour<3600){
                    ago.innerHTML = `${parseInt(minushour/60)}minute ago |`;
                }else if(minushour <60){
                    ago.innerHTML = `0 minute ago |`;
                }
                bottomdivTag.appendChild(ago);
                
                let content = document.createElement('span');
                link.innerHTML = curValue.title;
                link.href = curValue.url;
                content.appendChild(link);
                
                divTag.appendChild(content);
                divTag.appendChild(bottomdivTag);
                let cont = document.getElementsByClassName("contentPrint");
                cont[0].appendChild(divTag);
            }
        })
    })
}
function askstoryMake(obj){
    createContent(obj);
    Promise.all(promisearray)
    .then(function(json){
        json.forEach(function(curValue){
            if(curValue!==null){
            let flewhour = parseInt(Date.now()/1000);
            console.log(curValue);
                let contenthour = curValue.time;
                let minushour = new Date(flewhour - contenthour);
                
                let divTag = document.createElement('div'); 
                let number = document.createElement('span');
                let link = document.createElement('a');
                link.classList.add("link");
                let bottomdivTag = document.createElement('div'); 
                bottomdivTag.classList.add("bottomdivTag");
                let point = document.createElement('span');
                point.innerHTML = `${curValue.score} points by`;
                let nickname = document.createElement('a');
                nickname.href = "#";
                let ago = document.createElement('a');
                ago.href = "#";
                if(minushour>86400){
                    ago.innerHTML = `${parseInt(minushour/86400)}days ago |`;
                }else if(minushour>3600 && minushour<86400 ){
                    ago.innerHTML = `${parseInt(minushour/3600)}hours ago |`;
                }else if(minushour>60 && minushour<3600){
                    ago.innerHTML = `${parseInt(minushour/60)}minute ago |`;
                }else if(minushour <60){
                    ago.innerHTML = `0 minute ago |`;
                }
                nickname.innerHTML = curValue.by;
        
                bottomdivTag.appendChild(point);
                bottomdivTag.appendChild(nickname);
                bottomdivTag.appendChild(ago);
                let comment = document.createElement('a');
                comment.href = "#";
                comment.innerHTML = `${curValue.descendants} comments`;
                bottomdivTag.appendChild(comment);
                number.classList.add("number");
                number.innerHTML = ++num;
                let content = document.createElement('span');
                link.innerHTML = curValue.title;
                link.href = curValue.url;
                content.appendChild(link);
                divTag.appendChild(number);
                divTag.appendChild(content);
                divTag.appendChild(bottomdivTag);
                let cont = document.getElementsByClassName("contentPrint");
                cont[0].appendChild(divTag);
            }
        })
    })
}
let jobpart = document.getElementById("jobpart");
    jobpart.addEventListener("click",function(){
        num = 0;
        start =0;
        last = 30;
        fetch("https://hacker-news.firebaseio.com/v0/jobstories.json")
        .then(function(res){
            if(res.ok){
                return res.json();
            }else{
                throw new Error("통신불가!");
            }
        })
        .then(function(json){
            jobstory=json;
            jobstoryMake(jobstory);
        });

        let cont = document.getElementsByClassName("contentPrint");
        cont[0].innerHTML = '';
        let morebutton = document.createElement("button");
        morebutton.classList.add("More");
        morebutton.addEventListener('click',jobclick);
        morebutton.innerHTML = "More";
        let buttondiv = document.getElementById("buttondiv");
        buttondiv.innerHTML = '';
        buttondiv.appendChild(morebutton);
    })
let askpart = document.getElementById("askpart");
    askpart.addEventListener("click",function(){
        num = 0;
        start =0;
        last = 30;
        fetch("https://hacker-news.firebaseio.com/v0/askstories.json")
        .then(function(res){
            if(res.ok){
                return res.json();
            }else{
                throw new Error("통신불가!");
            }
        })
        .then(function(json){
            askstory=json;
            askstoryMake(askstory);
        });

        let cont = document.getElementsByClassName("contentPrint");
        cont[0].innerHTML = '';
        let morebutton = document.createElement("button");
        morebutton.classList.add("More");
        morebutton.addEventListener('click',askclick);
        morebutton.innerHTML = "More";
        let buttondiv = document.getElementById("buttondiv");
        buttondiv.innerHTML = '';
        buttondiv.appendChild(morebutton);
    });
function showstoryMake(obj){
    createContent(obj);
    Promise.all(promisearray)
    .then(function(json){
        json.forEach(function(curValue){
            if(curValue!==null){
            let flewhour = parseInt(Date.now()/1000);
            console.log(curValue);
                let contenthour = curValue.time;
                let minushour = new Date(flewhour - contenthour);
                
                let divTag = document.createElement('div'); 
                let number = document.createElement('span');
                let link = document.createElement('a');
                link.classList.add("link");
                let bottomdivTag = document.createElement('div'); 
                bottomdivTag.classList.add("bottomdivTag");
                let point = document.createElement('span');
                point.innerHTML = `${curValue.score} points by`;
                let nickname = document.createElement('a');
                nickname.href = "#";
                let ago = document.createElement('a');
                ago.href = "#";
                if(minushour>86400){
                    ago.innerHTML = `${parseInt(minushour/86400)}days ago |`;
                }else if(minushour>3600 && minushour<86400 ){
                    ago.innerHTML = `${parseInt(minushour/3600)}hours ago |`;
                }else if(minushour>60 && minushour<3600){
                    ago.innerHTML = `${parseInt(minushour/60)}minute ago |`;
                }else if(minushour <60){
                    ago.innerHTML = `0 minute ago |`;
                }
                nickname.innerHTML = curValue.by;
        
                bottomdivTag.appendChild(point);
                bottomdivTag.appendChild(nickname);
                bottomdivTag.appendChild(ago);
                let comment = document.createElement('a');
                comment.href = "#";
                comment.innerHTML = `${curValue.descendants} comments`;
                bottomdivTag.appendChild(comment);
                number.classList.add("number");
                number.innerHTML = ++num;
                let content = document.createElement('span');
                link.innerHTML = curValue.title;
                link.href = curValue.url;
                content.appendChild(link);
                divTag.appendChild(number);
                divTag.appendChild(content);
                divTag.appendChild(bottomdivTag);
                let cont = document.getElementsByClassName("contentPrint");
                cont[0].appendChild(divTag);
            }
        })
    })
}
let showpart = document.getElementById("showpart");
    showpart.addEventListener("click",function(){
        num = 0;
        start =0;
        last = 30;
        fetch("https://hacker-news.firebaseio.com/v0/showstories.json")
        .then(function(res){
            if(res.ok){
                return res.json();
            }else{
                throw new Error("통신불가!");
            }
        })
        .then(function(json){
            showstory=json;
            showstoryMake(showstory);
        });

        let cont = document.getElementsByClassName("contentPrint");
        cont[0].innerHTML = '';
        let morebutton = document.createElement("button");
        morebutton.classList.add("More");
        morebutton.addEventListener('click',showclick);
        morebutton.innerHTML = "More";
        let buttondiv = document.getElementById("buttondiv");
        buttondiv.innerHTML = '';
        buttondiv.appendChild(morebutton);
    });



//컨텐츠생성함수
function createContent(obj){
    promisearray = [];
    for(let i=start; i<last; i++){
        promisearray.push(fet(i,obj));
        if(i === obj.length-1){
            let Morebtn = document.getElementsByClassName("More");
            Morebtn[0].classList.add("hide");
            break;
        }
    }
}
   
function fet(num,obj){
    return fetch(`https://hacker-news.firebaseio.com/v0/item/${obj[num]}.json`).then(function(res){
        if(res.ok){
            return res.json();
        }else{
            throw new Error("통신불가!");
        }
    })    
}
function newstoryMake(obj){
    
    createContent(obj);
    Promise.all(promisearray)
    .then(function(json){
        json.forEach(function(curValue){
            if(curValue!==null){
            let flewhour = parseInt(Date.now()/1000);
            console.log(curValue);
                let contenthour = curValue.time;
                let minushour = new Date(flewhour - contenthour);
                
                let divTag = document.createElement('div'); 
                let number = document.createElement('span');
                let link = document.createElement('a');
                link.classList.add("link");
                let bottomdivTag = document.createElement('div'); 
                bottomdivTag.classList.add("bottomdivTag");
                let point = document.createElement('span');
                point.innerHTML = `${curValue.score} points by`;
                let nickname = document.createElement('a');
                nickname.href = "#";
                let ago = document.createElement('a');
                ago.href = "#";
                if(minushour>86400){
                    ago.innerHTML = `${parseInt(minushour/86400)}days ago |`;
                }else if(minushour>3600 && minushour<86400 ){
                    ago.innerHTML = `${parseInt(minushour/3600)}hours ago |`;
                }else if(minushour>60 && minushour<3600){
                    ago.innerHTML = `${parseInt(minushour/60)}minute ago |`;
                }else if(minushour <60){
                    ago.innerHTML = `0 minute ago |`;
                }
                nickname.innerHTML = curValue.by;
    
                let hiden = document.createElement('a');
                hiden.innerHTML= 'hide |';
                hiden.href = "#";
                hiden.classList.add("hiden")
            
                bottomdivTag.appendChild(point);
                bottomdivTag.appendChild(nickname);
                bottomdivTag.appendChild(ago);
                bottomdivTag.appendChild(hiden);
                
                number.classList.add("number");
                number.innerHTML = ++num;
                let content = document.createElement('span');
                link.innerHTML = curValue.title;
                link.href = curValue.url;
                content.appendChild(link);
                divTag.appendChild(number);
                divTag.appendChild(content);
                divTag.appendChild(bottomdivTag);
                let cont = document.getElementsByClassName("contentPrint");
                cont[0].appendChild(divTag);
            }
        })
    })
}


function topstoryMake(obj){
    createContent(obj);
    Promise.all(promisearray)//배열에담긴 promise들을 전부 실행하면 res.json()으로 리턴한 값들이 배열에 저장되고 resolve로 온값들이 then에 배열로넘겨짐
        .then(function(json){
            console.log(json);
            json.forEach(function(curValue){
                let flewhour = parseInt(Date.now()/1000);
                let contenthour = curValue.time
                let minushour = new Date(flewhour - contenthour);
                
                let divTag = document.createElement('div'); 
                let number = document.createElement('span');
                let link = document.createElement('a');
                link.classList.add("link");
                let bottomdivTag = document.createElement('div'); 
                bottomdivTag.classList.add("bottomdivTag");
                let point = document.createElement('span');
                point.innerHTML = `${curValue.score} points by`;
                let nickname = document.createElement('a');
                nickname.href = "#";
                let ago = document.createElement('a');
                ago.href = "#";
                if(minushour>86400){
                    ago.innerHTML = `${parseInt(minushour/86400)}days ago |`;
                }else if(minushour>3600 && minushour<86400 ){
                    ago.innerHTML = `${parseInt(minushour/3600)}hours ago |`;
                }else if(minushour>60 && minushour<3600){
                    ago.innerHTML = `${parseInt(minushour/60)}minute ago |`;
                }else if(minushour <60){
                    ago.innerHTML = `${minushour}second ago |`;
                }
                nickname.innerHTML = curValue.by;
    
                let hiden = document.createElement('a');
                hiden.innerHTML= 'hide |';
                hiden.href = "#";
                hiden.classList.add("hiden")
                
                bottomdivTag.appendChild(point);
                bottomdivTag.appendChild(nickname);
                bottomdivTag.appendChild(ago);
                bottomdivTag.appendChild(hiden);
                let comment = document.createElement('a');
                comment.href = "#";
                comment.innerHTML = `${curValue.descendants} comments`;
                bottomdivTag.appendChild(comment);
                number.classList.add("number");
                number.innerHTML = ++num;
                let content = document.createElement('span');
                link.innerHTML = curValue.title;
                link.href = curValue.url;
                content.appendChild(link);
                divTag.appendChild(number);
                divTag.appendChild(content);
                divTag.appendChild(bottomdivTag);
                let cont = document.getElementsByClassName("contentPrint");
                cont[0].appendChild(divTag);
            });
        });
}