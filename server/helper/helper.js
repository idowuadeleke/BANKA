import DB from '../db/index';


class Helper {
  static async selectFromDb(a, b, c, d) {
    const queryString = `select ${a} FROM ${b} WHERE ${c} = $1`;
    const { rows } = await DB.query(queryString, [d]);
    return rows;
  }

  static async updateDb(a, b, c, d) {
    const queryString = `UPDATE ${a} SET  ${b} = $1 WHERE ${c} = $2 returning *`;
    const { rows } = await DB.query(queryString, d);
    return rows;
  }

  static async insertToDb(a, b, c, d) {
    const queryString = `INSERT INTO ${a} (${b}) VALUES (${c}) returning *`;
    const { rows } = await DB.query(queryString, d);
    return rows;
  }
}

export default Helper;
