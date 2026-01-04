
// const express=require("express")
// const app=express();
// async function main(){
//     const response=fetch("https://httpdump.app/dumps/d123f3a1-7b20-4ac1-9386-1faf2e85ef16",
//         {
//             method:"POST"
//         }
//     );
//     const json=await response.json();
//     console.log(json);
// }
// app.get('/',(req,res)=>{
//     res.send(main());
// })
// app.listen(3000)

//in axios we do like this way

// const axios=require("axios")
// async function main(){
//     const response=await axios.get("https://httpdump.app/dumps/d123f3a1-7b20-4ac1-9386-1faf2e85ef16");
//     //const json=await response.json();  auto handel by the axios
//     console.log(response.data);
// }
// main();
//above is get below is post and so on we can chanege

// async function main(){
//     const response=await axios.post("http://sum-server.100xdevs.com/todos");
//     //const json=await response.json();  auto handel by the axios
//     console.log(json.todos.length);
// }


const axios=require("axios")
async function main(){
    const response=await axios.post("https://httpdump.app/dumps/d123f3a1-7b20-4ac1-9386-1faf2e85ef16",
        {
            username:"aditya77",
            password:"1234qwerty"
        },
        {
            headers:{
                Authorization:"Bearer 123"
            },
        },
    );
    //const json=await response.json();  auto handel by the axios
    console.log(response.data);
}
main();