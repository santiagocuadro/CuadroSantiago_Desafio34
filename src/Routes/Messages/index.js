import express from "express";
import { MessagesDao } from "../../Dao/index.js";
import {schema, normalize} from 'normalizr';

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const messages = await MessagesDao.getAll();

    if (!messages) {
      return res.send({ error: true, texteError: 'no hay mensajes' });
    }
    res.send(messages);
  } catch (error) {
    res.send({ error: "Internal server error"});
  }
});


router.post("/", async (req, res) => {
	try {
    const {author: {id, nombre, apellido, edad, alias, avatar}, text} = req.body;
    const message = {author: {id, nombre, apellido, edad, alias, avatar}, text};
    const messageCompleto = await MessagesDao.save(message);

    res.send({message: messageCompleto});
  } catch (error) {
    res.send({ success: false});
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if(id !== undefined){
      const message = await MessagesDao.getById(Number(id));  
      res.send({message: message});
    }else {
      const messages = await MessagesDao.getAll();  
      res.send(messages);
    }
  } catch (error) {
    res.send({success: false});
  }
});


router.put("/:idMessage", async (req, res) => {
	try {
    const { idMessage } = req.params;
    const {author: {id, nombre, apellido, edad, alias, avatar}, text} = req.body;
    const updatedMessage = await ProductDao.updateById(
      idMessage, 
      {author: {id, nombre, apellido, edad, alias, avatar}, text}
    );

    res.send({ updated: updatedMessage});
  } catch (error) {
    res.send({ success: false});
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await MessagesDao.deleteById(Number(id));
    res.send({ success: true });
  } catch (error) {
    res.send({ success: false });
  }
});

router.get("/normalized", async () => {
  
	const messages = await MessagesDao.getAll();
	const userSchema = new schema.Entity('users');
	const messageSchema = new schema.Entity('messages', {
		author: userSchema
	})
  
	const normalizedData = normalize(messages, [messageSchema], {
		idAttribute: '_id'
	});
	console.log(normalizedData);
	res.send(normalizedData)
})

export { router as routerMessage };
