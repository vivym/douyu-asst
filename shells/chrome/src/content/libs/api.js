const axios = require('axios');

const baseUrl = 'https://api.jiuwozb.com/dyasst';

module.exports = {
  queryBarrageInOneRoom (userid, rid, from, limit) {
    return axios.get(`${baseUrl}/barrage`, { params: { userid, rid, from, limit } });
  },
};
