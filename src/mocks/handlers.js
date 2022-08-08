import { rest } from 'msw';

const mockResponse={
    "shortLink":"http://localhost:8080/asdfghjk",
    "expirationDate" : "2020-05-03"
};
export const handlers = [
    rest.post(process.env.REACT_APP_HOST_URL,(req,res,context)=>{
        return res(
            context.status(200),
            context.json(mockResponse)
        )

    })
]