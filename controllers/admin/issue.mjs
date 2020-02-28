import {
    IssueModel
} from "../../models/models";

export default {
    async getAllIssues(ctx) {
        let targetStatus = true;
        if (ctx.request.query.inactive) {
            targetStatus = false;
        }

        const issues = await IssueModel.find({
            active: targetStatus,
        });

        ctx.body = {
            success: true,
            body: issues,
        };
    },
    async closeIssue(ctx) {
        let issue = IssueModel.findById(ctx.request.body.id);

        if (!issue) {
            ctx.throw(400, 'Incorrect issue id');
        }

        issue.active = false;

        await issue.save();

        ctx.body = {
            success: true,
        };
    },
    async closeByIp(ctx) {
        await IssueModel.updateMany({
            ip: ctx.request.body.ip,
        }, {
            active: false,
        });

        ctx.body = {
            success: true,
        };
    },
    async closeAll(ctx) {
        await IssueModel.update({
            active: false,
        });

        ctx.body = {
            success: true,
        };
    }
}