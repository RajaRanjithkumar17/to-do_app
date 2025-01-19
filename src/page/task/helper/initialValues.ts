const initialValues = {
  title: "",
  status: null,
  dueDate: "",
  description: "",
  assignedUser: null,
  priority: null,
  tags: []
  };
  
export default initialValues;

export const statusOptions =[
  {value:'todo',label:'ToDo' },
  {value:'inprogress',label:'InProgress' },
  {value:'done',label:'Done' }
]

export const priorityOptions =[
  {value:'low',label:'Low' },
  {value:'high',label:'High' },
]

export const tagOptions = [
  { value: 'tag1', label: 'Tag 1' },
  { value: 'tag2', label: 'Tag 2' },
  { value: 'tag3', label: 'Tag 3' },
];
  