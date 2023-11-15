import Link from 'next/link'

interface Params {
  page: number
  totalPages: number
  url: string
}

const Pagination = ({ page, totalPages, url }: Params) => {
  if (totalPages === 1) {
    return <></>
  }

  const pages: Number[] = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav className="mt-8 flex items-center justify-between border-t border-yellow-200 px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        {page > 1 && (
          <Link
            href={page - 1 <= 1 ? url : `${url}/${page - 1}`}
            className="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            &lt;
            Previous
          </Link>
        )}
      </div>
      <div className="hidden md:-mt-px md:flex">
        {pages.map((pageNumber) => (
          <Link
            key={`pagination-${pageNumber}`}
            href={`${url}/${pageNumber}`}
          >
            {String(pageNumber)}
          </Link>
        ))}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        {totalPages > page && (
          <Link
            href={`${url}/${page + 1}`}
            className="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            Next
            &gt;
          </Link>
        )}
      </div>
    </nav>
  )
}
export default Pagination
