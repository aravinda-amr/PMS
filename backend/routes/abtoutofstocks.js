// import express from 'express';
// import { getabtoutofstock} from '../controllers/abtoutofstockController.js';


// const router = express.Router();

// // //Get all reorder
// router.get('/', getabtoutofstock)


// export default router;
import express from 'express';
import { getabtoutofstock} from '../controllers/abtoutofstockController.js';


const router = express.Router();

// //Get all reorder
router.get('/', getabtoutofstock)

// // //Get drug name by id
// router.get('/medicine/:id', getDrugNameById);


export default router;