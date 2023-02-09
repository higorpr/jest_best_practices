import prisma from "config/database";
import { faker } from "@faker-js/faker";

export async function createConsoles() {
	await prisma.console.createMany({
		data: [
			{ name: faker.datatype.string() },
			{ name: faker.datatype.string() },
		],
	});
}

export async function createConsole() {
	const createdConsole = await prisma.console.create({
		data: { name: faker.datatype.string() },
	});
	return createdConsole;
}

export async function getConsole(consoleName: string) {
	const search = await prisma.console.findFirst({
		where: {
			name: consoleName,
		},
	});
	return search;
}
