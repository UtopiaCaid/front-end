export class Account {
    username: String;
    email: String;
    password: String;
    name: String;
    phone: String;
    dateCreated: String;
    accountNumber: String;
    roleId: 
    {
        roleId: String;
        roleType: String;
    }
    
    constructor() { 
        // Initialization inside the constructor
        this.username = "null";
        this.email = "null";
        this.password = "null";
        this.name = "null";
        this.phone = "null";
        this.dateCreated = "null";
        this.accountNumber = "null";
        this.roleId = {
            roleId : "null",
            roleType: "null"
        }
        // this.roleId.roleId = "null";
        // this.roleId.roleTYpe = "null";
     }
}