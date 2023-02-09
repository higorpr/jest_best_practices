import app from "app";
import { cleanDB } from "services/helpers";
import supertest from "supertest";
import {
	createConsole,
	createConsoles,
	getConsole,
} from "../factories/console-factories";

const api = supertest(app);

beforeAll(async () => {
	await cleanDB();
});

describe("/GET consoles", () => {
	it("should status code 200 and array of consoles", async () => {
		await createConsoles();
		const response = await api.get("/consoles");
		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual(
			expect.arrayContaining([
				{
					id: expect.any(Number),
					name: expect.any(String),
				},
			])
		);
	});
});

describe("/GET consoles/:id", () => {
	it("should return status code 200 and console info", async () => {
		const createdConsole = await createConsole();
		const response = await api.get(`/consoles/${createdConsole.id}`);
		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual({
			id: createdConsole.id,
			name: createdConsole.name,
		});
	});
});

describe("/POST consoles", () => {
	it("should return status code 422", async () => {
		const response = await api.post("/consoles").send({ name: 1 });
		expect(response.statusCode).toBe(422);
	});
	it("should return status code 201 and a defined console BD entry", async () => {
		const consoleName = "Nintendo;";
		const response = await api
			.post("/consoles")
			.send({ name: consoleName });

		const search = await getConsole(consoleName);

		expect(response.statusCode).toBe(201);
		expect(search.name).toBe(consoleName);
	});
});
