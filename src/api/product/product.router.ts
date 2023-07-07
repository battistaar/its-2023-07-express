import { Router } from "express";
import { list, get } from './product.controller';
import { validate } from "../../utils/validation.middleware";
import { QueryProductDTO } from "./product.dto";


const router = Router();

router.get('/', validate(QueryProductDTO, 'query'), list);
router.get('/:id', get);


export default router;