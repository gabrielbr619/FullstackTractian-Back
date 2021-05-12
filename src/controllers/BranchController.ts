import { Request, Response } from 'express'
import Branch from '../models/Branch'
import Company from '../models/Company'


class BranchController {

  async index(req: Request, res: Response) {
    await Branch.find().populate("company").populate("active").then((data: Object) => res.send(data))
  }

  async create(req: Request, res: Response) {
    interface Branch {
      name: string,
      localization: string,
      company: string,
    }
    let company
    const { name, localization }: Branch = req.body
    if(!(req.body.id==="")){
     company = await Company.findById(req.body.id)
    }

    const branch = new Branch({
      name,
      localization,
      company,
    })


    if(!(company===undefined)){
      company.branch.push(branch)
    }

    await branch.save((err: any) => {
      if (err) return console.error(err);
      console.log("Document inserted sucessufully!");
    });

    if(!(company===undefined)){
    await company.save()
    }
    res.send(branch)
  }

  async delete(req: Request, res: Response) {
    await Branch.deleteOne({ _id: req.params.id }, (err: any) => {
      if (err) return console.error(err);
      console.log("Document deleted sucessufully")
    })
    await Branch.find().then((data: Object) => res.send(data))
    }


  async update(req: Request, res: Response){
    const query = { _id: req.params.id }
    let company
    console.log(req.body.id)
    if(req.body.id==="1"){
      const branch= await Branch.findById(req.params.id)
      // @ts-expect-error
      branch.company = undefined
      await branch.save()
      return res.send('salvo com sucesso')
    }else{
    company = await Company.findById(req.body.id)
    }
    console.log(company)
    const update = { name: req.body.name, company }
    await Branch.findOneAndUpdate(query, update)

    res.send('salvo com sucesso')
  }
}

export default new BranchController()
