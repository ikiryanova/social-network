import React, { useState } from 'react';

import './paginator.css';

type PropsType = {
  pageSize: number,
  totalItemsCount: number,
  currentPage: number,
  onPageChanged: (page: number) => void,
  blockSize?: number 
}

const Paginator: React.FC<PropsType> = ({
  pageSize,
  totalItemsCount,
  currentPage,
  onPageChanged,
  blockSize = 10
}) => {
  let pagesCount = Math.ceil(totalItemsCount / pageSize);
  let pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let blockCount = Math.ceil(pagesCount / blockSize);
  const [ currentBlockNumber, setBlockNumber ] = useState(1);
  let leftBlockNumber = (currentBlockNumber - 1) * blockSize + 1;
  let rightBlockNubmer = currentBlockNumber * blockSize;
  return (
    <div className="item-pagination">
      {currentBlockNumber > 1 && (
        <button className="btn pagination-btn" onClick={() => setBlockNumber(currentBlockNumber - 1)}>PREV</button>
      )}
      {pages
        .filter((page) => page >= leftBlockNumber && page <= rightBlockNubmer)
        .map((page) => (
          <span
            key={page}
            onClick={() => onPageChanged(page)}
            className={currentPage === page ? 'item_selected' : ' '}>
            {page}
          </span>
        ))}
      {blockCount > currentBlockNumber && (
        <button className="btn pagination-btn" onClick={() => setBlockNumber(currentBlockNumber + 1)}>NEXT</button>
      )}
    </div>
  );
};

export default Paginator;