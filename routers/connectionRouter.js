import { Router } from "express";
import passport from "passport";
import * as connectionController from '../controllers/connectionController.js'

const connectionRouter = Router()
connectionRouter.post('/connectToCreditor/:email',
    passport.authenticate('jwt', {session:false}), 
    connectionController.connectToCreditor)

connectionRouter.patch('/disconnectToCreditor/:email',
    passport.authenticate('jwt', {session:false}), 
    connectionController.disconnectToCreditor)


connectionRouter.get('/getMyDebtors/', 
    passport.authenticate("jwt", { session: false }), 
    connectionController.getMyDebtors)

connectionRouter.get('/getMyCreditors/', 
    passport.authenticate("jwt", { session: false }), 
    connectionController.getMyCreditors)

export default connectionRouter
