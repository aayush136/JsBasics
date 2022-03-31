interface personDetails
{
    personName:string;
    mobileNo:number|string;
}
//using classes
class person implements personDetails
{
   personName: string;
   mobileNo:string|number;
   constructor(personName:string,mobileNo:string|number)
   {
       this.personName=personName;
       this.mobileNo=mobileNo;
   }
   show():void
   {
       console.log(`${this.personName} mobile number is ${this.mobileNo}`);
       
   }
}
const Person=new person("Aayush","8570844828")
Person.show();