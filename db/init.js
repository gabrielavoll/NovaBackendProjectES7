import creds from '../creds.json';
import fs from 'fs';
import {Pool} from 'pg';
const initPool = new Pool(creds.init);
var migrationSQL = fs.readFileSync('./db/migrate.sql').toString();

const generateInitDBs = () => {
  initPool.query('DROP DATABASE IF EXISTS nova_api;', function(error, results) {
      if (error) console.log('drop db error', error);
      else {
      	console.log('successful of drop db');
      	initPool.query('CREATE DATABASE nova_api;', function(error, results) {
      		if (error) console.log('create db error', error);
      		else {
      			console.log('successful of create db');
      			generateInitTables();
      		}
      	});
      }
  });
}

const generateInitTables = () => {
	new Pool(creds.nova).query(migrationSQL, (error, results) => {
    if (error) throw error
    else console.log('successful of gen tables')
  })
}

generateInitDBs();