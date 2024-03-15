export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    console.log("Registering server worker");
    const { server } = await import("./app/shared/mocks/server");
    server.listen();
  }
}
