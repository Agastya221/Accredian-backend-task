
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const createReferral = async (req, res) => {
  const { userName, userEmail, referralName, referralEmail } = req.body;
  console.log(req.body);

  if (!userName || !userEmail || !referralName || !referralEmail) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (!validateEmail(userEmail) || !validateEmail(referralEmail)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    // Save referral data to the database
    const referral = await prisma.referral.create({
      data: { userName, userEmail, referralName, referralEmail },
    });

    // Send referral email
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: referralEmail,
      subject: 'You have been referred!',
      text: `Hello ${referralName},\n\nYou have been referred by ${userName} (${userEmail}).\n\nBest regards,\nReferral Team`,
    });

    res.status(201).json({ message: 'Referral submitted successfully', referral });
  } catch (error) {
    console.error('Error while submitting referral:', error);
    res.status(500).json({ error: 'Error while sending the mail' });
  }
};

// get all referrals
export const getAllReferrals = async (req, res) => {
  try {
    const referrals = await prisma.referral.findMany();
    res.status(200).json(referrals);
  } catch (error) {
    console.error('Error while retrieving referrals:', error);
    res.status(500).json({ error: 'Error while retrieving referrals' });
  }
};
