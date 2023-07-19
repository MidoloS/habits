const SearchIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17.572"
    height="17.572"
    viewBox="0 0 17.572 17.572"
    className={className}
  >
    <path
      id="busqueda"
      d="M17.326,16.292l-4.364-4.364a7.324,7.324,0,1,0-1.034,1.034l4.364,4.364a.731.731,0,1,0,1.034-1.034ZM7.3,13.153a5.85,5.85,0,1,1,5.85-5.85,5.85,5.85,0,0,1-5.85,5.85Z"
      transform="translate(0.032 0.032)"
      fill="#64748b"
    />
  </svg>
);

export const SearchInput = () => (
  <div className="relative">
    <SearchIcon className="absolute top-1/3 left-4" />
    <input
      type="text"
      name=""
      id=""
      placeholder="Search"
      className="bg-white border border-slate-200 rounded-lg w-full p-4 px-12 text-sm"
    />
  </div>
);
