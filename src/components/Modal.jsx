const Modal = ({ children }) => {
  // if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.5)]">
      <div className=" bg-white p-5 rounded-md relative ">{children}</div>
    </div>
  );
};
export default Modal;
