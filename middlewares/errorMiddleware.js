export const errorMiddleware = (err, req, res, next) => {
	res.locals.message = err.message;
	res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
	res.status(err.status || 500);
	res.json({
		ok: false,
		message: err.message
	});
};