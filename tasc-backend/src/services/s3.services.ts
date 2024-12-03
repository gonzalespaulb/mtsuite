import { NextFunction } from 'express';
import sharp from 'sharp';
import crypto from 'crypto';
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import Environment from '@src/constants/environment';
import * as AuthTypes from '@src/types/auth.types';
import * as UserTypes from '@src/types/user.types';
import { IReq } from '@src/types/misc';

// **** Types **** //
interface IFileDataRes {
  fileUrl: string;
  success: boolean;
}

// **** S3 Setup **** //
const s3 = new S3Client({
  region: Environment.S3.S3BucketRegion,
  credentials: {
    accessKeyId: Environment.S3.S3AccessKey,
    secretAccessKey: Environment.S3.S3SecretAccessKey,
  },
});

const defaultS3Image = 'default.png';

// **** Generate Unique S3 Key **** //
const generateS3Key = (bytes?: number | null) => crypto.randomBytes(bytes ?? 32).toString('hex');

// **** Functions **** //
const s3Upload = async (
  req: IReq<AuthTypes.IOnboarding | UserTypes.IUserOptions>,
  next: NextFunction
): Promise<IFileDataRes> => {
  const { file } = req;

  if (!file) {
    return { fileUrl: defaultS3Image, success: true };
  }

  const fileBuffer = await sharp(file.buffer).resize({ width: 400, height: 400, fit: 'cover' }).webp().toBuffer();

  if (!fileBuffer) {
    return { fileUrl: defaultS3Image, success: false };
  }

  const s3Key = generateS3Key();
  const contentType = !file.mimetype.includes('webp') ? 'image/webp' : file.mimetype;
  console.log(file.mimetype);

  const s3Command = new PutObjectCommand({
    Bucket: Environment.S3.S3BucketName,
    Key: s3Key,
    // Body: file.buffer,
    Body: fileBuffer,
    // ContentType: file.mimetype,
    ContentType: contentType,
  });

  const s3Send = await s3.send(s3Command);

  if (!s3Send) {
    return { fileUrl: defaultS3Image, success: false };
  }

  return { fileUrl: s3Key, success: true };
};

const s3Retrieve = async (s3Key: string): Promise<string> => {
  try {
    const s3Command = new GetObjectCommand({
      Bucket: Environment.S3.S3BucketName,
      Key: s3Key,
    });

    const s3Url = await getSignedUrl(s3, s3Command, { expiresIn: 60 });

    return s3Url;
  } catch (err) {
    const s3Command = new GetObjectCommand({
      Bucket: Environment.S3.S3BucketName,
      Key: defaultS3Image,
    });

    const s3Url = await getSignedUrl(s3, s3Command, { expiresIn: 60 });

    return s3Url;
  }
};

const s3Remove = async (s3Key: string): Promise<boolean> => {
  if (s3Key === defaultS3Image) {
    return true;
  }

  try {
    const s3Command = new DeleteObjectCommand({
      Bucket: Environment.S3.S3BucketName,
      Key: s3Key,
    });

    await s3.send(s3Command);

    return true;
  } catch (err) {
    return false;
  }
};

export default { s3Remove, s3Retrieve, s3Upload } as const;
