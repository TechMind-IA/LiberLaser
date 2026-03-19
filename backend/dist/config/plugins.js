"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = ({ env }) => ({
    upload: {
        config: {
            provider: 'aws-s3',
            providerOptions: {
                accessKeyId: env('AWS_ACCESS_KEY_ID'),
                secretAccessKey: env('AWS_ACCESS_SECRET'),
                region: env('AWS_REGION'),
                params: {
                    ACL: env('AWS_ACL', 'public-read'),
                    Bucket: env('AWS_BUCKET'),
                },
            },
            actionOptions: {
                upload: {},
                uploadStream: {},
                delete: {},
            },
        },
    },
    'users-permissions': {
        config: {
            jwt: {
                expiresIn: '7d',
            },
            resetPasswordUrl: `${env('FRONTEND_URL', 'http://localhost:3000')}/redefinir-senha?code=`,
        },
    },
    email: {
        config: {
            provider: env('EMAIL_PROVIDER', 'sendgrid'),
            providerOptions: {
                apiKey: env('SENDGRID_API_KEY', ''),
            },
            settings: {
                defaultFrom: env('EMAIL_FROM', 'noreply@belezaacademy.com'),
                defaultReplyTo: env('EMAIL_REPLY_TO', 'noreply@belezaacademy.com'),
            },
        },
    },
});
exports.default = config;
