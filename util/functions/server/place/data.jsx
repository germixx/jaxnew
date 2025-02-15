import { NextResponse } from "next/server";

const connection = require('../../../db');

import fs from 'fs';

import path from 'path';

import formidable from 'formidable';

async function addNewPlace () {
    return new Promise((resolve, reject) => { 
        console.log('newplace data')
    })
}






module.exports = { 
    addNewPlace
}