    let cnt=1;
    function onClick(){
         const input =document.querySelector("input");//dom html 
        const value=input.value;
        //document.querySelector("h4").innerText=value;

    const divL = document.createElement("div");
    divL.setAttribute("id",cnt);
   
        divL.innerHTML=`${value} <button onclick='deletetodo(${cnt})'>delete</button>   `;
         cnt=cnt+1
    const parentL=document.querySelector("#todo-list");
    parentL.appendChild(divL);
    }



    // const input2=document.querySelectorAll("h4");
    // console.log(input2);

    // let cnt=0;
    // function counter(){
    //     document.querySelectorAll("h4")[1].innerHTML=cnt;
    //     cnt++;
    // }
//setInterval(counter,500);

//deleteing the child cant delete the parent parent to child
//element.parentNode.removeChild(element);

function deletetodo(index){
    const ele=document.getElementById(index);
    ele.parentNode.removeChild(ele);
}


