import Fastify from "fastify";

import prisma, { handlePrismaError } from "./prisma";

export const server = Fastify();

server.setErrorHandler(function (error, request, reply) {
	console.error(request.url);
	console.error(request.body);
	console.error(error.message);

	const res = handlePrismaError(error);

	if (res) {
		reply.status(res.status).send(res);
	}

	reply.status(500).send({
		success: false,
		status: 500,
		message: "Internal server error",
	});
});

server.get("/healthcheck", async () => {
	return { status: 200, success: true, message: "OK", response: null };
});

server.get("/dbhealthcheck", async () => {
	const res = await prisma.$queryRaw`SELECT 1;`;

	console.log(res);

	return { res: String(res) };
});

const main = async () => {
	try {
		await server.listen({
			host: "127.0.0.1",
			port: 3000,
		});

		console.log("Node running at http://localhost:3000");
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

main();
