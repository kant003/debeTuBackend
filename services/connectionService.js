import { Connection } from "../models/connection.js";



const connectToCreditor = async(userIdCreditor, userIdDeptor)=>{
    const newConnection = new Connection()
    newConnection.creditor=userIdCreditor
    newConnection.debtor=userIdDeptor
    newConnection.debts=[]
    return await newConnection.save()
}

const disconnectToCreditor = async(idConnection)=>
    await Connection.findByIdAndUpdate(idConnection, {active:false})

const getConnectionFromUsersIds= async(userIdCreditor, userIdDeptor) => 
    await Connection.findOne(
        {deptor: userIdDeptor, creditor:userIdCreditor}
    )

export {connectToCreditor, disconnectToCreditor, getConnectionFromUsersIds}