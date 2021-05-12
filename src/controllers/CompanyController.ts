import { Request,Response } from 'express'
import Company from '../models/Company'

interface Company {
  name: string,
  logo: string,
}

class CompanyController{

  async index(req: Request, res: Response){
   await Company.find().populate("branch").populate("active").populate("user").then((data:Object)=>res.send(data))
  }

  async create(req: Request, res: Response){
      const { name, logo}:Company = req.body
      const company = new Company({
        name,
        logo
      })
    
      await company.save((err:any)=> {
        if (err) return res.send(err);
        console.log("Document inserted sucessufully!");
      });
    
      res.send(company)
  }

  async delete(req: Request, res: Response){
    await Company.deleteOne({_id: req.params.id},(err:any)=>{
      if(err) return console.error(err);
      console.log("Document deleted sucessufully")
    })
    await Company.find().then((data:Object)=>res.send(data))
  }

  async update(req: Request, res: Response){
    const query = {_id: req.params.id}
    const update = {name: req.body.name}
    await Company.findOneAndUpdate(query,update)

    res.send('salvo com sucesso')
  }
}

export default new CompanyController ()