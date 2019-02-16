import { 
    OblastModel, 
    CityModel, 
    MetroModel, 
    MetroStationModel,
    StreetModel, 
    DistrictModel, 
    MonumentModel, 
    OtherModel, 
    CompanyModel,
    PersonModel
} from '../models/models';

export default {
    async oblast(ctx) {
        const oblasts = await OblastModel.find();

        ctx.body = {
            success: true,
            body: oblasts,
        };
    },
    async city(ctx) {
        let condition = {};

        if (ctx.request.query.unassigned) {
            condition.oblast = null;
        } else if (ctx.request.query.oblast) {
            condition.oblast = ctx.request.query.oblast;
        }

        const cities = await CityModel.find(condition).populate('oblast');

        ctx.body = {
            success: true,
            body: cities,
        };
    },
    async metro(ctx) {
        let condition = {};

        if (ctx.request.query.unassigned) {
            condition.city = null;
        } 

        const metros = await MetroModel.find(condition).populate('city');

        ctx.body = {
            success: true,
            body: metros,
        };
    },
    async metroStation(ctx) {
        let condition = {};

        if (ctx.request.query.unassigned) {
            condition.metro = null;
        } else if (ctx.request.query.metro) {
            condition.metro = ctx.request.query.metro;
        } else {
            ctx.throw(400, 'Incorrect metro id');
        }

        const metroStations = await MetroStationModel.find(condition).populate('metro');

        ctx.body = {
            success: true,
            body: metroStations,
        };
    },
    async street(ctx) {
        let condition = {};

        if (ctx.request.query.unassigned) {
            condition.city = null;
        } else if (ctx.request.query.city) {
            condition.city = ctx.request.query.city;
        } else {
            ctx.throw(400, 'Incorrect city id');
        }

        if (ctx.request.query.type) {
            condition.type = ctx.request.query.type;
        }

        const streets = await StreetModel.find(condition).populate('city');

        ctx.body = {
            success: true,
            body: streets,
        };
    },
    async district(ctx) {
        let condition = {};

        if (ctx.request.query.unassigned) {
            condition.city = null;
        } else if (ctx.request.query.city) {
            condition.city = ctx.request.query.city;
        } else {
            ctx.throw(400, 'Incorrect city id');
        }

        const districts = await DistrictModel.find(condition).populate('city');

        ctx.body = {
            success: true,
            body: districts,
        };
    },
    async monument(ctx) {
        let condition = {};

        if (ctx.request.query.unassigned) {
            condition.city = null;
        } else if (ctx.request.query.city) {
            condition.city = ctx.request.query.city;
        } 

        const monuments = await MonumentModel.find(condition).populate('city');

        ctx.body = {
            success: true,
            body: monuments,
        };
    },
    async other(ctx) {
        let condition = {};

        if (ctx.request.query.unassigned) {
            condition.city = null;
        } else if (ctx.request.query.city) {
            condition.city = ctx.request.query.city;
        } 

        const other = await OtherModel.find(condition).populate('city');

        ctx.body = {
            success: true,
            body: other,
        };
    },
    async person(ctx) {
        const persons = await PersonModel.find();

        ctx.body = {
            success: true,
            body: persons,
        };
    },
    async company(ctx) {
        const companies = await CompanyModel.find();

        ctx.body = {
            success: true,
            body: companies,
        };
    },
    async search(ctx) {
        let result = {};

        const targets = ctx.request.query.targets;

        const streetType = typeof ctx.request.query.streetType == 'number' ? {
            type: ctx.request.query.streetType,
        } : null;

        const modelsDict = {
            oblast: {
                model: OblastModel,
                name: 'old_name',
            }, 
            city: {
                model: CityModel, 
                name: 'old_name',
                parent: 'oblast',
            },
            metro: {
                model: MetroModel, 
                name: 'name',
                parent: 'city',
            },
            metrostation: {
                model: MetroStationModel, 
                name: 'old_name',
                parent: 'metro',
            },
            street: {
                model: StreetModel, 
                name: 'old_name',
                additional: streetType,
                parent: 'city',
            },
            district: {
                model: DistrictModel, 
                name: 'old_name',
                parent: 'city',
            },
            monument: {
                model: MonumentModel, 
                name: 'title',
                parent: 'city',
            },
            other: {
                model: OtherModel, 
                name: 'title',
                parent: 'city',
            },
            company: {
                model: CompanyModel,
                name: 'old_name',
            },
        };

        for (const entity of targets) {
            result[entity] = await modelsDict[entity].model.find({
                [modelsDict[entity].name]: {
                    $regex: ctx.request.query.request,
                    $options: 'i',
                },
                ...modelsDict[entity].additional,
            }).populate(modelsDict[entity].parent || '');
        };

        ctx.body = {
            success: true,
            body: result,
        };
    }
}