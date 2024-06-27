import BgImage from "../assets/images/bgauth.png";

const ErrorPage = () => {
  return (
    <>
      <div className="w-full h-screen bg-skewed-gradient overflow-hidden relative">
        <img
          src={BgImage}
          alt="bg-image"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0">
        <div className="flex items-center justify-center w-full h-full font-inter">
          <div>
            <h1 className="text-center text-white text-8xl font-bold">404</h1>
            <p className="text-center text-white text-2xl">Not Found !!!</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
