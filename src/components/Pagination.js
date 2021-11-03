import "./Pagination.css";
import { CaretRight, CaretLeft } from "phosphor-react";

const Pagination = ({ activePage, total, setActivePage, perPage }) => {
  const totalPageCount = Math.ceil(total / perPage);

  let pagesToDisplay = [activePage - 1, activePage, activePage + 1]; //Page numbers array like [1, 2, 3],

  pagesToDisplay.forEach((elem, index) => {
    if (elem === 0) {
      pagesToDisplay.splice(index, 1); // Page number can not be 0;
    }
  });

  if (activePage === 1 && totalPageCount > 2) {
    // we are on first page and total page count greater than 2 so that add 3
    pagesToDisplay.push(activePage + 2);
  } else if (activePage === totalPageCount) {
    // we are on the last page, delete page numbers greater than last page number
    pagesToDisplay.pop();

    if (totalPageCount - 2 > 0) {
      // we are on the last page and there are more then two page totally so add page number n-2
      pagesToDisplay.unshift(totalPageCount - 2);
    }
  }

  const handleClickPreviousPage = () => {
    if (activePage !== 1) {
      setActivePage(activePage - 1);
    }
  };

  const handleClickNextPage = () => {
    if (activePage !== totalPageCount) {
      setActivePage(activePage + 1);
    }
  };

  return (
    <div className="pagination">
      <CaretLeft
        onClick={handleClickPreviousPage}
        className="previous_page"
        size={30}
      />
      {pagesToDisplay.map((elem) => {
        return (
          <span
            onClick={() => setActivePage(elem)}
            className={`${elem === activePage ? "active_page" : ""}`}
            key={elem}
          >
            {elem}
          </span>
        );
      })}
      <CaretRight
        onClick={handleClickNextPage}
        className="next_page"
        size={30}
      />
    </div>
  );
};

export default Pagination;
