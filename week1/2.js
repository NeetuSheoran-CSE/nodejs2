console.log(two())
function one(){
    console.log(name);
    var name="ram";
    console.log(name)
    return 1;
    three();
    console.log("hello from fn 1")
}
one()
function two(){
    console.log(id);
    let id=23;
    console.log(id);
    return 2;
    console.log("hello from 2")
}

function three(){
    console.log("hello from fn 3")
    return 3;
}