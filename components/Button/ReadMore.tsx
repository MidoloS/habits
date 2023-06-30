import { PrimaryButton } from "./Primary";

export const ReadMore = () => {
  return (
    <>
      <PrimaryButton>Read More</PrimaryButton>
      <dialog className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white rounded-lg shadow-lg relative flex flex-col w-11/12 md:w-1/2">
            <div className="flex flex-row justify-between p-6 bg-gray-100 rounded-tl-lg rounded-tr-lg">
              Hola
              <button className="text-black close-modal">&times;</button>
            </div>
            <div className="p-6 flex-grow">
              <p className="leading-relaxed text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                at ipsum eu nunc commodo posuere et sit amet ligula.
              </p>
            </div>
            <div className="flex flex-row justify-end p-6 bg-gray-100 rounded-bl-lg rounded-br-lg">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Accept
              </button>
              <button className="modal-close bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};
