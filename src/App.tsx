import { default as React } from "react";
import Card from "./components/Card";

function App() {

  return (
    <div className="pt-12 bg-gray-50 sm:pt-16">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Ethereum Price
          </h2>
        </div>
      </div>
      <div className="pb-12 mt-10 bg-white sm:pb-16">
        <div className="relative">
          <div className="absolute inset-0 h-1/2 bg-gray-50" />
          <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto grid grid-flow-row md:grid-flow-col">
              <Card pair="ETH/USD"/>
              {/* <Card pair="ETH/GBP"/> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
