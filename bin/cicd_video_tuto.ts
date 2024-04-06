#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CicdVideoTutoStack } from "../lib/cicd_video_tuto-stack";

const app = new cdk.App();
new CicdVideoTutoStack(app, "CicdVideoTutoStack", {
  env: {
    account: "381492260472",
    region: "us-east-1",
  },
});

app.synth();
