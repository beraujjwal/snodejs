const { baseService } = require("../../system/core/service/baseService");

class service extends baseService {

    /**
     * Service constructor
     * @author Ujjwal Bera
     * @param null
     */
    constructor( ) {
        super( );
    }


    async isUnique(model, key, value, id=null) {
      const query = [];

      value = value.toLowerCase();
      value = value.replace(/[^a-zA-Z ]/g, "");
      value = value.replace(/[^a-zA-Z]/g, "-");

      if(value) {
        query.push({
          [key]: {
            [this.Op.eq]: value
          }
        })
      }

      if(id != null) {
        query.push({
          id: {
            [this.Op.ne]: id
          }
        })
      }

      return model.findOne({
        where: {
          [this.Op.and]: query
        }
      });
    }

}

module.exports = { service };
