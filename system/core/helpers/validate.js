const Validator = require('validatorjs');
const db = require("../model");
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;



/**
 * Checks if incoming value already exist for unique and non-unique fields in the database
 * e.g email: required|email|unique:User,email
 */
Validator.registerAsync('unique', function(value,  attribute, req, passes) {
    if (!attribute) throw new Error('Specify Requirements i.e fieldName: unique:table,column');

    //split table and column
    let attArr = attribute.split(",");
    if (attArr.length !== 2)
        if (attArr.length !== 4)
            throw new Error(`Invalid format of validation rule on ${attribute}`);

    //assign array index 0 and 1 to table and column respectively
    const { 0: table, 1: column, 2: pk, 3: pkvalue } = attArr;
    //define custom error message
    let msg = (column == "username") ? `The ${column} has already been taken `: `The ${column} already in use`;

    //check if incoming value already exists in the database
    const query = [];
    if(pk) {
        query.push({
            [db.Sequelize.Op.and]: [
                {
                  [column]: {
                    [db.Sequelize.Op.eq]: value
                  }
                },
                {
                  [pk]: {
                    [db.Sequelize.Op.ne]: pkvalue
                  }
                }
            ]
        })
    } else {
        query.push({
            [column]: value
        })
    }

    db[table].findOne({ where: query })
    .then((result) => {
        if(result){
            passes(false, msg); // return false if value exists
            return;
        }
        passes();
    })
});



/**
 * Checks if incoming value is greater than attribute
 * e.g phone: required|length:10
 */
 Validator.registerAsync('length', function(value,  attribute, req, passes) {
    if (!attribute) throw new Error('Specify Requirements i.e length:10');

    if (isNaN(parseInt(attribute)))
        throw new Error(`Invalid format of validation rule on length:${attribute}`);

    if (isNaN(parseInt(value)))
        throw new Error(`Invalid format of value for rule length`);

    //define custom error message
    let msg = `This field value length mast be equal to ${attribute}`;
    //check if incoming value max size
    if(parseInt(value.length) !== parseInt(attribute)){
        passes(false, msg); // return false if value exists
        return;
    }
    passes();
});



/**
 * Checks if incoming value tighten password policy
 * e.g password: strict
 */
Validator.register('strict', value => passwordRegex.test(value),
    'password must contain at least one uppercase letter, one lowercase letter and one number');



/**
 * Checks if incoming value valid with XXX-XXX-XXXX format
 * e.g phone: telephone
 */
Validator.register('telephone', function(value, requirement, attribute) { // requirement parameter defaults to null
    return value.match(/^\d{3}-\d{3}-\d{4}$/);
    }, 'The :attribute phone number is not in the format XXX-XXX-XXXX.');



//Validator.useLang(getLocale());
const validator = (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};

module.exports = validator;