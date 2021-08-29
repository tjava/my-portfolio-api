const pool = require("../config/database");

const create = (data, callBack) => {
	const query = `INSERT INTO skills (name, image) values(?,?)`;

    pool.query(
		query,
		[
			data.name,
			data.image,
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
	const query = `SELECT * FROM skills`;

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

const del = (data, callBack) => {
	const query = `DELETE FROM skills WHERE id = ?`;
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
exports.del = del;