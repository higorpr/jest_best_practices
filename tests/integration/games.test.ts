import app from "app";
import { cleanDB } from "services/helpers";
import supertest from "supertest";
import { createConsole } from "../factories/console-factories";
import { createGame } from "../factories/games-factories";
import { faker } from "@faker-js/faker";
import prisma from "config/database";

const api = supertest(app);

beforeAll(async () => {
	await cleanDB();
});

describe("/GET games", () => {
	it("should return status code 200 and the array of games", async () => {
		await createGame();
		const response = await api.get("/games");

		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual(
			expect.arrayContaining([
				{
					id: expect.any(Number),
					title: expect.any(String),
					consoleId: expect.any(Number),
					Console: {
						id: expect.any(Number),
						name: expect.any(String),
					},
				},
			])
		);
	});
});

describe("/GET games/:id", () => {
	it("should return status code 200 and the game on the parameter :id", async () => {
		const game = await createGame();
		const response = await api.get(`/games/${game.id}`);
		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual(
			expect.objectContaining({
				id: expect.any(Number),
				title: expect.any(String),
				consoleId: expect.any(Number),
			})
		);
	});
	it("should return stats code 404", async () => {
		const response = await api.get(`/games/8000`);
		expect(response.statusCode).toBe(404);
	});
});

describe("/POST games", () => {
	it("should return status code 201 and insert entry", async () => {
		const cons = await createConsole();
		const title = faker.datatype.string();
		const body = { title, consoleId: cons.id };
		const response = await api.post("/games").send(body);
		expect(response.statusCode).toBe(201);
		const search = await prisma.game.findFirst({
			where: {
				title: title,
			},
		});
		expect(search.title).toBe(title);
		expect(response.statusCode).toBe(201);
	});
	it("should return status code 409", async () => {
		const cons = await createConsole();
		const title = faker.datatype.string();
		const body = { title, consoleId: cons.id };
		await api.post("/games").send(body);
		const response = await api.post("/games").send(body);
		expect(response.statusCode).toBe(409);
	});
});
