import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let db = mongoose.connect('mongodb://localhost/desov');

const User = new Schema({
    status: String,
    login: String,
    pass: String,
    active: Boolean,
});
export const UserModel = mongoose.model('User', User);

const Metro = new Schema({
    name: String,
    logo: String,
    city: Schema.Types.ObjectId,
});
export const MetroModel = mongoose.model('Metro', Metro);

const MetroStation = new Schema({
    old_name: String,
    new_name: String,
    metro: Schema.Types.ObjectId,
});
export const MetroStationModel = mongoose.model('MetroStation', MetroStation);

const Oblast = new Schema({
    old_name: String,
    new_name: String,
    toRename: Boolean,
});
export const OblastModel = mongoose.model('Oblast', Oblast);

const City = new Schema({
    old_name: String,
    new_name: String,
    historical: Boolean,
    oblast: Schema.Types.ObjectId,
    population: String,
    toRename: Boolean,
});
export const CityModel = mongoose.model('City', City);

const Street = new Schema({
    old_name: String,
    new_name: String,
    city: Schema.Types.ObjectId,
    historical: Boolean,
});
export const StreetModel = mongoose.model('Street', Street);

const Square = new Schema({
    old_name: String,
    new_name: String,
    city: Schema.Types.ObjectId,
    historical: Boolean,
});
export const SquareModel = mongoose.model('Square', Square);

const District = new Schema({
    old_name: String,
    new_name: String,
    city: Schema.Types.ObjectId,
    historical: Boolean,
});
export const DistrictModel = mongoose.model('District', District);

const Monument = new Schema({
    coordinate: String,
    title: String,
    city: Schema.Types.ObjectId,
    photo: String,
});
export const MonumentModel = mongoose.model('Monument', Monument);

const Other = new Schema({
    coordinate: String,
    title: String,
    description: String,
    city: Schema.Types.ObjectId,
    photo: String,
});
export const OtherModel = mongoose.model('Other', Other);

const Company = new Schema({
    old_name: String,
    new_name: String,
    addr: String,
    description: String,
    logo: String,
    historical: Boolean,
});
export const CompanyModel = mongoose.model('Company', Company);

const Person = new Schema({
    name: String,
    date: String,
    description: String,
    photo: String,
});
export const PersonModel = mongoose.model('Person', Person);

const Issue = new Schema({
    ip: String,
    text: String,
    mail: String,
    active: Boolean,
});
export const IssueModel = mongoose.model('Issue', Issue);
