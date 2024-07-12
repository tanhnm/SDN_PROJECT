const Payment = () => {
  let MY_BANK = {
    BANK_ID: "VCB",
    ACCOUNT_NO: "1020135007",
    ACCOUNT_NAME: "NGUYEN THANH CONG",
  };
  let QR = `https://img.vietqr.io/image/${MY_BANK.BANK_ID}-${MY_BANK.ACCOUNT_NO}-compact2.jpg?amount=&addInfo=&accountName=${MY_BANK.ACCOUNT_NAME}`;
  return (
    <section className="body-font h-screen bg-gray-100 pt-10 text-gray-600">
      <div className="container mx-auto flex max-w-3xl flex-wrap justify-center rounded-lg bg-white px-5 py-24">
        {/* QR Code Number Account & Uploadfile */}
        <div className="flex-wrap md:flex">
          <div className="mx-auto">
            <img className="mx-auto mt-12 h-70 w-72 rounded-lg border p-2 md:mt-0" src={QR} alt="step" />
            <div>
              <h1 className="font-laonoto mt-4 text-center text-xl font-bold">Pet Home</h1>
              <p className="mt-2 font-semibold text-gray-600">Nội dung chuyển khoản:</p>
              <p className="mt-1 font-medium text-gray-700">Số tiền :</p>
              <p className="mt-1 font-medium text-gray-700">Người thụ hưởng :</p>
            </div>
            <p className="mt-1  font-medium text-gray-700">-</p>
            {/* component */}
            <div className="mx-auto w-52">
              <div className="m-4">
                <div className="flex w-full items-center justify-center">
                  <div className="flex h-14 w-full cursor-pointer flex-col ">
                    <div className="mt-4 flex justify-between space-x-1">
                      <p className="mt-4 font-semibold text-black-900 text-1xl">Đang chờ thanh toán</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;
