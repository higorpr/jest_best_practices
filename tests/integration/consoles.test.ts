import app from "app";
import prisma from "config/database";
import { cleanDB } from "services/helpers";
import supertest from "supertest";

const server = supertest(app);

beforeAll(async () => {
	await cleanDB();
});

describe("/GET consoles", () => {
	it("should return ok", async () => {
		
	});
});
