import { Button, Modal } from "antd"

interface PopupBlockModalProps {
    open: boolean;
    handlePopupModalClose: () => void;
    handleDeleteTask: () => void;
  }

const DeleteConfirmationModal = (props: PopupBlockModalProps) => {
    const {open ,handlePopupModalClose , handleDeleteTask} = props

  return (
     <Modal className="rounded-lg" maskClosable={false} centered open={open} footer={false} onCancel={handlePopupModalClose}>
        <div className="modal-title">
            <h2 className="font-semibold text-[16px] font-Inter pb-2 ">Delete Confirmation</h2>
        </div>
        <div className="modal-body pt-5 ">
            <div className=" w-full ">
                <p className="w-full text-[16px] font-Inter pb-10 ">Are you sure want to delete ?</p>
            </div>
        </div>
        <div className="modal-footer flex justify-end">
         <Button type="primary" onClick={()=>handleDeleteTask()} >Delete</Button>
        </div>
    </Modal>
  )
}

export default DeleteConfirmationModal
