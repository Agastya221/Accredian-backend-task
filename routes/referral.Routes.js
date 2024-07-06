
import express from 'express';
import { createReferral } from '../controllers/referralController.js';

export const approuter = express.Router();

approuter.post('/referral', createReferral);


