import { Router } from "express";
import { MockService } from '../../services/index.js';
import { HTTP_STATUS } from '../../constants/api.constants.js'

const router = Router();
const service= new MockService()

router.get("/", (req,res)=>{
  service.populate(6);
  const users = service.getAll();
  res.status(HTTP_STATUS.OK).json(users);
});

router.get("/:id", (req, res) => {
  const {id} = req.params;
  const user= service.getOne(id);
  res.status(HTTP_STATUS.OK).json(user);
})


router.post("/", (req, res) => {
  service.populate(req.query.limit);
  res.status(HTTP_STATUS.CREATED).json({create:true});
})

export {router as routerTest};
