export default async (ctx, next) => {
    try {
        await next();
        const status = ctx.status || 404
        if (status === 404) {
            ctx.throw(404)
        }
    } catch (err) {
        // TEMP
        console.log(err)
        // TEMP
        ctx.status = err.status || err.code;
        ctx.body = {
            success: false,
            message: err.message,
        };
    }
}