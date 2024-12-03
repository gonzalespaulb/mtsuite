import twilio from 'twilio';

import Environment from '@src/constants/environment';

// **** SMS Setup **** //
const sms = twilio(Environment.Twilio.AccountSID, Environment.Twilio.AuthToken);

// **** Functions **** //
const sendSms = async (body: string, to: string): Promise<boolean> => {
  try {
    await sms.messages.create({
      body,
      from: Environment.Twilio.From,
      to,
    });

    return true;
  } catch (err) {
    return false;
  }
};

export default { sendSms } as const;
