import jwt from "jsonwebtoken"
type Payload={
    id:string
}
export function generateToken(data:Payload)
{     const key=process.env.JWT_SECRET as string
    const token = jwt.sign(data,key)
    return token
}
export function verifyToken(token:string)
{
    const key=process.env.JWT_SECRET as string
    const data= jwt.verify(token,key)
    return data as Payload
}