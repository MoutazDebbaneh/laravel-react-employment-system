
interface Props {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
    onChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({
    currentPage,
    lastPage,
    perPage,
    total,
    onChange,
}) => {
    const totalPages = Math.ceil(total / perPage);

    if (totalPages <= 1) {
        return null;
    }

    const pagesToShow = 7; // number of pages to show in the pagination bar
    const halfPagesToShow = Math.floor(pagesToShow / 2);
    const startPage =
        currentPage - halfPagesToShow > 1
            ? currentPage - halfPagesToShow
            : 1;
    const endPage =
        startPage + pagesToShow - 1 < totalPages
            ? startPage + pagesToShow - 1
            : totalPages;

    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    const handlePageChange = (page: number) => {
        if (page !== currentPage && page >= 1 && page <= totalPages) {
            onChange(page);
        }
    };

    return (
        <nav className="flex items-center justify-center px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center">
                <div>
                    <span className="relative z-0 inline-flex shadow-sm rounded-md">
                        <button
                            type="button"
                            className={
                                `relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium text-gray-500 hover:text-gray-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 ${currentPage === 1
                                    ? 'bg-gray-200 cursor-default'
                                    : 'bg-white hover:bg-gray-50'}`
                            }
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <span className="sr-only">Previous</span>
                            <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.707 3.293a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 6.414V16a1 1 0 11-2 0V6.414l-5.293 5.293a1 1 0 01-1.414-1.414l6-6z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        {pageNumbers.map((page) => (
                            <button
                                key={page}
                                type="button"
                                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 ${currentPage === page
                                    ? 'bg-primary-blue text-white'
                                    : 'bg-white hover:bg-gray-50'}`}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            type="button"
                            className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium text-gray-500 hover:text-gray-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 ${currentPage === totalPages
                                ? 'bg-gray-200 cursor-default'
                                : 'bg-white hover:bg-gray-50'}`}
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <span className="sr-only">Next</span>
                            <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9.293 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 011.414-1.414L9 13.586V4a1 1 0 012 0v9.586l5.293-5.293a1 1 0 011.414 1.414l-6 6z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </span>
                </div>
            </div>

            <div className="flex-1 flex justify-center sm:hidden">
                <span className="relative z-0 inline-flex shadow-sm rounded-md">
                    <button
                        type="button"
                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium text-gray-500 hover:text-gray-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 ${currentPage === 1
                            ? 'bg-gray-200 cursor-default'
                            : 'bg-white hover:bg-gray-50'}`}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <span className="sr-only">Previous</span>
                        <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.707 3.293a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 6.414V16a1 1 0 11-2 0V6.414l-5.293 5.293a1 1 0 01-1.414-1.414l6-6z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    <div className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                        {currentPage}/{totalPages}
                    </div>
                    <button
                        type="button"
                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium text-gray-500 hover:text-gray-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 ${currentPage === totalPages
                            ? 'bg-gray-200 cursor-default'
                            : 'bg-white hover:bg-gray-50'}`}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <span className="sr-only">Next</span>
                        <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.293 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 011.414-1.414L9 13.586V4a1 1 0 012 0v9.586l5.293-5.293a1 1 0 011.414 1.414l-6 6z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </span>
            </div>
        </nav>
    );
};

export default Pagination;