import { useState } from "react";
import { ModeSwitcher } from "./components/ModeSwitcher/ModeSwitcher.tsx";
import { Pagination } from "./components/Pagination/Pagination.tsx";

import "./App.scss";
import {
  INITIAL_PAGE,
  PAGES_TO_SHOW,
  PAGE_STEP,
  TOTAL_PAGES,
} from "./constants.ts";

function App() {
  const [isLooped, setIsLooped] = useState(false);
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="app">
      <h1>Pagination Demo</h1>
      <div className="content">
        <h2>Current Page Content</h2>
        <p>Page number {currentPage}</p>
      </div>

      <ModeSwitcher
        checked={isLooped}
        onChange={() => setIsLooped(!isLooped)}
      />

      <Pagination
        pageCount={TOTAL_PAGES}
        pagesToShow={PAGES_TO_SHOW}
        pageStep={PAGE_STEP}
        isLooped={isLooped}
        initialPage={INITIAL_PAGE}
        onPageChange={onPageChange}
      />
    </div>
  );
}

export default App;
