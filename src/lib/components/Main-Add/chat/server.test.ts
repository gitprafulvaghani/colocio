import { describe, expect, it } from "vitest";
import { POST } from "./+server";

describe("+server.ts", () => {
	it("POST handler should return a response", async () => {
		const mockRequest = {
			json: () =>
				Promise.resolve({
					messages: [
						{
							role: "system",
							content: "You are a helpful assistant, your name is Pareto",
						},
						{
							role: "user",
							content: "Hello, Pareto",
						},
					],
				}),
		};

		const response = await POST({ request: mockRequest });
		expect(response).toBeDefined();
	});
});
