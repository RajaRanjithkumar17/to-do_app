import { User } from "../task/helper/types"

export const taskTableValue = [
    { text: "Todo", value: "todo" },
    { text: "In Progress", value: "inProgress" },
    { text: "Done", value: "done" },
  ]
  

  export const transformFilterList = (input:User[])=>{
   return input.map(item => ({ text: item.name, value: item.name }))
}