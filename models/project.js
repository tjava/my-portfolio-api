const pool = require("../config/database");

const create = (data, callBack) => {
	const query = `INSERT INTO projects (name, slug, description, detailDescription, image, dateCreated, languagesUsed, links) values(?,?,?,?,?,?,?,?)`;

    pool.query(
		query,
		[
			data.name,
			data.slug,
			data.description,
			data.detailDescription,
			data.image,
			data.dateCreated,
			data.languagesUsed,
			data.links
		],
		(error, results, fields) => {
			if (error) {
				callBack(error);
			}
			return callBack(null, results);
      	}
    );
}

const getAll = callBack => {
	const query = `SELECT id, name, slug, description, image FROM projects`;

    pool.query(
		query,
		[],
		(error, results, fields) => {
			if (error) {
				callBack(error);
			}
			return callBack(null, results);
      	}
    );
}

const getSingle = (data, callBack) => {
	const query = `SELECT * FROM projects WHERE id = ?`;

    pool.query(
		query,
		[data.id],
		(error, results, fields) => {
			if (error) {
				callBack(error);
			}
			return callBack(null, results[0]);
      	}
    );
}

const findById = (data, callBack) => {
    pool.query(
      `SELECT id FROM projects WHERE id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return true;
      }
    );
}

const del = (data, callBack) => {
	const query = `DELETE FROM projects WHERE id = ?`;
	pool.query(
		query,
		[data.id],
		(error, results, fields) => {
			if (error) {
				callBack(error);
			}
			return callBack(null, results[0]);
		}
	);
}

exports.create = create;
exports.getAll = getAll;
exports.getSingle = getSingle;
exports.findById = findById;
exports.del = del;