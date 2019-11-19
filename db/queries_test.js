import {
	createTransferRecord,
	getTransferRecord,
	getTransferInitRecord,
	getAllTransferRecords,
	getAllTransferInitRecords,
	createTransferInitRecord,
	truncateTransferRecords,
	getTransferRecordById,
	truncateTransferStatusRecords,
	deleteTransferStatusRecord
} from './queries.js';
import {tokenGen} from '../src/router.js';

var tokens = [tokenGen(), tokenGen()]
var idHolder = null;
var timeStampHolder = null;

createTransferInitRecord(['.json', 'GER','DeutsheBank,CC', tokens[0], '100', '101'])
	.catch( err => console.log('1', err))
	.then( x => {
			if( x == 1) console.log('createTransferInitRecord() passes')
			else console.log('FAILURE: createTransferInitRecord()', x)
			return getTransferInitRecord(tokens[0])
	}).catch( err => console.log('2', err))
	.then( x => {
		if( typeof x === 'object' && x.token == tokens[0]) console.log('getTransferInitRecord() passes')
		else console.log('FAILURE:  getTransferInitRecord()', x); timeStampHolder= x.date_t;
		return createTransferInitRecord(['.json', 'MEX','MexicanBank,Debit', tokens[1], '105', '103'])
	}).catch( err => console.log('3', err))
	.then( x => {
			if( x == 1) console.log('createTransferInitRecord() passes')
			else console.log('FAILURE: createTransferInitRecord()', x)
			return getAllTransferInitRecords();
	}).catch( err => console.log('4', err))
	.then( x => {
		if(Array.isArray(x) && x.length == 2 && x.find( y => y.token == tokens[0] ) && x.find( y => y.token == tokens[1]))
			console.log('getAllTransferInitRecords() passes')
		else console.log('FAILURE: getAllTransferInitRecords')
		return deleteTransferStatusRecord(tokens[0]);
		}).catch( err => console.log('4.5', err))
		.then( x => {
			if( x == 1) console.log('deleteTransferStatusRecord() passes')
			else console.log('FAILURE: deleteTransferStatusRecord()', x)
			return createTransferRecord(['.json', 'USA', '20', '900', 'Lily','Turner', 500, 1000, timeStampHolder, 'AmericanExpress,CC']);
	}).catch( err => console.log('5', err))
	.then( x => {
			if( x == 1) console.log('createTransferRecord() passes')
			else console.log('FAILURE: createTransferRecord()', x)
			return getTransferRecord('20', '900', 'USA');
	}).catch( err => console.log('6', err))
	.then( x => {
		if( typeof x === 'object' && x.account_id == '20' && x.routing_number == '900' && x.country_code == 'USA' )
			console.log('getTransferRecord() passes'), idHolder = x.id;
		else console.log('FAILURE:  getTransferRecord()', x)
			return getTransferRecordById(idHolder)
	}).catch( err => console.log('6.5', err))
	.then( x => {
		if( typeof x === 'object' && x.id == idHolder) console.log('getTransferRecordById() passes')
		else console.log('FAILURE:  getTransferRecordById()', x)
		return getAllTransferRecords()
}).catch( err => console.log('7', err))
	.then( x => {
		if(Array.isArray(x) && x.length == 1 && x.find( y => y.account_id == '20'))
			console.log('getAllTransferRecords() passes')
		else console.log('FAILURE: getAllTransferRecords')
		return truncateTransferStatusRecords()
}).catch( err => console.log('8', err))
	.then( x => {
			if( Array.isArray(x) && x && x.length == 0) console.log('truncateTransferStatusRecords() passes')
			else console.log('FAILURE:  truncateTransferStatusRecords()', x)
			return truncateTransferRecords()
	}).catch( err => console.log('9', err))
	.then( x => {
			if( Array.isArray(x) && x && x.length == 0) console.log('truncateTransferRecords() passes')
			else console.log('FAILURE:  truncateTransferRecords()', x)
	})