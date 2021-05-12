import { Request, Response } from 'express'
import User from '../models/User'
import Company from '../models/Company'

interface User {
    email: string,
    password: string,
    company: string
}


class UserController {

    async index(req: Request, res: Response) {
        await User.find().populate("company").then((data: Object) => res.send(data))
    }

    async create(req: Request, res: Response) {
        let company
        const { email, password }: User = req.body
        if (req.body.id === "1") {
            company = undefined
        } else {
            company = await Company.findById(req.body.id)
        }

        const user = new User({
            email,
            password,
            company
        })
        if (!(company === undefined)) {
            company.users.push(user)
        }

        await user.save((err: any) => {
            if (err) return res.send(err);
            console.log("Document inserted sucessufully!")
        });
        if (!(company === undefined)) {
            await company.save()
        }
        res.send(user)
    }

    async delete(req: Request, res: Response) {
        await User.deleteOne({ _id: req.params.id }, (err: any) => {
            if (err) return console.error(err);
            console.log("Document deleted sucessufully")
        })
        await User.find().then((data: Object) => res.send(data))
    }

    async update(req: Request, res: Response){
        const query = { _id: req.params.id }
        let company
        if(req.body.id==="1"){
          const company= await Company.findById(req.params.id)
          // @ts-expect-error
          user.company = undefined
        }else{
        company = await Company.findById(req.body.id)
        }
        console.log(company)
        const update = { email: req.body.email, password: req.body.password, company }
        await User.findOneAndUpdate(query, update)
    
        res.send('salvo com sucesso')
      }
}

export default new UserController()