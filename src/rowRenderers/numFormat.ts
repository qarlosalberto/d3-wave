import type { NumbericDataValue, NumbericDataVectorValue } from '../data';

const NUM_FORMATS: { [k: string]: number } = {
	'b': 2,
	'o': 8,
	'd': 10,
	'x': 16
};

function genFormatter(newBase: number): (d: NumbericDataValue) => string {

	return function (d: NumbericDataValue) {
		return d.toString();
	};
}

function genVectorFormatter(newBase: number): (d: any) => string {
	var itemFormat = genFormatter(newBase);

	return function (d: NumbericDataVectorValue) {
		if (typeof d === 'string')
			return itemFormat(d);
		// @param d: [[index list], value]
		var buff = [];
		var indexes = d[0];
		indexes.forEach(function (i: number) {
			buff.push("[");
			buff.push(i);
			buff.push("]");
		})
		buff.push("=");
		buff.push(itemFormat(d[1]));
		return buff.join("");
	}
}

export const SCALAR_FORMAT: { [formatName: string]: (d: NumbericDataValue) => string } = {
	"UINT_BIN": genFormatter(2),
	"UINT_OCT": genFormatter(8),
	"UINT_DEC": genFormatter(10),
	"UINT_HEX": genFormatter(16),
};

export const VECTOR_FORMAT: { [formatName: string]: (d: NumbericDataVectorValue) => string } = {
	"UINT_BIN": genVectorFormatter(2),
	"UINT_OCT": genVectorFormatter(8),
	"UINT_DEC": genVectorFormatter(10),
	"UINT_HEX": genVectorFormatter(16)
};
