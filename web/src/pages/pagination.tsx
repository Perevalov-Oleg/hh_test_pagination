import { Dispatch, SetStateAction } from "react"

const Pagination = ({
  totalItems, 
  itemsPerPage,
  currentPage,
  paginate,
  setCurrentPage
} : {
  totalItems: number,
  itemsPerPage: number,
  currentPage: number,
  paginate: (num: number) => void,
  setCurrentPage: Dispatch<SetStateAction<number>>
}) => { 
  let endPage = 10
  const pageNumbers: number[] = []
  const totalPages = Math.ceil(totalItems/itemsPerPage)

  const changeCurrentPage = (howMany: number) => {
    setCurrentPage((c) => {
      let tmp = c + howMany
      if(tmp > totalPages) {
        return totalPages
      } else if(tmp <= 0) {
        return 1
      } else {
        return tmp
      }
    })
  }

  while(currentPage > endPage) {
      endPage += Math.min(10, totalPages-endPage)
  }

  for(let i = endPage-9; i <= endPage; i++){
    pageNumbers.push(i);
  }

  return(
    <nav aria-label="List of users">
      <ul className="pagination">
        <li className="page-item">
          <a 
            className="page-link" 
            href="#" 
            aria-label="Previous 10" 
            onClick={() => changeCurrentPage(-10)
          }>
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li className="page-item">
          <a 
            className="page-link" 
            href="#" 
            aria-label="Previous" 
            onClick={() => changeCurrentPage(-1)}
          >
            <span aria-hidden="true">&#8249;</span>
          </a>
        </li>
        {pageNumbers.map((num: number) => (
          <li 
            className={"page-item " + ((currentPage === num) ? "active" : "")} 
            key={num}
          >
            <a className="page-link" href="#" onClick={() => paginate(num)}>
              {num}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a 
            className="page-link" 
            href="#" 
            aria-label="Next" 
            onClick={() => changeCurrentPage(1)}
          >
            <span aria-hidden="true">&#8250;</span>
          </a>
        </li>
        <li className="page-item">
          <a 
            className="page-link" 
            href="#" 
            aria-label="Next 10" 
            onClick={() => changeCurrentPage(10)}
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination;
