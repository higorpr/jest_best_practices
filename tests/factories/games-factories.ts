import { faker } from "@faker-js/faker";
import prisma from "config/database";
import { createConsole } from "./console-factories";

export async function createGame() {
	const cons = await createConsole();
	const game = await prisma.game.create({
		data: {
			title: faker.datatype.string(),
			consoleId: cons.id,
		},
	});
	return game;
}
