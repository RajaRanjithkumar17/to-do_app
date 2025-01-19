import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  dueDate: Yup.date().required("Due date is required"),
  description: Yup.string().required("Description is required"),
  assignedUser: Yup.string().required("Assigned user is required"),
});
export default validationSchema;