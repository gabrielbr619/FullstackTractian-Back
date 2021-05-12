import { Request, Response } from 'express'
import Active from '../models/Active';
import Branch from '../models/Branch'
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: NAMEDOTENV,
    api_key: KEYDOTENV,
    api_secret: SECRETDOTENV
});

class ActiveController {


  async index(req: Request, res: Response) {
    await Active.find().populate({ path: "branch", populate: { path: 'company' } }).then((data: Object) => res.send(data))
  }

  async create(req: Request, res: Response) {

    try {

      let img
      if (req.files) {
        //@ts-expect-error
        const file = req.files.image

        await cloudinary.uploader.upload(file.tempFilePath, function (err, result) {
          img = result.url
          res.send(result + 'Deu certo')
        })
      }

      interface Active {
        name: string,
        responsible: string,
        status: string,
        healthLevel: number,
        img: string,
        description: string,
        model: string,
      }

      let branch
      const { name, responsible, status, healthLevel, description, model }: Active = req.body
      if (!(req.body.id === "1")) {
        branch = await Branch.findById(req.body.id)
      }

      const active = new Active({
        name,
        responsible,
        status,
        healthLevel,
        description,
        model,
        branch,
        img
      })

      if (!(branch === undefined)) {
        branch.active.push(active)
      }

      await active.save((err: any) => {
        if (err) return console.error(err);
        console.log("Document inserted sucessufully!");
      });

      if (!(branch === undefined)) {
        await branch.save()
      }
      res.send(active)
    } catch (err) {
      console.log(err)
    }
  }

  async delete(req: Request, res: Response) {
    await Active.deleteOne({ _id: req.params.id }, (err: any) => {
      if (err) return console.error(err);
      console.log("Document deleted sucessufully")
    })
    await Active.find().then((data: Object) => res.send(data))
  }

  async update(req: Request, res: Response) {

    const query = { _id: req.params.id }
    let branch
    let img
    let update
    if (req.files) {//Upload da img
      //@ts-expect-error
      const file = req.files.image
      await cloudinary.uploader.upload(file.tempFilePath, function (err, result) {
        img = result.url
        res.send(result + 'Deu certo')
      })
    }

    if (req.body.id === "1") {
      const active = await Active.findById(req.params.id)
      // @ts-expect-error
      active.branch = undefined
    } else {
      branch = await Branch.findOne({ _id: req.body.id })
    }
    if(img===undefined){
      update = { name: req.body.name, status: req.body.status, branch, responsible: req.body.responsible, healthLevel: req.body.healthLevel}
    }else{
      update = { name: req.body.name, status: req.body.status, branch, responsible: req.body.responsible, healthLevel: req.body.healthLevel, img:img }
    }
    await Active.findOneAndUpdate(query, update)
    console.log(update)
    res.send('salvo com sucesso')
  }

}

export default new ActiveController()