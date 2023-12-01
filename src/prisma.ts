import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
	if (hasUndefinedValue(params.args?.where)) throw new Error(`Invalid where: ${JSON.stringify(params.args.where)}`);
	return await next(params);
});

export default prisma;

function hasUndefinedValue<T>(obj: T): boolean {
	if (typeof obj !== "object" || obj === null) return false;
	for (const key in obj) {
		if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
		const value = obj[key];
		if (value === undefined) return true;
		if (typeof value === "object" && !Array.isArray(value)) if (hasUndefinedValue(value)) return true;
	}
	return false;
}

export const handlePrismaError = (err: unknown) => {
	let field: string | undefined;

	if (err instanceof Prisma.PrismaClientKnownRequestError) {
		switch (err.code) {
			case "P2002":
				// handling duplicate key errors
				field = (err.meta?.target as string | undefined)?.split("_")[0];

				return {
					success: false,
					status: 409,
					message: `Duplicate ${field}`,
					response: null,
				};
			case "P2014":
				// handling invalid id errors
				console.error("handling invalid id errors");
			case "P2003":
				// handling invalid data errors

				field = err.meta?.field_name as string | undefined;

				return {
					success: false,
					status: 422,
					message: `Invalid ${field}`,
					response: null,
				};

			default:
				// handling all other errors
				console.error("handling all other errors");
		}
	} else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
		// handle client errors with no specific error code
		console.error("handle client errors with no specific error code");
	} else if (err instanceof Prisma.PrismaClientValidationError) {
		// handle known validation errors
		console.error("handle known validation errors");
	} else if (err instanceof Prisma.PrismaClientInitializationError) {
		// handle connection errors during initialization
		console.error("handle connection errors during initialization");
	} else if (err instanceof Prisma.PrismaClientRustPanicError) {
		// restart server
		console.error("handle Rust panics");
	} else {
		// handle unknown errors
		console.error("handle unknown errors");
	}

	return null;
};
