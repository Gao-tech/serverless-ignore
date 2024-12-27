# README: Serverless Framework, GitHub Actions, HTTP API Gateway, and AWS Lambda

This README provides step-by-step instructions for setting up and deploying a simple REST API using the Serverless Framework, GitHub Actions, and AWS Lambda.

## Key Objectives
- Gain fundamental knowledge of Serverless Framework, GitHub Actions, HTTP API Gateway, and Lambda in AWS.
- Create separate environments for development and production.

---

## Step 1: Repository Setup
1. Create a repository on GitHub with the following branches:
   - **main**: Production environment.
   - **development**: Development environment.
   - **test**: A working branch based on the development branch.

---

## Step 2: Run Serverless Locally
1. Install Node.js in your system: `npm`
2. Install the Serverless Framework globally (if not already installed):
   ```bash
   npm i serverless -g
   ```
3. Create a new Serverless service:
   ```bash
   serverless
   ```
4. Check the Serverless Framework version:
   ```bash
   serverless -v
   ```
5. Download project dependencies:
   ```bash
   npm i
   ```
6. Run Serverless locally:
   ```bash
   npm run start:offline
   ```

---

## Step 3: Create a Simple REST API Function
1. Create a `shopping` function in `index.ts`:
   ```typescript
   export const shopping = async (
     event: APIGatewayEvent,
     context: Context
   ): Promise<APIGatewayProxyResult> => {
     console.log(`Event: ${JSON.stringify(event)}`);
     console.log(`Context: ${JSON.stringify(context)}`);
     return {
       statusCode: 200,
       body: 'Big discount',
     };
   };
   ```

2. Create a `serverless.yml` configuration file. Ensure it corresponds with the Actions YAML file in `.github/workflows`:
   ```yaml
   service: simple-service    # Your project name
   frameworkVersion: '3'
   provider:
     name: aws
     runtime: nodejs20.x
     stage: ${env:STAGE, self:custom.defaultStage}    # Define STAGE in the Actions file
     stackName: '${self:service}-${self:provider.stage}'
     apiName: '${self:service}-${self:provider.stage}'
     region: '${env:AWS_REGION, 'us-west-2'}'   # Use AWS_REGION from Actions or default to 'us-west-2'
     memorySize: 128
     timeout: 30
     environment:
       LOG_LEVEL: debug
   custom:
     defaultStage: development
   package:
     exclude:
       - tests/**
   plugins:
     - serverless-deployment-bucket
     - serverless-plugin-typescript
     - serverless-offline
   functions:          # Lambda function definitions
     shopping:         # Function name
       handler: index.shopping   # File and function name
       events:                   # Trigger via API Gateway
         - http:
             path: festival      # Path
             method: get         # HTTP method
   ```

---

## Step 4: Setup Deployment Environments
### Actions Workflow Setup
Configure two environments in GitHub Actions to deploy to different AWS regions:

1. **Development Environment** (Region: `eu-central-1`):
   ```yaml
   env:
     _ENVIRONMENT: development
     STAGE: development
     AWS_REGION: eu-central-1
   ```

2. **Production Environment** (Region: `eu-north-1`):
   ```yaml
   env:
     _ENVIRONMENT: production
     STAGE: production
     AWS_REGION: eu-north-1
   ```

---

## Step 5: Create an IAM User
Grant the following AWS permissions to the IAM user:
1. `IAMFullAccess`
2. `AmazonS3FullAccess`
3. `AWSLambda_FullAccess`
4. `AmazonAPIGatewayInvokeFullAccess`
5. `AmazonAPIGatewayAdministrator`
6. `AWSCloudFormationFullAccess`
7. `CloudWatchFullAccess`

---

## Step 6: Store Access Keys in GitHub Secrets
Store your AWS access keys securely in GitHub:
1. Navigate to **Settings > Secrets and variables > Actions**.
2. Add the following secrets:
   ```
   AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
   AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}

   PROD_AWS_ACCESS_KEY_ID: ${{ secrets.PROD_AWS_ACCESS_KEY_ID }}
   PROD_AWS_SECRET_ACCESS_KEY: ${{ secrets.PROD_AWS_SECRET_ACCESS_KEY }}
   ```

---

## Step 7: Test and Deploy
1. Use the `test` branch as the working branch. Commit your changes and merge into the `development` branch.
2. Any changes in the `development` branch trigger deployment in Actions. Verify the deployment in AWS:
   - Check **CloudFormation** (Region: `eu-central-1`).
3. Merge `development` into the `main` branch for production deployment.
4. Production resources are created in the `eu-north-1` region.

---

## Step 8: Validate Resources
1. Verify that S3 buckets and Lambda functions are created in the appropriate regions.
2. Test the deployed API Gateway by invoking the Lambda function (e.g., through the AWS Management Console).
3. Clean up resources by deleting the CloudFormation stack when done.

---

## Notes and Future Steps
- **Branch Protection Rules**: Currently, no branch protection rules are implemented. Adding rules will ensure a controlled workflow from development to production.
- Consider exploring additional automated tests or approval gates before merging into the `main` branch.

