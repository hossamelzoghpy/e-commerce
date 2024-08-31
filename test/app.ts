let num:number=10
let names:string="hossam" //name is reserved
let arr:[string,number]=['hossam',25]
console.log(arr)
let user1: User = {
    id: '1',
    name: 'Hossam',
    age: 25,
    gender: "male",
    email: '',
  }
  let user2: User = {
    id: '2',
    name: 'Fatma',
    age: 30,
    gender: "female",
  }
  type User ={
    readonly id:string,
    name:string,
    age:number,
    email?:string,
    gender:Gender


  }
type Gender= "male"|"female"
console.log(user1.name)
console.log(user2.name)