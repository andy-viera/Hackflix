import Navbar from "./Navbar";
import Footer from "./Footer";

export default function UserOffline() {
  return (
    <>
      <Navbar />
      <div className="h-screen">
        <div className="flex flex-col justify-center h-full">
          <div className="mx-auto" style={{ marginTop: "-9%" }}>
            <div className="text-center">
              <h1 className="text-9xl text-purple-400 font-extrabold mb-6">
                You are currently offline
              </h1>
              <h4 className="text-gray-300 text-lg font-semibold">
                but not forgotten. We'll keep your seat warm until you come
                back.
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
