
import express from 'express';
import { createReferral, getAllReferrals } from '../controllers/referralController.js';

export const approuter = express.Router();

approuter.post('/referral', createReferral);
approuter.get('/getreferral', getAllReferrals);


