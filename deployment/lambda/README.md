# PreDoc AWS Lambda

Build: `npm run build:lambda`. Upload `dist-lambda/predoc-lambda.zip`.
The ZIP contains a bundled Node.js handler and all JavaScript dependencies.

## Configuration

- Runtime: Node.js 22.x; handler: `index.handler`; memory: 256 MB; timeout: 30 seconds.
- Use the basic Lambda execution role. No database, VPC or additional AWS service permissions are required.
- Set environment variables securely in the AWS console: `GROQ_API_KEY`, `PREDOC_ACCESS_TOKEN` (random 32+ characters), `ALLOWED_ORIGINS` (comma-separated origins). Optional `GROQ_MODEL` defaults to `openai/gpt-oss-20b`.
- Function URL auth: NONE. The handler enforces a separate bearer access code; do not expose a shared Groq key to the browser. The Function URL must allow both lambda:InvokeFunctionUrl and lambda:InvokeFunction as required by AWS. The handler supplies CORS; do not add a second conflicting CORS configuration.
- Set reserved concurrency to 1 if your account quota permits, short CloudWatch retention, and AWS billing alerts. The in-memory 20/minute safeguard is per warm instance, not a durable global quota or billing cap. Public Function URLs can incur invocation charges even when the application rejects a request.
- Keep this an invite-only prototype. An access code is not patient identity. For public patient use, add individual authentication and durable per-user quotas, and confirm provider arrangements for health data.

## Frontend

Set `PREDOC_API_URL` to the HTTPS Lambda Function URL before running `npm run build:pages`, or before starting the local Vite server. It is a public endpoint, not a secret. Enter the separate PreDoc access code in Hosted AI access; it stays in React memory, never in the compiled bundle or localStorage. No provider credential is bundled. Without the URL, the existing static/local behavior remains available.

Only symptom messages are accepted by the API; separate identity/history form fields are not sent. Free-text symptom messages may still contain sensitive information. The handler does not log request bodies, replies, tokens or provider errors. AWS can still record operational metadata. This function does not provide Microsoft Edge TTS.

## Tests

`npm run test:lambda` tests the bundled ZIP handler with a mocked provider: authentication, origins, request validation and size limits, grounded extraction, upstream failures and rate-limit responses. Real Groq inference must be tested after adding a key. Use synthetic examples for initial verification.

References: https://docs.aws.amazon.com/lambda/latest/dg/urls-auth.html and https://console.groq.com/docs/structured-outputs
