import Navbar from "./Navbar";
import Footer from "./Footer";

export default function NotFound404() {
  return (
    <>
      <Navbar />
      <div className="h-screen">
        <div className="flex flex-col justify-center h-full">
          <div className="mx-auto" style={{ marginTop: "-9%" }}>
            <div className="text-center">
              <h1 className="text-9xl text-purple-400 font-extrabold mb-6">
                Error 404
              </h1>
              <h4 className="text-gray-300 text-lg font-semibold">
                We're sorry, this page is on strike. It's demanding better
                loading conditions and more uptime.
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </>
  );
}
