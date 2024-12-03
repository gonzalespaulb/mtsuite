export default {
  NodeEnv: process.env.NODE_ENV ?? '',
  Port: process.env.PORT ?? 0,
  Db: process.env.DATABASE ?? undefined,
  DbPass: process.env.DATABASE_PASSWORD ?? '',
  Email: {
    User: process.env.EMAIL_USER ?? '',
    Password: process.env.EMAIL_PASSWORD ?? '',
    Service: process.env.EMAIL_SERVICE ?? '',
    Port: process.env.EMAIL_PORT ?? '',
  },
  Twilio: {
    AccountSID: process.env.TWILIO_ACCOUNT_SID ?? '',
    AuthToken: process.env.TWILIO_AUTH_TOKEN ?? '',
    From: process.env.TWILIO_FROM ?? '',
  },
  Jwt: {
    Secret: process.env.JWT_SECRET ?? '',
    Exp: process.env.COOKIE_EXP ?? '',
  },
  CookieProps: {
    Key: 'jwt',
    Options: {
      // Convenient option for setting the expiry time relative to the current time in milliseconds
      maxAge: Number(process.env.COOKIE_EXP ?? 0),
      // Indicates if the cookie should be signed.
      signed: true,
      // Flags the cookie to be accessible only by the web server.
      httpOnly: true,
      // Path for the cookie. Defaults to "/"
      path: process.env.COOKIE_PATH ?? '',
      // Marks the cookie to be used with HTTPS only.
      secure: process.env.SECURE_COOKIE === 'true',
    },
  },
  S3: {
    S3BucketName: process.env.S3_BUCKET_NAME ?? '',
    S3BucketRegion: process.env.S3_BUCKET_REGION ?? '',
    S3AccessKey: process.env.S3_ACCESS_KEY ?? '',
    S3SecretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? '',
  },
} as const;
