const sequelize = require('./database/connection');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Worker = require('./models/worker');

async function createWorkerModel() {
    // (1)
    // Worker.sync();
    // Worker.sync({force: true});  
    // Worker.drop();

    // (2)
    // Worker.sync({force: true})
    // .then(() => console.log('WORKER CREATED PROPERLY'))
    // .catch(error => console.error(error));

    // (3)
    // sequelize.sync();
    // sequelize.sync({force: true});
    // sequelize.drop();

    return sequelize.sync({force: true});
}

async function insertNewWorker(worker) {
    return Worker.create(worker);
}

async function findAll() {
    return Worker.findAll();
}

async function findAllWithEmploymentDateBetween() {
    return Worker.findAll({
        where: {
            employmentDate: {
                [Op.gte]: '2012-01-01',
                [Op.lte]: '2013-01-01'
            }
        }
    });
}

async function findAllWithNameAndDescription() {
    return Worker.findAll({
        where: {            
            [Op.and]: [
                {
                    description: {
                        [Op.endsWith]: 'Be'
                    }
                },
                {
                    name: {
                        [Op.startsWith]: 'EW'
                    }
                }
            ]           
        }
    });
}

async function findAllWithPagination() {
    return Worker.findAll({limit: 1})
}

async function findAllWithOrder() {
    return Worker.findAll({order: [
        ['name', 'DESC']
    ]})
}

module.exports = async () => {

    // ----------------------------------------------------------------------
    // CREATE WORKER MODEL
    // ----------------------------------------------------------------------
    await createWorkerModel().catch(err => console.error(`Create model error: ${err}`));


    // ----------------------------------------------------------------------
    // INSERT NEW WORKERS
    // ----------------------------------------------------------------------
    const newWorker1 = {
        name: 'ANDREW',
        description: 'Best worker ever 1!',
        uniqueOne: 10,
        uniqueTwo: 12,
        employmentDate: '2011-01-01',
        email: 'andrew@gmail.com',
        salary: 450
    };
    await insertNewWorker(newWorker1).catch(err => console.error(`Insert new worker error: ${err}`));

    const newWorker2 = {
        name: 'JOHN',
        description: 'Best worker ever 2!',
        uniqueOne: 23,
        uniqueTwo: 14,
        employmentDate: '2012-01-01',
        email: 'john@gmail.com',
        salary: 550
    };
    await insertNewWorker(newWorker2).catch(err => console.error(`Insert new worker error: ${err}`));
    
    // ----------------------------------------------------------------------
    // FIND ALL
    // ----------------------------------------------------------------------
    const workers1 = await findAll().catch(err => console.err('Find all'));
    console.log('\nfindAll()')
    workers1.forEach(element => console.log(element.dataValues.name));

    // ----------------------------------------------------------------------
    // FIND ALL WITH EMPLOYMENT DATE BETWEEN
    // ----------------------------------------------------------------------
    const workers2 = await findAllWithEmploymentDateBetween()
    .catch(err => console.err('Find all'));
    console.log('\nfindAllWithEmploymentDateBetween()')
    workers2.forEach(element => console.log(element.dataValues.name));


    // ----------------------------------------------------------------------
    // FIND ALL WITH NAME AND DESCRIPTION
    // ----------------------------------------------------------------------
    const workers3 = await findAllWithNameAndDescription()
    .catch(err => console.err('Find all'));
    console.log('\nfindAllWithNameAndDescription()')
    workers3.forEach(element => console.log(element.dataValues.name));


    // ----------------------------------------------------------------------
    // PAGINATION
    // ----------------------------------------------------------------------
    const workers4 = await findAllWithPagination()
    .catch(err => console.err('Find all with pagination'));
    console.log('\nfindAllWithPagination()')
    workers4.forEach(element => console.log(element.dataValues.name));


    // ----------------------------------------------------------------------
    // ORDER
    // ----------------------------------------------------------------------
    const workers5 = await findAllWithOrder()
    .catch(err => console.err('Find all with order'));
    console.log('\nfindAllWithOrder()')
    workers5.forEach(element => console.log(element.dataValues.name));

};