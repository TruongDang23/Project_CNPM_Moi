import React from 'react'
import styled from 'styled-components'

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <PaginationWrapper>
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </PaginationWrapper>
  )
}

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  button {
    padding: 10px 20px;
    margin: 0 10px;
    border: none;
    background-color: var(--primary-color);
    color: #fff;
    cursor: pointer;
    border-radius: 5px;

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }

  span {
    font-size: 1.6rem;
  }
`

export default Pagination
