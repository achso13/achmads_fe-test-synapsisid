import Link from "next/link";
import { useRouter } from "next/router";
import { Pagination } from "react-bootstrap";

export default function PaginationList({ url, page, totalPages }) {
  const visiblePages = 8;
  const pageStart = Math.max(1, page - Math.floor(visiblePages / 2));
  const pageEnd = Math.min(totalPages, pageStart + visiblePages - 1);

  const router = useRouter();
  const { query } = router;

  const pagesList = [];
  for (let i = pageStart; i <= pageEnd; i++) {
    pagesList.push(
      <Link
        key={i}
        href={{ pathname: url, query: { ...query, page: i } }}
        passHref
        legacyBehavior
      >
        <Pagination.Item active={Number(page) === i}>{i}</Pagination.Item>
      </Link>
    );
  }
  return (
    <Pagination className="justify-content-center my-4" size="sm">
      {Number(page) !== 1 && (
        <>
          <Link
            href={{ pathname: url, query: { ...query, page: 1 } }}
            passHref
            legacyBehavior
          >
            <Pagination.First />
          </Link>
          <Link
            href={{
              pathname: url,
              query: { ...query, page: Number(page) - 1 },
            }}
            passHref
            legacyBehavior
          >
            <Pagination.Prev />
          </Link>
        </>
      )}

      {pagesList}

      {page !== totalPages && (
        <>
          <Link
            href={{
              pathname: url,
              query: { ...query, page: Number(page) + 1 },
            }}
            passHref
            legacyBehavior
          >
            <Pagination.Next />
          </Link>
          <Link
            href={{
              pathname: url,
              query: { ...query, page: totalPages },
            }}
            passHref
            legacyBehavior
          >
            <Pagination.Last />
          </Link>
        </>
      )}
    </Pagination>
  );
}
