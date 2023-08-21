import { app } from "@azure/functions";

app.http("helloWorld", {
  methods: ["GET", "POST"],
  handler: async (request, context) => {
    context.log("Http function processed request");

    const name = request.query.get("name") || (await request.text()) || "world";

    return { status: 200, body: `Hello, ${name}!` };
  },
});
