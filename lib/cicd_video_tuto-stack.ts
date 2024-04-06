import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { CodePipeline, CodePipelineSource, ManualApprovalStep, ShellStep } from "aws-cdk-lib/pipelines";
import { MyPipelineAppStage } from "./stage";

export class CicdVideoTutoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, "Pipeline", {
      pipelineName: "TestPipeline",
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub("Armando115Tapia/cicd_video_tuto", "master"),
        commands: ["npm ci", "npm run build", "npx cdk synth"],
      }),
    });
    //
    const testingStage = pipeline.addStage(
      new MyPipelineAppStage(this, "QA", {
        env: {
          account: "381492260472",
          region: "us-east-1",
        },
      }),
    );

    testingStage.addPost(new ManualApprovalStep("Manual approval before UAT"));

    const prodStage = pipeline.addStage(
      new MyPipelineAppStage(this, "UAT", {
        env: {
          account: "381492260472",
          region: "us-east-1",
        },
      }),
    );
  }
}
