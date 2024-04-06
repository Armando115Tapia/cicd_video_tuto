export async function handler(event: string, context: string) {
  console.log("Stage name is: " + process);
  return {
    body: "Hello from a lambda Functions",
    statusCode: 200,
  };
}
