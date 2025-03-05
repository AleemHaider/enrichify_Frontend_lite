import React from "react";

export default function ModalShowTemplate({ template }) {
  const [showModal, setShowModal] = React.useState(false);

  const handleCross = () => {
    setShowModal(false)
  }

  return (
    <>
      <button onClick={() => setShowModal(true)} className='bg-cPrimary p-2 text-white rounded '>view</button>
      {showModal ? (
        <>
          <div
            className="justify-center rounded-3xl items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-3/4 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-3xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center rounded-t-3xl bg-yellowPrimar justify-center py-2 px-5 border-b border-solid border-blueGray-200">
                  <h3 className="text-lg text- font-semibold">
                    Template
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={handleCross}
                  >
                    <span className="bg-transparent h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                
                {/*body*/}
                <div className="relative p-7 pt-4 flex-auto h-[85vh] overflow-auto">
                  <p className="text-red- text-center text-wra">
                    <div dangerouslySetInnerHTML={{ __html: template }} />
                  </p>
                </div>

              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null
      }
    </>
  );
}