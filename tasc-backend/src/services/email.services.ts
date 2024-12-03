import nodemailer from 'nodemailer';
import sgMail, { MailService } from '@sendgrid/mail';

import Environment from '@src/constants/environment';
import fullDateTime from '@src/util/full-date-time.util';
import deleteScheduleView from '@src/views/email/delete-schedule-view';
import newScheduleView from '@src/views/email/new-schedule-view';
import resetPasswordView from '@src/views/email/reset-password-view';
import forgotPasswordView from '@src/views/email/forgot-password-view';
import failSentScheduleView from '@src/views/email/fail-sent-schedule-view';

// **** Email Setup **** //
const transporter =
  Environment.NodeEnv === 'production'
    ? sgMail
    : Environment.NodeEnv === 'development'
    ? sgMail
    : nodemailer.createTransport({
        service: Environment.Email.Service,
        auth: {
          user: Environment.Email.User,
          pass: Environment.Email.Password,
        },
      });
// NOTE: BOTTOM IS FOR TESTING PURPOSES
// const transporter = sgMail;

// **** Functions **** //
const resetPassword = async (
  code: string,
  email: string,
  subject: string,
  url: string,
  validLength: string
): Promise<boolean> => {
  try {
    if (transporter instanceof MailService) {
      transporter.setApiKey(Environment.Email.Password);

      await transporter.send({
        from: 'helpdesk@mtsuite.io',
        to: email,
        // subject: 'Reset Password - mtsüite',
        subject,
        html: resetPasswordView(code, url, validLength),
      });
    } else {
      await transporter.sendMail({
        from: 'helpdesk@mtsuite.io',
        to: email,
        // subject: 'Reset Password - mtsüite',
        subject,
        html: resetPasswordView(code, url, validLength),
      });
    }

    return true;
  } catch (err) {
    return false;
  }
};

const forgotPassword = async (
  code: string,
  email: string,
  subject: string,
  url: string,
  validLength: string
): Promise<boolean> => {
  try {
    if (transporter instanceof MailService) {
      transporter.setApiKey(Environment.Email.Password);

      await transporter.send({
        from: 'helpdesk@mtsuite.io',
        to: email,
        subject,
        html: forgotPasswordView(code, url, validLength),
      });
    } else {
      await transporter.sendMail({
        from: 'helpdesk@mtsuite.io',
        to: email,
        subject,
        html: forgotPasswordView(code, url, validLength),
      });
    }

    return true;
  } catch (err) {
    return false;
  }
};

const newSchedule = async (
  date: string,
  designation: string,
  email: string,
  location: string,
  startTime: string,
  subject: string,
  url: string
): Promise<boolean> => {
  try {
    if (transporter instanceof MailService) {
      transporter.setApiKey(Environment.Email.Password);

      await transporter.send({
        from: 'helpdesk@mtsuite.io',
        to: email,
        subject: `${subject} - mtsüite`,
        html: newScheduleView(date, designation, location, startTime, url),
      });
    } else {
      await transporter.sendMail({
        from: 'helpdesk@mtsuite.io',
        to: email,
        subject: `${subject} - mtsüite`,
        html: newScheduleView(date, designation, location, startTime, url),
      });
    }

    return true;
  } catch (err) {
    if (transporter instanceof MailService) {
      transporter.setApiKey(Environment.Email.Password);

      await transporter.send({
        from: 'helpdesk@mtsuite.io',
        to: 'dev@mtsuite.io',
        subject: `${subject} - mtsüite`,
        html: failSentScheduleView(email, `${designation} - ${location}`, date),
      });
    } else {
      await transporter.sendMail({
        from: 'helpdesk@mtsuite.io',
        to: 'dev@mtsuite.io',
        subject: `${subject} - mtsüite`,
        html: failSentScheduleView(email, `${designation} - ${location}`, date),
      });
    }

    return false;
  }
};

const deleteSchedule = async (
  date: string,
  designation: string,
  email: string,
  location: string,
  startTime: string
): Promise<boolean> => {
  try {
    if (transporter instanceof MailService) {
      transporter.setApiKey(Environment.Email.Password);

      await transporter.send({
        from: 'helpdesk@mtsuite.io',
        to: email,
        subject: `Removed from schedule for ${date} - mtsüite`,
        html: deleteScheduleView(date, designation, location, startTime),
      });
    } else {
      await transporter.sendMail({
        from: 'helpdesk@mtsuite.io',
        to: email,
        subject: `Removed from schedule for ${date} - mtsüite`,
        html: deleteScheduleView(date, designation, location, startTime),
      });
    }

    return true;
  } catch (err) {
    return false;
  }
};

export default { deleteSchedule, newSchedule, resetPassword, forgotPassword } as const;
