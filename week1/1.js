console.log("start")

setTimeout(()=>{
    console.log(one());
},3000);

console.log("mid")

function one(){
    console.log(name);
    var name="love";
    console.log(name)

    three();
}

setTimeout(()=>{
    two();
},1000);

function two(){
    console.log(name);
    let id=23;
    console.log(id);
    console.log(three());
    return 2;
}

function three(){
    return "hello from fn 3"
}

setinterval(()=>{
    console.log(three());
},10000);

console.log("end");