#!/bin/bash

# Build the React app
npm run build

# Export to static
npm run export

# Sync the build directory to S3
aws s3 sync out/ s3://cdcteam4-fe

# Configure the S3 bucket as a static website
aws s3 website s3://cdcteam4-fe --index-document index.html

# Set the bucket policy to allow public read access
aws s3api put-bucket-policy --bucket cdcteam4-fe --policy "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Sid\":\"PublicReadForGetBucketObjects\",\"Effect\":\"Allow\",\"Principal\":\"*\",\"Action\":\"s3:GetObject\",\"Resource\":\"arn:aws:s3:::cdcteam4-fe/*\"}]}"
